import { NavLink } from "react-router-dom"


const SendEmailMsg = () => {
    return (
        <section className="py-24 px-10">
            <div className="flex flex-col gap-5 justify-center items-center">

                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">

                    <span className="block sm:inline">Request has been sent in your email. Plaese check your email</span>

                </div>
                <div className="rounded overflow-hidden" >
                    <NavLink to='/login' className="w-full">
                        <button className="w-full hover:bg-gray-800 bg-black p-1.5 px-4 text-white">Go Back</button>
                    </NavLink>

                </div>
            </div>
        </section>
    )
}

export default SendEmailMsg

