// chat.service — the seam between HTTP concerns (controller) and the model
// (provider). Anything that isn't "talk to an HTTP client" or "talk to a
// specific vendor SDK" belongs here: today that's just picking the configured
// provider, but this is also where future concerns like usage logging, rate
// limiting, or moderation would attach without touching the controller or
// any provider implementation.
import { getProvider } from "../providers/index.js";

/**
 * @param {{ role: "user"|"assistant", text: string }[]} messages
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {AsyncGenerator<string>}
 */
export function streamReply(messages, options = {}) {
  const provider = getProvider();
  return provider.streamChat(messages, options);
}
