import React from 'react'
import './Text.css'

export default function Text({ handleInput, inputText, correctLetters, remainingLetters, inputRef, isLoading }) {

    return (
        <div className='selected-words__container'>
            <div className='selected-words'>
                <span className='correct-letters'>{correctLetters}</span><span className='remaining-letters'>{remainingLetters}</span>
            </div>
            <div className='input__container'>
                {isLoading && <div className='loading-spinner'></div>}
                {isLoading || <input ref={inputRef} autoFocus spellCheck='false' value={inputText} onChange={handleInput} className='input' />}
            </div>
        </div>
    )
}
