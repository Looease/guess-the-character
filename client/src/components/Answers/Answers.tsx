import { FC } from "react";
import "./Answers.css";
import { AnswerData } from "../../pages/Game/Game.types";
import Results from "../Results/Results";
import { updateAnswer } from "../../requests/updateAnswer";

type AnswersProps = {
  answers: AnswerData[];
  scores?: AnswerData[];
};

const Answers: FC<AnswersProps> = ({ answers, scores }) => {
  console.log(scores);
  return (
    <div>
      {scores && scores.length <= 9 && (
        <div className="button-container">
          {answers.map((answer, index) => {
            return (
              <button
                className="button"
                key={`${answer.id}=${index}`}
                onClick={() => updateAnswer(answer)}
              >
                {answer.answer}
              </button>
            );
          })}
        </div>
      )}
      <div>{scores && scores.length >= 10 && <Results scores={scores} />}</div>
    </div>
  );
};

export default Answers;
