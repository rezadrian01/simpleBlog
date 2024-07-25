import { createContext, useReducer } from "react";

export const MenuContext = createContext({
  menuContextState: {
    selectedMenu: "posts",
    selectedPostId: null,
  },
  handleAddPostMenu: () => {},
  handleMyPostMenu: () => {},
  handleSelectPostMenu: (postId) => {},
  handleEditPostMenu: (postId) => {},
  handleResetMenu: () => {},
  handleBackToMyPostMenu: () => {},
  handleSigninMenu: () => {},
  handleSignupMenu: () => {},
});

function menuContextReducer(state, action) {
  //Menu
  if (action.type === "ADD_POST_MENU") {
    if (!state.isLoggedIn) {
      return {
        ...state,
        selectedMenu: "signin",
      };
    }
    console.log("CLICKED");
    return {
      ...state,
      selectedMenu: "newPost",
    };
  }
  if (action.type === "SHOW_MYPOST_MENU") {
    if (!state.isLoggedIn) {
      return {
        ...state,
        selectedMenu: "signin",
      };
    }
    return {
      ...state,
      selectedMenu: "myPost",
    };
  }
  if (action.type === "SELECT_POST_MENU") {
    const { postId } = action.payload;
    return {
      ...state,
      selectedMenu: "select post",
      selectedPostId: postId,
    };
  }
  if (action.type === "EDIT_POST_MENU") {
    const { postId } = action.payload;
    return {
      ...state,
      selectedMenu: "editPost",
      selectedPostId: postId,
    };
  }
  if (action.type === "RESET_MENU") {
    return {
      ...state,
      selectedMenu: "posts",
    };
  }
  if (action.type === "BACK_TO_MYPOST") {
    return {
      ...state,
      selectedMenu: "myPost",
      selectedPostId: null,
    };
  }
  if (action.type === "SIGNIN_MENU") {
    return {
      ...state,
      selectedMenu: "signin",
    };
  }
  if (action.type === "SIGNUP_MENU") {
    return {
      ...state,
      selectedMenu: "signup",
    };
  }
  return state;
}

export default function MenuContextProvider({ children }) {
  const [menuContextState, menuContextDispatch] = useReducer(
    menuContextReducer,
    { selectedMenu: "posts", selectedPostId: null }
  );
  function handleAddPostMenu() {
    menuContextDispatch({
      type: "ADD_POST_MENU",
    });
  }
  function handleMyPostMenu() {
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
  function handleSigninMenu() {
    menuContextDispatch({
      type: "SIGNIN_MENU",
    });
  }
  function handleSignupMenu() {
    menuContextDispatch({
      type: "SIGNUP_MENU",
    });
  }

  const ctxValue = {
    menuContextState,
    handleAddPostMenu,
    handleMyPostMenu,
    handleSelectPostMenu,
    handleEditPostMenu,
    handleResetMenu,
    handleBackToMyPostMenu,
    handleSigninMenu,
    handleSignupMenu,
  };
  return (
    <MenuContext.Provider value={ctxValue}>{children}</MenuContext.Provider>
  );
}
