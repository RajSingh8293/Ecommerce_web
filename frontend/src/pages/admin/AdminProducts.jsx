import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Pagination } from "@mui/material"
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { fetchAdminProducts } from '../../store/slices/AdminProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from './ProductDetails';

import AdminNavbar from '../../components/AdminNavbar';
import ProductsTable from './ProductsTable';

const AdminProducts = () => {
    const dispatch = useDispatch()

    const { adminProducts: products, totalProducts, loading, pages, message } = useSelector((state) => state.adminProducts)

    const [showProductDetails, setShowProductDetails] = useState(false)
    const handleOpen = () => setShowProductDetails(true);
    const handleClose = () => setShowProductDetails(false);

    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        dispatch(fetchAdminProducts(currentPage))
        if (message) {
            toast.success(message)
        }
    }, [dispatch, message, currentPage])




    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <>
            <AdminNavbar />
            <section className="py-24 lg:px-10 px-5">
                <div className='min-h-[70vh]'>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-gray-600 font-bold'>Total Products {totalProducts}</h1>
                            <button className='p-2 px-5 font-semibold text-white bg-black hover:bg-[tomato] hover:text-black'>
                                <NavLink to='/add-product'>Add Product</NavLink>
                            </button>
                        </div>
                        <div>
                            <ProductsTable products={products} handleOpen={handleOpen} loading={loading} />
                        </div>

                        {
                            showProductDetails && <ProductDetails open={open} handleClose={handleClose} />
                        }
                    </div>
                    <div className="flex justify-center py-5">
                        <Pagination count={pages} onChange={setCurrentPageNo} />
                        {/* <Pagination count={pages} onChange={setCurrentPageNo} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminProducts