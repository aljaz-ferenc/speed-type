import React, { useState, useEffect} from 'react'
import './Text.css'

export default function Text({ selectedWords, handleInput, inputText, correctLetters, remainingLetters}) {

        return (
            <div className='selected-words__container'>
            <div className='selected-words'>
                <span className='correct-letters'>{correctLetters}</span><span className='remaining-letters'>{remainingLetters}</span>
            </div>
            <div className='input__container'>
                <input spellCheck='false' value={inputText} onChange={handleInput} className='input' />
            </div>
        </div>
    )
}
