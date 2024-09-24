import { useState } from "react"
import Loader from "../../components/Loader"
import { useSelector } from "react-redux"
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";
import UpdateProfile from "../user/UpdateProfile";
import UpdateAvtar from "../user/UpdateAvtar";



const AdminProfile = () => {
    const { user, loading } = useSelector((state) => state.user)
    const [imageOpen, setImageOpen] = useState(false)
    const openImageModal = () => setImageOpen(true);
    const closeImageModal = () => setImageOpen(false);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <AdminNavbar />
            <section className="pt-24 lg:px-10 px-5">
                <div className=''>
                    <Sidebar />

                    {loading ? <Loader /> :
                        <div className="profile lg:ml-64">

                            <div className="md:p-4">
                                <div className="lg:max-w-[100%] mx-auto w-full pb-8  sm:rounded-lg">
                                    <h2 className="text-2xl font-bold sm:text-xl">My Profile</h2>
                                    <div className="  grid mx-auto mt-8 ">
                                        <div className="w-full  flex justify-between items-end sm:flex-row sm:space-y-0">
                                            <div className="">
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
                                                <div>
                                                    <button className="absolute right-10  btn_2"
                                                        onClick={openImageModal}
                                                    >
                                                        <ModeEditOutlineOutlinedIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" grid grid-cols-1 gap-4 items-center mt-8 sm:mt-14 text-[#202142]">

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

                                            <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                <h1
                                                    className="col-span-1 font-medium text-indigo-900 dark:text-white">Role: </h1>
                                                <p id="first_name"
                                                    className="text-indigo-900 col-span-3 text-noraml capitalize"
                                                >{user?.role}</p>
                                            </div>

                                            <div className="absolute right-10 ">
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

                        </div>
                    }
                </div>
            </section>
        </ >

    )
}

export default AdminProfile