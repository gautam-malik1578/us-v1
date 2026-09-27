import { useState } from "react"
import { names, rain } from "../content"
import Scene, { Next, Rail } from "./Scene"

export default function Rain({ step, onNext }) {
  const [phase, setPhase] = useState("closed")

  return (
    <Scene
      art="/art/rain.png"
      alt="A rainy street where one umbrella is yellow"
      stage={
        <>
          <div className="rain-overlay" aria-hidden="true" />
          {phase === "closed" ? (
            <button
              type="button"
              className="umbrella-hit"
              aria-label="Umbrella"
              onClick={() => setPhase("open")}
            />
          ) : null}
          {phase === "dancing" ? (
            <div className="dancers" aria-hidden="true">
              <div className="fig bad">
                <i />
                <b>{names.me}</b>
              </div>
              <div className="fig soft">
                <i />
                <b>{names.her}</b>
              </div>
            </div>
          ) : null}
        </>
      }
    >
      <Rail step={step} />
      <p className="eyebrow is-title">{rain.eyebrow}</p>
      <h1 className="long-word">{rain.title}</h1>
      {phase === "closed" ? <p className="hint">{rain.hint}</p> : <p className="lede">{rain.line}</p>}
      {phase === "dancing" ? (
        <p className="note">
          {names.me} is off the beat. {names.her} can sway.
        </p>
      ) : null}
      {phase === "closed" ? null : phase === "open" ? (
        <Next onClick={() => setPhase("dancing")} tone="yellow">
          {rain.join}
        </Next>
      ) : (
        <Next onClick={onNext}>{rain.next}</Next>
      )}
    </Scene>
  )
}
