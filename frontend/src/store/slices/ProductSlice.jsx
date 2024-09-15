

import axios from "axios";
import { backendApi } from "../../constant/backendApi";
import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        message: null,
        error: null,
        products: [],
        singleProduct: {},
    },
    reducers: {
        requestForProducts: (state) => {
            state.loading = true;
            state.error = null
        },
        successForProducts: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
            state.resulPerPage = action.payload.resulPerPage;
            state.filterProductCount = action.payload.filterProductCount;
            state.pages = action.payload.pages;
            state.error = null
        },
        failedForProducts: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },


        requestSingleProduct: (state) => {
            state.loading = true;
            state.error = null
        },
        successSingleProduct: (state, action) => {
            state.loading = false;
            state.singleProduct = action.payload;
            state.error = null
        },
        failedSingleProduct: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // requestMyAppliedJobs: (state, action) => {
        //     state.loading = true
        //     state.error = null;
        // },

        // successMyAppliedJobs: (state, action) => {
        //     state.loading = false
        //     state.myAppliedJobs = action.payload;
        //     state.error = null;
        // },

        // failedMyAppliedJobs: (state, action) => {
        //     state.loading = false
        //     state.error = action.payload;
        // },



        // requestAllMyJobs: (state, action) => {
        //     state.loading = true;
        //     state.error = null
        // },
        // sucessAllMyJobs: (state, action) => {
        //     state.loading = false;
        //     state.myjobs = action.payload;
        //     state.error = null
        // },
        // failedAllMyJobs: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    }
}
)

export const {
    requestForProducts, successForProducts, failedForProducts,
    requestSingleProduct, successSingleProduct, failedSingleProduct,
    clearAllError, } = productSlice.actions;
export default productSlice.reducer;


// let axiosConfig = {
//     withCredentials: true,
// }
// all products 
export const fetchProducts = (keyword = "", currentPage = 1, category, type, color, price = [0, 10000]) => async (dispatch) => {
    // export const fetchProducts = (keyword = "", currentPage = 1, color, category, name, price = [0, 2000]) => async (dispatch) => {
    dispatch(requestForProducts());
    try {
        let link = `${backendApi}/api/v1/products?`;

        let queryParams = [];
        if (keyword) {
            queryParams.push(`keyword=${keyword}`);
        }
        if (currentPage) {
            queryParams.push(`page=${currentPage}`);
        }
        if (type) {
            queryParams.push(`type=${type}`);
        }
        if (color) {
            queryParams.push(`color=${color}`);
        }
        if (category) {
            queryParams.push(`category=${category}`);
        }
        if (price) {
            queryParams.push(`price[gte]=${price[0]}&price[lte]=${price[1]}`);
        }

        link += queryParams.join("&")

        const { data } = await axios.get(link)
        if (data.success) {
            dispatch(successForProducts(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForProducts(error?.response?.data?.message))
    }

}
// single product 
export const fetchSingleProduct = (id) => async (dispatch) => {
    dispatch(requestSingleProduct());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/products/${id}`)
        // console.log("response :", data.product);
        if (data?.success) {
            dispatch(successSingleProduct(data?.product))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleProduct(error?.response?.data?.message))
    }

}



// import { createSlice } from '@reduxjs/toolkit'
// // import axios from 'axios'

// export const STATUS = Object.freeze({
//     IDLE: 'idle',
//     ERROR: 'error',
//     LOADING: 'loading',
// })

// const productSlice = createSlice({
//     name: 'products',
//     initialState: {
//         // createProduct: {},
//         // data: [],
//         products: [],
//         singleProduct: {},
//         status: STATUS.IDLE,
//     },
//     reducers: {
//         setProducts: (state, action) => {
//             state.products = action.payload
//         },
//         singleProduct: (state, action) => {
//             state.singleProduct = action.payload
//         },
//         // setAdminProducts: (state, action) => {
//         //     state.products = action.payload
//         // },
//         // setCreateProduct: (state, action) => {
//         //     state.createProduct = action.payload
//         // },
//         // setStatus: (state, action) => {
//         //     state.status = action.payload
//         // },
//     },
// })

// export const {
//     setProducts,
//     singleProduct,
//     setAdminProducts,
//     setCreateProduct,
//     setStatus,
// } = productSlice.actions
// export default productSlice.reducer

// let axiosConfig = {
//   withCredentials: true,
// }

// create product
// export const fetchCreateProduct = (formData) => {
//     return async function fetchCreateProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/product`,
//                 {
//                     method: 'POST',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(formData),
//                 },
//             )
//             const data = await response.json()
//             if (data.success) {
//                 dispatch(setCreateProduct(data.product))
//                 dispatch(setStatus(STATUS.IDLE))
//                 document.location.href = '/dashboard-products'
//             }
//             console.log(data)
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }

// // fetch all products
// export const fetchProducts = () => {
//     return async function fetchProductsThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products`,
//             )
//             const data = await response.json()
//             dispatch(setProducts(data.products))
//             dispatch(setStatus(STATUS.IDLE))

//             console.log(response.data)
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }

// // fetch single product
// export const SingleProduct = (id) => {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/products/${id}`,
//             )
//             const data = await response.json()
//             dispatch(singleProduct(data.product))
//             dispatch(setStatus(STATUS.IDLE))
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }

// // fetch admin products
// export const fetchAdminProducts = () => {
//     return async function fetchAdminProductsThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/admin/products`,
//                 {
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             )
//             const data = await response.json()
//             dispatch(setAdminProducts(data.products))
//             dispatch(setStatus(STATUS.IDLE))

//             console.log(data)
//         } catch (error) {
//             console.log(error.message)
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }