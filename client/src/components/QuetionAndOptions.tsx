import React,{useState,useEffect} from 'react'

interface QuetionAndOptionsProps {
  question: string;
  options: string[];
  correctAnswer:string[];
  setAnswerCorrect: (isCorrect: boolean) => void; 
}


const QuetionAndOptions: React.FC<QuetionAndOptionsProps> = ({ question, options = [], correctAnswer,setAnswerCorrect }) => {

  const questionArray = question?.split('_____________');

  const [userAnswers, setUserAnswers] = useState<string[]>(Array(4).fill(''));
  let [idxCount, setIdxCount] = useState<number>(0);

  const lenArray = questionArray?.length;

  
  const handleAnswerChange = (value: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[idxCount] = value;
    setUserAnswers(updatedAnswers);
    setIdxCount((prevCount) => prevCount + 1);
  };

  const handleAnswerRemove = (index: number) => {
    const updatedAnswers = [...userAnswers];  
    updatedAnswers[index] = '';
    setUserAnswers(updatedAnswers);
    setIdxCount((prevCount) => prevCount - 1);
  }


    // clear previous states
    useEffect(() => {
      setUserAnswers(Array(4).fill('')); 
      setIdxCount(0); // Reset the index count
    }, [question]); 

    useEffect(() => {
      if (idxCount === 4) {
        console.log(correctAnswer);
        console.log(userAnswers);
    
        const arraysAreEqual =
          correctAnswer.length === userAnswers.length &&
          correctAnswer.every((value, index) => value === userAnswers[index]);
    
        setAnswerCorrect(arraysAreEqual);
      }
    }, [idxCount,userAnswers]);
  

  return (
    <div className='flex flex-col items-center justify-center mt-4 '>
      <div className={`md:w-[80%] flex flex-col items-center justify-center gap-1 }`}>


        <div className='flex flex-wrap gap-1'>
          {questionArray?.map((text, index) => (
            <>
            <div className=' break-words'>{text}</div>
             <div className={` border-b mx-2 min-w-25 ${lenArray-1===index && 'hidden'}`}>{
              userAnswers[index]!=''&&<div className={` 'text-center mb-0.5 rounded-md hover:bg-gray-100 active:bg-gray-50 text-nowrap  text-gray-700 cursor-pointer border border-gray-300 text-sm w-fit px-2 py-0.5'}`} 
              onClick={() => handleAnswerRemove(index)}
               >{ userAnswers[index]}</div>
              }</div>
            </>
          ))}
        </div>


        <div className='flex gap-4 mt-4 text-sm'>
          {options?.map((option: string, idx: number) => (
            <button
              key={idx}
              className={`${
                !userAnswers.includes(option)
                  ? 'rounded-md hover:bg-gray-100 active:bg-gray-50 p-1 text-nowrap cursor-pointer border border-gray-300 text-gray-700'
                  : 'hidden'
              }`}

              onClick={()=> handleAnswerChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default QuetionAndOptions

function setAnswerCorrect(isCorrect: boolean) {
  throw new Error('Function not implemented.');
}
