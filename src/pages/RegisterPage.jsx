import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { register, resetUser } from '../features/auth/authSlice'
import Spinner from '../components/utils/Spinner'

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        'username': '',
        'first_name': '',
        'last_name': '',
        'email': '',
        'password': '',
        're_password': '',
    })

    const { email, username, first_name, last_name, password, re_password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== re_password) {
            toast.error("Passwords do not match")
        }
        else if (password.length < 8) {
            toast.error("Password too weak. Try a stronger one with at least 8 characters (letters & numbers)")
        } else {
            const userData = {
                username,
                first_name,
                last_name,
                email,
                password,
                re_password
            }
            dispatch(register(userData))
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
            toast.success(`An activation email has been sent to your email. 
            Please check your email`)
            // window.location.reload()
        }

        dispatch(resetUser())

    }, [isError, isSuccess, message, user, navigate, dispatch])


    return (
        <div className='flex flex-col items-center '>
            <h1 className='text-4xl font-semibold mt-12'><FaUser className='inline-block' /> Sign Up </h1>
            <p className='text-xl font-semibold text-gray-600 m-4'>Please create an account</p>

            {isLoading && <Spinner />}
            <section className=" w-80 md:w-full md:max-w-lg mb-4" >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Username</span>
                        </label>
                        <input type="text" placeholder="Username" className="w-full input input-bordered input-primary"
                            name="username" value={username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">First Name</span>
                        </label>
                        <input type="text" placeholder="First Name" className="w-full input input-bordered input-primary"
                            name="first_name" value={first_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Last Name</span>
                        </label>
                        <input type="text" placeholder="Last Name" className="w-full input input-bordered input-primary"
                            name="last_name" value={last_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="Email Address" className="w-full input input-bordered input-primary"
                            name="email" value={email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="w-full input input-bordered input-primary"
                            name="password" value={password} onChange={handleChange} minLength='6' required />
                    </div>
                    <div >
                        <label className="label">
                            <span className="text-base label-text font-semibold">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="w-full input input-bordered input-primary"
                            name="re_password" value={re_password} onChange={handleChange} minLength='6' required />
                    </div>
                    <div>
                        <button className="btn btn-primary w-28 lg:w-48">Sign Up</button>
                    </div>

                </form>
            </section>
        </div>
    )

}

export default RegisterPage