/* eslint-disable no-unused-vars */
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useState } from 'react';
import { json, Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ToggleNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const toggleDrawer = (newOpen) => () => {
        setShow(newOpen);
    };

    const menuLinks = [
        {
            name: "Home",
            link: '/'
        },
        {
            name: "Products",
            link: '/products'
        },
        {
            name: "About",
            link: '/about'
        },
        {
            name: "Contact Us",
            link: '/contact'
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUserHandler = async () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <Box sx={{ width: 250 }} className="bg-gray-800 h-[100vh]" role="presentation" onClick={toggleDrawer(false)}>

                <List>
                    <ListItem>
                        <ListItemButton>
                            <div>
                                <h1 className="text-3xl font-bold text-[tomato]">
                                    <Link to='/'>LearnEcom</Link>
                                </h1>
                            </div>
                        </ListItemButton>
                    </ListItem>

                    {menuLinks.map((text, index) => (
                        <ListItem key={index} >
                            <ListItemButton>
                                <NavLink to={text?.link} className="navLinks  text-white">{text?.name}</NavLink>
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {isAuthenticated && user?.role === "admin" && <ListItem >
                        <ListItemButton>
                            <NavLink to="/dashboard" className="navLinks text-white">Dashboard</NavLink>
                        </ListItemButton>
                    </ListItem>}

                    {user ?
                        ""
                        :
                        <>
                            <ListItem >
                                <ListItemButton>
                                    <NavLink to="/login" className="navLinks text-white">Login</NavLink>
                                </ListItemButton>
                            </ListItem>
                            <ListItem >
                                <ListItemButton>
                                    <NavLink to="/register" className="navLinks text-white">register</NavLink>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }

                    {user ?
                        <>
                            <ListItem >
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    {user &&
                                        <Avatar
                                            // onClick={() => handleClick(!open)} 
                                            onClick={handleClick}
                                            className="capitalize" sx={{ width: 32, height: 32, backgroundColor: "tomato", color: "white", fontWeight: "bold" }}>
                                            {
                                                user?.avtar?.url ?
                                                    <img className="w-full h-full" src={user?.avtar?.url} alt="" />
                                                    :
                                                    user?.username?.slice(0, 1)
                                            }
                                        </Avatar>
                                    }
                                </IconButton>
                            </ListItem>



                            <Menu
                                // anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}

                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> <NavLink to='/profile'>Profile</NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon >
                                        <PersonAddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <NavLink to='/my-orders'>My Orders</NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <button onClick={logoutUserHandler} className='flex items-center'>
                                        <ListItemIcon >
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </button>

                                </MenuItem>
                            </Menu>
                        </>
                        :
                        ""
                    }
                </List>
            </Box >
        </div >
    )
}

export default ToggleNavbar