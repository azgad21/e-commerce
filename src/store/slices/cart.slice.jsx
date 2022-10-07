import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const cart = action.payload
            return cart
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setProducts(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
} 

export const addCartThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true))
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
} 

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setProducts([])))
        .finally(() => dispatch(setIsLoading(false)))
}    

export const { setProducts } = cartSlice.actions

export default cartSlice.reducer