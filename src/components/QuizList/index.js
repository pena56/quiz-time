import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import './style.css';
import ProgressBar from '../ProgressBar';
import Quiz from '../Quiz';
import Result from '../Result';
import { fetchQuizQuestions } from '../../API';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';

function Index() {
  const { category, id } = useParams();
  const [{ user, totalScore }, dispatch] = useStateValue();

  const TOTAL_QUESTION_NUMBER = 10;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const checkAns = (e) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 20);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTION_NUMBER) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(id);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const seeResult = () => {
    setGameOver(true);
    if (user.id) {
      db.collection('scores')
        .where('user_id', '==', user.id)
        .limit(1)
        .get()
        .then((snapshot) => {
          snapshot.docs[0].ref.update({
            score: totalScore + score,
          });
        });
    }
    dispatch({
      type: 'ADD_SCORE',
      gameScore: score,
    });
  };

  return (
    <div className="quizList">
      {gameOver && number !== TOTAL_QUESTION_NUMBER - 1 ? (
        <button
          style={{ marginTop: '60%', width: '80%' }}
          onClick={startGame}
          className="quizList__button"
        >
          Start Game
        </button>
      ) : null}
      {loading ? (
        <Loader
          style={{ marginTop: '80%' }}
          type="Bars"
          color="#4558d3"
          height={100}
          width={100}
        />
      ) : null}
      {!loading && !gameOver && (
        <>
          <p className="quizList__category">{category}</p>
          <ProgressBar
            completed={((number + 1) / TOTAL_QUESTION_NUMBER) * 100}
          />
          <p className="quizList_question-number">
            {number + 1}/{TOTAL_QUESTION_NUMBER}
          </p>
          <Quiz
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAns}
          />
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTION_NUMBER - 1 ? (
            <button
              style={{ marginLeft: 'auto' }}
              onClick={nextQuestion}
              className="quizList__button"
            >
              Next
            </button>
          ) : null}
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number === TOTAL_QUESTION_NUMBER - 1 ? (
            <button onClick={seeResult} className="quizList__button">
              See Result
            </button>
          ) : null}
        </>
      )}
      {gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number === TOTAL_QUESTION_NUMBER - 1 ? (
        <>
          <Result correctAnswers={score / 20} score={score} />
          <button
            style={{ width: '80%' }}
            onClick={startGame}
            className="quizList__button"
          >
            Play Again
          </button>
          <Link to="/">
            <p className="go__back">Go Back to Home</p>
          </Link>
        </>
      ) : null}
    </div>
  );
}
export default Index;
