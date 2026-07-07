import './Hangman.css'
import Letter from "./components/Letter"
import Message from "./components/Message"
import wordList from "./words.json"
import livesData from "./lives.json"
import Block from "./components/Block"
import { useState } from "react"

const TOTAL_LIVES=livesData.length - 1;

function generateAlphabet() {
  return Array.from({ length: 26 }, (el, i) => ({
      value: String.fromCharCode(65 + i),
      used: false,
      correct: false
  }))
}

function generateWordFromDictionary() {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
}

export default function Hangman() {
  const [letters, setLetters] = useState(generateAlphabet)
  const [word, setWord] = useState(generateWordFromDictionary)

  const wrongLetterCount = letters.reduce((acc, ele) => acc + (ele.used && !ele.correct?1:0), 0)

  function pressLetter(l) {
    setLetters((prev) => prev.map((ele) => ({
      ...ele,
      used: ele.value === l? true : ele.used,
      correct: ele.value === l?word.includes(l): ele.correct
    })))
  }

  function didWin() {
    for(let i = 0; i < word.length; i++) {
      if(!letters.find((ele) => ele.value === word[i]).correct) {
        return false
      }
    }
    return true
  }

  function didLose() {
    return wrongLetterCount >= TOTAL_LIVES
  }

  const message = didLose()?"You Lost!":didWin()?"You Won!":"Keep playing"
  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>{`Guess the word in under ${TOTAL_LIVES} attempts to keep the programming world safe from Assembly`}</p>
      <main>
        <div className="messageHolder" aria-live="polite">{ message && <Message main={message} subtitle="subtitle goes here" /> }</div>
        <section className="lives">
          {
            livesData.map((ele,idx) => (
              <Block key={ele.id} {...ele} used={idx < wrongLetterCount} />
            ))
          }
        </section>
        <div className="word">{word}</div>
        <div className="grid">
          {letters.map((ele) => (<Letter key={ele.value} {...ele} handleClick={() => pressLetter(ele.value)} />))}
        </div>
      </main>
    </>
  )
}
