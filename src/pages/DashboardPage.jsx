import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Spinner from '../components/utils/Spinner'
import { getProfile, reset } from '../features/profiles/profileSlice'
import cardsAgainstHumanityImg from '../assets/img/cardsAgainstHumanity.jpg'
import quizImg from '../assets/img/quizImage.jpg'

const DashboardPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { profile, isLoading, isError, isSuccess, message } = useSelector((state) => state.profile)

    useEffect(() => {

        dispatch(getProfile())

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }

    }, [isSuccess, dispatch])


    return (
        <>
            <div className='m-8'>
                <h1 className='text-3xl mt-8'>Welcome, {profile.first_name}</h1>
                <div className="flex justify-center items-center">
                    <div className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-48 sm:grid-cols-2 md:grid-cols-2'>
                        <div className="card w-full lg:w-96 h-[450px] bg-base-100 shadow-xl duration-300 hover:scale-105">
                            <figure><img src={cardsAgainstHumanityImg} alt="cards-against-humanity" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Cards Againsts Humanity</h2>
                                <p>In development...</p>
                                <div className="card-actions justify-end">
                                    <Link to="/cards-against-humanity" className="btn btn-primary">Play Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card w-full lg:w-96 h-[450px] bg-base-100 shadow-xl duration-300 hover:scale-105">
                            <figure><img src={quizImg} alt="quiz" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Quiz</h2>
                                <div className="card-actions justify-end">
                                    <Link to="/quiz" className="btn btn-primary">Play Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage