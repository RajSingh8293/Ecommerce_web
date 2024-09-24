/* eslint-disable no-unused-vars */
import axios from "axios"
import Layout from "../../components/Layout"
import Sidebar from "../../components/Sidebar"
import { backendApi } from "../../constant/backendApi"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchSingleOrder, updateAdminOrderStatus } from "../../store/slices/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import AdminNavbar from "../../components/AdminNavbar"

const Orderdetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [status, setStatus] = useState("")
    const { singleOrder: order, message } = useSelector((state) => state.orders)

    // console.log("order :", order);
    const updateOrderStatus = async (e, orderId) => {
        dispatch(updateAdminOrderStatus({ orderStatus: e.target.value }, orderId))
    }

    useEffect(() => {
        dispatch(fetchSingleOrder(id))
    }, [dispatch, id])
    return (
        <>

            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <div className=''>
                            <div className="w-full max-w-7xl lg:px-4 px-2 md:px-5 lg-6 mx-auto py-5">
                                <div className="main-box border border-gray-200  pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                                    <div className="flex flex-col lg:flex-row  justify-between px-6 pb-6 border-b border-gray-200">
                                        <div className="data">
                                            <p className="font-semibold text-base  text-black">Order Id: <span className="ml-2 text-gray-600 font-bold">{order?._id}</span></p>
                                            <p className="font-semibold text-base  text-black mt-4">
                                                Order Payment :
                                                <span className="ml-2 text-gray-600 font-bold">
                                                    {order?.paidAt?.split("T")[0]}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="lg:flex gap-3 lg:py-0 flex items-center">
                                                <h1 className=" font-semibold text-base text-black ">Order Status : </h1>
                                                <p
                                                >

                                                    <div className="selectBg">
                                                        <select
                                                            className={`text-sm text-gray-800 p-0.5 px-4 rounded-full ${order.orderStatus === `Delivered`
                                                                ? `bg-green-400 font-semibold`
                                                                : `bg-[red] font-semibold`
                                                                }`}
                                                            value={status}
                                                            onChange={(e) => updateOrderStatus(e, order?._id)}
                                                        >
                                                            <option> {order?.orderStatus}</option>
                                                            {order?.orderStatus === "Processing" ? "" : <option value="Processing">Processing</option>}
                                                            {order?.orderStatus === "Shipped" ? "" : <option value="Shipped">Shipped</option>}
                                                            {order?.orderStatus === "Delivered" ? "" : <option value="Delivered">Delivered</option>}
                                                        </select>
                                                    </div>
                                                </p>
                                            </div>

                                            <div className="flex gap-3 items-center">
                                                <p className="font-semibold text-base  text-black ">
                                                    Expected Delivery Time</p>
                                                <p className="text-gray-600 font-bold">
                                                    2024-09-30
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="py-5 flex justify-between flex-wrap border-b border-gray-200 ">
                                        <div className="px-8">
                                            <h1 className="py-4 text-xl">Shipping Details </h1>
                                            {order?.shippingInfo &&
                                                order?.shippingInfo?.map((data, index) => (
                                                    <div key={index} className="flex flex-col gap-2">
                                                        <div className="flex gap-5">
                                                            <h1>Name : </h1>
                                                            <p className="">
                                                                <span className="mr-2 capitalize">
                                                                    {data?.firstname}
                                                                </span>
                                                                <span className="capitalize">{data?.lastname}</span>
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-5">
                                                            <h1>Phone : </h1>
                                                            <span>{data?.phone}</span>
                                                        </div>
                                                        <div className="flex gap-5">
                                                            <h1>Country : </h1>
                                                            <span>{data?.country}</span>
                                                        </div>
                                                        <div className="flex gap-5">
                                                            <h1>Address : </h1>
                                                            <span>{`${data?.address}, ${data?.state}, ${data?.city}, ${data?.zipcode}`}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="px-8">
                                            <h1 className="py-4 text-xl">Payment Details </h1>

                                            <div className="flex flex-col  gap-2">
                                                <div className="flex items-center gap-5">
                                                    <h1>Payment ID : </h1>
                                                    <p>
                                                        <span className="mr-2">{order?.paymentInfo?.id}</span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <h1 >Payment Status : </h1>
                                                    <span
                                                        className={
                                                            order?.paymentInfo?.status === `succeeded`
                                                                ? `text-green-800 text-xl`
                                                                : `text-[red]`
                                                        }
                                                    >
                                                        {order?.paymentInfo?.status === `succeeded`
                                                            ? `PAID`
                                                            : `FAILED`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <h1>Amount : </h1>
                                                    <p>
                                                        <span
                                                            className={
                                                                order?.paymentInfo?.status === `succeeded`
                                                                    ? `text-green-800 text-xl`
                                                                    : `text-red-900 text-xl`
                                                            }
                                                        >
                                                            ${order?.totalPrice}
                                                        </span>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full px-3 min-[400px]:px-6">
                                        {order?.orderItems?.map((orderItem) =>
                                            < div key={orderItem?._id} className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                                <div className="img-box max-lg:w-full">
                                                    <img src={orderItem?.productImage?.url} alt="Premium Watch image"
                                                        className="aspect-square w-[70px]  rounded-xl object-cover" />
                                                </div>

                                                <div className="flex flex-row items-center w-full ">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                                        <div className="flex items-center">
                                                            <div className="">
                                                                <h2 className="font-semibold text-black">
                                                                    {orderItem?.name}</h2>
                                                                <div className="flex items-center pt-2  ">
                                                                    <p
                                                                        className="flex gap-4 items-center font-medium text-sm text-black pr-4 mr-4 border-r border-gray-200">
                                                                        <span>

                                                                            Size:
                                                                        </span>
                                                                        <span className="text-gray-500">S</span>
                                                                    </p>
                                                                    <p className="flex gap-4 items-center font-medium text-sm text-black ">
                                                                        <span>
                                                                            Qty:
                                                                        </span>
                                                                        <span
                                                                            className="text-gray-500">
                                                                            {orderItem?.quantity}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-5 ">
                                                            <div className="col-span-5 lg:col-span-5 flex items-center justify-end max-lg:mt-3">
                                                                <div className="flex gap-3 lg:block">
                                                                    <p className="font-bold text-sm  text-black">Price</p>
                                                                    <p className="lg:mt-4 font-semibold text-xl ">${orderItem?.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </ >
    )
}

export default Orderdetails