import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordConfirm, reset } from '../features/auth/authSlice'
import Spinner from '../components/utils/Spinner'
import { MdLockReset } from "react-icons/md"

const ResetPasswordConfirmPage = () => {

    const { uid, token } = useParams()
    const [formData, setFormData] = useState({
        'new_password': '',
        're_new_password': '',
    })

    const { new_password, re_new_password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/")
            // window.location.reload()
        }

        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token,
            new_password,
            re_new_password,
        }

        dispatch(resetPasswordConfirm(userData))
        toast.success("Your password has been reset! You can login now")
    }

    return (
        <div className='flex flex-col items-center '>
            <h1 className='text-4xl font-semibold mt-12'><MdLockReset className='inline-block' /> Reset password </h1>
            <p className='text-xl font-semibold text-gray-600 m-4'>Reset password here</p>

            {isLoading && <Spinner />}
            <section className=" w-80 md:w-full md:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="label">
                            <span className="text-base label-text font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="w-full input input-bordered input-primary"
                            name="new_password" value={new_password} onChange={handleChange} minLength='6' required />
                    </div>
                    <div >
                        <label className="label">
                            <span className="text-base label-text font-semibold">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="w-full input input-bordered input-primary"
                            name="re_new_password" value={re_new_password} onChange={handleChange} minLength='6' required />
                    </div>

                    <div>
                        <button className="btn btn-primary w-28 lg:w-48">Reset</button>
                    </div>

                </form>
            </section>
        </div>
    )
}

export default ResetPasswordConfirmPage