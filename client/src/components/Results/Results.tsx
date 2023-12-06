import { FC, useEffect, useState } from "react";
import "../Answers/Answers.css";
import { AnswerData } from "../../pages/Game/Game.types";
import { getResults } from "../../requests/getResults";
import { handleStartQuiz } from "../../requests/startQuiz";

type ResultsProps = {
  scores?: AnswerData[];
};

const Results: FC<ResultsProps> = ({ scores }) => {
  //TODO update type
  const [results, setResults] = useState<any>();

  const hasScore = scores?.length === 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getResults();
        setResults(results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchData();
  }, [hasScore]);

  return (
    <>
      {scores && scores.length >= 10 && (
        <>
          <h2>Game over</h2>
          <h3>Results: </h3>
          <h4>You got {results?.score.correct.score}</h4>

          <ol style={{ display: "flex", flexDirection: "column" }}>
            {scores.map((data: AnswerData, index) => {
              return (
                <li key={`${data.id}=${index}`}>
                  {data.answer} --- {data.isCorrect ? "Correct" : "Incorrect"}
                </li>
              );
            })}
          </ol>
          <button
            className="button restart"
            onClick={() => {
              handleStartQuiz("answer");
            }}
          >
            Start again
          </button>
        </>
      )}
    </>
  );
};

export default Results;
