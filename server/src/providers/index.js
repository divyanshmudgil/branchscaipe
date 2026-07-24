// Provider registry — the one place that knows which AIProvider
// implementations exist. Adding OpenAI/Anthropic/OpenRouter later means
// creating e.g. OpenAIProvider.js and adding one line to this map; nothing
// else in the server changes.
import { config } from "../config/env.js";
import { GeminiProvider } from "./GeminiProvider.js";

const registry = {
  gemini: GeminiProvider,
};

let instance = null;

export function getProvider() {
  if (instance) return instance;

  const ProviderClass = registry[config.aiProvider];
  if (!ProviderClass) {
    throw new Error(
      `Unknown AI_PROVIDER "${config.aiProvider}". Available: ${Object.keys(registry).join(", ")}`
    );
  }

  instance = new ProviderClass();
  return instance;
}
