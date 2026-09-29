import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize } from "node:path"
import { checkContact, loadLocalEnv } from "./server/contact.mjs"

loadLocalEnv()

const port = Number(process.env.PORT || 4173)
const root = join(process.cwd(), "dist")
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
}

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type })
  res.end(typeof body === "string" ? body : JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ""
    req.on("data", (chunk) => {
      raw += chunk
      if (raw.length > 2000) {
        reject(new Error("too large"))
        req.destroy()
      }
    })
    req.on("end", () => resolve(raw))
    req.on("error", reject)
  })
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`)

  if (url.pathname === "/api/contact" && req.method === "POST") {
    try {
      const payload = JSON.parse((await readBody(req)) || "{}")
      const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local").split(",")[0].trim()
      const result = checkContact(payload.phrase, ip)
      send(res, result.status, result.body)
    } catch {
      send(res, 400, { ok: false })
    }
    return
  }

  if (!existsSync(root)) {
    send(res, 503, "Build the site first.", "text/plain; charset=utf-8")
    return
  }

  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, "")
  let filePath = join(root, requested)
  if (!filePath.startsWith(root)) {
    send(res, 403, "No.", "text/plain; charset=utf-8")
    return
  }
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html")
  if (!existsSync(filePath)) filePath = join(root, "index.html")
  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" })
  createReadStream(filePath).pipe(res)
})

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
