import { NavLink } from "react-router-dom"
import Layout from "../components/Layout"


const Success = () => {
  return (
    <Layout>

      <section className="py-24 lg:px-10 px-5 relative">
        <div className="w-full max-w-7xl px-4 md:px-5  min-h-[80vh] lg-6 mx-auto flex justify-center flex-col items-center">
          <div className="w-[150px]">
            <img src="/src/assets/payment_success_img.jpg" alt="" />
          </div>
          <h2 className=" font-bold text-4xl  text-gary-600 text-center">
            Payment Successful
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
            you can
            check our order summary to click below button </p>
          <div className="">
            <button className="flex  w-[200px] justify-center rounded-md bg-black px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 ">
              <NavLink to='/my-orders'>
                Go To Oreder Page
              </NavLink>
            </button>
          </div>

        </div>
      </section>


    </Layout>
  )
}

export default Success