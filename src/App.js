import './App.css';
import Keyboard from './components/Keyboard';
import Text from './components/Text';
import { useState, useEffect } from 'react';
import GameOverModal from './components/GameOverModal';
import GameWinModal from './components/GameWinModal';

function App() {
  const [selectedWords, setSelectedWords] = useState()
  const [inputText, setInputText] = useState('')
  const [gameStatus, setGameStatus] = useState('play')
  const [wordCount, setWordCount] = useState(10)
  const [characterCount, setCharacterCount] = useState(0)
  const [correctLetters, setCorrectLetters] = useState('')
  const [remainingLetters, setRemainingLetters] = useState('')
  // const [time, setTime] = useState({start: 0, end: 0})

  useEffect(() => {
    getWords()
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
  }

  function handleWordCountChange(e) {
    setWordCount(e.target.value)
  }

  return (
    <div className="App">
      {gameStatus === 'over' && <GameOverModal onPlayAgain={handlePlayAgain} />}
      {gameStatus === 'win' && <GameWinModal onPlayAgain={handlePlayAgain} />}
      <div className='padding'>
        <Text characterCount={characterCount} inputText={inputText} handleInput={handleInput} correctLetters={correctLetters} remainingLetters={remainingLetters} selectedWords={selectedWords} />
        <Keyboard selectedWords={selectedWords} />
        <input value={wordCount} onChange={handleWordCountChange} type='range' min='5' max='50' />
        <p>{wordCount}</p>
        <button onClick={getWords}>Submit!</button>
      </div>
    </div>
  );
}

export default App;