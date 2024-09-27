/* eslint-disable react-refresh/only-export-components */

import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : [],
        status: STATUS.IDLE,
    },
    reducers: {
        addToCart: (state, action) => {
            const Items = action.payload
            const existItem = state.cartItems.find((item) => item._id === Items._id)
            if (existItem) {
                existItem.quantity++
            } else {
                state.cartItems.push({ ...action.payload })
                // state.cartItems.push({ ...action.payload, quantity: 1, })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.success('Item added to shopping cart')
        },
        removeFromCart: (state, action) => {
            const removeData = state.cartItems.filter(
                (item) => item._id !== action.payload._id,
            )
            state.cartItems = removeData
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.success('Removed from shopping cart')
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item._id === action.payload)
            item.quantity++
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decrementQuantity: (state, action) => {

            const item = state.cartItems.find((item) => item._id === action.payload)

            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCartItems: (state) => {
            state.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        shippingReducer: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
        },

        setStatus: (state, action) => {
            state.status = action.payload
        },

    }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setStatus, clearCartItems, shippingReducer } = cartSlice.actions
export default cartSlice.reducer