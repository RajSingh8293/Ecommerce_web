/* eslint-disable no-unused-vars */
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';


import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { toast } from "react-toastify";
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import { backendApi } from '../../constant/backendApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreatProduct } from '../../store/slices/AdminProductsSlice';
import AdminNavbar from '../../components/AdminNavbar';



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
const AddProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [featured, setFeatured] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [sizes, setSizes] = useState([]);
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    console.log("featured :", featured);




    const onchangeFileHandler = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }


    let axiosConfig = {
        withCredentials: true,
    }
    const createNewProduct = async (e) => {
        e.preventDefault()


        const formData = new FormData()
        formData.append("name", name);
        formData.append("type", type);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("color", color);
        formData.append("price", price);
        formData.append("featured", featured);
        formData.append("description", description);
        formData.append("title", title);
        formData.append("countInStock", countInStock);
        formData.append("productImage", productImage);
        formData.append("sizes", JSON.stringify(sizes));

        dispatch(fetchCreatProduct(formData))


    }


    const filterByColor = ["Gray", "White", "Black", "Pink", "Blue", "Yellow", "Orange", "Purple"]

    return (
        // <Layout>
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />

                    <div className="lg:ml-64">
                        <div className='flex flex-col justify-between items-center'>
                            <h1 className='text-xl text-gray-600 font-bold'>Add Product</h1>
                            <Box
                                className="w-full flex gap-3 flex-col"
                                sx={{
                                    zIndex: -1
                                }}


                            >
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
                                        <img className='h-[100px]' src={imagePreview} alt="" />
                                    </div>
                                </div>
                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <TextField
                                        label="Name"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    // value={productData?.name}
                                    // onChange={onchangeHandler}
                                    />
                                    <TextField
                                        label="Type"
                                        name='type'
                                        // value={productData?.type}
                                        // onChange={onchangeHandler}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>
                                <div className='grid lg:grid-cols-2 gap-5'>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            label="Category"
                                            name='category'
                                            multiline

                                            // value={productData?.category}
                                            // onChange={onchangeHandler}
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <MenuItem value="Men">Men</MenuItem>
                                            <MenuItem value="Women">Women</MenuItem>
                                            <MenuItem value="Kids">Kids</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel>SubCategory</InputLabel>
                                        <Select
                                            label="Sub Category"
                                            name='subCategory'
                                            // value={productData?.subCategory}
                                            // onChange={onchangeHandler}
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                        >
                                            <MenuItem value="Top">Top</MenuItem>
                                            <MenuItem value="Bottom">Bottom</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>

                                <div className='grid lg:grid-cols-2 gap-5'>
                                    <FormControl fullWidth>
                                        <InputLabel>Color</InputLabel>
                                        <Select
                                            label="Color"
                                            name='color'
                                            multiline

                                            // value={productData?.color}
                                            // onChange={onchangeHandler}
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        >
                                            {filterByColor?.map((color) =>
                                                <MenuItem key={color} value={color}>{color}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel>Featured</InputLabel>
                                        <Select
                                            label="Featured"
                                            name='featured'
                                            // value={productData?.featured}
                                            // onChange={onchangeHandler}
                                            value={featured}
                                            onChange={(e) => setFeatured(e.target.value)}
                                        >
                                            <MenuItem value="true">Yes</MenuItem>
                                            <MenuItem value="false">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className='grid lg:grid-cols-2 gap-5'>
                                    <TextField
                                        label="Price"
                                        name='price'
                                        // value={productData?.price}
                                        // onChange={onchangeHandler}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <TextField
                                        label="Count In-Stock"
                                        name='countInStock'
                                        // value={productData?.countInStock}
                                        // onChange={onchangeHandler}
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    />
                                </div>
                                <div className='grid lg:grid-cols-2 gap-5'>
                                    <TextField
                                        label="Title"
                                        name='title'

                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <TextField
                                        label="Description"
                                        name='description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}

                                    />
                                </div>

                                <div className='flex gap-5'>
                                    <FormGroup >
                                        <div className='flex '>


                                            <div>
                                                <FormControlLabel control={<Checkbox value="S" onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} />} label="Small" />
                                            </div>
                                            <div>
                                                <FormControlLabel control={<Checkbox value="M" onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} />} label="Medium" />
                                            </div>

                                            <div>
                                                <FormControlLabel control={<Checkbox value="L" onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} />} label="Large" />
                                            </div>
                                            <div>
                                                <FormControlLabel control={<Checkbox value="XL" onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} />} label="Extra Large" />
                                            </div>
                                        </div>
                                    </FormGroup>



                                    {/* <div >
                                        <button
                                            onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}
                                            className={`${sizes.includes("S") ? "bg-[tomato]" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</button>
                                    </div>
                                    <div
                                    >
                                        <button
                                            onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}
                                            className={`${sizes.includes("M") ? "bg-[tomato]" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</button>
                                    </div>
                                    <div >
                                        <button
                                            onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}
                                            className={`${sizes.includes("L") ? "bg-[tomato]" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</button>
                                    </div>
                                    <div >
                                        <button
                                            onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}
                                            className={`${sizes.includes("XL") ? "bg-[tomato]" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</button>
                                    </div> */}
                                </div>

                                <div>
                                    <Button
                                        type='submit'
                                        onClick={createNewProduct}
                                        className='btn_2'
                                        sx={{
                                            backgroundColor: "black",
                                            color: "white",
                                            padding: "10px 20px",
                                            borderRadius: 0,
                                            fontWeight: 600,
                                            transition: "0.3s ease"
                                        }}
                                    >Create Product</Button>
                                </div>


                            </Box>
                        </div>
                    </div>
                </div>
            </section >
        </>
        // {/* </Layout > */}
    )
}

export default AddProduct