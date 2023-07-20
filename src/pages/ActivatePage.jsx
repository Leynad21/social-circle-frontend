import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { FaCheckCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { activate, reset } from '../features/auth/authSlice'
import Spinner from '../components/utils/Spinner'

const ActivatePage = () => {

    const { uid, token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/")
            toast.success(`An activation email has been sent to your email. 
            Please check your email`)
            // window.location.reload()
        }

        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }

        dispatch(activate(userData))
        toast.success("Your account has been activated! You can login now")
    }


    return (
        <div className='flex flex-col items-center '>
            <h1 className='text-4xl font-semibold mt-12'><FaCheckCircle className='inline-block' /> Activate your account </h1>
            <p className='text-xl font-semibold text-gray-600 m-4'>Click in the button below</p>

            {isLoading && <Spinner />}
            <div>
                <button className="btn btn-primary btn-lg w-28 lg:w-48" onClick={handleSubmit}>Activate</button>
            </div>
        </div>
    )
}

export default ActivatePage