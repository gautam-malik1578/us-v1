import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { checkContact, loadLocalEnv } from './server/contact.mjs'

loadLocalEnv()

function contactApi() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })
        req.on('end', () => {
          try {
            const payload = JSON.parse(raw || '{}')
            const result = checkContact(payload.phrase, req.socket.remoteAddress)
            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result.body))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApi()],
})
