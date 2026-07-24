import { GoogleGenAI } from "@google/genai";
import { AIProvider } from "./AIProvider.js";
import { config } from "../config/env.js";

// Branchscaipe's own documented voice (see the design system's readme.md):
// warm, plain, quietly intelligent — explains, doesn't sell, never hypey.
const SYSTEM_INSTRUCTION =
  "You are the assistant inside Branchscaipe, a calm and intelligent AI chat " +
  "product. Speak plainly and warmly, like a thoughtful colleague — never " +
  "hypey, never robotic. Explain rather than sell. Keep responses focused " +
  "and easy to scan; use short paragraphs.";

export class GeminiProvider extends AIProvider {
  constructor() {
    super();
    this.client = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    this.model = config.gemini.model;
  }

  // Branchscaipe's messages are plain { role: "user"|"assistant", text }.
  // Gemini wants { role: "user"|"model", parts: [{ text }] } — that
  // translation lives here so nothing above this file needs to know Gemini
  // exists.
  #toContents(messages) {
    return messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));
  }

  async *streamChat(messages, options = {}) {
    const { signal } = options;

    let stream;
    try {
      stream = await this.client.models.generateContentStream({
        model: this.model,
        contents: this.#toContents(messages),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          abortSignal: signal,
          // Gemini 3's "thinking" is variable-length and counts against the
          // same token budget as the visible answer — on some turns it can
          // consume the whole response with internal reasoning and leave
          // zero tokens for actual output. MINIMAL keeps replies snappy and
          // reliable for a chat assistant; maxOutputTokens is a generous
          // ceiling so thinking (whatever little there is) never crowds out
          // the answer.
          thinkingConfig: { thinkingLevel: "MINIMAL" },
          maxOutputTokens: 2048,
        },
      });
    } catch (err) {
      throw toClientError(err);
    }

    try {
      for await (const chunk of stream) {
        if (signal?.aborted) return;
        const text = chunk.text;
        if (text) yield text;
      }
    } catch (err) {
      if (signal?.aborted) return;
      throw toClientError(err);
    }
  }
}

// Wraps a Gemini SDK error into one safe to show a user: a clean message and
// 502 (upstream/Bad Gateway, since it's the AI provider — not us — that
// failed) instead of the SDK's raw, sometimes doubly-JSON-encoded error body.
function toClientError(err) {
  const wrapped = new Error(extractGeminiMessage(err));
  wrapped.status = 502;
  wrapped.expose = true;
  return wrapped;
}

// The SDK's error .message is often itself a JSON-encoded API error body
// (sometimes doubly-wrapped) — unwrap it down to the one human-readable
// sentence so the frontend never has to show a raw error blob in a toast.
function extractGeminiMessage(err) {
  let message = err?.message || "The AI provider failed to respond.";
  for (let i = 0; i < 3; i++) {
    try {
      const parsed = JSON.parse(message);
      const next = parsed?.error?.message;
      if (!next || next === message) break;
      message = next;
    } catch {
      break;
    }
  }
  return message;
}
