import axios from "axios"
import Layout from "../components/Layout"
import { toast } from "react-toastify"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Forgot_Password = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
    })

    const onchangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    let axiosConfig = {
        withCredentials: true,
    }
    const resetPassword = async (e) => {
        e.preventDefault()
        console.log("userData :", userData);


        try {
            const { data } = await axios.post(
                // `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/api/v1/user/register`,
                `http://localhost:7676/api/v1/forgot-password`,
                userData,
                axiosConfig,
            )
            if (data.success) {
                toast.success(data.message)
                navigate('/emmail-success-msg')

            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);

        }

    }

    return (
        <Layout>
            <section className="py-24">

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Reset Password
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={onchangeHandler}
                                        required
                                        autoComplete="email"
                                        className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600   "
                                    onClick={resetPassword}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">

                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Go back
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Forgot_Password

