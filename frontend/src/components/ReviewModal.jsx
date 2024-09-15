/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Rating, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { backendApi } from '../constant/backendApi';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// open, setOpen,
const ReviewModal = ({ open, setOpen, id, handleCloseModal }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    // const [open, setOpen] = useState(true)

    const handleClose = () => setOpen(false);
    const reviewData = {
        productId: id,
        rating,
        comment
    }
    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        console.log(rating, comment);
        try {
            const { data } = await axios.put(`${backendApi}/api/v1/products/review`, reviewData, {
                withCredentials: true
            },
            )
            if (data?.success) {
                toast.success(data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className='flex flex-col gap-3 relative'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </Typography>
                        <TextField value={comment} onChange={(e) => setComment(e.target.value)} id="outlined-basic" label="Comment" size="small" variant="outlined" />
                        <Button onClick={handleReviewSubmit} variant="contained" type="submit" color="success">Submit</Button>
                        <button className='inline-block absolute -top-5 -right-4 hover:text-blue-500' onClick={handleCloseModal}>
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ReviewModal