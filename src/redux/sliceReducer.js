import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    cart: [],
    totalAmmount: 0,
}

const productReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, data } = action.payload;
            const existingProduct = state.cart.find(item => item._id === product._id);
            
            if (existingProduct) {
                existingProduct.qnty++; 
            } else {
                state.cart.push({ ...product, qnty: 1, sizes: data });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload._id;
            return state.cart.filter(item => item._id !== productId);
        },
        removeSingleItem: (state, action) => {
            const existingProduct = state.cart.find(item => item._id === action.payload.product._id);
            if (existingProduct && existingProduct.qnty > 1) {
                existingProduct.qnty -= 1;
            } 
        },
        clearCart: (state, action)=>{
            return state.cart = []
        },
        TotalPrice: (state, action) =>{
            return {
                ...state,
                totalAmmount: action.payload.totalPrice
            };
        },
    },
});

export const { addToCart, removeFromCart, removeSingleItem, clearCart, TotalPrice } = productReducer.actions;

export default productReducer.reducer;
