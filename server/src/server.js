import http from "node:http";
import { app } from "./app.js";
import { config } from "./config/env.js";

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Branchscaipe API listening on http://localhost:${config.port} (provider: ${config.aiProvider})`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close(() => process.exit(0));
  // Force-exit if connections don't close promptly.
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
