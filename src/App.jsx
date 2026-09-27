import { useState } from "react"
import Ask from "./scenes/Ask"
import Boot from "./scenes/Boot"
import Bungee from "./scenes/Bungee"
import Couch from "./scenes/Couch"
import Google from "./scenes/Google"
import Night from "./scenes/Night"
import Rain from "./scenes/Rain"

const scenes = [Boot, Google, Bungee, Night, Rain, Couch, Ask]

export default function App() {
  const [step, setStep] = useState(0)
  const SceneView = scenes[step]

  function next() {
    setStep((current) => Math.min(current + 1, scenes.length - 1))
  }

  return (
    <main className="app">
      <div className="phone">
        <SceneView step={step} onNext={next} onReplay={() => setStep(0)} />
      </div>
    </main>
  )
}
