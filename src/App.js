import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [hiddenWord, setHiddenWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [options, setOptions] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
 
  useEffect(() => {
    if (showInstructions) {
      alert(
        "Welcome to the Letter Guessing Game!\n\n" +
        "Instructions:\n" +
        "1. Click on the box to guess the correct word.\n" +
        "2. You have 3 chances to guess the word.\n" +
        "3. If you guess correctly, the word will be revealed.\n" +
        "4. If you run out of guesses, the correct word will be shown.\n" +
        "5. Click 'Reset Game' to start a new game."
      );
      setShowInstructions(false);
    }
    fetchNewWord();
  }, []); 

  useEffect(() => {
    fetchNewWord();
  }, []); // Fetch a new word when the component mounts

  const handleLetterClick = (word) => {
    if (remainingGuesses > 0) {
      if (word === hiddenWord) {
        alert('Congratulations! You guessed the word!');
        fetchNewWord(); // Start a new round
      } else {
        setRemainingGuesses(remainingGuesses - 1);
        if (remainingGuesses === 1) {
          alert(`Sorry, you're out of guesses.`);
          fetchNewWord(); // Start a new round
        } else {
          alert(`Incorrect! ${remainingGuesses - 1} ${remainingGuesses > 2 ? 'guesses' : 'guess'} remaining.`);
        }
        setGuessedLetters([...guessedLetters, word]);
      }
    }
  };

  const fetchNewWord = () => {
    // Fetch a new random word from the API
    fetch('https://random-word-api.herokuapp.com/word?number=8')
      .then(response => response.json())
      .then(data => {
        const newHiddenWord = data[0].toUpperCase();
        setHiddenWord(newHiddenWord);
        setGuessedLetters([]);
        setRemainingGuesses(5);

        // Randomly shuffle the options
        const shuffledOptions = [...data].sort(() => Math.random() - 0.5);

        // Ensure one of the options is the correct hidden word
        shuffledOptions[Math.floor(Math.random() * shuffledOptions.length)] = newHiddenWord;

        setOptions(shuffledOptions);
      })
      .catch(error => console.error('Error fetching random words:', error));
  };

  const handleResetClick = () => {
    fetchNewWord(); // Start a new game
  };

  // Render the options as clickable buttons
  const optionButtons = options.map((word, index) => (
    <button
      key={index}
      onClick={() => handleLetterClick(word)}
      className={`option ${guessedLetters.includes(word) ? 'guessed' : ''}`}
    >
      {guessedLetters.includes(word) ? word : ''}
    </button>
  ));

  return (
    <div>
      <nav>
        <h1>Welcome to WordMaster Game</h1>
      </nav>
      <div  className='body'>
      <div>
        <h2> Word: {hiddenWord}</h2>
      </div>
      <div className='optionButton'>
        {/* Render the options */}
        {optionButtons}
      </div>
      <div>
        <p>Remaining Guesses: {remainingGuesses}</p>
      </div>
      <div className='reset'>
        <button onClick={handleResetClick}>Reset Game</button>
      </div>
      </div>
      <footer>
    <p>&copy; 2023 WORLDMASTER | All Right Reserved</p>
    <p>Developed & Maintained by Panda</p>
   
    </footer>
    </div>
  );
};

export default App;


