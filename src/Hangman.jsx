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
      used: false,
      correct: false
  }))
}

function generateWordFromDictionary() {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
}

export default function Hangman() {
  const [letters, setLetters] = useState(generateAlphabet)
  //const [lastLetterPressed, setLastLetterPressed] = useState(null)
  const [word, setWord] = useState(generateWordFromDictionary)

  const wrongLetterCount = letters.reduce((acc, ele) => acc + (ele.used && !ele.correct?1:0), 0)
  console.log(wrongLetterCount)
  const gameOver = didLose() || didWin()
  function pressLetter(l) {
    setLetters((prev) => prev.map((ele) => ({
      ...ele,
      used: ele.value === l? true : ele.used,
      correct: ele.value === l?word.includes(l): ele.correct
    })))
    //setLastLetterPressed(l)
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
        <div className="messageHolder" aria-live="polite">{
          wrongLetterCount > 0 && 
          <Message main={
              didLose()?"Game over!":didWin()?"You win!":`Farewell ${livesData[wrongLetterCount - 1].value} 🫡`
              //`You guessed "${lastLetterPressed}". That was ${letters.find((l) => l.value === lastLetterPressed).correct?"right.":`Wrong. Farewell ${livesData[wrongLetterCount - 1].value} 🫡`}`
            } 
            subtitle={
              didLose()?"You lose! Better start learning Assembly 😭":didWin()?"Well done! 🎉":""
            }
            className={didLose()?"bad":didWin()?"good":""}
          />
        }</div>
        <section aria-label={`${TOTAL_LIVES - wrongLetterCount} lives left`} className="lives">
          {
            livesData.map((ele,idx) => (
              <Block key={ele.id} {...ele} used={idx < wrongLetterCount} />
            ))
          }
        </section>
        <section aria-label={`Word to guess`} className="word-container">
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
        <section className="grid">
          {letters.map((ele) => (<Letter key={ele.value} {...ele} handleClick={() => pressLetter(ele.value)} disabled={gameOver} />))}
        </section>
        {
          gameOver?
          <button className="new-game" 
              onClick={() => {
                setWord(generateWordFromDictionary())
                setLetters(generateAlphabet())
                //setLastLetterPressed(null)
            }}
          >New Game</button>:null
        }
      </main>
    </>
  )
}
