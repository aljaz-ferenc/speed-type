import React from 'react'
import ReactDOM from 'react-dom'
import './GameWinModal.css'

export default function GameWinModal({ onPlayAgain, sum, average, gameStatus  }) {
  if(gameStatus !== 'win') return

  return ReactDOM.createPortal(
    <div className='game-win-modal'>
      <div className='game-win-modal__container'>
        <h1 className='game-win-modal__heading'>YOU WIN!!!</h1>
        <p>Great job! 😀</p>
        <p>Your time: {sum} seconds</p>
        <p>Average: {average} characters per second</p>
        <button className='game-win-modal__button' autoFocus onClick={onPlayAgain}>Play Again!</button>
      </div>
    </div>,
    document.getElementById('portal')
  )
}