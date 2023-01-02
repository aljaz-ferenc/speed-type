import './App.css';
import React from 'react';
import Keyboard from './components/Keyboard';
import Text from './components/Text';
import { useState, useEffect } from 'react';
import GameOverModal from './components/GameOverModal';
import GameWinModal from './components/GameWinModal';

function App() {
  const [selectedWords, setSelectedWords] = useState(0)
  const [inputText, setInputText] = useState('')
  const [gameStatus, setGameStatus] = useState('play')
  const [wordCount, setWordCount] = useState(3)
  const [characterCount, setCharacterCount] = useState(0)
  const [correctLetters, setCorrectLetters] = useState('')
  const [remainingLetters, setRemainingLetters] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)

  const inputRef = React.createRef()

  useEffect(() => {
    setSum(((end - start) / 1000).toFixed(2))
    setAverage((selectedWords.length / sum).toFixed(2))
  }, [end, sum, selectedWords, start])


  useEffect(() => {
    if (characterCount === 1) {
      setStart(new Date().getTime())
    }
    if (selectedWords.length === characterCount) {
      setEnd(new Date().getTime())
    }
  }, [characterCount, selectedWords])

  
  useEffect(() => {
    getWords()
    inputRef.current.focus()
  }, [])


  function getWords() {
    fetch('https://random-word-api.herokuapp.com/all')
      .then(response => response.json())
      .then(data => {
        let randomNumbers = []
        let randomWords = []

        for (let i = 0; i < wordCount; i++) {
          const number = Math.ceil(Math.random() * data.length)
          randomNumbers.push(number)
        }

        randomNumbers.forEach(number => {
          randomWords.push(data[number])
        })
        setSelectedWords(randomWords.join(' '))
        setRemainingLetters(randomWords.join(' '))
      })
  }

  function handleInput(e) {

    if (selectedWords.startsWith(e.target.value)) {
      setInputText(e.target.value)
    } else {
      setGameStatus('over')
    }
    if (selectedWords === e.target.value) {
      setInputText(e.target.value)
      setGameStatus('win')
    }

    setCharacterCount(prevCount => prevCount + 1)
    setCorrectLetters(selectedWords.slice(0, characterCount + 1))
    setRemainingLetters(selectedWords.slice(characterCount + 1))
  }

  function handlePlayAgain() {
    setGameStatus('play')
    getWords()
    setInputText('')
    setCharacterCount(0)
    setCorrectLetters('')
    setRemainingLetters('')
    setSum(0)
    setEnd(0)
    setStart(0)
    setAverage(0)
    inputRef.current.focus()
  }

  function handleWordCountChange(e) {
    setWordCount(e.target.value)
  }


  return (
    <div className="App">
      {gameStatus === 'over' && <GameOverModal onPlayAgain={handlePlayAgain} />}
      {gameStatus === 'win' && <GameWinModal average={average} sum={sum} onPlayAgain={handlePlayAgain} />}
      <div className='padding'>
        <Text characterCount={characterCount}
          inputText={inputText}
          handleInput={handleInput}
          correctLetters={correctLetters}
          remainingLetters={remainingLetters}
          selectedWords={selectedWords}
          inputRef={inputRef} />
        <Keyboard selectedWords={selectedWords} />
        <p>Number of words: {wordCount}</p>
        <input value={wordCount} onChange={handleWordCountChange} type='range' min='3' max='50' />
        <button className='word-count-btn' onClick={handlePlayAgain}>GO!</button>
      </div>
    </div>
  );
}

export default App;