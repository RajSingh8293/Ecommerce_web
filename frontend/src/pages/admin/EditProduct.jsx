/* eslint-disable no-unused-vars */

import { useEffect } from 'react'
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



import axios from 'axios';
import { toast } from "react-toastify";
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import { backendApi } from '../../constant/backendApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminEditProduct, fetchAdminSingleProduct } from '../../store/slices/AdminProductsSlice';
import AdminNavbar from '../../components/AdminNavbar';


const filterByColor = ["Gray", "White", "Black", "Pink", "Blue", "Yellow", "Orange", "Purple"]

const EditProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const { adminSingleProduct: product, message } = useSelector((state) => state.adminProducts)

    const [name, setName] = useState(product?.name);
    const [type, setType] = useState(product?.type);
    const [category, setCategory] = useState(product?.category);
    const [subCategory, setSubCategory] = useState(product?.subCategory);
    const [color, setColor] = useState(product?.color);
    const [price, setPrice] = useState(product?.price);
    const [featured, setFeatured] = useState(product?.featured);
    const [title, setTitle] = useState(product?.title);
    const [description, setDescription] = useState(product?.description);
    const [countInStock, setCountInStock] = useState(product?.countInStock);



    const editeProduct = async (e) => {
        e.preventDefault()

        const editeData = {
            name,
            type,
            category,
            subCategory,
            color,
            price,
            featured,
            description,
            title,
            countInStock
        }

        dispatch(AdminEditProduct(editeData, id))
    }



    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])


    useEffect(() => {
        dispatch(fetchAdminSingleProduct(id))

        if (message) {
            toast.success(message)
        }

    }, [dispatch, id, message, navigate])
    return (
        // <Layout>
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />

                    <div className="lg:ml-64">
                        <div className='flex flex-col justify-between items-center'>
                            <h1 className='py-4 text-xl text-gray-600 font-bold'>Add Product</h1>
                            <Box
                                className="w-full flex gap-3 flex-col"
                                sx={{
                                    zIndex: -1
                                }}

                            >
                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <TextField
                                        label="Name"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        label="Type"
                                        name='type'
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
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <TextField
                                        label="Count In-Stock"
                                        name='countInStock'
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



                                <div>
                                    <Button
                                        type='submit'
                                        onClick={editeProduct}
                                        className='hover:bg-[tomato]'
                                        sx={{
                                            backgroundColor: "black",
                                            color: "white",
                                            padding: "10px 20px",
                                        }} >Create Product</Button>
                                </div>


                            </Box>
                        </div>
                    </div>
                </div>
            </section >
        </>
        // </Layout >
    )
}



export default EditProduct