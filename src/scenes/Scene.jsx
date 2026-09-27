export default function Scene({ art, alt, stage, tall, children }) {
  return (
    <section className="scene">
      {art ? (
        <img className="scene-bg" src={art} alt={alt} />
      ) : (
        <div className="scene-flat" />
      )}
      <div className="scene-shade" />
      {stage}
      <div className={tall ? "card is-tall" : "card"}>{children}</div>
    </section>
  )
}

export function Rail({ step }) {
  if (step === 0) {
    return (
      <div className="rail">
        <span className="brand">us-v1</span>
      </div>
    )
  }

  return (
    <div className="rail" aria-label={`Scene ${step} of 6`}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className={i < step ? "dot on" : "dot"} />
      ))}
    </div>
  )
}

export function Next({ children, onClick, disabled, tone = "dark" }) {
  return (
    <button className={`btn ${tone}`} type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
