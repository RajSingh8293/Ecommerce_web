/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"

import { Pagination, Slider, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../../components/ProductCard"
import { fetchProducts } from "../../store/slices/ProductSlice"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from "../../components/Loader"


const catArray = ["Men", "Women", "Kids"]
const menAndKidsTypesArray = ["Shirts", "T-Shirts", "Pants", "Jackets"]
const womenTypesArray = ["Shirts", "T-Shirts", "Pants", "Jackets", "Sleeves"]
const forAllTypes = ["Shirts", "T-Shirts", "Pants", "Jackets", "Sleeves"]
const filterByColor = ["Gray", "White", "Black", "Pink", "Blue", "Yellow", "Orange", "Purple"]

const Products = () => {
    const { products, loading, pages, filterProductCount } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [color, setColor] = useState("")
    const [price, setPrice] = useState([0, 10000])
    const [currentPage, setCurrentPage] = useState(1)


    const productCopy = [...products]
    const namedata = productCopy?.filter((data) => data?.name)

    const handleCategoryChange = (category) => {
        setCategory(category)
    }

    const handleTypeChange = (type) => {
        setType(type)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };


    let count = filterProductCount


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    useEffect(() => {
        dispatch(fetchProducts(keyword, currentPage, category, type, color, price))

    }, [dispatch, keyword, currentPage, color, category, type, price])
    return (

        <Layout>
            <section className="lg:px-10 px-5 py-24 min-h-[80vh]">

                <div className=" bg-white w-full min-h-[80vh] flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden  py-4 md:w-1/3 lg:w-1/4 md:block">
                        <div className="pr-5 flex flex-col gap-2 border-r border-indigo-100 top-12" >
                            <div>
                                <div >
                                    <div className="flex gap-3 flex-col ">
                                        <div className="">
                                            <h1 className="py-2 text-lg font-medium text-secondary-900 group-open:text-primary-500" >
                                                Category
                                            </h1>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                            >
                                                {catArray.map((data, index) =>
                                                    <FormControlLabel key={index} value={data} onChange={() => handleCategoryChange(data)} control={
                                                        <Radio size="small" sx={{
                                                            '&.Mui-checked': {
                                                                color: "tomato",
                                                            },
                                                        }}
                                                        />}
                                                        label={data}
                                                    />

                                                )
                                                }
                                            </RadioGroup>

                                        </div>


                                        <div>
                                            <details className="group" close="true">
                                                <summary
                                                    className="flex cursor-pointer list-none items-center justify-between py-2 text-lg font-medium text-secondary-900 group-open:text-primary-500">
                                                    Types
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                        </svg>
                                                    </div>
                                                </summary>
                                                <div className="text-secondary-500">
                                                    {category && category === "Men" || category === "Kids" || keyword === "kid" || keyword === "kids" || keyword === "Kid" || keyword === "Kids" || keyword === "Men" || keyword === "Mens" || keyword === "men" || keyword === "mens" ?
                                                        <>
                                                            {
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    defaultValue="female" name="radio-buttons-group">
                                                                    {menAndKidsTypesArray.map((type, index) =>
                                                                        <FormControlLabel key={index}
                                                                            className="capitalize cursor-pointer"
                                                                            value={type}
                                                                            onClick={() => handleTypeChange(type)}
                                                                            control={<Radio size="small"
                                                                                sx={{
                                                                                    '&.Mui-checked': {
                                                                                        color: "tomato",
                                                                                    },
                                                                                    '& .MuiSvgIcon-root': {
                                                                                        fontSize: 18,
                                                                                    }
                                                                                }}
                                                                            />}
                                                                            label={type}
                                                                        />)}
                                                                </RadioGroup>

                                                            }

                                                        </>
                                                        :
                                                        category === "Women" ?
                                                            <>
                                                                {
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        defaultValue="female" name="radio-buttons-group">
                                                                        {womenTypesArray.map((type, index) =>
                                                                            <FormControlLabel key={index}
                                                                                className="capitalize cursor-pointer"
                                                                                value={type}
                                                                                onClick={() => handleTypeChange(type)}
                                                                                control={<Radio size="small"
                                                                                    sx={{
                                                                                        '&.Mui-checked': {
                                                                                            color: "tomato",
                                                                                        },
                                                                                        '& .MuiSvgIcon-root': {
                                                                                            fontSize: 18,
                                                                                        }
                                                                                    }}
                                                                                />}
                                                                                label={type}
                                                                            />)}
                                                                    </RadioGroup>

                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        defaultValue="female" name="radio-buttons-group">
                                                                        {forAllTypes.map((category, index) =>
                                                                            <FormControlLabel key={index}
                                                                                className="capitalize cursor-pointer"
                                                                                value={category}
                                                                                onClick={() => handleTypeChange(category)}
                                                                                control={<Radio size="small"
                                                                                    sx={{
                                                                                        '&.Mui-checked': {
                                                                                            color: "tomato",
                                                                                        },
                                                                                        '& .MuiSvgIcon-root': {
                                                                                            fontSize: 18,
                                                                                        }
                                                                                    }} />}
                                                                                label={category}
                                                                            />)}
                                                                    </RadioGroup>
                                                                }
                                                            </>
                                                    }
                                                </div>
                                            </details>
                                        </div>

                                        <div>
                                            <details className="group" close="true">
                                                <summary
                                                    className="flex cursor-pointer list-none items-center justify-between py-2 text-lg font-medium text-secondary-900 group-open:text-primary-500">
                                                    Colors
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                        </svg>
                                                    </div>
                                                </summary>
                                                <div className=" text-secondary-500">
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female" name="radio-buttons-group">
                                                        {filterByColor.map((color, index) =>
                                                            <FormControlLabel key={index}
                                                                value={color}
                                                                className="capitalize cursor-pointer text-sm"
                                                                onClick={() => setColor(color)}
                                                                control={<Radio size="small" sx={{
                                                                    '&.Mui-checked': {
                                                                        color: "tomato",
                                                                    },
                                                                    '& .MuiSvgIcon-root': {
                                                                        fontSize: 18,
                                                                    }
                                                                }} />}
                                                                label={color}
                                                            />)}
                                                    </RadioGroup>
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex gap-3 flex-col ">
                                    <h1 className="py-2 text-lg font-medium text-secondary-900 group-open:text-primary-500" >
                                        Filter By Price
                                    </h1>
                                    <div className="px-5">
                                        <Slider
                                            value={price}
                                            onChange={priceHandler}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            color="dark"
                                            size="small"
                                            min={0}
                                            max={10000}
                                        />
                                    </div>
                                </div>
                                <div >

                                </div>


                            </div>
                        </div>
                    </aside>

                    <main className="w-full min-h-screen py-8">
                        {
                            loading ?
                                <Loader />
                                :
                                <div>
                                    <div className="py-4">
                                        <h1 className=" font-bold opacity-50">Showing {products?.length} Items {category && `of ${category}`} {type}</h1>
                                    </div>

                                    <div className="flex gap-4 items-center justify-end py-4">
                                        <div className="mobile-filter lg:hidden md:hidden " >
                                            <div className="flex gap-3 flex-col">
                                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex gap-2 items-center border space-x-2 p-2">
                                                    <option >Category</option>
                                                    {catArray.map((category, index) =>
                                                        <option className="p-2" key={index}
                                                        >
                                                            {category}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mobile-filter lg:hidden md:hidden " >
                                            <div className="flex gap-3 ">
                                                <select value={type} onChange={(e) => setType(e.target.value)} className="flex gap-2 items-center border space-x-2  p-2">
                                                    <option value="">Types</option>
                                                    {menAndKidsTypesArray.map((type, index) =>
                                                        <option className=" p-2" value={type} key={index}>
                                                            {type}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        products.length > 0 ?
                                            <div className="grid items-center  gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">

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

                        }
                    </main>
                </div >

                <Divider />
                <div className="flex justify-center py-5">
                    <Pagination count={pages} onChange={setCurrentPageNo} />
                </div>


            </section >





        </Layout >
    )
}

export default Products







