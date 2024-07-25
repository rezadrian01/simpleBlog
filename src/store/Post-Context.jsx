import { createContext, useReducer } from "react";

export const PostContext = createContext({
  postContextState: {
    selectedMenu: "posts",
    selectedPostId: null,
    isLoggedIn: false,
  },
  handleAddPostMenu,
  handleAddPostMenu,
  handleSelectPostMenu,
  handleEditPostMenu,
});

function postContextReducer(state, action) {
  return state;
}

export default function PostContextProvider({ children }) {
  const [postContextState, postContextDispatch] = useReducer(
    postContextReducer,
    {
      selectedMenu: "posts",
      selectedPostId: null,
      isLoggedIn: false,
    }
  );

  //ctxValue
  const ctxValue = {};
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
