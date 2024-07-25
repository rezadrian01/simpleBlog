import { createContext, useReducer } from "react";

export const UserContext = createContext({});

function userContextReducer(state, action) {
  return state;
}

export default function UserContextProvider({ children }) {
  const [userContextState, userContextDispatch] = useReducer(
    userContextReducer,
    {
      userId: null,
      isLoggedIn: false,
    }
  );
  const ctxValue = {};
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
