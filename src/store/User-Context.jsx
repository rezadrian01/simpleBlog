import { createContext, useReducer } from "react";

import { login, signup } from "../http";

export const UserContext = createContext({
  userContextState: {
    userId: null,
    isLoggedIn: false,
    isLoading: false,
    hasError: false,
  },
  signinFn: (userData) => {},
  signupFn: (userData) => {},
  tokenCheck: () => {},
  signoutFn: () => {},
});

function userContextReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESS_LOGIN":
      //set token to localStorage
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case "FAIL_LOGIN":
      return {
        ...state,
        isLoading: false,
        hasError: "Failed to login",
      };

    case "SUCCESS_SIGNUP":
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case "FAIL_SIGNUP":
      return {
        ...state,
        isLoading: false,
        hasError: "Failed to signup",
      };

    case "TOKEN_CHECK":
      if (localStorage.getItem("token")) {
        return {
          ...state,
          isLoggedIn: true,
          isLoading: false,
        };
      }

    case "SIGNOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        hasError: false,
        userId: null,
      };
  }
  return state;
}

export default function UserContextProvider({ children }) {
  const [userContextState, userContextDispatch] = useReducer(
    userContextReducer,
    {
      userId: null,
      isLoggedIn: false,
      isLoading: false,
      hasError: false,
    }
  );
  async function signinFn(userData) {
    userContextDispatch({
      type: "START_LOADING",
    });
    try {
      const response = await login({ ...userData });
      userContextDispatch({
        type: "SUCCESS_LOGIN",
        payload: {
          token: response.token,
          userId: response.userId,
        },
      });
      return true;
    } catch (err) {
      userContextDispatch({
        type: "FAIL_LOGIN",
      });
      return false;
    }
  }

  async function signupFn(userData) {
    userContextDispatch({
      type: "START_LOADING",
    });
    try {
      const response = await signup(userData);
      userContextDispatch({
        type: "SUCCESS_SIGNUP",
      });
      return true;
    } catch (err) {
      userContextDispatch({
        type: "FAIL_SIGNUP",
      });
      return false;
    }
  }
  function tokenCheck() {
    userContextDispatch({
      type: "START_LOADING",
    });
    try {
      userContextDispatch({
        type: "TOKEN_CHECK",
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  async function signoutFn() {
    userContextDispatch({
      type: "SIGNOUT",
    });
  }

  //ctxValue
  const ctxValue = {
    userContextState,
    signinFn,
    signupFn,
    tokenCheck,
    signoutFn,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
