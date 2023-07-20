import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getPlayQuiz } from '../../features/quiz/quizSlice'

const ScorePage = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { quiz, quizScore, message, isError, isLoading } = useSelector((state) => state.quiz)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getPlayQuiz({
            slug: params.slug
        }))

    }, [dispatch, message])


    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className="text-4xl font-semibold mb-8">Score:</h1>

            <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
                    <p className="text-lg">Total Answers: {quizScore.totalAnswers}</p>
                    <p className="text-lg">Correct Answers: {quizScore.correctAnswers}</p>
                    <p className="text-lg">Correct Answers: {Math.round((quizScore.correctAnswers / quizScore.totalAnswers) * 100)}%</p>
                </div>
                <div className="p-4 bg-gray-100">
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Close
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ScorePage