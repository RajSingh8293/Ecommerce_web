/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import Layout from "../components/Layout"

import { Pagination, Slider, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { fetchProducts } from "../store/slices/ProductSlice"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from "../components/Loader"


const catArray = ["Men", "Women", "Kids"]
const typesArray = ["Shirts", "T-Shirts", "Pents", "Jackets", "Kurta"]
const nameWomen = ["Shirt", "T-Shirt", "Pent", "Jacket", "Lahenga", "Kurti", "Mandarin Collar", "Sleeves"]
const nameAll = ["Shirt", "T-Shirt", "Pent", "Jacket", "Lahenga", "Kurti", "Saari", "Blouse"]
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
    console.log(count);

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
                                            <details className="group" close>
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
                                                                    {typesArray.map((category, index) =>
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
                                                                                }}
                                                                            />}
                                                                            label={category}
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
                                                                        {nameWomen.map((category, index) =>
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
                                                                                    }}
                                                                                />}
                                                                                label={category}
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
                                                                        {nameAll.map((category, index) =>
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
                                            <details class="group" close>
                                                <summary
                                                    class="flex cursor-pointer list-none items-center justify-between py-2 text-lg font-medium text-secondary-900 group-open:text-primary-500">
                                                    Colors
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" class="block h-5 w-5 group-open:hidden">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" class="hidden h-5 w-5 group-open:block">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                        </svg>
                                                    </div>
                                                </summary>
                                                <div class=" text-secondary-500">
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
                                        <h1 className=" font-bold opacity-50">Showing {products?.length} Items</h1>
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
                                                    {typesArray.map((type, index) =>
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

                {/* {resulPerPage < count &&
                    <div className="flex justify-end">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resulPerPage}
                            totalItemsCount={totalProducts}
                            onChange={setCurrentPageNo}
                            pageRangeDisplayed={5}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkClass"
                        />
                    </div>} */}

                <div className="flex justify-center py-5">
                    <Pagination count={pages} onChange={setCurrentPageNo} />
                </div>
                <Divider />


            </section >





        </Layout >
    )
}

export default Products








// 'use client'

// import { useState } from 'react'
// import {
//     Dialog,
//     DialogBackdrop,
//     DialogPanel,
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuItems,
// } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

// const sortOptions = [
//     { name: 'Most Popular', href: '#', current: true },
//     { name: 'Best Rating', href: '#', current: false },
//     { name: 'Newest', href: '#', current: false },
//     { name: 'Price: Low to High', href: '#', current: false },
//     { name: 'Price: High to Low', href: '#', current: false },
// ]
// const subCategories = [
//     { name: 'Totes', href: '#' },
//     { name: 'Backpacks', href: '#' },
//     { name: 'Travel Bags', href: '#' },
//     { name: 'Hip Bags', href: '#' },
//     { name: 'Laptop Sleeves', href: '#' },
// ]
// const filters = [
//     {
//         id: 'color',
//         name: 'Color',
//         options: [
//             { value: 'white', label: 'White', checked: false },
//             { value: 'beige', label: 'Beige', checked: false },
//             { value: 'blue', label: 'Blue', checked: true },
//             { value: 'brown', label: 'Brown', checked: false },
//             { value: 'green', label: 'Green', checked: false },
//             { value: 'purple', label: 'Purple', checked: false },
//         ],
//     },
//     {
//         id: 'category',
//         name: 'Category',
//         options: [
//             { value: 'new-arrivals', label: 'New Arrivals', checked: false },
//             { value: 'sale', label: 'Sale', checked: false },
//             { value: 'travel', label: 'Travel', checked: true },
//             { value: 'organization', label: 'Organization', checked: false },
//             { value: 'accessories', label: 'Accessories', checked: false },
//         ],
//     },
//     {
//         id: 'size',
//         name: 'Size',
//         options: [
//             { value: '2l', label: '2L', checked: false },
//             { value: '6l', label: '6L', checked: false },
//             { value: '12l', label: '12L', checked: false },
//             { value: '18l', label: '18L', checked: false },
//             { value: '20l', label: '20L', checked: false },
//             { value: '40l', label: '40L', checked: true },
//         ],
//     },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Products() {
//     const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

//     return (
//         <div className="bg-white">
//             <div>
//                 {/* Mobile filter dialog */}
//                 <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
//                     <DialogBackdrop
//                         transition
//                         className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//                     />

//                     <div className="fixed inset-0 z-40 flex">
//                         <DialogPanel
//                             transition
//                             className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
//                         >
//                             <div className="flex items-center justify-between px-4">
//                                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                                 <button
//                                     type="button"
//                                     onClick={() => setMobileFiltersOpen(false)}
//                                     className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                                 >
//                                     <span className="sr-only">Close menu</span>
//                                     <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                                 </button>
//                             </div>

//                             {/* Filters */}
//                             <form className="mt-4 border-t border-gray-200">
//                                 <h3 className="sr-only">Categories</h3>
//                                 <ul role="list" className="px-2 py-3 font-medium text-gray-900">
//                                     {subCategories.map((category) => (
//                                         <li key={category.name}>
//                                             <a href={category.href} className="block px-2 py-3">
//                                                 {category.name}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 {filters.map((section) => (
//                                     <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
//                                         <h3 className="-mx-2 -my-3 flow-root">
//                                             <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                                                 <span className="font-medium text-gray-900">{section.name}</span>
//                                                 <span className="ml-6 flex items-center">
//                                                     <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
//                                                     <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
//                                                 </span>
//                                             </DisclosureButton>
//                                         </h3>
//                                         <DisclosurePanel className="pt-6">
//                                             <div className="space-y-6">
//                                                 {section.options.map((option, optionIdx) => (
//                                                     <div key={option.value} className="flex items-center">
//                                                         <input
//                                                             defaultValue={option.value}
//                                                             defaultChecked={option.checked}
//                                                             id={`filter-mobile-${section.id}-${optionIdx}`}
//                                                             name={`${section.id}[]`}
//                                                             type="checkbox"
//                                                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label
//                                                             htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                                             className="ml-3 min-w-0 flex-1 text-gray-500"
//                                                         >
//                                                             {option.label}
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </DisclosurePanel>
//                                     </Disclosure>
//                                 ))}
//                             </form>
//                         </DialogPanel>
//                     </div>
//                 </Dialog>

//                 <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
//                         <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

//                         <div className="flex items-center">
//                             <Menu as="div" className="relative inline-block text-left">
//                                 <div>
//                                     <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                                         Sort
//                                         <ChevronDownIcon
//                                             aria-hidden="true"
//                                             className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                                         />
//                                     </MenuButton>
//                                 </div>

//                                 <MenuItems
//                                     transition
//                                     className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                                 >
//                                     <div className="py-1">
//                                         {sortOptions.map((option) => (
//                                             <MenuItem key={option.name}>
//                                                 <a
//                                                     href={option.href}
//                                                     className={classNames(
//                                                         option.current ? 'font-medium text-gray-900' : 'text-gray-500',
//                                                         'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
//                                                     )}
//                                                 >
//                                                     {option.name}
//                                                 </a>
//                                             </MenuItem>
//                                         ))}
//                                     </div>
//                                 </MenuItems>
//                             </Menu>

//                             <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
//                                 <span className="sr-only">View grid</span>
//                                 <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setMobileFiltersOpen(true)}
//                                 className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//                             >
//                                 <span className="sr-only">Filters</span>
//                                 <FunnelIcon aria-hidden="true" className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </div>

//                     <section aria-labelledby="products-heading" className="pb-24 pt-6">
//                         <h2 id="products-heading" className="sr-only">
//                             Products
//                         </h2>

//                         <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//                             {/* Filters */}
//                             <form className="hidden lg:block">
//                                 <h3 className="sr-only">Categories</h3>
//                                 <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
//                                     {subCategories.map((category) => (
//                                         <li key={category.name}>
//                                             <a href={category.href}>{category.name}</a>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 {filters.map((section) => (
//                                     <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
//                                         <h3 className="-my-3 flow-root">
//                                             <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                                                 <span className="font-medium text-gray-900">{section.name}</span>
//                                                 <span className="ml-6 flex items-center">
//                                                     <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
//                                                     <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
//                                                 </span>
//                                             </DisclosureButton>
//                                         </h3>
//                                         <DisclosurePanel className="pt-6">
//                                             <div className="space-y-4">
//                                                 {section.options.map((option, optionIdx) => (
//                                                     <div key={option.value} className="flex items-center">
//                                                         <input
//                                                             defaultValue={option.value}
//                                                             defaultChecked={option.checked}
//                                                             id={`filter-${section.id}-${optionIdx}`}
//                                                             name={`${section.id}[]`}
//                                                             type="checkbox"
//                                                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
//                                                             {option.label}
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </DisclosurePanel>
//                                     </Disclosure>
//                                 ))}
//                             </form>

//                             {/* Product grid */}
//                             <div className="lg:col-span-3">{/* Your content */}</div>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </div>
//     )
// }




