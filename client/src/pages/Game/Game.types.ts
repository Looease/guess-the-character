export type AnswerData = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

export type AnswersData = {
  answers: AnswerData[];
};

export type QuizData = {
  options: {
    image: {
      image: string;
      id: any;
    };
    answers: AnswerData[];
  };
};
