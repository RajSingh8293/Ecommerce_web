import axios from "axios";
import { backendApi } from "../../constant/backendApi";
import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
    name: "myOrders",
    initialState: {
        loading: false,
        message: null,
        error: null,
        myOrders: [],
        singleMyOrder: {},
    },
    reducers: {
        requestForOrders: (state) => {
            state.loading = true;
            state.error = null
        },
        successForOrders: (state, action) => {
            state.loading = false;
            state.myOrders = action.payload.orders;
            state.error = null
        },
        failedForOrders: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },



        requestSingleOrder: (state) => {
            state.loading = true;
            state.error = null
        },
        successSingleOrder: (state, action) => {
            state.loading = false;
            state.singleMyOrder = action.payload.order;
            state.error = null
        },
        failedSingleorder: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
}
)

export const {
    requestForOrders, successForOrders, failedForOrders,
    requestSingleOrder, successSingleOrder, failedSingleorder,
    clearAllError, } = ordersSlice.actions;
export default ordersSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}
// my orders
export const fetchMyOrders = () => async (dispatch) => {
    dispatch(requestForOrders());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/order/me`, axiosConfig)
        // console.log("orders :", data);
        if (data.success) {
            dispatch(successForOrders(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForOrders(error?.response?.data?.message))
    }

}


// single order 
export const fetchSingleOrder = (id) => async (dispatch) => {
    dispatch(requestSingleOrder());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/order/${id}`, axiosConfig)
        console.log("order :", data);
        if (data?.success) {
            dispatch(successSingleOrder(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleorder(error?.response?.data?.message))
    }

}