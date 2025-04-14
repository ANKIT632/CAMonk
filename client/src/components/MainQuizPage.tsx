import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import QuetionAndOptions from './QuetionAndOptions';

function MainQuizPage() {
    interface quizDataType {
        questionId: string;
        question: string;
        questionType: string;
        answerType: string;
        options: string[];
        correctAnswer: string[];
    }

    const [quizData, setQuizData] = useState<quizDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionActive, setCurrentQuestionActive] = useState(0);
    
    const [timeLeft, setTimeLeft] = useState(15);

    // Create an answers array to store user answers
   
    const [btnStatusFlag, setBtnStatusFlag] = useState<boolean>(false)

    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean[]>([]);

    const [totalNumOFQuestions, setTotalNumOFQuestions] = useState(0);


    // handle next question

    console.log(isAnswerCorrect);
    const handleNextQuestion = () => {
        if (currentQuestionActive < quizData.length - 1) {
            setCurrentQuestionActive((prevIndex) => prevIndex + 1);
        } else {
          // Handle end of quiz logic here
          console.log('Quiz completed');
        }
      };

      

      useEffect(() => {
          // Initialize the isAnswerCorrect array with false values when quizData is loaded
          if (quizData.length > 0) {
              setIsAnswerCorrect(new Array(quizData.length).fill(false));
          }
      }, [quizData]);
    

    useEffect(() => {
        // Timer logic
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime === 1) {
              // Move to the next question when time is up
              handleNextQuestion();
              return 15; // Reset timer for the next question
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup timer on component unmount
      }, [currentQuestionActive]);


    useEffect(() => {
        // Fetch quiz data from API
        axios
            .get('http://localhost:3000/data')
            .then((response) => {
                setQuizData(response.data.questions as quizDataType[]);

                setTotalNumOFQuestions(response.data.questions.length);

                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch quiz data');
                setLoading(false);
            });
    }, []);


    return (
        <div className=' bg-gray-100 h-screen flex flex-col items-center justify-center'>
            <div className='p-6 relative bg-white w-[80%] rounded-xl shadow-md space-y-6 min-md:space-y-10  h-[75%] max-sm:min-h-[90%] max-sm:min-w-[90%] '>

                <div className='text-sm flex justify-between '>
                    <p>{timeLeft}</p>
                    <button className='p-0.5 px-2.5 rounded border hover:bg-gray-100 active:bg-white cursor-pointer shadow transition-colors duration-300'>Quit</button>
                </div>

                <div className='flex gap-1  justify-center'>
                    {
                        quizData.map((data, index) => (
                            <span key={index} className={`text-center border-b-[2px] w-20 ${currentQuestionActive >= index ? "border-yellow-500" : "border-gray-200"}`}></span>
                        ))

                    }

                </div>

                <p className='text-sm font-semibold text-gray-500 text-center'>Select the missing work in the correct order</p>

                {/* question and option components */}
                <QuetionAndOptions question={quizData[currentQuestionActive]?.question} options={quizData[currentQuestionActive]?.options} 
                 correctAnswer={quizData[currentQuestionActive]?.correctAnswer} 
                 setAnswerCorrect={(isCorrect: boolean) => {
                    setIsAnswerCorrect((prev) => {
                        const updated = [...prev];
                        updated[currentQuestionActive] = isCorrect;
                        return updated;
                    });
                }}
                />




                <button className='p-2 px-2.5 rounded border border-gray-300 hover:bg-gray-100 active:bg-white cursor-pointer  transition-colors duration-300 absolute bottom-4 right-4' disabled={btnStatusFlag} onClick={handleNextQuestion}>
                    <FaArrowRight className='text-gray-400 ' />
                </button>



            </div>
        </div>
    )
}

export default MainQuizPage