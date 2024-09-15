import { useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const Reset_Password = () => {
    // const [loading, setLoading] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        password: '',
        confirmPassword: '',
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

        try {
            const { data } = await axios.put(
                // `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/api/v1/user/register`,
                `http://localhost:7676/api/v1/reset-password/${token}`,
                userData,
                axiosConfig
            )
            if (data.success) {
                toast.success(data.message)
                navigate('/login')
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
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={onchangeHandler}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={onchangeHandler}
                                        required
                                        autoComplete="confirmPassword"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={resetPassword}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </section>

        </Layout>
    )
}

export default Reset_Password


