import { useState } from "react"
import { gate, opening } from "../content"
import { Next } from "./Scene"

export default function Boot({ onNext }) {
  const [open, setOpen] = useState(true)
  const [phrase, setPhrase] = useState("")
  const [status, setStatus] = useState("idle")
  const [number, setNumber] = useState("")

  async function submit(event) {
    event.preventDefault()
    setStatus("checking")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase }),
      })
      const data = await response.json()
      if (data.ok && data.number) {
        setNumber(data.number)
        setStatus("yes")
        return
      }
      setStatus(response.status === 429 ? "limited" : "no")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="scene boot">
      <img
        className="scene-bg"
        src="/art/opening.png"
        alt="A couple sitting on a cliff at night, her head on his shoulder"
      />
      <div className="boot-wash" />
      <div className="boot-copy">
        <h1>{opening.title}</h1>
        <p>{opening.line}</p>
      </div>
      <Next onClick={onNext} tone="yellow">
        Go ahead
      </Next>
      {open ? (
        <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
          <form className="gate-card" onSubmit={submit}>
            <h2 id="gate-title">{gate.title}</h2>
            <p>{gate.line}</p>
            {status === "yes" ? (
              <>
                <p className="gate-number">{number}</p>
                <p className="note">{gate.found}</p>
              </>
            ) : (
              <input
                className="gate-input"
                value={phrase}
                onChange={(event) => setPhrase(event.target.value)}
                placeholder={gate.placeholder}
                autoComplete="off"
                aria-label={gate.placeholder}
              />
            )}
            {status === "no" ? <p className="note">{gate.miss}</p> : null}
            {status === "limited" ? <p className="note">{gate.limited}</p> : null}
            {status === "error" ? <p className="note">{gate.error}</p> : null}
            <div className="gate-actions">
              {status === "yes" ? null : (
                <button className="btn yellow" type="submit" disabled={status === "checking" || !phrase.trim()}>
                  {gate.submit}
                </button>
              )}
              <button className="text-btn" type="button" onClick={() => setOpen(false)}>
                {gate.dismiss}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  )
}
