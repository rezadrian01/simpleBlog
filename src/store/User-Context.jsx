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
  signoutFn: () => {},
});

function userContextReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return state((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

    case "SUCCESS_LOGIN":
      //set token to localStorage
      localStorage.setItem("token", action.payload.token);
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: false,
        userId: action.payload.userId,
        isLoggedIn: true,
      }));
    case "FAIL_LOGIN":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: "Failed to login",
      }));

    case "SUCCESS_SIGNUP":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: false,
      }));
    case "FAIL_SIGNUP":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: "Failed to signup",
      }));

    case "SIGNOUT":
      localStorage.removeItem("token");
      return state((prevState) => ({
        ...prevState,
        isLoggedIn: false,
        userId: null,
      }));
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
      const response = await login(userData);
      userContextDispatch({
        type: "SUCCESS_LOGIN",
        payload: {
          token: response.token,
          userId: response.userId,
        },
      });
    } catch (err) {
      userContextDispatch({
        type: "FAIL_LOGIN",
      });
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
    } catch (err) {
      userContextDispatch({
        type: "FAIL_SIGNUP",
      });
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
    signoutFn,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
