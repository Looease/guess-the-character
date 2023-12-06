import { handleStartQuiz } from "../../requests/startQuiz";
import "./Welcome.css";

const Welcome = () => {
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
        onClick={() => handleStartQuiz("home")}
      >
        Start quizzing
      </button>
    </main>
  );
};

export default Welcome;
