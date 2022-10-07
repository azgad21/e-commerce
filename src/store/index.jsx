import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import productSlice from "./slices/product.slice";
import purchasesSlices from "./slices/purchases.slices";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        product: productSlice,
        purchases: purchasesSlices,
        cart: cartSlice
    }
})