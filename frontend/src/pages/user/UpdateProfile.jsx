/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Modal } from "@mui/material"
import { updateUser } from "../../store/slices/userSlice"

const UpdateProfile = ({ handleClose, open }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    const [userData, setUserData] = useState({
        username: user?.username,
        email: user?.email,
    })


    const onchangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    const updateUserHandler = async (e) => {
        e.preventDefault()
        dispatch(updateUser(userData))
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-2">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Update Profile
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        onChange={onchangeHandler}
                                        value={userData?.username}
                                        required
                                        autoComplete="username"
                                        className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
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
                                        value={userData?.email}
                                        required
                                        autoComplete="email"
                                        className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>



                            <div onClick={handleClose}>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center btn"
                                    onClick={updateUserHandler}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                    <button className="top-0 right-0 absolute mx-auto btn_2" onClick={handleClose}>
                        X
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default UpdateProfile