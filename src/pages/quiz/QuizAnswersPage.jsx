import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { getPlayQuiz, reset, updateCorrectAnswers, updateTotalAnswers } from '../../features/quiz/quizSlice'
import Spinner from '../../components/utils/Spinner'

const QuizAnswersPage = () => {

    const [questionsArray, setQuestionsArray] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const params = useParams()
    const dispatch = useDispatch()

    const { quiz, message, isError, isLoading } = useSelector((state) => state.quiz)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getPlayQuiz({
            slug: params.slug
        }))

    }, [dispatch, message])

    useEffect(() => {
        if (quiz && quiz.questions) {
            setQuestionsArray(quiz.questions)
        }
    }, [quiz])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <div className="flex flex-col items-center ">
                <h1 className="text-4xl font-semibold mt-4">Quiz Answers</h1>
                <div className='flex justify-between lg:w-[800px]'>
                    <p className="text-xl font-semibold text-gray-600 m-4 mb-4">
                        <h1>{quiz.title}</h1>
                    </p>
                    <p className="text-xl font-semibold text-gray-600 m-4 mb-8">
                        <h2>Created by:&nbsp;{quiz.author_username}</h2>
                    </p>
                </div>

                {/* QUESTIONS */}
                {questionsArray.length > 0 && (
                    <div className=" bg-white w-5/6 max-w-[800px] min-h-[450px] rounded-lg shadow-sm mb-8">
                        <div className="text-right bg-blue-400 pt-4 pb-4 pr-4 flex justify-end items-center rounded-lg">
                            <p>Single answer</p>
                            <h1 className="text-4xl text-right ml-4">
                                {currentQuestion + 1}/{questionsArray.length}
                            </h1>
                        </div>
                        <div className="p-4">
                            <h1 className="text-2xl flex">
                                <span>{currentQuestion + 1}: &nbsp; </span>
                                <span>{questionsArray[currentQuestion].title}</span>
                            </h1>
                            <h2 className="text-xl mt-12 mb-4">Options:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mb-8">
                                {questionsArray[currentQuestion].answers.map((answer, index) => (
                                    <li
                                        key={answer.id}
                                        className={`list-none border-2 rounded-full p-2  transition duration-300
                                            ${answer.is_right ? ' bg-green-400 border-black' : ''}`}
                                    >
                                        {answer.answer_text}
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* END OF QUESTIONS */}
                <div className="join">
                    <button
                        className="join-item btn btn-outline w-24"
                        onClick={() => setCurrentQuestion((prevQuestion) => prevQuestion - 1)}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </button>
                    {[...Array(questionsArray.length)].map((_, index) => {
                        if (index === 0 || index === questionsArray.length - 1 || Math.abs(index - currentQuestion) <= 1) {
                            return (
                                <input
                                    key={index}
                                    className="join-item btn btn-square border-black hidden sm:flex "
                                    type="radio"
                                    name="options"
                                    aria-label={index + 1}
                                    checked={index === currentQuestion}
                                    onChange={() => setCurrentQuestion(index)}
                                />
                            );
                        } else if (index === 1 && currentQuestion > 3) {
                            return <button key={index} className="join-item btn btn-disabled">...</button>
                        } else if (index === questionsArray.length - 2 && currentQuestion < questionsArray.length - 4) {
                            return <button key={index} className="join-item btn btn-disabled">...</button>
                        }
                        return null;
                    })}
                    <button
                        className="join-item btn btn-outline w-24"
                        onClick={() => setCurrentQuestion((prevQuestion) => prevQuestion + 1)}
                        disabled={currentQuestion === questionsArray.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuizAnswersPage