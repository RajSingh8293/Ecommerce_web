/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addFavorateItem, removeFavorateItem } from "../store/slices/favorateProductsSlice";


const ProductCard = ({ item }) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const { favorateItems } = useSelector((state) => state.favorateItems)
    const AddToFavorateItem = (data) => {
        dispatch(addFavorateItem(data))
    }
    const RemoveToFavorateItem = (data) => {
        dispatch(removeFavorateItem(data))
    }

    const existItem = favorateItems?.find((data) => data?._id === item?._id)


    return (

        <>
            <div className="relative productCard mx-2 rounded overflow-hidden shadow-lg">
                <div className="flex justify-center w-full h-[200px]  overflow-hidden">
                    <Link to={`/product/${item?._id}`}>
                        <img className="h-full w-full object-cover " src={item?.productImage?.url} alt="Shirt" />
                    </Link>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-sm font-bold text-gray-600">{item?.name}</h1>
                        <div>
                            {existItem ?
                                <button
                                    onClick={() => RemoveToFavorateItem(item)}
                                >
                                    <FavoriteIcon
                                        className=" size-20 text-[tomato]"
                                    />
                                </button>
                                :
                                <button
                                    onClick={() => AddToFavorateItem(item)}
                                >
                                    <FavoriteBorderIcon
                                        className=" size-20 hover:text-red-600 hover:font-bold"
                                    />
                                </button>
                            }
                        </div>
                    </div>
                    <div className="flex justify-between gap-1">
                        <Link to={`/product/${item?._id}`}>
                            <p className="text-gray-700 text-xs font-bold hover:text-orange-600">
                                {item?.title?.slice(0, 20)}
                            </p>
                        </Link>

                        <p className="text-gray-700 text-xs">
                            Rs. {item?.price}
                        </p>
                    </div>
                </div>

                <p

                    className="absolute top-4 left-4 overflow-hidden">
                    <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {item?.category} </span>
                </p>


            </div >

            {/* <div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="h-[200px] overflow-hidden">
                        <img className=" h-full" src={item?.productImage?.url} alt="Sunset in the mountains" />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
            </div> */}
        </>


    )
}

export default ProductCard