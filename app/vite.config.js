import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only: lets plain `npm run dev` (bare Vite, no Vercel Functions layer)
// still serve real AI responses locally, by calling the same Vercel
// Function handler (api/chat.js) directly inside Vite's own dev server via
// a middleware — no separate process, no Express, nothing that touches the
// production build (configureServer only ever runs under `vite dev`, never
// `vite build`). This exists because `vercel dev` has an unresolved hang in
// this environment (see CLAUDE.md's "Local API" section) — it's an
// unblocking path for local dev, not a replacement for `vercel dev`.
function apiChatDevMiddleware(env) {
  return {
    name: 'api-chat-dev-middleware',
    configureServer(server) {
      // api/chat.js's import chain (lib/server/config/env.js) reads
      // process.env at import time and fails fast if a key is missing —
      // Vite only auto-loads .env.local into process.env for VITE_-
      // prefixed vars, so the rest need to be applied explicitly here.
      for (const [key, value] of Object.entries(env)) {
        if (value != null && process.env[key] === undefined) process.env[key] = value
      }

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        try {
          const { default: chatHandler } = await server.ssrLoadModule('/api/chat.js')
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const request = new Request(`http://localhost${req.url}`, {
            method: 'POST',
            headers: req.headers,
            body: Buffer.concat(chunks),
          })
          const response = await chatHandler.fetch(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          if (response.body) {
            for await (const chunk of response.body) res.write(chunk)
          }
          res.end()
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err?.message || 'Internal error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), apiChatDevMiddleware(env)],
  }
})
