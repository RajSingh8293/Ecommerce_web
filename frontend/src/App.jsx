
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import { useDispatch } from 'react-redux'
import { profileUser } from './store/slices/userSlice'
import { useEffect } from 'react'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Profile from './pages/user/Profile'
import MyOrders from './pages/user/MyOrders'
import UpdateProfile from './pages/user/UpdateProfile'
import UpdateAvtar from './pages/user/UpdateAvtar'
import MyOrdersDetailes from './pages/user/MyOrdersDetailes'
import ConfirmOrder from './pages/user/ConfirmOrder'
import Checkout from './pages/user/Checkout'
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute'
import FavorateProducts from './pages/user/FavorateProducts'
import Cart from './pages/user/Cart'
import Cancel from './pages/user/Cancel'
import Success from './pages/user/Success'
import Payment from './pages/user/Payment'
import Forgot_Password from './pages/user/Forgot_Password'
import Reset_Password from './pages/user/Reset_Password'
import SendEmailMsg from './pages/user/SendEmailMsg'
import Products from './pages/user/Products'
import SingleProduct from './pages/user/SingleProduct'
import Dashboard from './pages/admin/Dashboard'
import AddProduct from './pages/admin/AddProduct'
import AdminProducts from './pages/admin/AdminProducts'
import Users from './pages/admin/Users'
import ProductDetails from './pages/admin/ProductDetails'
import EditProduct from './pages/admin/EditProduct'
import Orders from './pages/admin/Orders'
import Orderdetails from './pages/admin/Orderdetails'
import AdminProtectedRoute from './protectedRoutes/AdminProtectedRoute'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AdminProfile from './pages/admin/AdminProfile'
// import env from "react-dotenv";

const stripePromise = loadStripe(`${import.meta.env.VITE_API_STRIP_PUBLIC_KEY}`);


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
      // element: <Profile />,
      element: <UserProtectedRoute Comp={Profile} />
    },
    {
      path: "/my-orders",
      // element: <MyOrders />,
      element: <UserProtectedRoute Comp={MyOrders} />
    },
    {
      path: "/my-orders/details/:id",
      // element: <MyOrdersDetailes />,
      element: <UserProtectedRoute Comp={MyOrdersDetailes} />
    },
    {
      path: "/update-profile",
      // element: <UpdateProfile />,
      element: <UserProtectedRoute Comp={UpdateProfile} />
    },
    {
      path: "/update-avtar",
      // element: <UpdateAvtar />,
      element: <UserProtectedRoute Comp={UpdateAvtar} />
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
      // element: <Checkout />,
      element: <UserProtectedRoute Comp={Checkout} />
    },
    {
      path: "/confirm-order",
      // element: <ConfirmOrder />,
      element:
        <UserProtectedRoute Comp={ConfirmOrder} />
    },
    {
      path: "/payment",
      // element: <Payment />,
      element: <Elements stripe={stripePromise}>

        <UserProtectedRoute Comp={Payment} />
      </Elements>
    },
    {
      path: "/success",
      // element: <Success />,
      element: <UserProtectedRoute Comp={Success} />
    },
    {
      path: "/cancel",
      // element: <Cancel />,
      element: <UserProtectedRoute Comp={Cancel} />
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
    },




    // admin pages
    {
      path: "/dashboard",
      // element: <Dashboard />,
      element: <AdminProtectedRoute Comp={Dashboard} />
    },
    {
      path: "/admin-profile",
      // element: <Dashboard />,
      element: <AdminProtectedRoute Comp={AdminProfile} />
    },
    {
      path: "/add-product",
      // element: <AddProduct />,
      element: <AdminProtectedRoute Comp={AddProduct} />


    },
    {
      path: "/edit-product/:id",
      // element: <EditProduct />,
      element: <AdminProtectedRoute Comp={EditProduct} />
    },
    {
      path: "/admin-products",
      element: <AdminProducts />,
    },
    {
      path: "/admin-products-details/:id",
      // element: <ProductDetails />,
      element: <AdminProtectedRoute Comp={ProductDetails} />

    },
    {
      path: "/users",
      // element: <Users />,
      element: <AdminProtectedRoute Comp={Users} />

    },
    {
      path: "/admin-orders",
      // element: <Orders />,
      element: <AdminProtectedRoute Comp={Orders} />

    },
    {
      path: "/orders/details/:id",
      // element: <Orderdetails />,
      element: <AdminProtectedRoute Comp={Orderdetails} />

    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
