import { createHash, timingSafeEqual } from "node:crypto"
import { readFileSync, existsSync } from "node:fs"

const tries = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_TRIES = 6

export function loadLocalEnv() {
  if (!existsSync(".env")) return
  const text = readFileSync(".env", "utf8")
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

function digest(value) {
  return createHash("sha256").update(value).digest()
}

function limited(ip) {
  const now = Date.now()
  const recent = (tries.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  tries.set(ip, recent)
  return recent.length >= MAX_TRIES
}

function mark(ip) {
  const recent = tries.get(ip) || []
  recent.push(Date.now())
  tries.set(ip, recent)
}

export function checkContact(phrase, ip = "local") {
  const answer = process.env.CONTACT_ANSWER || ""
  const number = process.env.CONTACT_NUMBER || ""
  if (!answer || !number) return { status: 503, body: { ok: false } }
  if (limited(ip)) return { status: 429, body: { ok: false } }

  const given = digest(String(phrase || "").trim().toLowerCase())
  const expected = digest(answer.trim().toLowerCase())
  const match = timingSafeEqual(given, expected)
  if (!match) {
    mark(ip)
    return { status: 401, body: { ok: false } }
  }
  return { status: 200, body: { ok: true, number } }
}
