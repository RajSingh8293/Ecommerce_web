/* eslint-disable react-refresh/only-export-components */


import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../../constant/backendApi";
import { toast } from "react-toastify";

export const adminProducstSlice = createSlice({
    name: "adminProducts",
    initialState: {
        loading: false,
        message: null,
        error: null,
        adminProducts: [],
        adminSingleProduct: {},
    },
    reducers: {
        requestForProducts: (state) => {
            state.loading = true;
            state.error = null
        },
        successForProducts: (state, action) => {
            state.loading = false;
            state.adminProducts = action.payload.products;
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


        requestCreateProduct: (state) => {
            state.loading = true;
            state.error = null
        },
        successCreateProduct: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedCreateProduct: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        requestSingleProduct: (state) => {
            state.loading = true;
            state.error = null
        },
        successSingleProduct: (state, action) => {
            state.loading = false;
            state.adminSingleProduct = action.payload;
            state.error = null
        },
        failedSingleProduct: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        requestDeleteProduct: (state) => {
            state.loading = true;
            state.error = null
        },
        successDeleteProduct: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedDeleteProduct: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        requestEditProduct: (state) => {
            state.loading = true;
            state.error = null
        },
        successEditProduct: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedEditProduct: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        requestEditProductImage: (state) => {
            state.loading = true;
            state.error = null
        },
        successEditProductImage: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedEditProductImage: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
}
)

export const {
    requestCreateProduct,
    successCreateProduct,
    failedCreateProduct,
    requestForProducts, successForProducts, failedForProducts,
    requestSingleProduct, successSingleProduct, failedSingleProduct,
    requestDeleteProduct,
    successDeleteProduct,
    failedDeleteProduct,
    requestEditProduct,
    successEditProduct,
    failedEditProduct,
    requestEditProductImage,
    successEditProductImage,
    failedEditProductImage,
    clearAllError, } = adminProducstSlice.actions;
export default adminProducstSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}

// create new product
export const fetchCreatProduct = (productData) => async (dispatch) => {
    dispatch(requestCreateProduct());
    try {
        const { data } = await axios.post(`${backendApi}/api/v1/product/create`,
            productData,
            axiosConfig
        )
        // console.log("response :", data.product);
        if (data?.success) {
            dispatch(successCreateProduct(data))
            toast.success(data?.message)
            document.location.href = "/admin-products"
        }
    } catch (error) {
        console.log(error);
        dispatch(failedCreateProduct(error?.response?.data?.message))
    }

}

// all products 
export const fetchAdminProducts = (currentPage = 1) => async (dispatch) => {
    dispatch(requestForProducts());
    try {
        let link = `${backendApi}/api/v1/admin/products?`;

        let queryParams = [];
        // if (searchKeyword) {
        //     queryParams.push(`keyword=${searchKeyword}`);
        // }
        if (currentPage) {
            queryParams.push(`page=${currentPage}`);
        }
        // if (type) {
        //     queryParams.push(`type=${type}`);
        // }
        // if (color) {
        //     queryParams.push(`color=${color}`);
        // }
        // if (category) {
        //     queryParams.push(`category=${category}`);
        // }
        // if (price) {
        //     queryParams.push(`price[gte]=${price[0]}&price[lte]=${price[1]}`);
        // }

        link += queryParams.join("&")

        const { data } = await axios.get(link, axiosConfig)
        // const { data } = await axios.get(`${backendApi}/api/v1/admin/products?page=${currentPage}`, axiosConfig)

        if (data?.success) {
            dispatch(successForProducts(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForProducts(error?.response?.data?.message))
    }

}
// single product 
export const fetchAdminSingleProduct = (id) => async (dispatch) => {
    dispatch(requestSingleProduct());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/products/${id}`)
        if (data?.success) {
            dispatch(successSingleProduct(data?.product))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleProduct(error?.response?.data?.message))
    }

}

export const AdminDeleteProduct = (id) => async (dispatch) => {
    dispatch(requestDeleteProduct());
    try {
        const { data } = await axios.delete(`${backendApi}/api/v1/admin/products/delete/${id}`, axiosConfig)
        if (data?.success) {
            dispatch(successDeleteProduct(data))
            toast.success(data?.message)
            dispatch(fetchAdminProducts())
        }
    } catch (error) {
        console.log(error);
        dispatch(failedDeleteProduct(error?.response?.data?.message))
    }

}

export const AdminEditProduct = (editeData, id) => async (dispatch) => {
    dispatch(requestEditProduct());
    try {
        const { data } = await axios.put(`${backendApi}/api/v1/admin/products/update/${id}`,
            editeData,
            axiosConfig)
        if (data?.success) {
            dispatch(successEditProduct(data))
            toast.success(data?.message)
            document.location.href = '/admin-products'
        }
    } catch (error) {
        console.log(error);
        dispatch(failedEditProduct(error?.response?.data?.message))
    }

}

export const AdminEditProductImage = (image, id) => async (dispatch) => {
    dispatch(requestEditProductImage());
    try {
        const { data } = await axios.put(`${backendApi}/api/v1/admin/products/update-image/${id}`,
            image,
            axiosConfig)
        if (data?.success) {
            dispatch(successEditProductImage(data))
            toast.success(data?.message)
            document.location.href = '/admin-products'
        }
    } catch (error) {
        console.log(error);
        dispatch(failedEditProductImage(error?.response?.data?.message))
    }

}



