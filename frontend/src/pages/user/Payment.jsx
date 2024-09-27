import Layout from "../../components/Layout"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createOrder } from "../../store/slices/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios"
import { backendApi } from "../../constant/backendApi"
import { clearCartItems } from "../../store/slices/cartSlice"
import { useState } from "react"
import PayLoader from "../../components/PayLoader"
import { currencySymbol } from "../../constant/currencySymbol"

const Payment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { shippingInfo, cartItems } = useSelector((state) => state.cartItems)
    const { user } = useSelector((state) => state.user)

    const orderInfo = JSON.parse(localStorage.getItem("orderInfo"))


    console.log("orderInfo :", orderInfo.totalPrice);


    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice),
        // amount: Math.round(totalPrice * 100),
    }
    let order = {
        shippingInfo: shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        totalPrice: orderInfo?.totalPrice,
        shippingPrice: orderInfo?.shippingCharge,
    }
    const paymentSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${backendApi}/api/v1/payment/process`,
                paymentData,
                {
                    withCredentials: true
                }
            )


            const { clientSecret } = data;
            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    // card: elements.getElement(CardElement),

                    billing_details: {
                        name: user.username,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.zipcode,
                            country: shippingInfo.country,
                        },
                    },
                },
            })
            console.log("result :", result);

            if (result.error) {
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order))
                    toast.success('Payment successfully')
                    dispatch(clearCartItems())
                    navigate('/success')
                    setLoading(false)
                } else {
                    toast.error('There is some issue while proccessing payment')
                }
            }
            setLoading(false)

        } catch (error) {
            console.log(error);

        }

    }

    return (

        <Layout>
            <section className="py-24 min-h-[80vh] lg:px-10 px-5">
                <div className="font-[sans-serif] bg-white p-4">
                    <div className="md:max-w-5xl max-w-xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-5">
                            <div className="lg:col-span-2 max-md:order-1">
                                <h2 className="text-3xl font-extrabold text-gray-800">Make a payment</h2>
                                <p className="text-gray-800 text-sm mt-4">Make payment securly.</p>

                                <form className="mt-8 max-w-lg">
                                    <div className="grid gap-4">

                                        <div className="payCard">

                                            < CardNumberElement />
                                        </div>


                                        <div className="payCard">
                                            <CardCvcElement />
                                        </div>
                                        <div className="payCard">
                                            <CardExpiryElement />
                                        </div>

                                    </div>

                                    <button type="button"
                                        onClick={paymentSubmit}
                                        className="w-full mt-8 py-3.5 btn_2 flex justify-center items-center"> {loading ? <PayLoader /> : `Pay- ${currencySymbol}${orderInfo?.totalPrice}`} </button>
                                </form>
                            </div>

                            <div className=" bg-gray-100 p-6 rounded-md">
                                <h2 className="text-3xl font-extrabold text-gray-800">{currencySymbol}{orderInfo?.totalPrice}</h2>

                                <ul className="text-gray-800 mt-8 space-y-4">
                                    {cartItems && cartItems?.map((item) =>
                                        <li key={item?._id} className="flex flex-wrap gap-4 text-sm">
                                            <span>{item?.name}</span>X<span>{item?.quantity}</span>
                                            <span className="ml-auto font-bold">{currencySymbol}{item?.price * item?.quantity}</span></li>)}
                                    <li className="flex flex-wrap gap-4 text-sm">GST Tax (18%) <span className="ml-auto font-bold">{currencySymbol}{orderInfo?.tax}</span></li>
                                    <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">{currencySymbol}{orderInfo?.totalPrice}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default Payment