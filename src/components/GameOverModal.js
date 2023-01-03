import React from 'react'
import './GameOverModal.css'
import ReactDOM from 'react-dom'

export default function GameOverModal({ onPlayAgain, gameStatus }) {
  if(gameStatus !== 'over') return

  return ReactDOM.createPortal(
    <div className='game-over-modal'>
      <div className='game-over-modal__container'>
        <h1 className='game-over-modal__heading'>GAME OVER</h1>
        <p>You missed a letter 😥</p>
        <button className='game-over-modal__button' autoFocus onClick={onPlayAgain}>Try Again!</button>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
