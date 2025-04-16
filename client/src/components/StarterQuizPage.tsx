import { useNavigate } from 'react-router-dom';


function StarterQuizPage() {

    const navigate = useNavigate();

    return (
        <div className='bg-gray-100 h-screen flex flex-col items-center justify-center gap-4 p-4'>

            <div className='flex flex-col items-center justify-center bg-white shadow-inner rounded-lg p-6 w-full max-w-xl gap-1'>

                <h1 className='text-2xl font-semibold'>Sentence Construction</h1>
                <p className='text-sm text-gray-500 text-center'>Select the correct words to complete the sentence by arranging the provided options in the right order.</p>

                <div className='text-sm fort-semibold flex  mt-8 gap-7 '>
                    <span className='border-r  border-gray-200 pr-4'>
                        <h2 >Time Per Question</h2>
                        <p className='text-gray-500 text-center'>30 sec</p>
                    </span>
                    <span className='border-r border-gray-200 pr-6 '>
                        <h2 >total Question</h2>
                        <p className='text-gray-500 text-center'>10</p>
                    </span>
                    <span className='pr-4 '>
                        <h2 >coins</h2>
                        <p className='text-gray-500 text-center '>0</p>
                    </span>
                </div>

                <div className='space-x-2 mt-4'>
                    <button className='shadow px-4 py-1.5 text-blue-700 text-xs min-lg:text:sm rounded-md border bg-gray-50 hover:bg-gray-100 cursor-pointer active:bg-gray-50  w-22 transition-colors duration-300'>Back</button>
                    <button
                        className='shadow px-4 py-1.5 text-white text-xs min-lg:text:sm rounded-md bg-blue-700 hover:bg-blue-600 cursor-pointer active:bg-blue-700 w-22 transition-colors duration-300'
                        onClick={() => navigate('/quiz')} // Navigate to the quiz page
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StarterQuizPage;