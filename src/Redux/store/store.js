import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import foodReducer from '../slices/foodSlice';
import categoryReducer from '../slices/categorySlice';


const store = configureStore({
    reducer:{
        user:userReducer,
        food:foodReducer,
        category:categoryReducer
    }
})

export default store;