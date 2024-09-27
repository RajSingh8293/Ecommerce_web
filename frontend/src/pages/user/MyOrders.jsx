import { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchMyOrders } from '../../store/slices/orderSlice'
import { currencySymbol } from '../../constant/currencySymbol'

const MyOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.user)
    const { myOrders } = useSelector((state) => state.orders)


    useEffect(() => {
        dispatch(fetchMyOrders())

        if (isAuthenticated) {
            navigate('/my-orders')
        }
    }, [isAuthenticated, navigate, dispatch])

    return (
        <Layout>
            <section className=" relative w-[100%] lg:flex flex-col gap-2 min-h-[100vh] md:gap-8 px-8 pt-20 pb-8 lg:py-24">
                <h1 className='text-2xl font-bold text-gray-600 pb-4 text-center'>Your Orders </h1>
                <div className="w-[100%]  relative overflow-x-auto  shadow-md sm:rounded-lg">
                    <table className="w-[100%] py-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="hover:bg-blue-gray-200">
                                <th scope="col" className="px-6 py-3 capitalize text-black font-bold">
                                    Order Id
                                </th>


                                <th scope="col" className="px-6 py-3 capitalize text-black font-bold">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 capitalize text-black font-bold">
                                    Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3 capitalize text-black font-bold">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {myOrders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-blue-gray-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <NavLink
                                            to={`/my-orders/details/${order._id}`}
                                            className="bg-light-blue-400 py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-3"
                                        >
                                            {order._id}
                                        </NavLink>
                                    </th>


                                    <td className="px-6 py-4">{order?.orderItems?.length}</td>
                                    <td className="px-6 py-4">{currencySymbol}{order?.totalPrice}</td>
                                    <td
                                        className={`text-sm text-gray-800 ${order.orderStatus === `Delivered`
                                            ? `text-green-800 font-semibold`
                                            : `text-red-700 font-semibold`
                                            }`}
                                    >
                                        {order.orderStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout >
    )
}

export default MyOrders