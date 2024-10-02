/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import { fetchAdminOrders } from '../../store/slices/orderSlice';
import { fetchAllUsers } from '../../store/slices/userSlice';
import { fetchAdminProducts } from '../../store/slices/AdminProductsSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { PieChart } from '@mui/x-charts/PieChart';


import { BarChart } from '@mui/x-charts/BarChart';
import AdminNavbar from '../../components/AdminNavbar';
import { currencySymbol } from '../../constant/currencySymbol';


const Dashboard = () => {
    const dispatch = useDispatch()
    const { adminOrders: orders } = useSelector((state) => state.orders)
    const { allUsers } = useSelector((state) => state.user)
    const { adminProducts: products, loading, pages } = useSelector((state) => state.adminProducts)


    const totalPrice = orders.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0,
    )

    const desktopOS = []

    useEffect(() => {
        dispatch(fetchAdminOrders())
        dispatch(fetchAdminProducts())
        dispatch(fetchAllUsers())
    }, [dispatch])
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    const [womenCat, setWomenCat] = useState([])
    const [menCat, setMenCat] = useState([])
    const [kidsCat, setKidsCat] = useState([])
    useEffect(() => {
        const WomenCategory = products?.filter((item) => item.category === "Women")
        setWomenCat(WomenCategory)
        const menCategory = products?.filter((item) => item.category === "Men")
        setMenCat(menCategory)
        const kidsCategory = products?.filter((item) => item.category === "Kids")
        setKidsCat(kidsCategory)

    }, [products])


    return (
        // <Layout>
        <>
            <AdminNavbar />
            <section className="lg:px-10 px-5  overflow-hidden ">
                <Sidebar />
                <div className='py-24 lg:pl-64  w-full'>
                    <div className="">
                        <div className='flex justify-between '>
                            <div
                                className=' w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 '>
                                <div
                                    className='col-span-1 flex flex-wrap flex-row sm:flex-col justify-center items-center w-full p-5 bg-white rounded-md shadow-xl border-l-4 border-blue-300'>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="p-2">
                                                <ListAltOutlinedIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="flex items-center pb-1 pt-1 text-xs px-3 bg-blue-200 text-blue-800 rounded-full">100%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-4xl">
                                            {products?.length}
                                        </div>
                                        <div className="font-bold text-sm">
                                            Total Products
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='col-span-1 flex flex-wrap flex-row sm:flex-col justify-center items-center w-full p-5 bg-white rounded-md shadow-xl border-l-4 border-purple-300'>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="p-2">
                                                <LayersOutlinedIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="flex items-center pb-1 pt-1 text-xs px-3 bg-purple-200 text-purple-800 rounded-full">25%</div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className="font-bold text-4xl text-center">
                                            {orders?.length}
                                        </div>
                                        <div className="font-bold text-sm">
                                            Total Orders
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='col-span-1 flex flex-wrap flex-row sm:flex-col justify-center items-center w-full p-5 bg-white rounded-md shadow-xl border-l-4 border-red-300'>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="p-2">
                                                <PersonOutlineIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="flex items-center pb-1 pt-1 text-xs px-3 bg-red-200 text-red-800 rounded-full">50%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-4xl text-center">
                                            {allUsers?.length}
                                        </div>
                                        <div className="font-bold text-sm">
                                            Total User
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className=' col-span-1 flex flex-wrap flex-row sm:flex-col justify-center items-center w-full p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300'>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="p-2">
                                                <PaymentsOutlinedIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="flex items-center pt-1 pb-1 text-xs px-3 bg-green-200 text-green-800 rounded-full">25%</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-4xl text-center">
                                            {currencySymbol}{totalPrice}
                                        </div>
                                        <div className="font-bold text-sm">
                                            Total Sell
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-10  grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                            <div>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                    width={500}
                                    height={300}
                                    sx={{
                                        zIndex: -1
                                    }}
                                />
                            </div>
                            <div>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: womenCat?.length, label: 'Women' },
                                                { id: 1, value: menCat?.length, label: 'Men' },
                                                { id: 2, value: kidsCat.length, label: 'Kids' },
                                            ],

                                        },
                                    ]}

                                    width={400}
                                    height={200}
                                    sx={{
                                        zIndex: -1
                                    }}
                                />
                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </>
        // </Layout>
    )
}

export default Dashboard