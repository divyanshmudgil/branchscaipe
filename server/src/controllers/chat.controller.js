import { streamReply } from "../services/chat.service.js";

const FIRST_TOKEN_TIMEOUT_MS = 30_000;

function isValidMessages(messages) {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0
    )
  );
}

function writeLine(res, payload) {
  res.write(JSON.stringify(payload) + "\n");
}

// Streams newline-delimited JSON: {"type":"token","text":"..."} chunks, then
// either {"type":"done"} or {"type":"error","message":"..."}. NDJSON rather
// than SSE because the client already reads the response body manually with
// fetch() (it needs a POST body for the conversation history, which the
// native EventSource API can't send) — no framing beyond one JSON object per
// line is needed.
export async function streamChat(req, res, next) {
  const { messages } = req.body ?? {};

  if (!isValidMessages(messages)) {
    return res.status(400).json({
      error: "messages must be a non-empty array of { role: 'user'|'assistant', text }",
    });
  }

  const controller = new AbortController();
  let firstTokenReceived = false;

  const timeout = setTimeout(() => {
    if (!firstTokenReceived) controller.abort();
  }, FIRST_TOKEN_TIMEOUT_MS);

  // Client navigated away / hit Stop / lost connection — stop paying for
  // tokens nobody will see. This must be res "close", not req "close": the
  // request stream closes as soon as Express finishes reading the body
  // (i.e. almost immediately), which would abort every request before a
  // single token could be written. The response only closes early like this
  // if the client actually goes away mid-stream.
  res.on("close", () => {
    if (!res.writableEnded) controller.abort();
  });

  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no"); // disable proxy buffering (e.g. nginx) so tokens flush immediately

  try {
    for await (const token of streamReply(messages, { signal: controller.signal })) {
      firstTokenReceived = true;
      writeLine(res, { type: "token", text: token });
    }
    clearTimeout(timeout);
    writeLine(res, { type: "done" });
    res.end();
  } catch (err) {
    clearTimeout(timeout);
    const message = controller.signal.aborted
      ? "The response took too long and was stopped."
      : err?.message || "The AI provider failed to respond.";

    if (!res.headersSent) {
      // Nothing streamed yet — a normal HTTP error is still possible.
      return next(err);
    }
    // Already streaming: the only clean way to signal failure now is an
    // in-band error line, since the status code can't change anymore.
    writeLine(res, { type: "error", message });
    res.end();
  }
}
