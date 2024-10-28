import { categoryDeleteFail, categoryDeleteRequest, categoryDeleteSuccess, categoryEditFail, categoryEditRequest, categoryEditSuccess, categoryGetAllFail, categoryGetAllRequest, categoryGetAllSuccess, categoryPostFail, categoryPostRequest, categoryPostSuccess } from "../slices/categorySlice"


const categoryPost = (credential)=>async(dispatch)=>{
    try {
        dispatch(categoryPostRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/category/create`,{
            method:"POST",
            body:credential,
            headers:{
                "x-auth-token":localStorage.getItem("token")
            }
        })
        const data = await res.json()
        console.log(data);
        if(res.ok){
            dispatch(categoryPostSuccess(data))
        }
        else{
            dispatch(categoryPostFail(data.message))
        }
    } catch (error) {
        dispatch(categoryPostFail(error.message))
    }
}
const categoryGet = ()=>async(dispatch)=>{
    try {
        dispatch(categoryGetAllRequest())
        const res = await fetch(`${process.env.REACT_APP_URL}/category/get`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryGetAllSuccess(data))
        }
        else{
            dispatch(categoryGetAllFail(data.message))
        }
    } catch (error) {
        dispatch(categoryGetAllFail(error.message))
    }
}

 const categoryRemove = (categoryInfo)=>async(dispatch)=>{
    try {
        dispatch(categoryDeleteRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/category/remove/${categoryInfo}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryDeleteSuccess(data))
        }
        else{
            dispatch(categoryDeleteFail(data.message))
        }
    } catch (error) {
        dispatch(categoryDeleteFail(error.message))
    }
 }

const categoryEdit = (credential, categoryInfo) => async (dispatch) => {
    try {
        dispatch(categoryEditRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/category/categoryedit/${categoryInfo}`, {
            method: "PUT",
            body: credential,
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        });

        const data = await res.json();
        console.log(data); // Keep this for debugging

        if (res.ok) {
            dispatch(categoryEditSuccess(data));
            return data; // Return data for further handling in the component
        } else {
            // Dispatch fail action with message
            dispatch(categoryEditFail(data.message || 'Failed to update category.'));
            return { error: data.message || 'Failed to update category.' }; // Return error for handling in the component
        }
    } catch (error) {
        dispatch(categoryEditFail(error.message));
        return { error: error.message }; // Return error for handling in the component
    }
};


 export {
    categoryPost,
    categoryGet,
    categoryRemove,
    categoryEdit

 }