/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, fetchSingleProduct } from "../../store/slices/ProductSlice"
import Layout from "../../components/Layout"
import ProductCard from "../../components/ProductCard"
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios"
import { backendApi } from "../../constant/backendApi"
import ReviewModal from "../../components/ReviewModal"
import { addFavorateItem, removeFavorateItem } from "../../store/slices/favorateProductsSlice"
import { addToCart } from "../../store/slices/cartSlice"
// import SingleProductCarousal from "../components/SingleProductCarousal"
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AliceCarousel from "react-alice-carousel"
import 'react-alice-carousel/lib/alice-carousel.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SingleProduct = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleProduct: product, products } = useSelector((state) => state.products)
    const [active, setActive] = useState(1)
    const [color, setColor] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const [relatedProducts, setRelatedProducts] = useState([])
    const [allReviews, setAllReviews] = useState([])
    const { favorateItems } = useSelector((state) => state.favorateItems)
    const AddToFavorateItem = (data) => {
        dispatch(addFavorateItem(data))
    }
    const RemoveToFavorateItem = (data) => {
        dispatch(removeFavorateItem(data))
    }

    const existItem = favorateItems?.find((data) => data?._id === product?._id)

    const colorHandler = (e, color) => {
        setColor(color)
    }
    const quntityIncreaseHandler = () => {
        setQuantity(quantity + 1)
    }
    const quntityDecreaseHandler = () => {
        setQuantity(quantity - 1)
    }


    const productData = {
        _id: product?._id,
        name: product?.name,
        title: product?.title,
        price: product?.price,
        productImage: {
            url: product?.productImage?.url,
            publoc_id: product?.productImage?.publoc_id,
        },
        size: size,
        color: color,
        quantity: quantity ? quantity : 1,
    }

    const AddToCart = (data) => {
        dispatch(addToCart(data))
    }

    const getAllReviews = async () => {
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/products/reviews/${id}`)
            if (data.success) {
                setAllReviews(data?.reviews)
            }
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

        getAllReviews()
        dispatch(fetchSingleProduct(id))
        dispatch(fetchProducts())
        const relatedFilter = products.filter((data) => data.name === product.name)
        setRelatedProducts(relatedFilter)
    }, [dispatch, id])

    const items = [1, 2, 3, 4].map((i) =>
        <div key={i} className="flex justify-center items-center">
            <img className='h-[400px] rounded border-gray-200' src={product?.productImage?.url} alt='' />
        </div>
    )
    return (

        <Layout>
            <section>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-[100%] mx-auto flex flex-wrap">
                            <div className="relative lg:w-[40%] w-[100%] border p-4  flex justify-center items-center">
                                {/* <img
                                    alt="ecommerce"
                                    className="h-[400px]  rounded border-gray-200"
                                    src={product?.productImage?.url}
                                /> */}
                                <AliceCarousel
                                    mouseTracking
                                    disableButtonsControls
                                    items={items}
                                    autoPlayInterval="2000"
                                    infinite
                                    animationDuration="2000"
                                    autoPlay={true}
                                />

                                {/* like button  */}
                                <div className="absolute top-4 right-4">
                                    {existItem ?
                                        <button
                                            className="border p-2 bg-gray-300 rounded-lg"
                                            onClick={() => RemoveToFavorateItem(product)}
                                        >
                                            <FavoriteIcon
                                                className=" size-30 text-red-600"
                                            />
                                        </button>
                                        :
                                        <button
                                            className="border p-2 bg-gray-300 rounded-lg"
                                            onClick={() => AddToFavorateItem(product)}
                                        >
                                            <FavoriteBorderIcon
                                                className=" size-30 hover:text-red-600 hover:font-bold"
                                            />
                                        </button>
                                    }
                                </div>
                            </div>

                            <div className="lg:w-[60%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    {product.name}
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {product.title}
                                </h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <Rating
                                            name="read-only"
                                            value={product?.ratings ? product?.ratings : 0} precision={0.5}
                                            readOnly
                                        />
                                        <span className="text-gray-600 ml-3">{product.numReviews} Reviews</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        ¥{product.price}
                                    </span>
                                </div>
                                <div className="py-2 flex items-center justify-between gap-20">
                                    {product.countInStock > 0 ? (
                                        <span className="bg-green-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-red-300">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="bg-red-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                            Out Of Stock
                                        </span>
                                    )}


                                </div>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div className="lg:flex items-center">
                                        <span className="mr-3">Color</span>
                                        <div className="flex gap-3">
                                            {["Red", "Blue", "Black", "Yellow"].map((data, i) =>
                                                <button
                                                    key={i}
                                                    onClick={(e) => colorHandler(e, data)}

                                                    value={data}
                                                    className="border w-6 h-6  hover:bg-slate-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" style={{
                                                        backgroundColor: `${data}`
                                                    }}>
                                                </button>)}
                                        </div>



                                        {/* <button
                                            className={`border w-6 h-6 rounded-full`} style={{
                                                backgroundColor: `${product?.color}`
                                            }}>
                                        </button> */}
                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            <select
                                                onChange={(e) => setSize(e.target.value)}
                                                className="rounded border appearance-none border-gray-400 py-1 focus:outline-none focus:border-[tomato] text-base pl-3 pr-10">
                                                {product?.sizes?.map((size, i) =>
                                                    < option key={i} value={size}  > {size}</option>
                                                )}

                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <KeyboardArrowDownOutlinedIcon />
                                            </span>

                                        </div>
                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Quantity</span>
                                        <div className="relative">
                                            <div className=" flex gap-3 items-center">
                                                < button
                                                    className="w-8 h-8 btn_2 flex justify-center items-center text-white"
                                                    disabled={quantity === 1}
                                                    onClick={quntityDecreaseHandler}>
                                                    < RemoveIcon />
                                                </button>
                                                {quantity}
                                                <button
                                                    className="w-8 h-8 btn_2 flex justify-center items-center text-white"
                                                    disabled={quantity === product?.countInStock}
                                                    onClick={quntityIncreaseHandler}>
                                                    <  AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex w-[100%]">
                                    <button
                                        className="btn w-full "
                                        onClick={() => AddToCart(productData)}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                                <div className="py-4">
                                    <button onClick={handleOpen} type="button" className="font-mideum btn_2">Add Your Review</button>
                                </div>


                                {open && <div>
                                    <ReviewModal open={open} setOpen={setOpen} id={id} handleCloseModal={handleCloseModal} />
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="px-8">
                        <div className="flex gap-10 border-b-2 py-5 font-semibold">
                            <button onClick={() => setActive(1)}>Product Details </button>
                            <button onClick={() => setActive(2)}>Product Reviews </button>
                        </div>
                        <div className="overflow-y-auto p-5">
                            {active === 1 ? (
                                <div>
                                    <p>
                                        {product?.description}
                                    </p>
                                </div>
                            ) : null}

                            {active == 2 ? (
                                <div className="py-5">
                                    <p className="font-bold text-bold">
                                        Reviews <span>( {allReviews.length} )</span>
                                    </p>
                                    <div className="">
                                        <div className="py-5 flex flex-col gap-6">
                                            {allReviews && allReviews?.map((review) =>
                                                < div key={review._id} className="flex gap-5 items-center" >
                                                    <div className="h-[40px] w-[40px] bg-orange-600 rounded-full overflow-hidden border flex justify-center items-center">
                                                        {review && review?.user?.avtar?.url ?
                                                            <img
                                                                className="h-[100%]"
                                                                src={review?.user?.avtar?.url}
                                                                alt=""
                                                            />
                                                            :
                                                            <p className="text-white capitalize text-xl">
                                                                {review?.name?.slice(0, 1)}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="font-bold text-gray-600 text-sm capitalize">{review?.name}</p>
                                                        <p>
                                                            <p>
                                                                <Rating
                                                                    name="read-only"
                                                                    value={review?.rating ? review?.rating : 0} precision={0.5}
                                                                    readOnly
                                                                />

                                                            </p>
                                                        </p>
                                                        <p className="text-sm">
                                                            {review?.comment
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
                <section className="px-8 py-10">
                    <div className="bg-white">
                        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4">
                            <h1 className="text-2xl font-semibold py-3">Related Products</h1>
                            <div className="grid items-center  gap-4 grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 ">
                                {
                                    relatedProducts && relatedProducts?.map((item, index) =>
                                        <ProductCard key={index} item={item} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </Layout >
    )
}

export default SingleProduct





