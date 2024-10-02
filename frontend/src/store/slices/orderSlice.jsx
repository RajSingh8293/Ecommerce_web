import axios from "axios";
import { backendApi } from "../../constant/backendApi";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        loading: false,
        message: null,
        error: null,
        myOrders: [],
        adminOrders: [],
        singleOrder: {},
    },
    reducers: {

        // user 
        requestForCreateOrder: (state) => {
            state.loading = true;
            state.error = null
        },
        successForCreateOrder: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedForCreateOrder: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },

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
            state.singleOrder = action.payload.order;
            state.error = null
        },
        failedSingleorder: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // admin 
        requestForAdminOrders: (state) => {
            state.loading = true;
            state.error = null
        },
        successForAdminOrders: (state, action) => {
            state.loading = false;
            state.adminOrders = action.payload.orders;
            state.error = null
        },
        failedForAdminOrders: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },

        requestForDeleteOrder: (state) => {
            state.loading = true;
            state.error = null
        },
        successForDeleteOrder: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedForDeleteOrder: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        requestForUpdateOrderStatus: (state) => {
            state.loading = true;
            state.error = null
        },
        successForUpdateOrderStatus: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null
        },
        failedForUpdateOrderStatus: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
}
)

export const {
    requestForCreateOrder,
    successForCreateOrder,
    failedForCreateOrder,
    requestForOrders, successForOrders, failedForOrders,
    requestSingleOrder, successSingleOrder, failedSingleorder,
    requestForAdminOrders,
    successForAdminOrders,
    failedForAdminOrders,
    requestForDeleteOrder,
    successForDeleteOrder,
    failedForDeleteOrder,
    requestForUpdateOrderStatus,
    successForUpdateOrderStatus,
    failedForUpdateOrderStatus,
    clearAllError, } = ordersSlice.actions;
export default ordersSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}


// admin delete order
export const createOrder = (orderdata) => async (dispatch) => {
    dispatch(requestForCreateOrder());
    try {
        const { data } = await axios.post(`${backendApi}/api/v1/order/create`, orderdata, axiosConfig)
        if (data.success) {
            dispatch(successForCreateOrder(data))
            toast.success(data?.message)
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForCreateOrder(error?.response?.data?.message))
    }
}
// my orders
export const fetchMyOrders = () => async (dispatch) => {
    dispatch(requestForOrders());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/order/me`, axiosConfig)
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
        if (data?.success) {
            dispatch(successSingleOrder(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleorder(error?.response?.data?.message))
    }

}



// admin orders
export const fetchAdminOrders = () => async (dispatch) => {
    dispatch(requestForAdminOrders());
    try {
        const { data } = await axios.get(`${backendApi}/api/v1/admin/orders/all`, axiosConfig)
        if (data.success) {
            dispatch(successForAdminOrders(data))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForAdminOrders(error?.response?.data?.message))
    }

}


// admin delete order
export const deleteAdminOrders = (id) => async (dispatch) => {
    dispatch(requestForDeleteOrder());
    try {
        const { data } = await axios.delete(`${backendApi}/api/v1/admin/order/delete/${id}`, axiosConfig)
        if (data.success) {
            dispatch(successForDeleteOrder(data))
            toast.success(data?.message)
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForDeleteOrder(error?.response?.data?.message))
    }
}

// admin update order status
export const updateAdminOrderStatus = (orderStatus, id) => async (dispatch) => {
    dispatch(requestForUpdateOrderStatus());
    try {
        const { data } = await axios.put(`${backendApi}/api/v1/admin/order-status/${id}`,
            orderStatus,
            axiosConfig
        )
        if (data.success) {
            dispatch(successForUpdateOrderStatus(data))
            dispatch(fetchAdminOrders())
            dispatch(fetchSingleOrder(id))
            toast.success(data?.message)
        }
    } catch (error) {
        console.log(error);
        dispatch(failedForUpdateOrderStatus(error?.response?.data?.message))
    }
}