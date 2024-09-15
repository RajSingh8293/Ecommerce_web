import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/ProductSlice';
import favorateProductsSlice from './slices/favorateProductsSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import ordersSlice from './slices/orderSlice';



const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        favorateItems: favorateProductsSlice,
        cartItems: cartSlice,
        myOrders: ordersSlice,
    },
})

export default store;