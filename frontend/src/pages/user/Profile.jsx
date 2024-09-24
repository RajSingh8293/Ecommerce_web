import { useState } from "react"
import Layout from "../../components/Layout"
import Loader from "../../components/Loader"
import { useSelector } from "react-redux"
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import UpdateProfile from './UpdateProfile'
import UpdateAvtar from "./UpdateAvtar";



const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user)
    const [imageOpen, setImageOpen] = useState(false)
    const openImageModal = () => setImageOpen(true);
    const closeImageModal = () => setImageOpen(false);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Layout>
            {loading ? <Loader /> :
                <section className="min-h-screen lg:px-10 px-5 py-24">
                    <div className=" md:p-4">
                        <div className="lg:max-w-[700px] mx-auto w-full pb-8  sm:rounded-lg">
                            <h2 className="text-2xl font-bold sm:text-xl">My Profile</h2>
                            <div className="  grid mx-auto mt-8 ">
                                <div className=" flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                    <div className="relative">
                                        {isAuthenticated && <button className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center btn rounded-full p-1"
                                            onClick={openImageModal}
                                        >
                                            <ModeEditOutlineOutlinedIcon />
                                        </button>}
                                        <div className="bg-white border-2 w-32 h-32 flex items-center justify-center rounded-full overflow-hidden object-cover">
                                            {user && user?.avtar?.url ? <img className="w-[100%] h-[100%] bg-center bg-cover  " src={user?.avtar?.url} alt="" />
                                                :
                                                <button
                                                    className="button-upload"
                                                    onClick={() => setImageOpen(true)}
                                                >
                                                    <img className="h-[50px] opacity-50" src="/src/assets/profile_camera.png" alt="" />
                                                </button>}
                                        </div>

                                    </div>


                                </div>


                                <div className="relative grid grid-cols-1 gap-4 items-center mt-8 sm:mt-14 text-[#202142]">

                                    <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                        <h1
                                            className="col-span-1 font-medium text-indigo-900 dark:text-white">Username: </h1>
                                        <p id="first_name"
                                            className="text-indigo-900 col-span-3  text-noraml "
                                        >{user?.username}
                                        </p>
                                    </div>



                                    <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                        <h1
                                            className="col-span-1 font-medium text-indigo-900 dark:text-white">Email: </h1>
                                        <p id="first_name"
                                            className="text-indigo-900 col-span-3 text-noraml "
                                        >{user?.email}</p>
                                    </div>

                                    {user?.phone && <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                        <h1
                                            className="col-span-1 font-medium text-indigo-900 dark:text-white">Phone: </h1>
                                        <p id="first_name"
                                            className="text-indigo-900 col-span-3 text-noraml "
                                        >{user?.phone}</p>
                                    </div>}
                                    {user?.role === "admin" && <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                        <h1
                                            className="col-span-1 font-medium text-indigo-900 dark:text-white">Role: </h1>
                                        <p id="first_name"
                                            className="text-indigo-900 col-span-3 text-noraml capitalize"
                                        >{user?.role}</p>
                                    </div>}

                                    <div className="absolute right-2 bottom-2">
                                        <button type="submit"
                                            onClick={handleOpen}
                                            className="inline-flex w-full px-4 justify-center btn_2">
                                            <ModeEditOutlineOutlinedIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {
                                open &&
                                <div>
                                    <UpdateProfile open={open} setOpen={setOpen} handleClose={handleClose} />
                                </div>
                            }

                            {
                                imageOpen &&
                                <div>
                                    <UpdateAvtar open={imageOpen} closeImageModal={closeImageModal} />
                                </div>
                            }
                        </div>
                    </div>





                </section>}
        </Layout >

    )
}

export default Profile