/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileImage } from "../store/slices/userSlice"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const UpdateAvtar = ({ closeImageModal, open }) => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.user)



    const [imagePreview, setImagePreview] = useState("")
    // const [avtar, setavtar] = useState("")
    const [userData, setUserData] = useState({
        avtar: null
    })

    console.log("user :", user);

    const onchangeFileHandler = (e) => {
        setUserData({ ...userData, avtar: e.target.files[0] })
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }



    const updateUserHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("avtar", userData.avtar);
        dispatch(updateProfileImage(formData))

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 2
    };
    return (
        <Modal
            open={open}
            onClose={closeImageModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-2">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Update Profile Image
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            {/* <div className=" grid grid-cols-4 gap-3">
                                <img src={imagePreview} alt="" />
                            </div> */}

                            {imagePreview ?
                                <div className=" grid grid-cols-4 gap-3">
                                    <img src={imagePreview} alt="" />
                                </div>
                                :
                                <div className=" flex flex-col gap-3">
                                    <label className="" >Profile Image </label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        name='avtar'
                                        onChange={onchangeFileHandler}
                                        className='w-full h-full border rounded outline-none py-1 px-2'
                                        placeholder=' '
                                    />
                                </div>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={updateUserHandler}
                                >
                                    {
                                        loading ? "Loading" : "Update"
                                    }
                                </button>
                            </div>
                            <div className="flex justify-center"    >
                                <button
                                    onClick={closeImageModal}
                                    className="py-2 flex justify-center items-center gap-2 font-semibold  hover:text-blue-700 text-center text-sm text-gray-600">
                                    <span>
                                        <KeyboardBackspaceIcon />
                                    </span>
                                    <span>
                                        back
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="top-0 right-0 absolute mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-b hover:bg-red-600 hover:text-white sm:mx-0 sm:h-10 sm:w-10 font-bold cursor-pointer" onClick={closeImageModal}>
                        X
                    </div>
                </div>
            </Box >
        </Modal >
    )
}

export default UpdateAvtar