/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import CheckoutSteps from "../../components/CheckoutSteps"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import { Link, useNavigate, useParams } from "react-router-dom"
import { countries } from "../../Countries"
import { createNewAddress, fetchMyAddress, getSingleAddress } from "../../store/slices/addressSlice"
import Address from "../../components/Address"
import { shippingReducer } from "../../store/slices/cartSlice"

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { shippingInfo } = useSelector((state) => state.cartItems)

    const [firstname, setFirstname] = useState(shippingInfo?.firstname)
    const [lastname, setLastname] = useState(shippingInfo?.lastname)
    const [phone, setPhone] = useState(shippingInfo?.phone)
    const [country, setCountry] = useState(shippingInfo?.country)
    const [state, setState] = useState(shippingInfo?.state)
    const [city, setCity] = useState(shippingInfo?.city)
    const [address, setAddress] = useState(shippingInfo?.address)
    const [zipcode, setZipcode] = useState(shippingInfo?.zipcode)


    const addressData = {
        firstname,
        lastname,
        phone,
        country,
        state,
        city,
        address,
        zipcode,
    }


    const shippingHandler = (e) => {
        e.preventDefault()
        if (phone?.length < 10) {
            alert('Phone number must be 10 digit long')
        }

        dispatch(shippingReducer(addressData))
        navigate('/confirm-order')
    }



    return (
        <Layout>
            <section className="py-24 lg:px-10 px-5 relative">
                <div className="py-8">
                    <CheckoutSteps activeStep={0} />
                </div>
                <section className="lg:max-w-[1000px] mx-auto w-[100%] grid lg:gap-10 gap-5 ">

                    <div className="">
                        <h1 className="text-gray-600 font-semibold text-2xl pb-5">
                            Shipping Address
                        </h1>
                        {/* first name & last name  */}
                        <div className="mb-2 lg:flex w-[100%] lg:justify-between  md:flex md:justify-between gap-5">
                            <div className="lg:w-[50%]  md:w-[50%] lg:mb-0 mb-4">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="John"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="lg:w-[50%]  md:w-[50%]">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="Cena"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* country & state */}
                        <div className="grid lg:grid-cols-2 lg:gap-5 grid-cols-1">

                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Country
                                </label>
                                <select name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                >
                                    {countries?.map((country) =>
                                        < option key={country?.code} value={country?.code}>{country?.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    State
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="Tokyo"
                                    name="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                        </div>


                        {/* city & street  */}
                        <div className="grid lg:grid-cols-2 lg:gap-5 grid-cols-1">
                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="Setagaya"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            {/* Address */}
                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="103, lajpat nagar, 3rd floor "
                                    name="house"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="grid lg:grid-cols-2 lg:gap-5 grid-cols-1">
                            {/* phone   */}
                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Phone
                                </label>
                                <input
                                    type="phone"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="+91 8978676745"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            {/* pincode  */}
                            <div className="mb-2">
                                <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Zipcode / Pincode
                                </label>
                                <input
                                    type="text"
                                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                    placeholder="1202002"
                                    name="pincode"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="btn flex justify-center items-center mt-5">
                            <button
                                className=" text-white"
                                type="button"
                                onClick={shippingHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>


                </section>

                <div className="absolute mt-5 top-16 lg:left-10 left-5">
                    <button className="bg-black rounded p-1 px-2 text-white ">
                        <Link className="text-sm font-semibold flex justify-between items-center" to='/cart'>
                            <span>

                                <svg className="fill-current mr-2 text-white w-4" viewBox="0 0 448 512">
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                            </span>
                            <span>
                                Back
                            </span>
                        </Link>
                    </button>
                </div>
            </section>
        </Layout >
    )
}

export default Checkout