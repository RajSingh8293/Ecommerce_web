import { NavLink } from "react-router-dom"
import { Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BreadCrumb = () => {

    const breadCrumb = [
        {
            lable: <Typography>Home</Typography>,
            icon: <NavigateNextIcon />,
        },
        {
            lable: <Typography>Cart</Typography>,
            icon: <NavigateNextIcon />,
        },
        {
            lable: <Typography>Confirm-Order</Typography>,
            icon: <NavigateNextIcon />,
        },
    ]
    return (
        <div>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center md:space-x-2 rtl:space-x-reverse">
                    {breadCrumb?.map((data) =>
                        <li key={data} className="inline-flex items-center">
                            <NavLink to="/" className="inline-flex items-center justify-between text-sm font-medium text-gray-700 hover:text-[tomato] dark:text-gray-400 dark:hover:text-white">
                                {data?.lable}
                            </NavLink>
                            <span>
                                {data?.icon}
                            </span>
                        </li>)}
                    {/* <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <NavLink to="/checkout" className="ms-1 text-sm font-medium text-gray-600 hover:text-[tomato] md:ms-2 dark:text-gray-400 dark:hover:text-white">Checkout</NavLink>
                        </div>
                    </li> */}
                </ol>
            </nav>

        </div>
    )
}

export default BreadCrumb