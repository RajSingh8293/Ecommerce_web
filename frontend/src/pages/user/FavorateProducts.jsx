import { useSelector } from "react-redux"
import Layout from "../../components/Layout"
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const FavorateProducts = () => {
    const { favorateItems } = useSelector((state) => state.favorateItems)

    return (
        <Layout>
            <section className="min-h-[100vh] py-24 lg:px-10 px-5">
                <div className="lg:max-w-full mx-auto">
                    {favorateItems?.length > 0 ?

                        <div className="w-full mx-auto">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your Wish List Items ({favorateItems?.length})</h1>
                            <div className="pt-12 grid items-center gap-4 grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">

                                {favorateItems?.map((item) =>
                                    <ProductCard key={item._id} item={item} />
                                )
                                }
                            </div>
                        </div>
                        :
                        <div className="py-16  flex flex-col gap-4 justify-center items-center">
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




