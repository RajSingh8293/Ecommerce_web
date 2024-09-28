
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
import NoPage from './pages/user/NoPage'
import Contact from './pages/user/Contact'
import SearchPage from './pages/user/SearchPage'
import About from './pages/user/About'
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
      path: "*",
      element: <NoPage />,
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
    // {
    //   path: "/products/:keyword",
    //   element: <Products />,
    // },
    {
      path: "/seacrh/:keyword",
      element: <SearchPage />,
    },
    {
      path: "/product/:id",
      element: <SingleProduct />,
    },
    {
      path: "/profile",
      element:
        <UserProtectedRoute>
          <Profile />
        </UserProtectedRoute>
    },
    {
      path: "/my-orders",
      element:
        <UserProtectedRoute>
          <MyOrders />
        </UserProtectedRoute>
    },
    {
      path: "/my-orders/details/:id",
      // element: <MyOrdersDetailes />,
      element:
        <UserProtectedRoute>
          <MyOrdersDetailes />
        </UserProtectedRoute>
    },
    {
      path: "/update-profile",
      element:
        <UserProtectedRoute>
          <UpdateProfile />
        </UserProtectedRoute>
    },
    {
      path: "/update-avtar",
      element:
        <UserProtectedRoute>
          <UpdateAvtar />
        </UserProtectedRoute>
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
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/checkout",
      element:
        <UserProtectedRoute>
          <Checkout />
        </UserProtectedRoute>
    },
    {
      path: "/confirm-order",
      element:
        <UserProtectedRoute>
          <ConfirmOrder />
        </UserProtectedRoute>
    },
    {
      path: "/payment",
      element: <Elements stripe={stripePromise}>
        <UserProtectedRoute>
          <Payment />
        </UserProtectedRoute>
        {/* <UserProtectedRoute Comp={Payment} /> */}
      </Elements>
    },
    {
      path: "/success",
      element:
        <UserProtectedRoute>
          <Success />
        </UserProtectedRoute>
    },
    {
      path: "/cancel",
      element:
        <UserProtectedRoute>
          <Cancel />
        </UserProtectedRoute>

    },

    // admin pages
    {
      path: "/dashboard",
      element: <AdminProtectedRoute>
        <Dashboard />
      </AdminProtectedRoute>
    },
    {
      path: "/admin-profile",
      element: <AdminProtectedRoute>
        <AdminProfile />
      </AdminProtectedRoute>
    },
    {
      path: "/add-product",
      element: <AdminProtectedRoute>
        <AddProduct />
      </AdminProtectedRoute>
    },
    {
      path: "/edit-product/:id",
      element: <AdminProtectedRoute>
        <EditProduct />
      </AdminProtectedRoute>
    },
    {
      path: "/admin-products",
      element: <AdminProducts />,
    },
    {
      path: "/admin-products-details/:id",
      element: <AdminProtectedRoute>
        <ProductDetails />
      </AdminProtectedRoute>

    },
    {
      path: "/users",
      element: <AdminProtectedRoute>
        <Users />
      </AdminProtectedRoute>

    },
    {
      path: "/admin-orders",
      element: <AdminProtectedRoute>
        <Orders />
      </AdminProtectedRoute>
    },
    {
      path: "/orders/details/:id",
      element: <AdminProtectedRoute>
        <Orderdetails />
      </AdminProtectedRoute>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
