import './Hangman.css'
import Letter from "./components/Letter"
import {useState} from "react"

function generateAlphabet() {
  return Array.from({ length: 26 }, (el, i) => ({
      value: String.fromCharCode(65 + i),
      used: false,
      correct: false
  }))
}

export default function Hangman() {
  const [letters, setLetters] = useState(generateAlphabet)

  function pressLetter(l) {
    setLetters((prev) => prev.map((ele) => ({
      ...ele,
      used: ele.value === l? true : ele.used
    })))
  }
  const message = ""
  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly</p>
      <main>
        <div className="messageHolder" aria-live="polite">{ message && <Message /> }</div>
        <div className="blocks"></div>
        <div className="word"></div>
        <div className="grid">
          {letters.map((ele) => (<Letter key={ele.value} {...ele} handleClick={() => pressLetter(ele.value)} />))}
        </div>
      </main>
    </>
  )
}
