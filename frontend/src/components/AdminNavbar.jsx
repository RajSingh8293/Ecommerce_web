import { Avatar } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logoutUser } from "../store/slices/userSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ViewListIcon from '@mui/icons-material/ViewList';

const AdminNavbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const { user } = useSelector((state) => state.user)
    const handleClick = (open) => {
        setOpen(open);
    };

    const handleShowSidebar = (showSidebar) => {
        setShowSidebar(showSidebar);
    };

    const logoutUserHandler = async () => {
        dispatch(logoutUser())
        navigate('/')
    }


    return (
        <section className="fixed w-full lg:px-10 px-5  h-16 flex  py-2  bg-white shadow">
            <div className="flex w-full justify-between  items-center gap-3 text-gray-600 ">
                <div>
                    <h1 className="text-3xl font-bold tomato">
                        <Link to='/dashboard'>LearnCode</Link>
                    </h1>
                </div>
                <div className="flex gap-5 items-center justify-center">

                    <div className="lg:hidden">
                        <button className=" text-gray-600" onClick={() => handleShowSidebar(!showSidebar)}>
                            <MenuIcon sx={{ fontSize: "60" }} />
                        </button>
                    </div>


                    {user &&
                        <div>
                            <Avatar onClick={() => handleClick(!open)} className="capitalize" sx={{ width: 32, height: 32, backgroundColor: "tomato", color: "white", fontWeight: "bold", border: "2px solid tomato" }}>

                                {
                                    user?.avtar?.url ?
                                        <img className="w-full h-full" src={user?.avtar?.url} alt="" />
                                        :
                                        user?.username?.slice(0, 1)
                                }
                            </Avatar>
                        </div>

                    }

                    {open && <div className=" bg-white absolute mt-2 top-16 right-5 border shadow-lg p-4 ">
                        <ul className="flex flex-col gap-4">
                            <li className="" onClick={() => handleClick(!open)}>
                                <NavLink to='/admin-profile' className="flex gap-2  items-center">
                                    <span>
                                        <AccountCircleIcon />
                                    </span>
                                    <span>
                                        Profile
                                    </span>

                                </NavLink>
                            </li>
                            <button onClick={logoutUserHandler} className='flex   gap-2 items-center'>
                                <span>
                                    <LogoutIcon fontSize="small" />
                                </span>
                                <span>
                                    Logout
                                </span>
                            </button>
                        </ul>

                    </div>
                    }

                    {showSidebar &&
                        <section className=" absolute top-16 left-0 ">
                            <div className="bg-white">
                                <aside className=" z-50 navSidebar transition ease duration-300 w-64 h-screen border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                                    <div className=" px-4  py-8 overflow-y-auto  dark:bg-gray-800">
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
                            </div>
                        </section>
                    }
                </div>





            </div>
        </section>

    )
}

export default AdminNavbar