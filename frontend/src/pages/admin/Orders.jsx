/* eslint-disable no-unused-vars */
import Layout from "../../components/Layout"
import Sidebar from "../../components/Sidebar"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch, useSelector } from "react-redux"
import { deleteAdminOrders, fetchAdminOrders, updateAdminOrderStatus } from "../../store/slices/orderSlice"
import AdminNavbar from "../../components/AdminNavbar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const Orders = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState("")
    const { adminOrders: orders } = useSelector((state) => state.orders)

    const deleteAdminOrder = async (id) => {
        dispatch(deleteAdminOrders(id))
        dispatch(fetchAdminOrders())
    }

    const updateOrderStatus = async (e, orderId) => {
        dispatch(updateAdminOrderStatus({ orderStatus: e.target.value }, orderId))
    }


    useEffect(() => {
        dispatch(fetchAdminOrders())
    }, [dispatch])

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl mb-5 text-gray-600 font-bold '>Total  Orders ({orders?.length})</h1>
                        </div>

                        <div className=" mt-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order Id</TableCell>
                                            <TableCell>Items</TableCell>
                                            <TableCell align="right">Total Amount</TableCell>
                                            <TableCell align="right">Order Date</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders?.length > 0 && orders?.map((order) => (
                                            <TableRow key={order?._id}>
                                                <TableCell className='curser-pointer' component="th" scope="row"
                                                >
                                                    <NavLink
                                                        to={`/orders/details/${order._id}`}
                                                        className="bg-light-blue-400 py-1 px-2 rounded font-medium text-black dark:text-blue-500 hover:underline  mr-3"
                                                    >
                                                        {order._id}
                                                    </NavLink>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {order?.orderItems?.length}
                                                </TableCell>
                                                <TableCell align="right" >
                                                    <p className="w-[100px]">
                                                        ¥{order?.totalPrice}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="right" >
                                                    <p className="w-[100px]">{order?.createdAt?.split("T")[0]}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <select
                                                        className={`text-sm text-gray-800 p-0.5 px-4 rounded-full ${order.orderStatus === `Delivered`
                                                            ? `bg-green-400 font-semibold`
                                                            : `bg-blue-400 font-semibold`
                                                            }`}
                                                        value={status}
                                                        onChange={(e) => updateOrderStatus(e, order?._id)}
                                                    >
                                                        <option> {order?.orderStatus}</option>
                                                        {order?.orderStatus === "Processing" ? "" : <option value="Processing">Processing</option>}
                                                        {order?.orderStatus === "Shipped" ? "" : <option value="Shipped">Shipped</option>}
                                                        {order?.orderStatus === "Delivered" ? "" : <option value="Delivered">Delivered</option>}
                                                    </select>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <button
                                                        onClick={() => deleteAdminOrder(order?._id)}
                                                        className="btn_2 p-1 text-red-600 rounded"
                                                    ><DeleteRoundedIcon /></button>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Orders