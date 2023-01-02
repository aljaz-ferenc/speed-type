import React from 'react'
import './GameWinModal.css'

export default function GameOverModal({ onPlayAgain, sum, average }) {
  return (
    <div className='game-win-modal'>
      <div className='game-win-modal__container'>
        <h1 className='game-win-modal__heading'>YOU WIN!!!</h1>
        <p>Great job! 😀</p>
        <p>Your time: {sum} seconds</p>
        <p>Average: {average} characters per second</p>
        <button autoFocus onClick={onPlayAgain}>Play Again!</button>
      </div>
    </div>
  )
}