/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { backendApi } from "../../constant/backendApi";



export const userSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
        message: null,
    },
    reducers: {

        //register
        registerRequest: (state, action) => {
            state.loading = true
            state.isAuthenticated = false
            state.user = null;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        registerFailed: (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },


        // login
        loginRequest: (state, action) => {
            state.loading = true
            state.isAuthenticated = false
            state.user = null;
            state.error = null;
            state.message = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        loginFailed: (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null;
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


        userLogoutSuccess: (state, action) => {
            state.user = null;
            state.isAuthenticated = false
            state.message = action.payload.message
            state.error = null;
        },
        userLogoutFailed: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true
            state.error = state.payload
        },
        clearAllErrors: (state, action) => {
            state.user = action.payload;
            state.error = null
        },
    },
});

export const {
    registerRequest, registerSuccess, registerFailed,
    loginRequest, loginSuccess, loginFailed,
    updateProfileImageRequest, updateProfileImageSuccess, updateProfileImageFailed,
    profileRequest, profileSuccess, profileFailed,
    userLogoutSuccess, userLogoutFailed,
    updateProfileRequest, updateProfileSuccess, updateProfileFailed,
    clearAllErrors,
} = userSlice.actions;
export default userSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}

export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch(registerRequest())
        try {
            const { data } = await axios.post(`${backendApi}/api/v1/user/register`, userData, axiosConfig);

            if (data.success) {
                dispatch(registerSuccess(data));
                toast.success(data.message)
                // dispatch(clearAllErrors());
            }

        } catch (error) {
            console.log(error);
            dispatch(registerFailed(error?.response?.data?.message))
        }
    };
}

export const loginUser = (userData) => {
    return async (dispatch) => {
        dispatch(loginRequest())
        try {
            const { data } = await axios.post(`${backendApi}/api/v1/user/login`, userData, axiosConfig);
            if (data.success) {
                dispatch(loginSuccess(data));
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
            dispatch(loginFailed(error?.response?.data?.message))
        }
    };
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/user/logout`, axiosConfig);
            if (data.success) {
                dispatch(userLogoutSuccess(data));
                toast.success(data?.message)
                document.location.href = '/'
            }
        } catch (error) {
            console.log(error);
            dispatch(userLogoutFailed(error?.response?.data?.message))
        }
    };
}

// profile
export const profileUser = () => {
    return async (dispatch) => {
        dispatch(profileRequest())
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/user/me`, axiosConfig);

            if (data.success) {
                dispatch(profileSuccess(data));
                // document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(profileFailed(error?.response?.data?.message))
        }
    };
}

// update profile 
export const updateUser = (userData) => {
    return async (dispatch) => {
        dispatch(updateProfileRequest())
        try {
            const { data } = await axios.put(`${backendApi}/api/v1/user/update/me`, userData, axiosConfig);
            if (data.success) {
                dispatch(updateProfileSuccess(data));
                toast.success(data?.message)
                document.location.href = '/profile'
            }
        } catch (error) {
            console.log(error);
            dispatch(updateProfileFailed(error?.response?.data?.message))
        }
    };
}

// update image
export const updateProfileImage = (image) => {
    return async (dispatch) => {
        dispatch(updateProfileImageRequest())
        try {
            const { data } = await axios.put(`${backendApi}/api/v1/user/update/profile-image`, image, axiosConfig);
            if (data.success) {
                dispatch(updateProfileImageSuccess(data));
                toast.success(data?.message)
                document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(updateProfileImageFailed(error?.response?.data?.message))
        }
    };
}




export const clearAllUserErrors = () => async (dispatch) => {
    dispatch(clearAllErrors())
}

