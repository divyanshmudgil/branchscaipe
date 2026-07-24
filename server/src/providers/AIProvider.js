// AIProvider — the contract every model backend implements. The rest of the
// server (routes, controllers, services) only ever talks to this shape, never
// to a vendor SDK directly — that's what lets a new provider (OpenAI,
// Anthropic, OpenRouter, ...) be added later as a new file here plus one line
// in `index.js`, with zero changes anywhere else.
export class AIProvider {
  /**
   * @param {{ role: "user"|"assistant", text: string }[]} messages
   *   Plain, vendor-agnostic conversation history — already scoped to a
   *   single branch by the caller. Translating this into the vendor's own
   *   message shape is this provider's job, not the caller's.
   * @param {{ signal?: AbortSignal }} [options]
   * @returns {AsyncGenerator<string>} yields text chunks as they arrive
   */
  // eslint-disable-next-line no-unused-vars
  async *streamChat(messages, options) {
    throw new Error(`${this.constructor.name} must implement streamChat()`);
  }
}
