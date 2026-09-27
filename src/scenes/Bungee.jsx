import { useState } from "react"
import { jump } from "../content"
import Scene, { Next, Rail } from "./Scene"

export default function Bungee({ step, onNext }) {
  const [phase, setPhase] = useState("idle")

  function leap() {
    if (phase !== "idle") return
    setPhase("falling")
    window.setTimeout(() => setPhase("landed"), 1600)
  }

  return (
    <Scene
      art="/art/cliff.png"
      alt="Two people on a cliff above the clouds, a rope waiting"
      stage={
        <div className={`jumper ${phase}`} aria-hidden="true">
          <span className="jumper-tag">again</span>
        </div>
      }
    >
      <Rail step={step} />
      <p className="eyebrow">{jump.eyebrow}</p>
      <h1>{jump.title}</h1>
      <p className="lede">{jump.line}</p>
      {phase === "landed" ? <p className="note">{jump.landed}</p> : null}
      {phase === "landed" ? (
        <Next onClick={onNext}>{jump.next}</Next>
      ) : (
        <Next onClick={leap} disabled={phase === "falling"} tone="yellow">
          {phase === "falling" ? jump.falling : jump.again}
        </Next>
      )}
    </Scene>
  )
}
