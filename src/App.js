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
  const [wordCount, setWordCount] = useState(10)
  const [characterCount, setCharacterCount] = useState(0)
  const [correctLetters, setCorrectLetters] = useState('')
  const [remainingLetters, setRemainingLetters] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
  }, [])


  function getWords() {
    setIsLoading(true)
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
        setIsLoading(false)
      })
    inputRef.current.focus()
  }

  function handleInput(e) {

    if (selectedWords.startsWith(e.target.value.toLowerCase())) {
      setInputText(e.target.value.toLowerCase())
    } else {
      setGameStatus('over')
    }
    if (selectedWords === e.target.value.toLowerCase()) {
      setInputText(e.target.value.toLowerCase())
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

  function handleMouseUp() {
    handlePlayAgain()
  }


  return (
    <div className="App">
      <GameOverModal gameStatus={gameStatus} onPlayAgain={handlePlayAgain} />
      <GameWinModal gameStatus={gameStatus} average={average} sum={sum} onPlayAgain={handlePlayAgain} />
      <div className='padding'>
        <Text characterCount={characterCount}
          isLoading={isLoading}
          inputText={inputText}
          handleInput={handleInput}
          correctLetters={correctLetters}
          remainingLetters={remainingLetters}
          selectedWords={selectedWords}
          inputRef={inputRef} />
        <Keyboard selectedWords={selectedWords} />
        <div className='word-count-input'>
          <p>Select number of words: {wordCount}</p>
          <input value={wordCount} onMouseUp={handleMouseUp} onChange={handleWordCountChange} type='range' min='3' max='50' />
        </div>
      </div>
    </div>
  );
}

export default App;