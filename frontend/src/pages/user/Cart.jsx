import { Link, NavLink, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout"
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "../../components/CartProducts";
import { clearCartItems } from "../../store/slices/cartSlice";
import { useEffect } from "react";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cartItems)
    const totalPrice = cartItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0,
    )
    const shipping = totalPrice > 100 ? 0 : 5

    const checkoutHandler = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <Layout>
            <section className="min-h-[100vh] py-24 lg:px-10 px-5">

                {cartItems?.length > 0 ?
                    < div className="">
                        <h1 className="font-bold text-xl text-gray-600 mb-3">Your Cart Have Total : {cartItems?.length} Items</h1>

                        <div className="container mx-auto mt-10">
                            <div className="lg:flex shadow-md my-10">
                                <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
                                    <div className="flex justify-between border-b pb-8">
                                        <h1 className="font-bold text-gray-600 text-2xl">Shopping Cart</h1>
                                    </div>
                                    {cartItems && cartItems?.map((data) =>
                                        <CartProducts key={data?._id} data={data} />
                                    )
                                    }

                                    <div className="lg:flex md:flex sm:flex justify-between items-center gap-5">
                                        <button className=" btn_2 p-1 px-4 mt-10">
                                            <NavLink to="/products" className="flex p-2 font-semibold text-sm text-white ">
                                                <svg className="fill-current mr-2 text-white w-4" viewBox="0 0 448 512">
                                                    <path
                                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                                </svg>
                                                Continue Shopping
                                            </NavLink>
                                        </button>

                                        <button
                                            onClick={() => dispatch(clearCartItems())}
                                            className=" btn p-1 px-4  mt-10">
                                            <span className="flex p-2 font-semibold text-sm text-white ">
                                                <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
                                                    <path
                                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                                </svg>
                                                Clear Shopping Cart
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className=" w-full   md:w-1/2     px-8 py-10">
                                    <h1 className="font-bold text-gray-600 text-2xl border-b pb-8">Order Summary</h1>
                                    <div className="flex justify-between mt-10 mb-5">
                                        <span className="font-semibold text-sm uppercase">Total Items ({cartItems?.length})</span>
                                        <span className=" text-normal">
                                            $ {totalPrice}

                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-5">
                                        <p className="font-medium inline-block mb-3 text-sm uppercase">
                                            Shipping
                                        </p>
                                        <p className="text-normal ">
                                            $ {shipping}
                                        </p>
                                    </div>
                                    <div className="border-t mt-8">
                                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                            <span className="font-bold text-normal">Total </span>
                                            <span className="font-bold text-normal text-xl"> ${totalPrice + shipping}</span>
                                        </div>

                                        <button
                                            onClick={checkoutHandler}
                                            className=" uppercase text-sm w-full btn_2 p-3 px-4  mt-10">
                                            <span className="p-2 font-semibold text-sm text-white ">
                                                Checkout
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="  flex justify-center ">
                        <div className="py-16 lg:max-w-[700px] flex flex-col gap-4 justify-center items-center">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your cart is Empty</h1>
                            <div>
                                <img className='h-[300px]' src="src/assets/emptY_cart.png" alt='' />
                            </div>

                            <div className=" px-4 pb-2 ">
                                <button className="w-full px-10 hover:bg-gray-700 bg-black p-1 text-white">
                                    <Link to='/'>
                                        Go Back
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                }



            </section>
        </Layout >
    )
}

export default Cart