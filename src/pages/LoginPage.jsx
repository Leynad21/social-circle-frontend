import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/utils/Spinner'
import { login, reset } from '../features/auth/authSlice'

const LoginPage = () => {

    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError) {
            toast.error("Credentials not valid")
        }

        if (isSuccess || user) {
            navigate("/dashboard")
        }

        dispatch(reset())

    }, [isError, isSuccess, message, user, navigate, dispatch])

    const handleChange = (e) => setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email, password
        }

        dispatch(login(userData))
    }

    return (
        <div className='flex flex-col items-center '>
            <h1 className='text-4xl font-semibold mt-12'><FaSignInAlt className='inline-block' /> Log In </h1>
            <p className='text-xl font-semibold text-gray-600 m-4'>Login here</p>

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
                        <label className="label">
                            <span className="text-base label-text font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="w-full input input-bordered input-primary"
                            name="password" value={password} onChange={handleChange} required />
                    </div>
                    <Link to="/reset-password" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</Link>
                    <div>
                        <button className="btn btn-primary w-28 lg:w-48">Login</button>
                    </div>

                </form>
            </section>
        </div>
    )

}

export default LoginPage