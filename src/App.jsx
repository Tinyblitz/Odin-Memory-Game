import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Cards from './components/Cards.jsx'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(score);


  const handlePlus = () => {
    setScore(prev => prev + 1);
    if (score + 1 > highScore) setHighScore(prev => prev +1);
  }

  const handleReset = () => setScore(0);

  return (
    <>
      <header>Memory Game</header>
      <p>Click on each Pokémon without repeats!</p>
      <p>Score: {score}</p>
      <p>High-Score: {highScore}</p>
      <Cards addScore={handlePlus} resetScore={handleReset}/>
    </>
  )
}

export default App
