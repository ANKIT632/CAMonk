import React,{useState,useEffect} from 'react'

interface QuetionAndOptionsProps {
  question: string;
  options: string[];
  correctAnswer:string[];
  setAnswerCorrect: (isCorrect: boolean) => void; 
}


const QuetionAndOptions: React.FC<QuetionAndOptionsProps> = ({ question, options = [], correctAnswer,setAnswerCorrect }) => {

  const questionArray = question?.split('_____________');

  const lenArray = questionArray?.length;
   
  const [answers, setAnswers] = useState<Map<number, string>>(
    new Map(Array.from({ length: lenArray - 1 }, (_, index) => [index, '']))
  );

  const [answerMapArray, setAnswerMapArray] = useState<string[]>([]);

 
  
    // Function to check if the current answers are correct
    const checkAnswersHandler = () => {
      const userAnswers = Array.from(answers.values());
      const isCorrect =
        userAnswers?.length === correctAnswer?.length &&
        userAnswers.every((answer, index) => answer === correctAnswer[index]);
      setAnswerCorrect(isCorrect);
    };

  // Function to handle answer selection
  const handleAnswerSelect = (index: number, option: string) => {
    const updatedAnswers = new Map(answers);
    updatedAnswers.set(index, option);
  setAnswerMapArray((arr) => arr.concat(option));
    setAnswers(updatedAnswers);
  };

  //handler to remove the answer
  const handleAnswerRemove = (option: string) => {
    const updatedAnswers = new Map(answers);
    const index = answerMapArray.indexOf(option);
  
    if (index !== -1) {
      updatedAnswers.set(index, '');
      setAnswers(updatedAnswers);
  
      // Remove the option from answerMapArray
      setAnswerMapArray((arr) => arr.filter((item) => item !== option));
    }
  };
  useEffect(()=>{
  setAnswers(new Map(Array.from({ length: lenArray - 1 }, (_, index) => [index, ''])))
  },[question])

  useEffect(() => {
    checkAnswersHandler();
  }, [answerMapArray]);

  

  return (
    <div className='flex flex-col items-center justify-center mt-4 '>
      <div className={`md:w-[80%] flex flex-col items-center justify-center gap-1 }`}>


        <div className='flex flex-wrap gap-1'>
          {questionArray?.map((text, index) => (
            <>
            <div className=' break-words'>{text}</div>
             <div className={`border-b mx-2 min-w-25 ${lenArray-1===index && 'hidden'}`}>{
               <div className={` ${answerMapArray[index] && 'text-center mb-0.5 rounded-md hover:bg-gray-100 active:bg-gray-50 text-nowrap  text-gray-700 cursor-pointer border border-gray-300 text-sm w-fit px-2 py-0.5'}`} 
                onClick={()=>handleAnswerRemove(answerMapArray[index])}
               >{ answerMapArray[index]}</div>
              }</div>
            </>
          ))}
        </div>


        <div className='flex gap-4 mt-4 text-sm'>
          {options?.map((option: string, idx: number) => (
            <button
              key={idx}
              className={`${
                answers.get(idx) === ''
                  ? 'rounded-md hover:bg-gray-100 active:bg-gray-50 p-1 text-nowrap cursor-pointer border border-gray-300 text-gray-700'
                  : 'hidden'
              }`}
            onClick={()=>handleAnswerSelect(idx,option)} >
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
