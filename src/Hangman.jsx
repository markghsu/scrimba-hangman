import './Hangman.css'
import wordList from "./words.json"
import livesData from "./lives.json"
import Letter from "./components/Letter"
import Message from "./components/Message"
import Block from "./components/Block"
import WordLetter from "./components/WordLetter"
import { useState } from "react"

const TOTAL_LIVES=livesData.length - 1;

function generateAlphabet() {
  return Array.from({ length: 26 }, (el, i) => ({
      value: String.fromCharCode(65 + i),
      guessed: false,
      correct: false
  }))
}

function generateWordFromDictionary() {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
}

export default function Hangman() {
  const [letters, setLetters] = useState(generateAlphabet)
  const [lastLetterPressed, setLastLetterPressed] = useState(null)
  const [word, setWord] = useState(generateWordFromDictionary)

  const wrongLetterCount = letters.reduce((acc, ele) => acc + (ele.guessed && !ele.correct?1:0), 0)
  const livesLeft = TOTAL_LIVES - wrongLetterCount
  const gameOver = didLose() || didWin()
  function pressLetter(l) {
    setLetters((prev) => prev.map((ele) => ({
      ...ele,
      guessed: ele.value === l? true : ele.guessed,
      correct: ele.value === l?word.includes(l): ele.correct
    })))
    setLastLetterPressed(l)
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
  
  return (
    <>
      <h1 className="heading">Assembly: Endgame</h1>
      <p>{`Guess the word in under ${TOTAL_LIVES} attempts to keep the programming world safe from Assembly`}</p>
      <main>
        <div className="messageHolder" role="status" aria-live="polite">{
          ((wrongLetterCount > 0) || gameOver) &&
          <Message main={
              didLose()?"Game over!":didWin()?"You win!":`Farewell ${livesData[wrongLetterCount - 1].value} 🫡`
            }
            subtitle={
              didLose()?"You lose! Better start learning Assembly 😭":didWin()?"Well done! 🎉":""
            }
            className={didLose()?"bad":didWin()?"good":""}
          />
        }</div>
        <section className="sr-only" role="status" aria-live="polite">
          <p>
            {lastLetterPressed &&
              (word.includes(lastLetterPressed)
                ? `Correct! The letter ${lastLetterPressed} is in the word.`
                : `Sorry, the letter ${lastLetterPressed} is not in the word.`)}
            {` You have ${livesLeft} ${livesLeft === 1 ? "attempt" : "attempts"} left.`}
          </p>
          <p>
            {`Current word: ${word
              .split("")
              .map((letter) =>
                letters.find((l) => l.value === letter).correct ? `${letter}.` : "blank."
              )
              .join(" ")}`}
          </p>
        </section>

        <section aria-label={`${livesLeft} lives left`} className="lives">
          {
            livesData.map((ele,idx) => (
              <Block key={ele.id} {...ele} guessed={idx < wrongLetterCount} />
            ))
          }
        </section>
        <section aria-hidden="true" className="word-container">
          {
            word.split("").map((ele,idx) => {
              const currentLetter = letters.find((l) => l.value === ele )
              return <WordLetter key={idx}
                  value={
                    currentLetter.correct || didLose()?ele:" "
                  }
                  missed={
                    !currentLetter.correct
                  }
              />
            })
          }
        </section>
        <section className="grid" aria-label="Choose a letter">
          {letters.map((ele) => (
            <Letter
              key={ele.value}
              {...ele}
              handleClick={() => pressLetter(ele.value)}
              disabled={gameOver || ele.guessed}
            />
          ))}
        </section>
        {
          gameOver?
          <button className="new-game" 
              onClick={() => {
                setWord(generateWordFromDictionary())
                setLetters(generateAlphabet())
                setLastLetterPressed(null)
            }}
          >New Game</button>:null
        }
      </main>
    </>
  )
}
