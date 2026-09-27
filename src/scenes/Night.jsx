import { useState } from "react"
import { constellationName, poetry, sky, stars } from "../content"
import Scene, { Next, Rail } from "./Scene"

export default function Night({ step, onNext }) {
  const [linked, setLinked] = useState([])
  const [page, setPage] = useState("sky")
  const [secondLine, setSecondLine] = useState(false)
  const done = linked.length === stars.length

  function tapStar(id) {
    setLinked((current) => (current.includes(id) ? current : [...current, id]))
  }

  const points = linked
    .map((id) => stars.find((star) => star.id === id))
    .filter(Boolean)

  const stage =
    page === "sky" ? (
      <div className="sky">
        <svg className="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {points.slice(1).map((star, index) => {
            const prev = points[index]
            return (
              <line
                key={`${prev.id}-${star.id}`}
                x1={prev.x}
                y1={prev.y}
                x2={star.x}
                y2={star.y}
              />
            )
          })}
        </svg>
        {stars.map((star) => (
          <button
            key={star.id}
            type="button"
            className={linked.includes(star.id) ? "star is-on" : "star"}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            onClick={() => tapStar(star.id)}
            aria-label={`Star ${linked.indexOf(star.id) + 1 || linked.length + 1}`}
          />
        ))}
        {done ? <p className="constellation">{constellationName}</p> : null}
      </div>
    ) : null

  return (
    <Scene
      art={page === "sky" ? "/art/night.png" : "/art/quiet.png"}
      alt={
        page === "sky"
          ? "A couple walking a hill under a cold starry sky"
          : "A lamp, an open book, and a window full of night"
      }
      stage={stage}
    >
      <Rail step={step} />
      {page === "sky" ? (
        <>
          <p className="eyebrow">{sky.eyebrow}</p>
          <h1>{sky.title}</h1>
          <p className="lede">{sky.line}</p>
          <p className="note">
            {linked.length} of {stars.length} stars connected.
          </p>
          <Next onClick={() => setPage("book")} disabled={!done}>
            {sky.next}
          </Next>
        </>
      ) : (
        <>
          <p className="eyebrow">{poetry.eyebrow}</p>
          <h1>{poetry.title}</h1>
          <p className="lede">{poetry.line}</p>
          {secondLine ? (
            <blockquote className="couplet">
              {poetry.couplet.map((line) => (
                <p className="poem" key={line}>
                  {line}
                </p>
              ))}
              <p className="note">{poetry.credit}</p>
            </blockquote>
          ) : null}
          {secondLine ? (
            <Next onClick={onNext}>{poetry.next}</Next>
          ) : (
            <Next onClick={() => setSecondLine(true)} tone="yellow">
              {poetry.read}
            </Next>
          )}
        </>
      )}
    </Scene>
  )
}
