import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { FaQuestionCircle } from 'react-icons/fa'
import Spinner from '../components/utils/Spinner'
import { resetPassword, reset } from '../features/auth/authSlice'

const ResetPasswordPage = () => {

    const [formData, setFormData] = useState({
        'email': '',
    })

    const { email } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email
        }

        dispatch(resetPassword(userData))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/")
            toast.success(`A reset password email has been sent to your email. 
            Please check your email`)
            // window.location.reload()
        }

        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch])

    return (
        <div className='flex flex-col items-center '>
            <h1 className='text-4xl font-semibold mt-12'><FaQuestionCircle className='inline-block' /> Forget Password </h1>
            <p className='text-xl font-semibold text-gray-600 m-4'>Reset your password here</p>

            {isLoading && <Spinner />}
            <section className=" w-80 md:w-full md:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Email:</span>
                        </label>
                        <input type="email" placeholder="Email Address" className="w-full input input-bordered input-primary"
                            name="email" value={email} onChange={handleChange} required />
                    </div>
                    <div>
                        <button className="btn btn-primary w-28 lg:w-48">Request reset</button>
                    </div>

                </form>
            </section>
        </div>
    )
}

export default ResetPasswordPage