/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { CiMenuFries } from "react-icons/ci";
// import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

// toggle navbar
import {
    Avatar,
    Button,
    Drawer,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ToggleNavbar from "./ToggleNavbar";

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



const Navbar = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cartItems)
    const totalItems = useSelector((state) => state.favorateItems.favorateItems)




    // search 
    const [showSearch, setShowSearch] = useState(false)
    const handleOpen = () => setShowSearch(true);
    const handleClose = () => setShowSearch(false);

    const logoutUserHandler = async () => {
        dispatch(logoutUser())
    }


    const [show, setShow] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setShow(newOpen);
    };

    // toggle menu profile 

    const handleClick = (open) => {
        setOpen(open);
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
        <section className="fixed w-full z-50 h-16 flex  py-2  bg-white shadow">
            <div className="flex w-full justify-between lg:px-10 px-5 items-center gap-3 text-gray-600 ">
                <div>
                    <h1 className="text-3xl font-bold tomato">
                        <Link to='/'>LearnCode</Link>
                    </h1>
                </div>
                <div>

                    <>
                        <ul className="hidden md:flex lg:flex justify-center items-center gap-7">
                            <li >
                                <button onClick={handleOpen} className="navLinks text-gray-600">
                                    <SearchIcon />
                                </button>
                            </li>
                            <li >
                                <NavLink to='/' className="navLinks text-gray-600 font-semibold">
                                    Home
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to='/products' className="navLinks text-gray-600 font-semibold">
                                    Products
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to='/contact' className="navLinks text-gray-600 font-semibold">
                                    Contact
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to='/about' className="navLinks text-gray-600 font-semibold">
                                    About Us
                                </NavLink>
                            </li>
                            {isAuthenticated && user?.role === "admin" && <li>
                                <NavLink to='/dashboard' className="navLinks text-gray-600 font-semibold">
                                    Dasboard
                                </NavLink>
                            </li>}


                            {
                                user ? ""
                                    :

                                    <>
                                        <li >
                                            <NavLink to='/login' className="text-gray-600 navLinks font-semibold">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li >
                                            <NavLink to='/register' className="text-gray-600 navLinks font-semibold">
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

                        </ul>


                        <div className="lg:hidden md:hidden flex gap-5 items-center">
                            <ul className="flex gap-4 items-center">
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
                            {show ? "" : <Button onClick={toggleDrawer(true)}> <CiMenuFries className="z-20  navLinks" color="black" fontSize={25} />
                            </Button>}
                            <Drawer open={show} onClose={toggleDrawer(false)}>
                                <ToggleNavbar className="navLink" />
                            </Drawer>
                        </div>
                    </>



                    {open &&
                        <div className=" bg-white absolute mt-2 top-16 right-5 border shadow-lg p-4 ">
                            <ul className="flex flex-col gap-4">
                                <li className="" onClick={() => handleClick(!open)}>
                                    <NavLink to='/profile' className="flex gap-2  items-center">
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

                    {
                        showSearch && <SearchModal open={showSearch} handleClose={handleClose} />
                    }


                </div>
            </div>



        </section >
    )
}

export default Navbar





