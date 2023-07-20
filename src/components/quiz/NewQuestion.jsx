import React from 'react'

const NewQuestion = () => {
    return (

        <div className=" bg-white w-5/6 max-w-[800px] min-h-[450px] rounded-lg shadow-sm">
            <div className='text-right bg-blue-400 pt-4 pb-4 pr-4 flex justify-end items-center rounded-lg'>
                <p>Single answer</p>
                <h1 className="text-4xl text-right ml-4">3/8</h1>
            </div>
            <div className='p-4'>
                <h1 className="text-2xl ">
                    <span>1: </span>
                    Question ivfmfvmvi fvfd vfdmovfdm ivfdopv mdfmovfdmi ovfdvfdmovfdop
                </h1>
                <h2 className="text-xl mt-12 mb-4" >Answers:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mb-8">
                    <input className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</input>
                    <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
                    <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
                    <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
                </div>
            </div>
        </div>
    )

    // return (

    //     <div className=" bg-white w-5/6 max-w-[800px] min-h-[450px] rounded-lg shadow-sm">
    //         <div className='text-right bg-blue-400 pt-4 pb-4 pr-4 flex justify-end items-center rounded-lg'>
    //             <p>Single answer</p>
    //             <h1 className="text-4xl text-right ml-4">3/8</h1>
    //         </div>
    //         <div className='p-4'>
    //             <h1 className="text-2xl ">
    //                 <span>1: </span>
    //                 Question ivfmfvmvi fvfd vfdmovfdm ivfdopv mdfmovfdmi ovfdvfdmovfdop
    //             </h1>
    //             <h2 className="text-xl mt-12 mb-4" >Answers:</h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mb-8">
    //                 <input className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</input>
    //                 <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
    //                 <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
    //                 <li className=' list-none border-2 rounded-full p-2 hover:bg-blue-200 transition'>Some</li>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default NewQuestion