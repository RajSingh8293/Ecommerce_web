/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { backendApi } from "../../constant/backendApi"
import { AdminEditProductImage, fetchAdminSingleProduct } from "../../store/slices/AdminProductsSlice"

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios"



import { Box, Modal } from "@mui/material"
import { updateProfileImage } from "../../store/slices/userSlice"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


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

const ProductImageUpdate = ({ closeImageModal, open, id }) => {
    const { adminSingleProduct: product, message } = useSelector((state) => state.adminProducts)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { id } = useParams()

    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.productImage?.url);

    const onchangeFileHandler = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }


    const updateProductImage = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("productImage", productImage);
        dispatch(AdminEditProductImage(formData, id))
    }

    useEffect(() => {
        dispatch(fetchAdminSingleProduct(id))

    }, [dispatch, id])

    return (

        <>
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
                                Update Product Image
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                            <form action="#" method="POST" className="space-y-6 ">

                                <div className='flex justify-center items-center gap-5'>
                                    <div className="">
                                        <input type="file"
                                            accept='image/*'
                                            name='productImage'
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
                                        className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold btn  "
                                        onClick={updateProductImage}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="flex justify-center"    >
                                    <button
                                        onClick={closeImageModal}
                                        className="py-2 flex justify-center items-center gap-2 font-semibold  hover:text-[tomato] text-center  text-gray-600 text-sm ">
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

                        <div className="top-0 right-0 absolute mx-auto btn_2" onClick={closeImageModal}>
                            X
                        </div>
                    </div>





                    {/* <div>
                        <div className='flex gap-10 items-center'>
                            <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    accept='image/*'
                                    name='productImage'
                                    onChange={onchangeFileHandler}
                                // onChange={(e) => setProductImage(e.target.files[0])}
                                />
                            </Button>

                            <div className=" grid grid-cols-4 gap-3">
                                <img src={imagePreview} alt="" />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => updateProductImage()}
                            >
                                Update Image
                            </button>
                        </div>
                    </div> */}
                </Box >
            </Modal >
        </>
    )
}

export default ProductImageUpdate