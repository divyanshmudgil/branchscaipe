// Central place env vars are read and validated. Every other module imports
// `config` from here instead of touching `process.env` directly, so adding
// e.g. a DB_URL or JWT_SECRET later is a one-line addition, not a hunt across
// the codebase.
import "dotenv/config";

const required = ["GEMINI_API_KEY"];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  // Fail fast and loudly — a missing key should never surface as a mysterious
  // 500 on the first chat request.
  console.error(`Missing required environment variable(s): ${missing.join(", ")}`);
  console.error("Copy server/.env.example to server/.env and fill them in.");
  process.exit(1);
}

export const config = {
  port: Number(process.env.PORT) || 8787,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  aiProvider: process.env.AI_PROVIDER || "gemini",
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    // gemini-2.5-flash is no longer available to newly-created API keys as
    // of mid-2026 (Google cut off new access ahead of its Oct 16 2026
    // shutdown) — gemini-3.6-flash is the current GA, free-tier successor.
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  },
};
