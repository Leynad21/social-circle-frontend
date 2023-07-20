import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getQuizzes, reset, deleteQuiz, createQuiz } from '../../features/quiz/quizSlice'
import { getProfile } from '../../features/profiles/profileSlice'
import slugify from 'slugify'


const MyQuizzesPage = () => {

    const [myQuizzes, setMyQuizzes] = useState([])
    const [quizName, setQuizName] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { profile } = useSelector((state) => state.profile)

    const { quiz, quizzes, isLoading, isError, isSuccess, message } = useSelector((state) => state.quiz)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getQuizzes())
        dispatch(getProfile())
        setMyQuizzes(quizzes.filter((quiz => quiz.author === profile.id)))

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }

    }, [isSuccess, setMyQuizzes, dispatch, message])


    const handleDelete = (quiz) => {
        dispatch(deleteQuiz(quiz))
        setMyQuizzes(myQuizzes.filter((q) => q.id !== quiz.id))
    }

    const handleCreateQuiz = () => {

        const quizData = {
            "title": quizName
        }

        dispatch(createQuiz(quizData))
        setQuizName("")
        setMyQuizzes([...myQuizzes, quizData])

        navigate(`/quiz/create/${slugify(quizName, { lower: true })}`)
    }


    return (
        <>
            <div className=' m-8'>
                <div className='flex justify-between'>
                    <h1 className=' text-3xl mt-8'>{profile.first_name}'s Quizzes</h1>
                    <button className="btn btn-accent btn-lg" onClick={() => window.my_modal_2.showModal()}>Create New Quiz</button>
                    <dialog id="my_modal_2" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg mb-8">Create New Quiz</h3>
                            <input type="text" placeholder="Quiz Name" value={quizName} onChange={(e) => setQuizName(e.target.value)} className="input input-bordered input-secondary w-4/6 max-w-xs" />
                            <button onClick={handleCreateQuiz} className="btn btn-primary ml-8">Start</button>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="flex justify-center items-center">
                    <div className='mt-20 grid lg:grid-cols-2 gap-28 lg:gap-48 '>
                        {myQuizzes.map((quiz) => (
                            <div key={quiz.id} className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{quiz.title}</h2>
                                    <div className="card-actions justify-end mt-8">
                                        {/* <button className="btn btn-primary">Edit</button> */}
                                        <button onClick={() => handleDelete(quiz)} className="btn btn-error">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyQuizzesPage