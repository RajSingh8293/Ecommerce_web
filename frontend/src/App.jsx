
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Forgot_Password from './pages/Forgot_Password'
import Register from './pages/Register'
import Reset_Password from './pages/Reset_Password'
import SendEmailMsg from './pages/SendEmailMsg'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import FavorateProducts from './pages/FavorateProducts'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ConfirmOrder from './pages/ConfirmOrder'
import Payment from './pages/Payment'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import { useDispatch } from 'react-redux'
import { profileUser } from './store/slices/userSlice'
import { useEffect } from 'react'
import UpdateProfile from './pages/UpdateProfile'
import UpdateAvtar from './pages/UpdateAvtar'
import MyOrdersDetailes from './pages/MyOrdersDetailes'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileUser())
  }, [dispatch])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/my-orders/details/:id",
      element: <MyOrdersDetailes />,
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "/update-avtar",
      element: <UpdateAvtar />,
    },
    {
      path: "/favorate-products",
      element: <FavorateProducts />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/confirm-order",
      element: <ConfirmOrder />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/cancel",
      element: <Cancel />,
    },
    {
      path: "/forgot-password",
      element: <Forgot_Password />,
    },
    {
      path: "/reset-password/:token",
      element: <Reset_Password />,
    },
    {
      path: "/emmail-success-msg",
      element: <SendEmailMsg />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:keyword",
      element: <Products />,
    },
    {
      path: "/product/:id",
      element: <SingleProduct />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
