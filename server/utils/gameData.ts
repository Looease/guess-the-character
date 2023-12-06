type AnswerData = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

// Fisher-Yates shuffle algorithm
//TODO implement API type
export const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//TODO implement API type
const getResponse = (answer: any, isCorrect: boolean) => {
  const baseObject = {
    id: answer._id ? answer._id : 0,
    answer: answer.tvShows[0],
    isCorrect: isCorrect,
  };

  const isFilm = answer.films.length;

  const isTvShow = answer.tvShows.length && !answer.films.length;

  const isShortFilm =
    !answer.films.length && !answer.tvShows.length && answer.shortFilms.length;

  const hasNoMediaName =
    !answer.films.length && !answer.tvShows.length && !answer.shortFilms.length;

  if (isTvShow) {
    return baseObject;
  } else if (isFilm) {
    return { ...baseObject, answer: answer.films[0] };
  } else if (isShortFilm) {
    return { ...baseObject, answer: answer.shortFilms[0] };
  } else if (hasNoMediaName) {
    //TODO implement more elegant handling of dirty data
    return { ...baseObject, answer: "Error getting answer" };
  } else {
    return {
      ...baseObject,
      id: Math.random(),
      answer: "Error getting answer",
      isCorrect: false,
    };
  }
};

//TODO implement API type
export const getRandomAnswers = (round: any) => {
  const firstAnswer = round.shift();

  const firstAnswerImage = {
    id: firstAnswer._id,
    image: firstAnswer.imageUrl,
  };

  const allWrongAnswers: AnswerData[] = [];

  round.map((answer: AnswerData) => {
    return allWrongAnswers.push(getResponse(answer, false));
  });

  const correctAnswer = () => {
    return getResponse(firstAnswer, true);
  };

  const wrongAnswers = shuffleArray(allWrongAnswers).splice(0, 3);

  const answer = {
    image: firstAnswerImage,
    answers: [correctAnswer(), ...wrongAnswers],
  };

  return answer;
};
