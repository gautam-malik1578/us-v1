import { useState } from "react"
import { couch } from "../content"
import Scene, { Next, Rail } from "./Scene"

export default function Couch({ step, onNext }) {
  const [joined, setJoined] = useState(false)

  return (
    <Scene art="/art/couch.png" alt="A low couch, a blanket, and a glowing screen">
      <Rail step={step} />
      <p className="eyebrow is-title">{couch.eyebrow}</p>
      <h1>{couch.title}</h1>
      <p className="lede">{couch.line}</p>
      {joined ? <p className="note">{couch.after}</p> : null}
      {joined ? (
        <Next onClick={onNext}>{couch.next}</Next>
      ) : (
        <Next onClick={() => setJoined(true)} tone="yellow">
          {couch.join}
        </Next>
      )}
    </Scene>
  )
}
