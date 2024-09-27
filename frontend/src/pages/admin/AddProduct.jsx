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
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreatProduct } from '../../store/slices/AdminProductsSlice';
import AdminNavbar from '../../components/AdminNavbar';
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
                        <div className=' flex flex-col justify-between items-center '>
                            <h1 className='py-4 text-xl text-gray-600 font-bold'>Create New Product</h1>
                            <div className='w-full flex gap-3 flex-col'>
                                <div className='flex items-center gap-5'>
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
                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="email" className="block w-full text-sm font-medium leading-6 text-gray-900">
                                            Product Name
                                        </label>
                                        <div className="">
                                            <input
                                                type='text'
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Casual Shirt"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Type
                                        </label>
                                        <div className="">
                                            <input
                                                type='text'
                                                name='type'
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                placeholder="Shirts, Pants etc"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="Category" className="block w-full text-sm font-medium leading-6 text-gray-900">
                                            Product Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                label="Category"
                                                name='category'
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            >
                                                <option value="Men">Men</option>
                                                <option value="Women">Women</option>
                                                <option value="Kids">Kids</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Sub Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                label="Sub Category"
                                                name='subCategory'
                                                value={subCategory}
                                                onChange={(e) => setSubCategory(e.target.value)}
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            >
                                                <option value="Top">Top</option>
                                                <option value="Bottom">Bottom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="Category" className="block w-full text-sm font-medium leading-6 text-gray-900">
                                            Color
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name='color'
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            >
                                                {filterByColor?.map((color) =>
                                                    <option key={color}>{color}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Featured
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name='featured'
                                                value={featured}
                                                onChange={(e) => setFeatured(e.target.value)}
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>



                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="email" className="block w-full text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type='number'
                                                name='price'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="999"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Count
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type='number'
                                                name='countInStock'
                                                value={countInStock}
                                                onChange={(e) => setCountInStock(e.target.value)}
                                                placeholder="120"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>



                                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="email" className="block w-full text-sm font-medium leading-6 text-gray-900">
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type='text'
                                                name='title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Casual shit for man"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Count
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type='text'
                                                name='description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Description"
                                                required
                                                className="px-4 block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-[tomato] focus:ring-2  sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-4 w-full'>
                                    <button
                                        type='submit'
                                        onClick={createNewProduct}
                                        className='btn_2 w-full'
                                    >
                                        Create New Product

                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
        // {/* </Layout > */}
    )
}

export default AddProduct