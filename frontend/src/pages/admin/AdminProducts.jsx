/* eslint-disable no-unused-vars */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material"
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { AdminDeleteProduct, fetchAdminProducts } from '../../store/slices/AdminProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from './ProductDetails';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AdminNavbar from '../../components/AdminNavbar';
import Search from '../../components/Search';

const AdminProducts = () => {
    const dispatch = useDispatch()

    const { adminProducts: products, totalProducts, loading, pages, message } = useSelector((state) => state.adminProducts)
    // const [products, setProducts] = useState([])

    const [showProductDetails, setShowProductDetails] = useState(false)
    const handleOpen = () => setShowProductDetails(true);
    const handleClose = () => setShowProductDetails(false);

    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };

    console.log("products :", products);


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
        // <Layout>
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
                        {loading ?
                            <Loader />
                            :
                            <div className=" mt-10">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                        <caption>A basic table example with a caption</caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Image</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">Featured</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.length > 0 && products?.map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell sx={{
                                                        cursor: "pointer"
                                                    }} component="th" scope="row" onClick={handleOpen}>
                                                        <Link to={`/admin-products-details/${row?._id}`}>
                                                            {row._id?.slice(0, 10)}...
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <img className='h-[50px] w-[50px]' src={row.productImage?.url} alt="product image" />
                                                    </TableCell>
                                                    <TableCell align="right" >{row.name}</TableCell>
                                                    <TableCell align="right">{`${row.featured === true ? "Yes" : "No"}`}</TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>
                                                    <TableCell align="right">
                                                        <button className="btn_2 p-1 mr-2 text-red-600 rounded">
                                                            <Link to={`/edit-product/${row?._id}`}>
                                                                <EditRoundedIcon />
                                                            </Link>
                                                        </button>
                                                        <button
                                                            onClick={() => dispatch(AdminDeleteProduct(row?._id))}
                                                            className="btn_2 p-1 text-red-600 rounded"
                                                        ><DeleteRoundedIcon /></button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>}

                        {
                            showProductDetails && <ProductDetails open={open} handleClose={handleClose} />
                        }
                    </div>
                    <div className="flex justify-center py-5">
                        <Pagination count={10} onChange={setCurrentPageNo} />
                        {/* <Pagination count={pages} onChange={setCurrentPageNo} /> */}
                    </div>
                </div>
            </section>
        </>
        // {/* </Layout > */ }
    )
}

export default AdminProducts