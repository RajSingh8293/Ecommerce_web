/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../store/slices/cartSlice"
import { addFavorateItem, removeFavorateItem } from "../store/slices/favorateProductsSlice"


const CartProducts = ({ data }) => {
    const dispatch = useDispatch()
    const { favorateItems } = useSelector((state) => state.favorateItems)
    const existItem = favorateItems?.find((item) => item?._id === data?._id)

    return (
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div className="md:w-4/12 2xl:w-1/4 w-full flex justify-center">
                <img src={data?.productImage} alt="Black Leather Purse" className=" lg:h-[150px] md:h-[150px] object-center object-cover" />

            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <p className="text-xs font-semibold mb-2 text-gray-600 md:pt-0 pt-4">{data?.name}</p>
                <div className="flex items-center justify-between w-full">
                    <p className="text-xs  text-gray-600">{data?.title}</p>
                    <div className="flex items-center border-gray-100">
                        <form className="">
                            <div className="relative flex items-center">
                                <button
                                    onClick={() =>
                                        dispatch(decrementQuantity(data._id))
                                    }
                                    type="button"
                                    id="decrement-button"
                                    data-input-counter-decrement="counter-input"
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    {/* <RemoveCircleOutlineIcon /> */}
                                    -
                                </button>

                                <span className="px-3 flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[3.5rem] text-center">
                                    {data?.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch(incrementQuantity(data._id))
                                    }
                                    type="button"
                                    id="increment-button"
                                    data-input-counter-increment="counter-input"
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    {/* <AddCircleOutlineIcon /> */}
                                    +
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                        {existItem ?
                            <button
                                onClick={() => dispatch(removeFavorateItem(data))}

                                className="text-xs leading-3 underline text-red-500 cursor-pointer">
                                Remove to favorites
                            </button>
                            :
                            <button
                                onClick={() => dispatch(addFavorateItem(data))}

                                className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                                Add to favorites
                            </button>
                        }
                        <button
                            onClick={() => dispatch(removeFromCart(data))}
                            className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
                    </div>
                    <p className="text-sm font-bold text-gray-800">${data?.quantity * data?.price}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProducts