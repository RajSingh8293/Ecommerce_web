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
        // token: localStorage.getItem('token')
        //     ? JSON.parse(localStorage.getItem('token'))
        //     : null,
        // user: localStorage.getItem('user')
        //     ? JSON.parse(localStorage.getItem('user'))
        //     : null,
        error: null,
        message: null,
        allUsers: []
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


        // admin all users
        getAllUsersRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        getAllUsersSuccess: (state, action) => {
            state.loading = false
            state.allUsers = action.payload.users;
            state.error = null;
        },
        getAllUsersFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },
        // admin delete user account
        deleteUserRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message;
            state.error = null;
        },
        deleteUserFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
        },
        // admin update user role
        updateUserRoleRequest: (state, action) => {
            state.loading = true
            state.error = null;
        },
        updateUserRoleSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message;
            state.error = null;
        },
        updateUserRoleFailed: (state, action) => {
            state.loading = false
            state.error = action.payload;
            state.message = null;
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
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFailed,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailed,
    updateUserRoleRequest,
    updateUserRoleSuccess,
    updateUserRoleFailed,
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
                // document.location.href = '/'
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
                toast.success(data?.message)
                // document.location.href = '/'
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
                document.location.href = '/'
                toast.success(data?.message)
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
            const { data } = await axios.get(`${backendApi}/api/v1/user/me`,
                {
                    withCredentials: true,
                },
            );

            if (data.success) {
                dispatch(profileSuccess(data));
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
            }
        } catch (error) {
            dispatch(updateProfileImageFailed(error?.response?.data?.message))
        }
    };
}


// admin get all users 
export const fetchAllUsers = () => {
    return async (dispatch) => {
        dispatch(getAllUsersRequest())
        try {
            const { data } = await axios.get(`${backendApi}/api/v1/user/all`, axiosConfig);

            if (data.success) {
                dispatch(getAllUsersSuccess(data));
                // document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(getAllUsersFailed(error?.response?.data?.message))
        }
    };
}


// admin update user role 
export const updateUserRoleByAdmin = (role, userId) => {
    return async (dispatch) => {
        dispatch(updateUserRoleRequest())
        try {
            const { data } = await axios.put(`${backendApi}/api/v1/user/role/update/${userId}`,
                role,
                axiosConfig
            );
            if (data.success) {
                dispatch(updateUserRoleSuccess(data));
                toast.success(data?.message)
                dispatch(fetchAllUsers())
                // document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(updateUserRoleFailed(error?.response?.data?.message))
        }
    };
}

// admin delete user account 
export const deleteUserAccount = (userId) => {
    return async (dispatch) => {
        dispatch(deleteUserRequest())
        try {
            const { data } = await axios.delete(`${backendApi}/api/v1/user/admin/delete/${userId}`, axiosConfig);
            if (data.success) {
                dispatch(deleteUserSuccess(data));
                toast.success(data?.message)
                dispatch(fetchAllUsers())
                // document.location.href = '/profile'
            }
        } catch (error) {
            dispatch(deleteUserFailed(error?.response?.data?.message))
        }
    };
}


export const clearAllUserErrors = () => async (dispatch) => {
    dispatch(clearAllErrors())
}

