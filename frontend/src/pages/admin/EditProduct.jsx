
import { useEffect } from 'react'
import { useState } from 'react';
import { toast } from "react-toastify";
import Sidebar from '../../components/Sidebar';
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


    console.log("product details :", product);


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

    }, [dispatch, id, message, navigate]
    )
    return (
        // <Layout>
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />

                    <div className="lg:ml-64">
                        <div className='flex flex-col justify-between items-center '>
                            <h1 className='py-4 text-xl text-gray-600 font-bold'>Edite Product</h1>
                            <div className=' w-full'>
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
                                        onClick={editeProduct}
                                        className='btn_2 w-full'
                                    >
                                        Update

                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section >
        </>
        // </Layout >
    )
}



export default EditProduct