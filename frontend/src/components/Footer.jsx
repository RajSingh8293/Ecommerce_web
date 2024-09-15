import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <div className=" lg:px-0 ">
            <hr className="w-[50%] mx-auto" />
            <div className="lg:px-10 px-5 bg-white  shadow-black lg:py-10 pt-10  ">
                <h1 className="text-3xl font-bold mb-4 text-[tomato]">LearnCode</h1>
                <div className="text-gray-600 py-5 grid gap-4 grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  place-items-stretch ">
                    <div className="">
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Inquiry</li>
                            <li>Get i touch</li>
                            <li>Contact</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Inquiry</li>
                            <li>Get i touch</li>
                            <li>Contact</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Inquiry</li>
                            <li>Get i touch</li>
                            <li>Contact</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div className="">
                        <ul>
                            <li>Tables</li>
                            <li>Feeds</li>
                            <li>Form Layouts</li>
                            <li>Select Menus</li>
                            <li>Radio Groups</li>
                            <li>Checkboxes</li>

                        </ul>
                    </div>
                </div>
                <div className="py-5">
                    <div className="flex gap-4 justify-start items-center text-black">
                        <h1 className="font-semibold">Follows :</h1>
                        <span className="bg-white p-2 rounded-full hover:bg-orange-500 "><FaFacebookF className="hover:scale-75" color="black" /></span>
                        <span className="bg-white p-2 rounded-full hover:bg-orange-500 "><FaTwitter className="hover:scale-75" color="black" /></span>
                        <span className="bg-white p-2 rounded-full hover:bg-orange-500 "><FaLinkedinIn className="hover:scale-75" color="black" /></span>
                        <span className="bg-white p-2 rounded-full hover:bg-orange-500 "><FaInstagram className="hover:scale-75" color="black" /></span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="py-3" >
                <p className="text-gray-600 text-center">© 2024 LearnCode. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer