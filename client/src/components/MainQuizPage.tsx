/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import QuetionAndOptions from './QuetionAndOptions';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalQuestions, setQuizData, setAnswerCorrect } from '../stateManagement/quizSlice';
import { RootState } from '../stateManagement/store';
import { useNavigate } from 'react-router-dom';
import quizDataJson from '../assets/db.json';

function MainQuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalQuestions, quizData } = useSelector(
    (state: RootState) => state.quiz
  );

  const [currentQuestionActive, setCurrentQuestionActive] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [btnStatusFlag, setBtnStatusFlag] = React.useState<boolean>(true);

  // Fetch quiz data and initialize Redux state
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/data') 
  //     .then((response) => {
  //       const questions = response.data.questions;
  //       dispatch(setQuizData(questions)); // Dispatch quiz data to Redux
  //       dispatch(setTotalQuestions(questions.length)); // Dispatch total questions to Redux
  //       setTimeLeft(30); // Initialize timer
  //       setCurrentQuestionActive(0); // Reset current question
  //     })
  //     .catch((err) => {
  //       console.error('Failed to fetch quiz data', err);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    const questions = quizDataJson.data.questions; // Access questions from the JSON file
    dispatch(setQuizData(questions)); // Dispatch quiz data to Redux
    dispatch(setTotalQuestions(questions.length || 10)); // Dispatch total questions to Redux
    setTimeLeft(30); // Initialize timer
    setCurrentQuestionActive(0); // Reset current question
  }, [dispatch]);


  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          handleNextQuestion(); // Move to the next question when time is up
          return 30; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [currentQuestionActive]);

  const handleNextQuestion = () => {
    if (currentQuestionActive < totalQuestions-1 ) {
      setCurrentQuestionActive((prevIndex) => prevIndex + 1);
      setBtnStatusFlag(true);
      setTimeLeft(30); // Reset timer for the next question
    } else if(currentQuestionActive===totalQuestions-1 ) {
      navigate('/result');
    }
  };



  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="p-6 relative bg-white w-[80%] rounded-xl shadow-md space-y-6 min-md:space-y-10 h-[75%] max-sm:min-h-[95%] max-sm:min-w-[97%]">
        <div className="text-sm flex justify-between">
          <p>{currentQuestionActive === totalQuestions ? 'Time up' : timeLeft}</p>
          <button className="p-0.5 px-2.5 rounded border hover:bg-gray-100 active:bg-white cursor-pointer shadow transition-colors duration-300">
            Quit
          </button>
        </div>

        <div className="flex gap-1 justify-center">
          {quizData.map((_data, index) => (
            <span
              key={index}
              className={`text-center border-b-[2px] w-20 ${currentQuestionActive >= index ? 'border-yellow-500' : 'border-gray-200'
                }`}
            ></span>
          ))}
        </div>

        <p className="text-sm font-semibold text-gray-500 text-center">
          {currentQuestionActive !== totalQuestions
            ? 'Select the missing word in the correct order'
            : 'Time is up now, show results and response'}
        </p>

        {/* Question and Options Component */}
        {currentQuestionActive < totalQuestions && (
          <QuetionAndOptions
            question={quizData[currentQuestionActive]?.question}
            options={quizData[currentQuestionActive]?.options}
            correctAnswer={quizData[currentQuestionActive]?.correctAnswer}
            setBtnStatusFlag={setBtnStatusFlag}
            setAnswerCorrect={(isCorrect: boolean) => {
              dispatch(
                setAnswerCorrect({
                  questionIndex: currentQuestionActive,
                  isCorrect,
                })
              );
            }}
          />
        )}


        <button
          className={`p-2 px-2.5 rounded border border-gray-300 ${currentQuestionActive >= totalQuestions - 1
            ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-600'
            : 'hover:bg-gray-100 active:bg-white'
            } ${btnStatusFlag && currentQuestionActive!==totalQuestions ? ' cursor-not-allowed' : ' cursor-pointer'} transition-colors duration-300 absolute bottom-4 right-4`}
          disabled={btnStatusFlag}
          onClick={handleNextQuestion}
        >
          <FaArrowRight className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default MainQuizPage;