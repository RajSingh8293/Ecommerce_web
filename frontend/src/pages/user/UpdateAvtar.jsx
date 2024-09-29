/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileImage } from "../../store/slices/userSlice"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const UpdateAvtar = ({ closeImageModal, open }) => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.user)



    const [imagePreview, setImagePreview] = useState(user?.avtar?.url)
    // const [avtar, setavtar] = useState("")
    const [userData, setUserData] = useState({
        avtar: null
    })


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

                            <div className='flex justify-center items-center gap-5'>
                                <div className="">
                                    <input type="file"
                                        accept='image/*'
                                        name='avtar'
                                        onChange={onchangeFileHandler}
                                        id="upload"
                                        required
                                        hidden />
                                    <label htmlFor="upload" className=''>
                                        <img className='h-[80px] border-2 border-dotted rounded-lg p-5' src="/src/assets/upload_img.png" alt="" />
                                    </label>
                                </div>
                                {
                                    imagePreview && <div className="">
                                        <img className='h-[100px]' src={imagePreview} alt="" />
                                    </div>
                                }
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center btn"
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


                    <button className="top-0 right-0 absolute mx-auto btn_2" onClick={closeImageModal}>
                        X
                    </button>
                </div>
            </Box >
        </Modal >
    )
}

export default UpdateAvtar