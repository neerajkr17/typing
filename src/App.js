import React, { useState, useEffect } from 'react';
import './App.css';

const textPassages = [
  "The quick brown fox jumps over the lazy dog.",
  "They can conquer who believe they can.",
  "Friendship is Love without his wings!",
  "React is a JavaScript library for building user interfaces.",
  "Programming is the art of telling a computer what to do.",
  "Practice makes perfect."
];

function App() {
  const [currentText, setCurrentText] = useState('');
  const [randomText, setRandomText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
 

  useEffect(() => {
    generateRandomText();
  }, []);

  useEffect(() => {
    if (isTiming) {
      const intervalId = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTiming]);

  const generateRandomText = () => {
    const randomIndex = Math.floor(Math.random() * textPassages.length);
    setRandomText(textPassages[randomIndex]);
  };

  const handleInputChange = (e) => {
    if (!isTiming) {
      setIsTiming(true);
      setStartTime(new Date().getTime());
    }

    const typedText = e.target.value;
    setCurrentText(typedText);

    if (typedText === randomText) {
      setEndTime(new Date().getTime());
      setIsTiming(false);
      setIsError(false);
    }
  };

  const handleSubmit = () => {
    if (currentText !== randomText) {
      setIsError(true);
    }
  };

  const handleReset = () => {
    setCurrentText('');
    setStartTime(0);
    setEndTime(0);
    setIsTiming(false);
    setIsError(false);
    generateRandomText();
    setCurrentTime(0);
  };

  return (
    <div className="App">
      <div className='box1'>
      <h2 className='heading'>Speed Typing Test</h2>
      <p className='slo'>on your fingers set go  :<span style={{fontSize: 25}}> {currentTime} </span>seconds</p>
      
      </div>
      <div className='box2'>
      <div className="text-passage">{randomText}</div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type here!!"
        value={currentText}
        onChange={handleInputChange}
        disabled={!!endTime}
      ></textarea>
      
  
      {isError && <p className="error">You Type Incorrect Sentence.</p>}
      {endTime > 0 && (
        <div className="results">
          <p>You Type in {(endTime - startTime) / 1000} seconds</p>
          
        </div>
      )}
      </div>
      <div className="buttons">
        <button style={{background: "#d121ba", color: "white", border: "1px solid white"}} onClick={handleSubmit} disabled={!isTiming || !!endTime}>
          Submit
        </button>
        <button style={{border: "2px solid black"}} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
