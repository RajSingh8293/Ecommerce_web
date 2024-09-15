import { NavLink } from "react-router-dom"
import Layout from "../components/Layout"

const Cancel = () => {
    return (
        <Layout>

            <section className="py-24 lg:px-10 px-5 relative">
                <div className="w-full max-w-7xl px-4 md:px-5  min-h-[80vh] lg-6 mx-auto flex justify-center flex-col items-center gap-3">
                    <div className="w-[100px]">
                        <img src="/src/assets/payment_failed_img.png" alt="" />
                    </div>
                    <h2 className=" font-bold text-4xl  text-gary-600 text-center">
                        Payment Failed
                    </h2>
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                        you can
                        check our order summary to click below button </p>
                    <div className="">
                        <button className="flex  w-[200px] justify-center rounded-md bg-black px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 ">
                            <NavLink to='/cart'>
                                Go To Cart Page
                            </NavLink>
                        </button>
                    </div>

                </div>
            </section>


        </Layout>
    )
}

export default Cancel

