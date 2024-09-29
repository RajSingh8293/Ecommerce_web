import { useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { backendApi } from "../../constant/backendApi"

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
                `${backendApi}/api/v1/reset-password/${token}`,
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
                                        className="px-4 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                                        className="px-4 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="btn w-full"
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


