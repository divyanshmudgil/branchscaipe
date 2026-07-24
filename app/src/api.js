// api — the only place the frontend knows the backend's HTTP/streaming
// shape. App.jsx just gets onToken/onDone/onError callbacks; if the wire
// format ever changes (or a provider needs different framing), this is the
// one file that changes.
const NDJSON_LINE = /\r?\n/;

/**
 * @param {{
 *   messages: { role: "user"|"assistant", text: string }[],
 *   signal: AbortSignal,
 *   onToken: (text: string) => void,
 *   onDone: () => void,
 *   onError: (message: string) => void,
 * }} args
 */
export async function streamChat({ messages, signal, onToken, onDone, onError }) {
  let res;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") return;
    onError("Couldn't reach the server. Is it running?");
    return;
  }

  if (!res.ok || !res.body) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    onError(message);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let settled = false;

  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(NDJSON_LINE);
      buffer = lines.pop(); // last entry may be a partial line — keep buffering it
      for (const line of lines) {
        if (!line.trim()) continue;
        const msg = JSON.parse(line);
        if (msg.type === "token") onToken(msg.text);
        else if (msg.type === "done") { settled = true; onDone(); }
        else if (msg.type === "error") { settled = true; onError(msg.message); }
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    onError(err.message || "Connection lost while streaming.");
    return;
  }

  // Server closed the connection without an explicit done/error line —
  // don't leave the UI stuck in a "streaming" state.
  if (!settled) onDone();
}
