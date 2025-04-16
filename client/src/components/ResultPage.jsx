import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ResultPage() {
    const { isAnswerCorrect, quizData } = useSelector((state) => state.quiz); // Access Redux state
    const navigate = useNavigate(); // Initialize useNavigate
    const score = isAnswerCorrect.filter((correct) => correct).length;

    return (
        <div className="p-1 bg-gray-50 min-h-screen w-full flex flex-col items-center">
            <div className="flex lg:w-[70%] flex-col items-center justify-center gap-3">
                <div className="text-xl font-semibold">Your Score : {score} out of {10}</div>
                <p className="text-sm text-center">
                    While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness.
                </p>
                <button
                    className="mt-6 mb-4 px-5 py-1 cursor-pointer hover:bg-blue-50 active:bg-white text-[12.5px] text-blue-700 border rounded border-blue-700"
                    onClick={() => navigate('/')} // Navigate to the dashboard
                >
                    Go to Dashboard
                </button>
            </div>

            {/* Iterate through questions and responses */}
            {quizData.map((question, index) => (
                <div
                    key={index}
                    className={`lg:w-[70%] w-full m-3 max-sm:m-1 rounded-md shadow ${isAnswerCorrect[index] ? 'shadow-green-500' : 'shadow-red-500'
                        }`}
                >
                    <div className="bg-white p-2 rounded-t-md">
                        <div className="flex flex-row justify-between">
                            <p className="px-0.5 text-gray-700 rounded-sm bg-gray-200 text-xs">Prompt</p>
                            <div className="flex text-xs">
                                {index + 1}
                                <p className="text-gray-300">/{quizData.length}</p>
                            </div>
                        </div>
                        <p className="text-sm p-2">{question.question}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-b-md">
                        <div className="text-xs flex gap-1">
                            <p>Your response is</p>
                            <p
                                className={`rounded px-0.5 ${isAnswerCorrect[index]
                                    ? 'text-green-800 bg-green-50'
                                    : 'text-red-800 bg-red-50'
                                    }`}
                            >
                                {isAnswerCorrect[index] ? 'Correct' : 'Incorrect'}
                            </p>
                            {!isAnswerCorrect[index]&&<p>, here correct sequence is</p>}
                        </div>
                        <p className="text-sm p-2">{question.correctAnswer.join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultPage;