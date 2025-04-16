import React, { useState, useEffect } from 'react'

interface QuetionAndOptionsProps {
  question: string;
  options: string[];
  correctAnswer: string[];
  setAnswerCorrect: (isCorrect: boolean) => void;
  setBtnStatusFlag: (isCorrect: boolean) => void;
}


const QuetionAndOptions: React.FC<QuetionAndOptionsProps> = ({ question, options = [], correctAnswer, setAnswerCorrect, setBtnStatusFlag }) => {

  const questionArray = question?.split('_____________');

  const [userAnswers, setUserAnswers] = useState<string[]>(Array(4).fill(''));
  const [idxCount, setIdxCount] = useState<number[]>([0, 1, 2, 3]);
  const lenArray = questionArray?.length;


  const handleAnswerChange = (value: string) => {
    const updatedAnswers = [...userAnswers];
    console.log(idxCount);
    updatedAnswers[idxCount[0] || 0] = value; // Use the first element of the stack
    setUserAnswers(updatedAnswers);
  
    setIdxCount((prevCount) => {
      const newStack = Array.isArray(prevCount) ? [...prevCount] : [0, 1, 2, 3]; 
      newStack.shift();
      return newStack;
    });
  };
  
  const handleAnswerRemove = (idx:number) => {
    const updatedAnswers = [...userAnswers];

    updatedAnswers[idx] = ''; // Clear the answer at the index
    setUserAnswers(updatedAnswers);

    setIdxCount((prevCount) => {
      if (!Array.isArray(prevCount)) {
        throw new Error("prevCount is not an array"); // Debugging safeguard
      }
      const newStack = [...prevCount];
      newStack.unshift(idx); 

      newStack.sort();
      return newStack;
    });
};

  // clear previous states
  useEffect(() => {
    setUserAnswers(Array(4).fill(''));
    setIdxCount([0, 1, 2, 3]);
  }, [question]);

  useEffect(() => {
    if (idxCount.length===0) {

      setBtnStatusFlag(false);
      const arraysAreEqual =
        correctAnswer.length === userAnswers.length &&
        correctAnswer.every((value, index) => value === userAnswers[index]);

      setAnswerCorrect(arraysAreEqual);
    }
    else {
      setBtnStatusFlag(true); // Enable the button if not all answers are filled
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idxCount, userAnswers]);




  return (
    <div className='flex flex-col items-center justify-center mt-4 '>
      <div className={`md:w-[80%] w-full flex flex-col items-center justify-center gap-1 }`}>


        <div className='flex flex-wrap gap-1'>
          {questionArray?.map((text, index) => (
            <>
              <div className=' break-words'>{text}</div>
              <div className={` border-b mx-2 min-w-25 flex items-center justify-center ${lenArray - 1 === index && 'hidden'}`}>{
                userAnswers[index] != '' && <div className={` 'text-center mb-0.5 rounded-md hover:bg-gray-100 active:bg-gray-50  w-fit text-nowrap  text-gray-700 cursor-pointer border border-gray-300 text-sm max-sm:text-xs px-2 py-0.5'}`}
                  onClick={() => handleAnswerRemove(index)}
                >{userAnswers[index]}</div>
              }</div>
            </>
          ))}
        </div>


        <div className='flex gap-4 mt-4 text-sm flex-wap'>
          {options?.map((option: string, idx: number) => (
            <button
              key={idx}
              className={`${!userAnswers.includes(option)
                  ? 'rounded-md hover:bg-gray-100 active:bg-gray-50 p-1 text-nowrap cursor-pointer border border-gray-300 text-gray-700'
                  : 'hidden'
                }`}

              onClick={() => handleAnswerChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default QuetionAndOptions;

