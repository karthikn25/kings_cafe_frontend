import {
    editUserFail,
    editUserRequest,
    editUserSuccess,
    forgetPasswordFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    getAllUserFail,
    getAllUserRequest,
    getAllUserSuccess,
    getUserFail,
    getUserRequest,
    getUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    otpFail,
    otpRequest,
    otpSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    signupFail,
    signupRequest,
    signupSuccess,
  } from "../slices/userSlice";
  // import { URL } from "../../server";
  
  
  
  const login = (credentials) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        console.log("Backend URL:", process.env.REACT_APP_URL);
        const res = await fetch(`${process.env.REACT_APP_URL}/user/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok) {
            dispatch(loginSuccess(data));
            localStorage.setItem("id", data.user._id);
            localStorage.setItem("token", data.token);
            return data; // Return the data for further use
        } else {
            dispatch(loginFail(data.message || 'Login failed'));
            return { message: data.message }; // Return error message
        }
    } catch (error) {
        console.error("Login error:", error);
        dispatch(loginFail(error.message || 'Network error'));
        return { message: error.message }; // Return error message
    }
};

  
  
  const register = (credentials) => async (dispatch) => {
    try {
      dispatch(signupRequest());
      const { email, password, username } = credentials;
      const res = await fetch(`${process.env.REACT_APP_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signupSuccess(data));
      } else {
        dispatch(signupFail(data.message));
      }
    } catch (error) {
      dispatch(signupFail(error.message));
    }
  };
  
  const verifyOtp = (credentials) => async (dispatch) => {
    try {
      dispatch(otpRequest());
      const { otp } = credentials;
      const res = await fetch(`${process.env.REACT_APP_URL}/user/verify-otp`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(otpSuccess(data));
        localStorage.setItem("token",data.token);
        localStorage.setItem("id",data.user._id);
        
      } else {
        dispatch(otpFail(data.message));
      }
    } catch (error) {
      dispatch(otpFail(error.message));
    }
  };
  
  const forget = (credentials) => async (dispatch) => {
    try {
      dispatch(forgetPasswordRequest());
      const { email } = credentials;
      const res = await fetch(`${process.env.REACT_APP_URL}/user/forget`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(forgetPasswordSuccess(data));
      } else {
        dispatch(forgetPasswordFail(data.message));
      }
    } catch (error) {
      dispatch(forgetPasswordFail(error.message));
    }
  };
  const reset = (credentials, userData) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const { password } = credentials;
      const { id, token } = userData;
      console.log(id,token);
      const res = await fetch(`${process.env.REACT_APP_URL}/user/reset-password/${id}/${token}`, {
        method: "PUT",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(resetPasswordSuccess(data));
        localStorage.setItem("token",data.token);
        localStorage.setItem("id",data.user._id);
      } else {
        dispatch(resetPasswordFail(data.message));
      }
    } catch (error) {
      dispatch(resetPasswordFail(error.message));
    }
  };
  const getAllUser = () => async (dispatch) => {
    try {
      dispatch(getAllUserRequest());
      const res = await fetch(`${process.env.REACT_APP_URL}/user/allusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(getAllUserSuccess(data));
      } else {
        dispatch(getAllUserFail(data.message));
      }
    } catch (error) {
      dispatch(getAllUserFail(error.message));
    }
  };
  
  // const getSingleUser = (userInfo) => async (dispatch) => {
  //   try {
  //     dispatch(getUserRequest());
  
  //     const res = await fetch(`${process.env.REACT_APP_URL}/user/getuser/${userInfo}`, {
  //       method: "GET",
        
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     if (res.ok) { 
  //       dispatch(getUserSuccess(data));
  //     } else {
  //       dispatch(getUserFail(data.message));
  //     }
  //   } catch (error) {
  //     dispatch(getUserFail(error.message));
  //   }
  // };
 
  const getSingleUser = (userId) => async (dispatch) => {
    try {
      dispatch(getUserRequest());
  
      const res = await fetch(`${process.env.REACT_APP_URL}/user/getuser/${userId}`, {
        method: "GET",
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.ok) { 
        dispatch(getUserSuccess(data));
      } else {
        dispatch(getUserFail(data.message));
      }
    } catch (error) {
      dispatch(getUserFail(error.message));
    }
  };

  
  const editUser = (credentials, userInfo) => async (dispatch) => {
    try {
      dispatch(editUserRequest());
      const formData = new FormData();
      formData.append("username", credentials.username);  // Use "name" instead of "username"
      if (credentials.avatar) {
        formData.append("avatar", credentials.avatar); // Add the image file to FormData
      }
  
      const res = await fetch(`${process.env.REACT_APP_URL}/user/edit/${userInfo}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(editUserSuccess(data));
        return data;  // Return the response data (e.g., user data or success message)
      } else {
        dispatch(editUserFail(data.message));
        return { success: false, message: data.message };
      }
    } catch (error) {
      dispatch(editUserFail(error.message));
      return { success: false, message: error.message };
    }
  };
  
  
  export {
    login,
    register,
    verifyOtp,
    forget,
    reset,
    getAllUser,
    getSingleUser,
    editUser,
  };
  
  