/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { AdminDeleteProduct } from '../../store/slices/AdminProductsSlice';
import { useDispatch } from 'react-redux';
import { currencySymbol } from '../../constant/currencySymbol';


const ProductsTable = ({ loading, products, handleOpen }) => {
    const dispatch = useDispatch()
    return (
        <div>
            {loading ?
                <Loader />
                :
                <div className=" mt-10">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
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
                                        <TableCell align="right">{currencySymbol}{row.price}</TableCell>
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

                </div>
            }
        </div>
    )
}

export default ProductsTable