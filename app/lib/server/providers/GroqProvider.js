import Groq from "groq-sdk";
import { AIProvider } from "./AIProvider.js";
import { config } from "../config/env.js";

// Same documented voice as GeminiProvider — warm, plain, quietly intelligent.
const SYSTEM_INSTRUCTION =
  "You are the assistant inside Branchscaipe, a calm and intelligent AI chat " +
  "product. Speak plainly and warmly, like a thoughtful colleague — never " +
  "hypey, never robotic. Explain rather than sell. Keep responses focused " +
  "and easy to scan; use short paragraphs.";

export class GroqProvider extends AIProvider {
  constructor() {
    super();
    this.client = new Groq({ apiKey: config.groq.apiKey });
    this.model = config.groq.model;
  }

  // Branchscaipe's messages are plain { role: "user"|"assistant", text }.
  // Groq is OpenAI-compatible: { role: "user"|"assistant"|"system", content }
  // — that translation lives here, same as Gemini's #toContents.
  #toMessages(messages) {
    return [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...messages.map((m) => ({ role: m.role, content: m.text })),
    ];
  }

  async *streamChat(messages, options = {}) {
    const { signal } = options;

    let stream;
    try {
      stream = await this.client.chat.completions.create(
        { model: this.model, messages: this.#toMessages(messages), stream: true },
        { signal }
      );
    } catch (err) {
      if (signal?.aborted) return;
      throw toClientError(err);
    }

    try {
      for await (const chunk of stream) {
        if (signal?.aborted) return;
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) yield text;
      }
    } catch (err) {
      if (signal?.aborted) return;
      throw toClientError(err);
    }
  }
}

// groq-sdk's APIError already builds a reasonably clean .message, unlike
// Gemini's raw passthrough — but fall back to unwrapping a JSON-encoded
// .error.message if a particular error type doesn't, so nothing raw ever
// reaches the user.
function toClientError(err) {
  let message = err?.message || "The AI provider failed to respond.";
  if (typeof err?.error?.error?.message === "string") {
    message = err.error.error.message;
  } else {
    try {
      const parsed = JSON.parse(message);
      if (typeof parsed?.error?.message === "string") message = parsed.error.message;
    } catch {
      // message was plain text already — keep it as-is
    }
  }
  const wrapped = new Error(message);
  wrapped.status = 502;
  wrapped.expose = true;
  return wrapped;
}
