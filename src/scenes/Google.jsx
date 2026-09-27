import { useState } from "react"
import { tickets, work } from "../content"
import Scene, { Next, Rail } from "./Scene"

export default function Google({ step, onNext }) {
  const [placed, setPlaced] = useState([])
  const ready = placed.length === tickets.length

  function place(id) {
    setPlaced((current) => (current.includes(id) ? current : [...current, id]))
  }

  return (
    <Scene tall>
      <Rail step={step} />
      <p className="eyebrow">{work.eyebrow}</p>
      <h1>{work.title}</h1>
      <p className="lede">{work.line}</p>
      <div className="ticket-row">
        {tickets.map((ticket) => {
          const onBoard = placed.includes(ticket.id)
          return (
            <button
              key={ticket.id}
              type="button"
              className={onBoard ? "ticket is-on" : "ticket"}
              onClick={() => place(ticket.id)}
              disabled={onBoard}
            >
              {ticket.label}
            </button>
          )
        })}
      </div>
      <div className={ready ? "board is-ready" : "board"}>
        <p>
          {ready ? work.ready : placed.length === 0 ? work.empty : `${placed.length} of 3.`}
        </p>
      </div>
      <Next onClick={onNext} disabled={!ready}>
        {work.next}
      </Next>
    </Scene>
  )
}
