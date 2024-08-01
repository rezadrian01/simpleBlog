import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    isLoggedIn: false,
  },
  reducers: {
    signoutHandler(state, action) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.userId = null;
    },
    signinHandler(state, action) {
      state.userId = action.payload;
      state.isLoggedIn = true;
    },
    tokenCheck(state, action) {
      state.isLoggedIn = localStorage.getItem("token") ? true : false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

export const signupFn = (userData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to signup");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return resData;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to signup"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const signinFn = (userData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      localStorage.setItem("token", resData.token);
      dispatch(authActions.signinHandler(resData.userId));
      return true;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to login"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};
