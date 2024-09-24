import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminSingleProduct } from "../../store/slices/AdminProductsSlice";
import Sidebar from "../../components/Sidebar";
import { NavLink, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import ProductImageUpdate from "./ProductImageUpdate";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AdminNavbar from "../../components/AdminNavbar";





const ProductDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [imageOpen, setImageOpen] = useState(false)
    const openImageModal = () => setImageOpen(true);
    const closeImageModal = () => setImageOpen(false);

    const { adminSingleProduct: product } = useSelector((state) => state.adminProducts)

    useEffect(() => {
        dispatch(fetchAdminSingleProduct(id))

    }, [dispatch, id])
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-gray-600 font-bold'>Productc Id :  {product?._id}</h1>

                        </div>
                        <div className="flex w-full h-full">
                            <div className="container mx-auto px-4 py-8">
                                <div className="flex flex-wrap -mx-4">
                                    <div className=" w-full mb-8 px-4 ">
                                        <div className="w-full ">
                                            <img src={product?.productImage?.url} alt="Product"
                                                className="lg:h-[300px] lg:w-auto md:h-[300px] md:w-auto h-[400px] rounded-lg shadow-md mb-4" id="mainImage" />
                                        </div>
                                        <div className="flex justify-between gap-5">
                                            <h1 className="font-semibold">
                                                Change Image
                                            </h1>

                                            <button
                                                onClick={openImageModal}
                                                className="rounded  btn_2 px-2 py-1 ">
                                                <ModeEditOutlineOutlinedIcon />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full  px-4">
                                        <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
                                        <p className="text-gray-600 mb-4">{product?.name}</p>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold mr-2">${product?.price}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center">
                                                <Rating
                                                    name="read-only"
                                                    value={product?.ratings ? product?.ratings : 0} precision={0.5}
                                                    readOnly
                                                />
                                                <span className="text-gray-600 ml-3">{product.numReviews} Reviews</span>
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-6">{product?.description}.</p>

                                        <div className="mb-2 flex gap-5 items-center">
                                            <h3 className="text-lg font-semibold">Color:</h3>
                                            <div className="flex space-x-2">
                                                <button
                                                    className={`w-8 h-8 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}>
                                                    {product?.color}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="my-2 flex gap-5 items-center">
                                            <h3 className="text-lg font-semibold">Sizes:</h3>
                                            <div className="flex space-x-2">
                                                {product?.sizes?.map((size, index) =>
                                                    <button
                                                        key={index}
                                                        className={`w-10 h-10 flex justify-center items-center  btn_2 rounded-full`}>
                                                        {size}
                                                    </button>
                                                )
                                                }
                                            </div>
                                        </div>

                                        <div className="mb-6 flex items-center gap-5">
                                            <label htmlFor="quantity" className=" block text-sm font-medium text-gray-700">Count In Stock
                                                :</label>
                                            <span className="text-gray-600">{product?.countInStock}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:flex md:flex sm:flex flex flex-wrap gap-3 justify-between items-center ">
                                    <button className='p-2 px-5 font-semibold btn'>
                                        <NavLink to={`/admin-products`}>Go Back</NavLink>
                                    </button>

                                    <button className='p-2 px-5 font-semibold text-white btn_2'>
                                        <NavLink to={`/edit-product/${product?._id}`}>Edit Product Details</NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>



                        {
                            imageOpen &&
                            <div>
                                <ProductImageUpdate id={product?._id} open={imageOpen} closeImageModal={closeImageModal} />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </ >



    )
}

export default ProductDetails