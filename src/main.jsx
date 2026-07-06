import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hangman from './Hangman.jsx'
import '@csstools/normalize.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hangman />
  </StrictMode>,
)
