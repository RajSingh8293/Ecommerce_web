/* eslint-disable react/prop-types */
import { Box, Input, Modal } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 2
};

const SearchModal = ({ handleClose, open }) => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')


    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex w-full h-full">
                        <Input className="w-full text-xs" color="dark" placeholder="Search" focused={keyword.toString()}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button onClick={searchHandler} className="text-[tomato] rounded-r-sm p-2 px-4 h-full">
                            <SearchIcon />
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}

export default SearchModal