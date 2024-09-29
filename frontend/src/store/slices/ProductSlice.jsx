

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
            state.error = action.payload;
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
        // console.log("data :", data);

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

