import { createContext, useReducer } from "react";

export const MenuContext = createContext({
  menuContextState: {
    selectedMenu: "posts",
    selectedPostId: null,
    isLoggedIn: false,
  },
  handleAddPostMenu,
  handleAddPostMenu,
  handleSelectPostMenu,
  handleEditPostMenu,
  handleResetMenu,
  handleBackToMyPostMenu,
});

function menuContextReducer(state, action) {
  //Menu
  if (action.type === "ADD_POST_MENU") {
    if (!data.isLoggedIn) {
      return state((prevData) => ({
        ...prevData,
        selectedMenu: "signin",
      }));
    }
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "newPost",
    }));
  }
  if (action.type === "SHOW_MYPOST_MENU") {
    if (!data.isLoggedIn) {
      return state((prevData) => ({
        ...prevData,
        selectedMenu: "signin",
      }));
    }
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "myPost",
    }));
  }
  if (action.type === "SELECT_POST_MENU") {
    const { postId } = action.payload;
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "select post",
      selectedPostId: postId,
    }));
  }
  if (action.type === "EDIT_POST_MENU") {
    const { postId } = action.payload;
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "edit post",
      selectedPostId: postId,
    }));
  }
  if (action.type === "RESET_MENU") {
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "posts",
    }));
  }
  if (action.type === "BACK_TO_MYPOST") {
    return state((prevData) => ({
      ...prevData,
      selectedMenu: "myPost",
      selectedPostId: null,
    }));
  }
  return state;
}

export default function MenuContextProvider({ children }) {
  const [menuContextState, menuContextDispatch] = useReducer(
    menuContextReducer,
    {}
  );
  function handleAddPostMenu() {
    menuContextDispatch({
      type: "ADD_POST_MENU",
    });
  }
  function handleAddPostMenu() {
    menuContextDispatch({
      type: "SHOW_MYPOST_MENU",
    });
  }
  function handleSelectPostMenu(postId) {
    menuContextDispatch({
      type: "SELECT_POST_MENU",
      payload: { postId },
    });
  }
  function handleEditPostMenu(postId) {
    menuContextDispatch({
      type: "EDIT_POST_MENU",
      payload: { postId },
    });
  }
  function handleResetMenu() {
    menuContextDispatch({
      type: "RESET_MENU",
    });
  }
  function handleBackToMyPostMenu() {
    menuContextDispatch({
      type: "BACK_TO_MYPOST",
    });
  }
  const ctxValue = {
    menuContextState,
    handleAddPostMenu,
    handleAddPostMenu,
    handleSelectPostMenu,
    handleEditPostMenu,
    handleResetMenu,
    handleBackToMyPostMenu,
  };
  return (
    <MenuContext.Provider value={ctxValue}>{children}</MenuContext.Provider>
  );
}
