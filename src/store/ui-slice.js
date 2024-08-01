import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    selectedMenu: "posts",
    selectedPostId: null,
    isLoading: false,
    hasError: null,
  },
  reducers: {
    addPostMenu(state, action) {
      if (!action.payload.isLoggedIn) {
        state.selectedMenu = "signin";
        return;
      }
      state.selectedMenu = "newPost";
    },
    myPostMenu(state, action) {
      if (!action.payload?.isLoggedIn) {
        state.selectedMenu = "signin";
        return;
      }
      state.selectedMenu = "myPost";
    },
    selectPostMenu(state, action) {
      state.selectedMenu = "selectPost";
      state.selectedPostId = action.payload;
    },
    editPostMenu(state, action) {
      state.selectedMenu = "editPost";
      state.selectedPostId = action.payload;
    },
    resetMenu(state, action) {
      state.selectedMenu = "posts";
      state.selectedPostId = null;
    },
    backToMyPostMenu(state, action) {
      state.selectedMenu = "myPost";
      state.selectedPostId = null;
    },
    signinMenu(state, action) {
      state.selectedMenu = "signin";
    },
    signupMenu(state, action) {
      state.selectedMenu = "signup";
    },
    toggleLoading(state, action) {
      state.isLoading = !state.isLoading;
    },
    setError(state, action) {
      state.hasError = action.payload;
    },
    resetError(state, action) {
      state.hasError = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
