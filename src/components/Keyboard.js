import React, { useEffect, useState } from 'react'
import './Keyboard.css'

const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]
const firstRow = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p']
const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const thirdRow = ['y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']

export default function Keyboard({selectedWords, inputText}) {
    const [pressedKey, setPressedKey] = useState('')

    function handleKeyPress() {
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            setPressedKey(e.key)
        })
        window.addEventListener('keyup', () => {            
            setPressedKey('')
        })
    }
    handleKeyPress()

    return (
        <div className='keyboard'>
            <div className='number-keys'> 
                {numberKeys.map(key => {
                    return (
                        <div key={key} className={pressedKey === String(key) ? 'active key' : 'key'}>{key}</div>
                    )
                })}
            </div>
            <div className='first-row'>
                {firstRow.map(key => {
                    return (
                        <div key={key} className={pressedKey === String(key) ? 'active key' : 'key'}>{key.toUpperCase()}</div>
                    )
                })}
            </div>
            <div className='second-row'>
                {secondRow.map(key => {
                    return (
                        <div key={key} className={pressedKey === String(key) ? 'active key' : 'key'}>{key.toUpperCase()}</div>
                    )
                })}
            </div>
            <div className='third-row'>
                {thirdRow.map(key => {
                    return (
                        <div key={key} className={pressedKey === String(key) ? 'active key' : 'key'}>{key.toUpperCase()}</div>
                    )
                })}
            </div>
            <div className={pressedKey === ' ' ? 'active spacebar' : 'spacebar'}></div> 
        </div>
    )
}
