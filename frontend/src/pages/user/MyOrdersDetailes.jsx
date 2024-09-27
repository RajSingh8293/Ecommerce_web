import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleOrder } from "../../store/slices/orderSlice"
import { Link, useParams } from "react-router-dom"
import Layout from "../../components/Layout"
import { currencySymbol } from "../../constant/currencySymbol"


const MyOrdersDetailes = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { singleOrder: order } = useSelector((state) => state.orders)
    // console.log("order :", order);


    useEffect(() => {
        dispatch(fetchSingleOrder(id))
    }, [dispatch, id])
    return (
        <Layout>
            <section className=" lg:px-10 px-5 py-24 relative">
                <div className="">
                    <Link className="btn_2 p-1 px-2 rounded-t-lg" to='/my-orders'>Back</Link>
                </div>
                <h1 className='text-2xl font-bold text-gray-600 pb-4 text-center'>Oreder Details </h1>
                <div className="w-full max-w-7xl lg:px-4 px-2 md:px-5 lg-6 mx-auto py-5">
                    <div className="main-box border border-gray-200  pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                        <div className="flex flex-col lg:flex-row  justify-between px-6 pb-6 border-b border-gray-200">
                            <div className="data">
                                <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="ml-2 text-gray-600 font-bold">{order?._id}</span></p>
                                <p className="font-semibold text-base leading-7 text-black mt-4">
                                    Order Payment :
                                    <span className="ml-2 text-gray-600 font-bold">
                                        {order?.paidAt?.split("T")[0]}
                                    </span>
                                </p>
                            </div>
                            <div className="lg:flex lg:py-0 flex items-center gap-5 ">
                                <h1 className="text-2xl lg:py-0  ">Order Status : </h1>
                                <p
                                    className={order?.paymentInfo?.orderStatus === `Delivered`
                                        ? `text-green-800 font-medium text-sm leading-6 whitespace-nowrap bg-emerald-50 py-0.5 px-3 rounded-full  `
                                        : `text-[red] font-medium text-sm leading-6 whitespace-nowrap bg-emerald-100 py-0.5 px-3 rounded-full  `}
                                >
                                    {order && order?.orderStatus}
                                </p>
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
                                    <div className="flex items-center  gap-5">
                                        <h1>Payment Status : </h1>
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
                                                {currencySymbol}{order?.totalPrice}
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
                                                            <span className="text-gray-500">{orderItem?.size}</span>
                                                        </p>
                                                        <p
                                                            className="flex gap-4 items-center font-medium text-sm text-black pr-4 mr-4 border-r border-gray-200">
                                                            <span>
                                                                Color:
                                                            </span>
                                                            <span className="text-gray-500">{orderItem?.color}</span>
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
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-bold text-sm  text-black">Price</p>
                                                        <p className="lg:mt-4 font-semibold text-sm ">{currencySymbol}{orderItem?.price}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block items-center">
                                                        <p className="font-bold text-sm  text-black ">
                                                            Expected Delivery Time</p>
                                                        <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-gray-600">
                                                            23rd December 2024
                                                        </p>
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

            </section>
        </Layout >
    )
}

export default MyOrdersDetailes