import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import ProductCard from "../../components/ProductCard"
import { useParams } from "react-router-dom"
import Loader from "../../components/Loader"
import { useEffect } from "react"
import { fetchProducts } from "../../store/slices/ProductSlice"

const SearchPage = () => {
    const { products, loading } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const { keyword } = useParams()



    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    useEffect(() => {
        dispatch(fetchProducts(keyword))

    }, [dispatch, keyword])
    return (
        <Layout>
            <section className="py-24 lg:px-10 px-5">

                <h1 className="heading py-5 text-gray-600">Your search products</h1>

                <div>
                    {
                        loading ? <Loader />
                            :
                            products.length > 0 ?
                                <div className="grid items-center  gap-4 grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 ">

                                    {
                                        products.length > 0 && products?.map((item, index) =>
                                            <ProductCard key={index} item={item} />
                                        )

                                    }
                                </div>
                                :

                                <div className="flex justify-center items-center pt-16">
                                    <h1 className="text-2xl font-semibold text-gray-500">Sorry there is no products of related this </h1>
                                </div>

                    }
                </div>

            </section>
        </Layout>
    )
}

export default SearchPage