import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearAllUserErrors, loginUser } from "../../store/slices/userSlice"
import { toast } from "react-toastify"

const Login = () => {
    const dispatch = useDispatch()
    const { user, isAuthenticated, error, message } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })


    const onchangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    const loginUserHandler = async (e) => {
        e.preventDefault()
        dispatch(loginUser(userData))
    }


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors())
        }
    }, [isAuthenticated, user, dispatch, navigate, error, message])
    return (
        // <Layout>
        <section className="py-24">

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login
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
                                    className="px-4 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
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
                            <button
                                type="submit"
                                className="btn w-full"
                                onClick={loginUserHandler}
                            >
                                Login
                            </button>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have a account?{' '}
                            <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </section>
        // </Layout>
    )
}

export default Login





