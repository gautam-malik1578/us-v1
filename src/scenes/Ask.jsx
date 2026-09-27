import { useState } from "react"
import { ask, constellationName } from "../content"
import Scene, { Next, Rail } from "./Scene"

function StarSign({ points, links }) {
  return (
    <svg className="star-sign" viewBox="0 0 100 100" aria-hidden="true">
      {links.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={points[from].x}
          y1={points[from].y}
          x2={points[to].x}
          y2={points[to].y}
        />
      ))}
      {points.map((point) => (
        <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="2.4" />
      ))}
    </svg>
  )
}

const umbrellaStars = {
  points: [
    { x: 12, y: 46 },
    { x: 30, y: 28 },
    { x: 50, y: 16 },
    { x: 70, y: 28 },
    { x: 88, y: 46 },
    { x: 50, y: 46 },
    { x: 50, y: 74 },
    { x: 66, y: 88 },
    { x: 78, y: 76 },
  ],
  links: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [2, 5],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
  ],
}

const lobsterStars = {
  points: [
    { x: 8, y: 50 },
    { x: 18, y: 36 },
    { x: 18, y: 64 },
    { x: 34, y: 48 },
    { x: 50, y: 44 },
    { x: 62, y: 38 },
    { x: 78, y: 20 },
    { x: 90, y: 28 },
    { x: 80, y: 58 },
    { x: 92, y: 50 },
    { x: 72, y: 16 },
    { x: 84, y: 6 },
    { x: 40, y: 62 },
    { x: 36, y: 76 },
  ],
  links: [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [5, 8],
    [8, 9],
    [5, 10],
    [10, 11],
    [4, 12],
    [12, 13],
  ],
}

export default function Ask({ step, onReplay }) {
  const [answer, setAnswer] = useState(null)

  return (
    <Scene
      art="/art/night.png"
      alt="The star hill"
      stage={
        answer === "yes" ? (
          <div className="celebrate" aria-hidden="true">
            <StarSign points={umbrellaStars.points} links={umbrellaStars.links} />
            <StarSign points={lobsterStars.points} links={lobsterStars.links} />
          </div>
        ) : (
          <p className="floating-name">{constellationName}</p>
        )
      }
    >
      <Rail step={step} />
      <p className="eyebrow">the question</p>
      {answer === "yes" ? (
        <>
          <h1>{ask.yes}</h1>
          <button className="text-btn" type="button" onClick={onReplay}>
            Play it again
          </button>
        </>
      ) : answer === "later" ? (
        <>
          <h1>{ask.later}</h1>
          <button className="text-btn" type="button" onClick={onReplay}>
            Play it again
          </button>
        </>
      ) : (
        <>
          <h1>{ask.lead}</h1>
          <p className="lede">{ask.list}</p>
          <p className="question">{ask.question}</p>
          <Next onClick={() => setAnswer("yes")} tone="yellow">
            Yes
          </Next>
          <button className="text-btn" type="button" onClick={() => setAnswer("later")}>
            Not yet
          </button>
        </>
      )}
    </Scene>
  )
}
