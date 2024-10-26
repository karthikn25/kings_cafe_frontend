import { categoryFoodFail, categoryFoodRequest, categoryFoodSuccess, foodDeleteFail, foodDeleteRequest, foodDeleteSuccess, foodGetAllFail, foodGetAllRequest, foodGetAllSuccess, foodGetSingleRequest, foodPostFail, foodPostRequest, foodPostSuccess, foodSearchFail, foodSearchRequest, foodSearchSuccess, foodUpdateFail, foodUpdateRequest, foodUpdateSuccess } from "../slices/foodSlice"





const foodPost = (credential,categoryInfo,userInfo)=>async(dispatch)=>{
    try {
        dispatch(foodPostRequest())
        const res = await fetch(`${process.env.REACT_APP_URL}/food/${categoryInfo}/${userInfo}`,{
            method:"POST",
            body:credential,
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
           dispatch(foodPostSuccess(data))
        }
        else{
            dispatch(foodPostFail(data.message))
        }
    } catch (error) {
        dispatch(foodPostFail(error.message))
    }
}

const getCategoryFood = (categoryInfo)=>async(dispatch)=>{
    try {
        dispatch(categoryFoodRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/food/getall/${categoryInfo}`,{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        })
       const data = await res.json();
       console.log(data);
       if(res.ok){
        dispatch(categoryFoodSuccess(data))
       }
       else{
        dispatch(categoryFoodFail(data.message))
       }
    } catch (error) {
        dispatch(categoryFoodFail(error.message))
    }
}

const getAllFood = ()=>async(dispatch)=>{
    try {
        dispatch(foodGetAllRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/food/getall`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(foodGetAllSuccess(data))
        }
        else{
            dispatch(foodGetAllFail(data.message))
        }
    } catch (error) {
        dispatch(foodGetAllFail(error.message))
    }
} 
const deleteFood = (foodInfo)=>async(dispatch)=>{
    try {
        dispatch(foodDeleteRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/remove/${foodInfo}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(foodDeleteSuccess(data))
        }
        else{
            dispatch(foodDeleteFail(data.message))
        }
    } catch (error) {
        dispatch(foodDeleteFail(error.message))
    }
}
const getSingleFood = (foodInfo)=>async(dispatch)=>{
    try {
        dispatch(categoryFoodRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/food/getsingle/${foodInfo}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryFoodSuccess(data))
        }
        else{
            dispatch(categoryFoodFail(data.message))
        }
    } catch (error) {
        dispatch(categoryFoodFail(error.message))
    }
}

const foodUpdate = (credential,productInfo)=>async(dispatch)=>{
    try {
        dispatch(foodUpdateRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/food/${productInfo}`,{
            method:"PUT",
            body:credential,
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(foodUpdateSuccess(data))
        }else{
            dispatch(foodUpdateFail(data.message))
        }
    } catch (error) {
        dispatch(foodUpdateFail(error.message))
    }
}
const searchFood = (keyword)=>async(dispatch)=>{
    try {
        dispatch(foodSearchRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/food/search/${keyword}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(foodSearchSuccess(data))
        }
        else{
            dispatch(foodSearchFail(data.message))
        }
    } catch (error) {
        dispatch(foodSearchFail(error.message))
    }
}


export 
{
    foodPost,
    getCategoryFood,
    getAllFood,
    deleteFood,
    getSingleFood,
    foodUpdate,
    searchFood
}
