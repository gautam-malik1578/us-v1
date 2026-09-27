import { opening } from "../content"
import { Next } from "./Scene"

export default function Boot({ onNext }) {
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
    </section>
  )
}
