/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Hero from "../../components/Hero"
import Layout from "../../components/Layout"
import ProductCarousal from "../../components/ProductCarousal"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../store/slices/ProductSlice';
import NewsLetter from "../../components/NewsLetter";
import Categories from "../../components/Categories";
import Loader from "../../components/Loader";


const Home = () => {
    const [menData, setMenData] = useState([])
    const [womenData, setWomenData] = useState([])
    const [kidsData, setKidsData] = useState([])
    const dispatch = useDispatch()


    const { products } = useSelector((state) => state.products)

    const productsCopy = [...products]




    useEffect(() => {
        dispatch(fetchProducts())

        const filterdata = productsCopy?.filter((data) => {
            return data?.category === "Men"
        }
        )
        if (filterdata) {
            setMenData(filterdata)
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
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <Layout>

            <section className="py-16">
                <Hero />
                <div className="lg:px-10 px-5 py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Our Categories</h1>
                    <Categories />
                </div>

                <div className="lg:px-10 px-5 pt-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Men Products</h1>
                    <ProductCarousal products={menData} />
                </div>




                <div className="lg:px-10 px-5 pt-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Women Products</h1>
                    <ProductCarousal products={womenData} />
                </div>

                <div className="lg:px-10 px-5 pt-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Kids Products</h1>
                    <ProductCarousal products={kidsData} />
                </div>


                <div className="py-10">
                    <h1 className="text-center text-2xl font-semibold py-5">Our Newsletter </h1>
                    <NewsLetter />
                </div>
            </section>
        </Layout>
    )
}

export default Home


