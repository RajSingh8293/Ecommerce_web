/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import { Link, NavLink, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendApi } from "../../constant/backendApi";

import { createOrder } from "../../store/slices/orderSlice";
import { toast } from "react-toastify";
import { currencySymbol } from "../../constant/currencySymbol";



const ConfirmOrder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { shippingInfo, cartItems } = useSelector((state) => state.cartItems)


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    )

    const shippingCharge = subtotal > 2000 ? 0 : 500
    const tax = Math.round((subtotal * 0.18).toFixed(2))
    const totalPrice = Number((subtotal + shippingCharge + tax).toFixed(2))
    const address = `${shippingInfo?.address},${shippingInfo?.state},${shippingInfo?.city},${shippingInfo?.zipcode}`



    const paymentHandler = (e) => {

        e.preventDefault()
        const data = {
            subtotal,
            shippingCharge,
            tax,
            totalPrice,
        }
        localStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }



    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (

        <Layout>
            <section className="py-24 relative lg:px-10 px-5 ">

                <div className="py-8">
                    <CheckoutSteps activeStep={1} />
                </div>
                <div className="lg:flex lg:justify-between">
                    <div className="w-[100%] lg:w-[60%] md:w-[100%]">
                        <div className="py-3 w-[100%]">
                            <div>
                                <h1 className=" py-3 text-3xl font-bold text-gray-800">Shipping Details </h1>

                                <h1 className="address">
                                    Name:{' '}
                                    <span>
                                        {shippingInfo?.firstname} {shippingInfo?.lastname}
                                    </span>
                                </h1>
                                <h1 className="address">
                                    Phone: <span>{shippingInfo?.phone}</span>
                                </h1>
                                <h1 className="address">
                                    Country: <span>{shippingInfo?.country}</span>
                                </h1>
                                <h1 className="address">
                                    State: <span>{shippingInfo?.state}</span>
                                </h1>
                                <h1 className="address">
                                    Address: <span>{address}</span>
                                </h1>
                            </div>
                        </div>

                        <div className="w-[100%] md:w-[100%] py-5">
                            <div className="main-box flex gap-3 flex-col p-3 border-gray-200 rounded-xl max-w-xl ">
                                {cartItems &&
                                    cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-around items-center py-2 border-b-2"
                                        >
                                            <div className="h-[70px] flex justify-center items-center">
                                                <img className="h-[100%]" src={item?.productImage?.url} alt="" />
                                            </div>
                                            <div>
                                                <p>
                                                    <span className="text-gray-800 text-sm">Name: </span>
                                                    <span className="text-gray-600 text-sm ml-3">{item?.name}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-800 text-sm">Size : </span>
                                                    <span className="text-gray-600 text-sm ml-3">{item?.size}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-800 text-sm"> Color : </span>
                                                    <span className="text-gray-600 text-sm ml-3">{item?.color}</span>
                                                </p>

                                            </div>

                                            <p>
                                                <span>
                                                    {item?.quantity} X {item?.price} =
                                                </span>
                                                <span> {currencySymbol}{item?.quantity * item?.price}</span>
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[40%] w-[100%] sm:w-[100%] md:w-[100%]  flex gap-3 flex-col py-8  mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 ">
                        <h1 className="lg:text-3xl text-3xl font-bold text-gray-800  py-3 ">
                            Order Summery
                        </h1>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal :</p>
                            <p className="text-gray-700">{currencySymbol} {subtotal}</p>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Shipping Fee : </p>
                            <p className="text-gray-700">{currencySymbol} {shippingCharge}</p>
                        </div>
                        <div className=" mb-2 flex justify-between">
                            <p className="text-gray-700">
                                GST <span className="text-sm">(18%)</span> :
                            </p>
                            <p className="text-gray-700">{currencySymbol} {tax}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">{currencySymbol} {totalPrice}</p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full btn"
                            onClick={paymentHandler}
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>


                <div className="absolute mt-5 top-16 lg:left-10 left-5">
                    <button className="bg-black rounded p-1 px-2 text-white ">
                        <Link className="text-sm font-semibold flex justify-between items-center" to='/checkout'>
                            <span>
                                <svg className="fill-current mr-2 text-white w-4" viewBox="0 0 448 512">
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                            </span>
                            <span>
                                Back
                            </span>
                        </Link>
                    </button>
                </div>
            </section>
        </Layout>
    )
}

export default ConfirmOrder