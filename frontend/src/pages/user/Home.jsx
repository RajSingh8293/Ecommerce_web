
import Hero from "../../components/Hero"
import Layout from "../../components/Layout"
import ProductCarousal from "../../components/ProductCarousal"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/slices/ProductSlice';
import NewsLetter from "../../components/NewsLetter";
import Categories from "../../components/Categories";
import Title from "../../components/Title";

const Home = () => {
    const dispatch = useDispatch()

    const { products } = useSelector((state) => state.products)

    const productsCopy = [...products]

    const filterHandler = (cat) => {
        const filterData = productsCopy?.filter((item) => item.category === cat)
        return filterData
    }
    const FeaturedHandler = () => {
        const filterData = productsCopy?.filter((item) => item.featured === true)
        return filterData
    }

    useEffect(() => {
        dispatch(fetchProducts())

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
                <div className="lg:px-10 px-5 py-8">
                    <Title title="Our Categories" />
                    <Categories />
                </div>

                <div className="lg:px-10 px-5 pt-10">
                    <Title title="Best Seller Products" />
                    <ProductCarousal products={FeaturedHandler()} />
                </div>

                <div className="lg:px-10 px-5 pt-10">
                    <Title title="Men Products" />
                    <ProductCarousal products={filterHandler("Men")} />
                </div>


                <div className="lg:px-10 px-5 pt-10">
                    <Title title="Women Products" />
                    <ProductCarousal products={filterHandler("Women")} />
                </div>

                <div className="lg:px-10 px-5 pt-10">
                    <Title title="Kids Products" />
                    <ProductCarousal products={filterHandler("Kids")} />
                </div>

                <div className="pt-10">
                    <Title title="Our Newsletter " />
                    <NewsLetter />
                </div>
            </section>
        </Layout>
    )
}

export default Home


