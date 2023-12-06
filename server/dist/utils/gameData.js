"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomAnswers = exports.shuffleArray = void 0;
// Fisher-Yates shuffle algorithm
//TODO implement API type
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
exports.shuffleArray = shuffleArray;
//TODO implement API type
const getResponse = (answer, isCorrect) => {
    const baseObject = {
        id: answer._id ? answer._id : 0,
        answer: answer.tvShows[0],
        isCorrect: isCorrect,
    };
    const isFilm = answer.films.length;
    const isTvShow = answer.tvShows.length && !answer.films.length;
    const isShortFilm = !answer.films.length && !answer.tvShows.length && answer.shortFilms.length;
    const hasNoMediaName = !answer.films.length && !answer.tvShows.length && !answer.shortFilms.length;
    if (isTvShow) {
        return baseObject;
    }
    else if (isFilm) {
        return Object.assign(Object.assign({}, baseObject), { answer: answer.films[0] });
    }
    else if (isShortFilm) {
        return Object.assign(Object.assign({}, baseObject), { answer: answer.shortFilms[0] });
    }
    else if (hasNoMediaName) {
        //TODO implement more elegant handling of dirty data
        return Object.assign(Object.assign({}, baseObject), { answer: "Error getting answer" });
    }
    else {
        return Object.assign(Object.assign({}, baseObject), { id: Math.random(), answer: "Error getting answer", isCorrect: false });
    }
};
//TODO implement API type
const getRandomAnswers = (round) => {
    const firstAnswer = round.shift();
    const firstAnswerImage = {
        id: firstAnswer._id,
        image: firstAnswer.imageUrl,
    };
    const allWrongAnswers = [];
    round.map((answer) => {
        return allWrongAnswers.push(getResponse(answer, false));
    });
    const correctAnswer = () => {
        return getResponse(firstAnswer, true);
    };
    const wrongAnswers = (0, exports.shuffleArray)(allWrongAnswers).splice(0, 3);
    const answer = {
        image: firstAnswerImage,
        answers: [correctAnswer(), ...wrongAnswers],
    };
    return answer;
};
exports.getRandomAnswers = getRandomAnswers;
//# sourceMappingURL=gameData.js.map