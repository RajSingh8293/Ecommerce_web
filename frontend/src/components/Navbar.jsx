/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { CiMenuFries } from "react-icons/ci";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IoCloseOutline } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

// toggle navbar
import {
    Avatar,

} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";
import SearchModal from "./SearchModal";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const naveLinks = [
    {
        lable: "Home",
        href: "/"
    },
    {
        lable: "Products",
        href: "/products"
    },
    {
        lable: "About Us",
        href: "/about"
    },
    {
        lable: "Contact Us",
        href: "/Contact"
    },
]


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cartItems)
    const totalItems = useSelector((state) => state.favorateItems.favorateItems)

    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const handleOpen = () => setShowSearch(true);
    const handleClose = () => setShowSearch(false);

    const handleClick = (open) => {
        setOpen(open);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logoutUserHandler = async () => {
        dispatch(logoutUser())
    }



    const toggleDrawer = (newOpen) => () => {
        setShow(newOpen);
    };


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 1,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <section className="fixed w-full top-0 left-0  z-50  flex  bg-white shadow">
            <nav className="bg-gray-800 w-full text-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="text-lg font-bold">
                            <h1 className="text-3xl font-bold tomato">
                                <Link to='/'>LearnCode</Link>
                            </h1>
                        </div>
                        <div className="hidden md:flex space-x-4">
                            <ul className="hidden  lg:flex justify-center items-center gap-7">
                                <li >
                                    <button onClick={handleOpen} className="navLinks text-white">
                                        <SearchIcon />
                                    </button>
                                </li>
                                {naveLinks?.map((link, index) =>
                                    < li key={index}>
                                        <NavLink to={link?.href} className="navLinks text-white font-semibold">
                                            {link?.lable}
                                        </NavLink>
                                    </li>
                                )
                                }

                                {isAuthenticated && user?.role === "admin" && <li>
                                    <NavLink to='/dashboard' className="navLinks text-white font-semibold">
                                        Dasboard
                                    </NavLink>
                                </li>}


                                {
                                    user ? ""
                                        :

                                        <>
                                            <li >
                                                <NavLink to='/login' className="text-white navLinks font-semibold">
                                                    Login
                                                </NavLink>
                                            </li>
                                            <li >
                                                <NavLink to='/register' className="text-white navLinks font-semibold">
                                                    Register
                                                </NavLink>
                                            </li>
                                        </>
                                }


                                <li>
                                    <StyledBadge badgeContent={cartItems?.length} color="secondary">
                                        <Link to='/cart'>
                                            < LocalMallOutlinedIcon className="navLinks" />
                                        </Link>
                                    </StyledBadge>
                                </li>

                                <li>

                                    <StyledBadge badgeContent={totalItems?.length} color="secondary">
                                        <Link to='/favorate-products'>
                                            <FavoriteBorderOutlinedIcon className="navLinks" />
                                        </Link>
                                    </StyledBadge>
                                </li>

                                {user && <li>
                                    <Avatar onClick={() => handleClick(!open)} className="capitalize" sx={{ width: 32, height: 32, backgroundColor: "tomato", color: "white", fontWeight: "bold" }}>

                                        {
                                            user?.avtar?.url ?
                                                <img className="w-full h-full" src={user?.avtar?.url} alt="" />
                                                :
                                                user?.username?.slice(0, 1)
                                        }
                                    </Avatar>
                                </li>
                                }

                                {open &&
                                    <div className=" bg-gray-600 absolute mt-2 top-16 right-5 border shadow-lg p-4 ">
                                        <ul className="flex flex-col gap-4">
                                            <li className="" onClick={() => handleClick(!open)}>
                                                <NavLink to='/profile' className="flex gap-2   items-center">
                                                    <span>
                                                        <AccountCircleIcon />
                                                    </span>
                                                    <span>
                                                        Profile
                                                    </span>

                                                </NavLink>
                                            </li>
                                            <li className="" onClick={() => handleClick(!open)}>
                                                <NavLink to='/my-orders' className="flex gap-2  items-center">
                                                    <span>
                                                        <PersonAddIcon />
                                                    </span>
                                                    <span>
                                                        My Orders
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

                            </ul>
                        </div>


                        <div className="lg:hidden flex gap-5 items-center">
                            <ul className="flex gap-5 items-center">
                                <li>
                                    <StyledBadge badgeContent={cartItems?.length} color="secondary">
                                        <Link to='/cart'>
                                            < LocalMallOutlinedIcon className="navLinks" />
                                        </Link>
                                    </StyledBadge>
                                </li>

                                <li>

                                    <StyledBadge badgeContent={totalItems?.length} color="secondary">
                                        <Link to='/favorate-products'>
                                            <FavoriteBorderOutlinedIcon className="navLinks" />
                                        </Link>
                                    </StyledBadge>
                                </li>
                            </ul>
                            <button onClick={toggleMenu} className="text-white focus:outline-none">
                                {isOpen ?
                                    <IoCloseOutline className="z-20 navLinks " color="white" fontSize="20px" />
                                    :
                                    <CiMenuFries className="z-20  navLinks " fontSize="20px" color="white" />}
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
            <div className={`absolute bg-gray-700 top-16 left-0 pl-5 pt-8 transition:transform duration-300 transform h-screen w-64 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}  lg:`}>
                <ul className="flex gap-5 flex-col ">
                    {naveLinks?.map((link, index) =>
                        < li key={index}>
                            <NavLink to={link?.href} className="navLinks text-white font-semibold">
                                {link?.lable}
                            </NavLink>
                        </li>
                    )}
                     {isAuthenticated && user?.role === "admin" && <li>
                        <NavLink to='/dashboard' className="navLinks text-white font-semibold">
                            Dasboard
                        </NavLink>
                    </li>}

                    {
                        user ? ""
                            :

                            <>
                                <li >
                                    <NavLink to='/login' className="text-white navLinks font-semibold">
                                        Login
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink to='/register' className="text-white navLinks font-semibold">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                    }
                    {user &&
                        <ul className="relative">
                            <li>
                                <Avatar onClick={() => handleClick(!open)} className="capitalize" sx={{ width: 32, height: 32, backgroundColor: "tomato", color: "white", fontWeight: "bold" }}>
                                    {
                                        user?.avtar?.url ?
                                            <img className="w-full h-full" src={user?.avtar?.url} alt="" />
                                            :
                                            user?.username?.slice(0, 1)
                                    }
                                </Avatar>
                            </li>

                            {open &&
                                <div className=" bg-gray-600 absolute top-0 right-1 border shadow-lg p-4 ">
                                    <ul className="flex flex-col gap-4">
                                        <li className="" onClick={() => handleClick(!open)}>
                                            <NavLink to='/profile' className="flex gap-2   items-center">
                                                <span>
                                                    <AccountCircleIcon />
                                                </span>
                                                <span>
                                                    Profile
                                                </span>

                                            </NavLink>
                                        </li>
                                        <li className="" onClick={() => handleClick(!open)}>
                                            <NavLink to='/my-orders' className="flex gap-2  items-center">
                                                <span>
                                                    <PersonAddIcon />
                                                </span>
                                                <span>
                                                    My Orders
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
                        </ul>

                    }
                </ul>
            </div>
            {
                showSearch && <SearchModal open={showSearch} handleClose={handleClose} />
            }
        </section >
    );
};

export default Navbar;




