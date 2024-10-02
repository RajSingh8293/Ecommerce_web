/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { backendApi } from "../../constant/backendApi";



export const addressSlice = createSlice({
    name: "address",
    initialState: {
        loading: false,
        singleAddress: {},
        error: null,
        message: null,
        myAddresses: []
    },
    reducers: {

        //create address
        createAddressRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        createAddressSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message;
            state.error = null;
        },
        addressFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },


        //  all my address
        getAllAddressRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        getAllAddressSuccess: (state, action) => {
            state.loading = false
            state.myAddresses = action.payload.address;
            state.error = null;
        },
        getAllAddressFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },


        // single address
        singleAddressRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        singleAddressSuccess: (state, action) => {
            state.loading = false
            state.error = null;
            state.singleAddress = action.payload.address;
        },
        singleAddressFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },



        // get profile
        profileRequest: (state, action) => {
            state.loading = true
            state.isAuthenticated = false
            state.user = null;
            state.error = null;
            state.message = null;
        },
        profileSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.error = null;
        },
        profileFailed: (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },


        // update profile
        updateProfileRequest: (state, action) => {
            state.loading = true
            state.isAuthenticated = false
            state.user = null;
            state.error = null;
            state.message = null;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        updateProfileFailed: (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },

        // update avtar
        updateProfileImageRequest: (state, action) => {
            state.loading = true
            state.isAuthenticated = false
            state.user = null;
            state.error = null;
            state.message = null;
        },
        updateProfileImageSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        updateProfileImageFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },


        deleteAddressSuccess: (state, action) => {
            state.message = action.payload.message
            state.error = null;
        },
        deleteAddressFailed: (state, action) => {
            state.error = state.payload
            state.loading = null
        },

    },
});

export const {
    createAddressRequest, createAddressSuccess, addressFailed,
    singleAddressRequest, singleAddressSuccess, singleAddressFailed,
    deleteAddressSuccess, deleteAddressFailed,
    getAllAddressRequest,
    getAllAddressSuccess,
    getAllAddressFailed,
} = addressSlice.actions;
export default addressSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}

export const createNewAddress = (addressData) => {
    return async (dispatch) => {
        dispatch(createAddressRequest())
        try {
            const { data } = await axios.post(`${backendApi}/api/v1//address/create`, addressData, axiosConfig);

            if (data.success) {
                dispatch(createAddressSuccess(data));
                document.location.href = '/confirm-order'
                toast.success(data.message)
            }

        } catch (error) {
            console.log(error);
            dispatch(addressFailed(error?.response?.data?.message))
        }
    };
}

export const getSingleAddress = (addressId) => {
    return async (dispatch) => {
        dispatch(singleAddressRequest())
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/address/get/${addressId}`, axiosConfig);
            if (data.success) {
                dispatch(singleAddressSuccess(data));
            }
        } catch (error) {
            console.log(error);
            dispatch(singleAddressFailed(error?.response?.data?.message))
        }
    };
}



// admin get all users 
export const fetchMyAddress = () => {
    return async (dispatch) => {
        dispatch(getAllAddressRequest())
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/address/my`, axiosConfig);

            if (data.success) {
                dispatch(getAllAddressSuccess(data));
                // document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(getAllAddressFailed(error?.response?.data?.message))
        }
    };
}


export const deleteUserAdress = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${backendApi}/api/v1/address/delete/${id}`, axiosConfig);
            if (data.success) {
                dispatch(deleteAddressSuccess(data));
                dispatch(fetchMyAddress());
                toast.success(data?.message)
            }
        } catch (error) {
            console.log(error);
            dispatch(deleteAddressFailed(error?.response?.data?.message))
        }
    };
}


