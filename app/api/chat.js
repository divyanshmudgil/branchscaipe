// Vercel Function — POST /api/chat. Streams newline-delimited JSON:
// {"type":"token","text":"..."} chunks, then either {"type":"done"} or
// {"type":"error","message":"..."}. NDJSON rather than SSE because the
// client already reads the response body manually with fetch() (it needs a
// POST body for the conversation history, which native EventSource can't
// send) — no framing beyond one JSON object per line is needed.
//
// Ported from the old Express chat.controller.js. The provider/service layer
// underneath (lib/server/providers, lib/server/services) is unchanged —
// only the HTTP glue moved from Express's req/res to the Web-standard
// fetch(request) -> Response shape Vercel Functions use.
import { streamReply } from "../lib/server/services/chat.service.js";

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

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    let messages;
    try {
      ({ messages } = (await request.json()) ?? {});
    } catch {
      return jsonResponse(400, { error: "Request body must be valid JSON" });
    }

    if (!isValidMessages(messages)) {
      return jsonResponse(400, {
        error: "messages must be a non-empty array of { role: 'user'|'assistant', text }",
      });
    }

    const providerController = new AbortController();
    let firstTokenReceived = false;
    const timeout = setTimeout(() => {
      if (!firstTokenReceived) providerController.abort();
    }, FIRST_TOKEN_TIMEOUT_MS);

    const encoder = new TextEncoder();
    const writeLine = (streamController, payload) =>
      streamController.enqueue(encoder.encode(JSON.stringify(payload) + "\n"));

    const stream = new ReadableStream({
      async start(streamController) {
        try {
          for await (const token of streamReply(messages, { signal: providerController.signal })) {
            firstTokenReceived = true;
            writeLine(streamController, { type: "token", text: token });
          }
          clearTimeout(timeout);
          writeLine(streamController, { type: "done" });
          streamController.close();
        } catch (err) {
          clearTimeout(timeout);
          const message = providerController.signal.aborted
            ? "The response took too long and was stopped."
            : err?.message || "The AI provider failed to respond.";
          writeLine(streamController, { type: "error", message });
          streamController.close();
        }
      },
      // Fires when the client actually stops reading — tab closed, Stop
      // button clicked, connection dropped. Unlike Express's req "close"
      // (which fires as soon as the request body is read, i.e. immediately),
      // this is the platform-defined "the consumer genuinely went away"
      // signal, so it's safe to tie the provider abort directly to it.
      cancel() {
        clearTimeout(timeout);
        providerController.abort();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  },
};
