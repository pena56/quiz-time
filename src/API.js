const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const fetchQuizQuestions = async (id) => {
  const endpoint = `https://opentdb.com/api.php?amount=10&category=${id}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
