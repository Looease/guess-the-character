import { useEffect, useState } from "react";
import { Answers } from "../../components/Answers";
import { AnswerData } from "./Game.types";

import "./Game.css";
import { useGetCharacters } from "../../hooks/useGetCharacters";
import { handleCheckAnswers } from "../../requests/handleCheckAnswers";

const Game = () => {
  const { data } = useGetCharacters();

  const [sessionData, setSessionData] = useState<AnswerData[]>([]);

  useEffect(() => {
    handleCheckAnswers(data, setSessionData);
  }, [data]);

  return (
    <>
      <main className="main">
        <h1>Guess the Character</h1>
        {data && (
          <div className="container">
            {sessionData && sessionData.length <= 9 && (
              <>
                <h2 className="question">
                  What movie or TV show is this character from?
                </h2>
                <div className="container">
                  <img
                    src={data.options.image.image}
                    alt="todo-add-meaningful-alt"
                    className="image"
                  />
                </div>
              </>
            )}

            <Answers answers={data.options.answers} scores={sessionData} />
          </div>
        )}
      </main>
    </>
  );
};

export default Game;
