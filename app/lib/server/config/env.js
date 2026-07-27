// Central place env vars are read and validated. Every other module imports
// `config` from here instead of touching `process.env` directly, so adding
// e.g. a DB_URL or JWT_SECRET later is a one-line addition, not a hunt across
// the codebase.
//
// No dotenv import here (unlike the old standalone Express server) — Vercel
// injects environment variables directly into the function's process.env at
// runtime, and `vercel dev` reads `.env.local` on its own for local dev.

const aiProvider = process.env.AI_PROVIDER || "gemini";

const required = aiProvider === "groq" ? ["GROQ_API_KEY"] : ["GEMINI_API_KEY"];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  // Fail fast and loudly at cold start rather than surfacing as a mysterious
  // 500 on the first chat request. Throwing (not process.exit) is the right
  // shape inside a serverless function — the platform turns it into a clean
  // error response instead of killing the process ambiguously.
  throw new Error(
    `Missing required environment variable(s): ${missing.join(", ")}. ` +
      `Set them in the Vercel project settings (or .env.local for \`vercel dev\`).`
  );
}

export const config = {
  aiProvider,
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    // gemini-2.5-flash is no longer available to newly-created API keys as
    // of mid-2026 (Google cut off new access ahead of its Oct 16 2026
    // shutdown) — gemini-3.6-flash is the current GA, free-tier successor.
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  },
};
