
function ResultPage() {
    return (
        <div className="p-1  bg-gray-50 min-h-screen w-full flex flex-col items-center">

            <div className="flex  lg:w-[70%] flex-col items-center justify-center gap-3">
                <div>score</div>
                <p className="text-sm text-center">While you correctly formed serveral sentence, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness.</p>
                <button className="mt-6 px-5 py-1 cursor-pointer hover:bg-blue-50 active:bg-white text-[12.5px] text-blue-700 border rounded border-blue-700">Go to Dashboard</button>
            </div>

            <div className="lg:w-[70%] w-full m-3 max-sm:m-1 rounded-md shadow">
                <div className="bg-white p-2 rounded-t-md">
                    <div className="flex flex-row justify-between">
                        <p className="px-0.5 text-gray-700 rounded-sm bg-gray-200 text-xs">Prompt</p>
                        <div className=" flex text-xs">{1}<p className="text-gray-300">/{10}</p></div>
                    </div>
                    <p className="text-sm p-2">Question</p>

                </div>
                <div className="p-2 bg-blue-50 rounded-b-md ">
                    <div className="text-xs flex gap-1 "><p className="">Your response</p><p className="rounded px-0.5 text-green-800  bg-green-50 ">Correct</p></div>
                    <p className="text-sm p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, cumque.</p>
                </div>

            </div>

        </div>
    );
}

export default ResultPage;