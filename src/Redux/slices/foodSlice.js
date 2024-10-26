import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    foods:[],
    singleFood:null,
    error:null
}

const foodSlice = createSlice({
    name:"food",
    initialState,
    reducers:{
        foodPostRequest(state){
            state.loading = true;
        },
        foodPostSuccess(state,action){
            state.loading = false;
            state.singleFood = action.payload
        },
        foodPostFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        foodGetAllRequest(state){
            state.loading = true;
        },
        foodGetAllSuccess(state,action){
            state.loading = false;
            state.foods = action.payload;
        },
        foodGetAllFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        foodGetSingleRequest(state){
            state.loading = true;
        },
        foodGetSingleSuccess(state,action){
            state.loading = false;
            state.singleFood = action.payload
        },
        foodGetSingleFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        foodUpdateRequest(state){
            state.loading=true
        },
        foodUpdateSuccess(state,action){
           state.loading=false;
           state.singleFood=action.payload;
        },
        foodUpdateFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        categoryFoodRequest(state){ 
            state.loading = true;
        },
        categoryFoodSuccess(state,action){
            state.loading = false;
            state.foods=action.payload;
        },
        categoryFoodFail(state,action){
            state.loading = false;
            state.error=action.payload;
        },
        foodDeleteRequest(state){
            state.loading=true;
        },
        foodDeleteSuccess(state,action){
            state.loading = false;
            state.singleFood=action.payload;
        },
        foodDeleteFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        foodSearchRequest(state){
            state.loading=true;
        },
        foodSearchSuccess(state,action){
            state.loading=false;
            state.foods=action.payload;
        },
        foodSearchFail(state,action){
            state.loading=false;
            state.error=action.payload;
        }

    }
})

export const {
    foodPostRequest,
    foodPostSuccess,
    foodPostFail,
    foodGetAllRequest,
    foodGetAllSuccess,
    foodGetAllFail,
    foodGetSingleRequest,
    foodGetSingleSuccess,
    foodGetSingleFail,
    foodUpdateRequest,
    foodUpdateSuccess,
    foodUpdateFail,
    foodDeleteRequest,
    foodDeleteSuccess,
    foodDeleteFail,
    foodSearchRequest,
    foodSearchSuccess,
    foodSearchFail,
    categoryFoodRequest,
    categoryFoodSuccess,
    categoryFoodFail
} = foodSlice.actions;

export default foodSlice.reducer;