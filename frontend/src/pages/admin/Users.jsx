/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import { backendApi } from "../../constant/backendApi";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteUserAccount, fetchAllUsers, updateUserRoleByAdmin } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/AdminNavbar";

const Users = () => {
    const dispatch = useDispatch()
    const [role, setRole] = useState("")
    const { allUsers: users } = useSelector((state) => state.user)


    const updateUserRole = async (e, userId) => {
        dispatch(updateUserRoleByAdmin({ role: e.target.value }, userId))
    }
    const deleteUserRole = async (userId) => {
        dispatch(deleteUserAccount(userId))
    }


    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])
    return (
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-gray-600 font-bold'>Total Users {users?.length}</h1>
                        </div>

                        <div className=" mt-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                    <caption>A basic table example with a caption</caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Email</TableCell>
                                            <TableCell align="right">Role</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users?.length > 0 && users?.map((user) => (
                                            <TableRow key={user?._id}>
                                                <TableCell className='curser-pointer' component="th" scope="row"
                                                >
                                                    {user?._id?.slice(0, 10)}...
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <img className='h-[50px] w-[50px]' src={user?.avtar?.url ? user?.avtar?.url : "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"} alt="product image" />
                                                </TableCell>
                                                <TableCell align="right" >{user?.username}</TableCell>
                                                <TableCell align="right">{user?.email}</TableCell>
                                                <TableCell>
                                                    <div className="selectBg w-[150px]">
                                                        <select className="capitalize w-full border-2 border-gray-600 rounded py-2 px-4 outline-none "
                                                            value={role}
                                                            onChange={(e) => updateUserRole(e, user?._id)}
                                                        >
                                                            <option className="hover:bg-black ">{user?.role}</option>
                                                            <option className="hover:bg-black" value="user">User</option>
                                                            <option className="" value="admin">Admin</option>
                                                        </select>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <button
                                                        onClick={() => deleteUserRole(user?._id)}
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
                    <div className="flex justify-center py-5">
                        {/* <Pagination count={10} onChange={setCurrentPageNo} /> */}
                        {/* <Pagination count={pages} onChange={setCurrentPageNo} /> */}
                    </div>
                </div>
            </section>
        </ >
    )
}

export default Users