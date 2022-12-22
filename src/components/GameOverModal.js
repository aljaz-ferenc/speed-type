import React from 'react'
import './GameOverModal.css'

export default function GameOverModal({onPlayAgain}) {
  return (
    <div className='game-over-modal'>
        <h1>GAME OVER</h1>
        <p>You missed a letter 😥</p>
        <button onClick={onPlayAgain}>Play Again!</button>
    </div>
  )
}
