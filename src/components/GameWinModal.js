import React from 'react'
import './GameWinModal.css'

export default function GameOverModal({onPlayAgain}) {
  return (
    <div className='game-win-modal'>
        <h1>YOU WIN!!!</h1>
        <p>Great job! 😀</p>
        <button onClick={onPlayAgain}>Play Again!</button>
    </div>
  )
}