import './Hangman.css'

export default function Hangman() {
  const message = ""
  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly</p>
      <main>
        <div className="messageHolder" aria-live="polite">{ message && <Message /> }</div>
        <div className="blocks"></div>
        <div className="word"></div>
        <div className="grid"></div>
      </main>
    </>
  )
}
