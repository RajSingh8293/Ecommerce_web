import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFavorateItem } from "../../store/slices/favorateProductsSlice";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const FavorateProducts = () => {
    const dispatch = useDispatch()
    const { favorateItems } = useSelector((state) => state.favorateItems)
    const RemoveToFavorateItem = (data) => {
        dispatch(removeFavorateItem(data))
    }

    return (
        <Layout>
            <section className="min-h-[100vh] py-24 lg:px-10 px-5">
                <div className="lg:max-w-[700px] mx-auto">
                    {favorateItems?.length > 0 ?

                        <div className=" lg:max-w-[700px] mx-auto">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your Wish List Items ({favorateItems?.length})</h1>
                            <div className="flex flex-col gap-5 pt-12">

                                {favorateItems?.map((item) =>
                                    <div key={item?._id} className="relative p-4 shadow rounded-lg">
                                        <div className="h-[150px]">
                                            <img className="h-full" src={item.productImage} alt="" />
                                        </div>
                                        <div className="flex flex-col gap-2  ">
                                            <p className="text-xs text-gray-700 font-bold">{item?.name}</p>
                                            <div className=" flex justify-start items-center gap-2 mb-2">
                                                <span className="m-0 p-0">
                                                    <Rating
                                                        name="read-only"
                                                        color="tomato"
                                                        value={item?.ratings ? item?.ratings : 0} precision={0.5}
                                                        readOnly
                                                    />
                                                </span>
                                                <span className="text-gray-600 text-xs font-semibold">
                                                    ({item?.numReviews ? item?.numReviews : 0}) Reviews
                                                </span>
                                            </div>
                                            <p className="text-sm">{item?.title}</p>
                                            <p className="text-xl text-gray-700 font-bold">Rs. {item?.price}</p>
                                            <button className="btn w-full">Add To Cart</button>
                                        </div>

                                        <button
                                            onClick={() => RemoveToFavorateItem(item)}
                                            className="absolute top-2 right-4 rounded-lg border-2 p-1 hover:bg-gray-200">
                                            <DeleteIcon className="hover:text-red-600" />
                                        </button>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        :
                        <div className="py-16 lg:max-w-[700px] flex flex-col gap-4 justify-center items-center">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your Wish List is Empty</h1>
                            <div>
                                <img className='h-[300px]' src="src/assets/empty_wishlist_img.jpg" alt='' />
                            </div>

                            <div className=" px-4 pb-2 ">
                                <button className="w-full px-10 hover:bg-gray-700 bg-black p-1 text-white">
                                    <Link to='/'>
                                        Go Back
                                    </Link>
                                </button>
                            </div>
                        </div>
                    }
                </div>

            </section >
        </Layout >
    )
}
export default FavorateProducts




