import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/ProductSlice';
import favorateProductsSlice from './slices/favorateProductsSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import ordersSlice from './slices/orderSlice';
import adminProducstSlice from './slices/AdminProductsSlice';



const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        favorateItems: favorateProductsSlice,
        cartItems: cartSlice,
        orders: ordersSlice,
        adminProducts: adminProducstSlice,
    },
})

export default store;