import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards to the Branchscaipe API (see ../server). Keeps the frontend
      // calling same-origin '/api/...' in dev, matching how it's served in
      // production behind a reverse proxy.
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
