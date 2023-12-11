import { FC, useEffect, useState } from "react";
import "./Answers.css";
import { AnswerData } from "../../pages/Game/Game.types";
import Results from "../Results/Results";
import { updateAnswer } from "../../requests/updateAnswer";
import {useLocalStorageState} from "../../hooks/useLocalStorage"

type AnswersProps = {
  answers: AnswerData[];
  scores?: AnswerData[];
};


const Answers: FC<AnswersProps> = ({ answers, scores }) => {

  const [submittedAnswers, setSubmittedAnswers] = useState(() => {
    const answersArray = localStorage.getItem("answerArray");
    if(answersArray){
      return JSON.parse(answersArray)
    }
  })
    
  const handleSetAnswer = (answer: AnswerData) => {
    const updatedAnswers = [answer, ...submittedAnswers];
    localStorage.setItem("answerArray", JSON.stringify(updatedAnswers));
    setSubmittedAnswers(updatedAnswers);
  };

    return (
    <div>
      {submittedAnswers.length <= 9 && (
        <div className="button-container">
          {answers.map((answer, index) => {
            return (
              <button
                className="button"
                key={`${answer.id}=${index}`}
                onClick={() => {updateAnswer(answer)
                  handleSetAnswer(answer)
                }}>
                {answer.answer}
              </button>
            );
          })}
        </div>
      )}
      <div>{submittedAnswers && submittedAnswers.length >= 10 && <Results scores={scores && scores.length ? scores : submittedAnswers} />}</div>
    </div>
  );
};

export default Answers;
