/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from 'react-router-dom'
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ViewListIcon from '@mui/icons-material/ViewList';
import { logoutUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUserHandler = async () => {
        dispatch(logoutUser())
        navigate('/')
    }
    return (
        <>
            <section className=''>
                <aside className="lg:fixed hidden lg:block z-20  bg-white   top-24 left-0  w-64 h-screen transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                    <div className="h-full px-4 bg-white  pb-4 overflow-y-auto  dark:bg-gray-800">

                        <ul className="space-y-2 font-medium">
                            <li>
                                <NavLink to="/dashboard" className="flex items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <DashboardRoundedIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin-products" className="flex items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <ViewListIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin-orders" className="flex items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LibraryAddCheckIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/users" className="flex items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <PeopleAltRoundedIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/add-product" className="flex items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <QueueRoundedIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
                                </NavLink>
                            </li>
                            <li>
                                <p
                                    onClick={logoutUserHandler}
                                    className="flex cursor-pointer  items-center sideNavLinks p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LogoutIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Logput</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </aside>
            </section>

        </>
    )
}

export default Sidebar