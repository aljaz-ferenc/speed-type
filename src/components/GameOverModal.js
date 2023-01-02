import React from 'react'
import './GameOverModal.css'

export default function GameOverModal({ onPlayAgain }) {
  return (
    <div className='game-over-modal'>
      <div className='game-over-modal__container'>
        <h1 className='game-over-modal__heading'>GAME OVER</h1>
        <p>You missed a letter 😥</p>
        <button autoFocus onClick={onPlayAgain}>Try Again!</button>
      </div>
    </div>
  )
}
