/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import ProductCarousal from "../components/ProductCarousal"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../store/slices/ProductSlice';
import NewsLetter from "../components/NewsLetter";
import Categories from "../components/Categories";

const Home = () => {

    const [feateruedData, setFeaturedData] = useState([])
    const [womenData, setWomenData] = useState([])
    const [kidsData, setKidsData] = useState([])
    console.log("kidsData :", kidsData);

    const dispatch = useDispatch()

    const { products } = useSelector((state) => state.products)

    const productsCopy = [...products]


    useEffect(() => {
        dispatch(fetchProducts())

        const filterdata = productsCopy?.filter((data) => {
            return data.featured === true
        }
        )
        if (filterdata) {
            setFeaturedData(filterdata)
        }
        const filterWomendata = productsCopy?.filter((data) => {
            return data.category === "Women"
        }
        )
        if (filterWomendata) {
            setWomenData(filterWomendata)
        }
        const filterKidsdata = productsCopy?.filter((data) => {
            return data.category === "Kids"
        }
        )
        if (filterKidsdata) {
            setKidsData(filterKidsdata)
        }

    }, [dispatch])
    return (
        <Layout>

            <section className="py-16">
                <Hero />
                <div className="lg:px-10 px-5 py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Our Categories</h1>
                    <Categories />
                </div>
                <div className="lg:px-10 px-5 py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Popular Products</h1>
                    <ProductCarousal products={feateruedData} />
                </div>

                <div className=" py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Our Newsletter </h1>
                    <NewsLetter />
                </div>


                <div className="lg:px-10 px-5 py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Women Products</h1>
                    <ProductCarousal products={womenData} />
                </div>

                <div className="lg:px-10 px-5 py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Kids Products</h1>
                    <ProductCarousal products={kidsData} />
                </div>
            </section>
        </Layout>
    )
}

export default Home


