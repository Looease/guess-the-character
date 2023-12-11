import {useState, useEffect} from 'react'
import { handleStartQuiz } from "../../requests/startQuiz";
import "./Welcome.css";

const Welcome = () => {
  const [environment, setEnvironment] = useState('')
 
  useEffect(() => {
    if(process.env.NODE_ENV){
      setEnvironment(process.env.NODE_ENV)
    }

  },[process.env.NODE_ENV])

  return (
    <main className="main">
      <h1>Guess the character</h1>
      <p>
        In this quiz, you have to guess which film or tv show the image of the
        character is from.
      </p>

      <p>There are 10 rounds to get through.</p>
      <button
        className="button-welcome"
        onClick={() => handleStartQuiz("home", environment)}
      >
        Start quizzing
      </button>
    </main>
  );
};

export default Welcome;
