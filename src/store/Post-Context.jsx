import { createContext, useReducer } from "react";

import {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
} from "../http.js";

export const PostContext = createContext({
  postContextState: {
    posts: [],
    currentPost: {},
    hasError: false,
    isLoading: false,
    totalPosts: 0,
  },
  creatingPost: () => {},
  fetchingPosts: () => {},
  fetchingPost: () => {},
  updatingPost: () => {},
  deletingPost: () => {},
});

function postContextReducer(state, action) {
  let tempValue;
  switch (action.type) {
    case "STARTING_LOADING":
      return state((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

    //create
    case "SUCCESS_CREATE_POST":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: false,
      }));
    case "FAIL_CREATE_POST":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: "Failed to create post.",
      }));

    //fetch
    case "SUCCESS_FETCH_POSTS":
      return state((prevState) => ({
        ...prevState,
        posts: [...action.payload.posts],
        totalPosts: action.payload.totalPosts,
        isLoading: false,
        hasError: false,
      }));
    case "FAIL_FETCH_POSTS":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: "Failed to fetch posts",
      }));

    case "SUCCESS_FETCH_POST":
      return state((prevState) => ({
        ...prevState,
        currentPost: action.payload.post,
        isLoading: false,
        hasError: false,
      }));

    case "FAIL_FETCH_POST":
      return state((prevState) => ({
        ...prevState,
        hasError: "Failed to fetch post",
      }));

    //update
    case "SUCCESS_UPDATE_POST":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: false,
      }));
    case "FAIL_UPDATE_POST":
      return state((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: "Failed to update post",
      }));

    //delete
    case "START_DELETE_POST":
      tempValue = [...state.posts];
      const deletedPosts = state.posts.filter(
        (post) => post.id !== action.payload.postId
      );
      return state((prevState) => ({
        ...prevState,
        posts: deletedPosts,
      }));
    case "FAIL_DELETE_POST":
      return state((prevState) => ({
        ...prevState,
        posts: [...tempValue],
        hasError: "Failed to deleting post.",
      }));
  }
  return state;
}

export default function PostContextProvider({ children }) {
  const [postContextState, postContextDispatch] = useReducer(
    postContextReducer,
    {
      posts: [],
      currentPost: {},
      hasError: false,
      isLoading: false,
      totalPosts: 0,
    }
  );
  async function creatingPost(postData) {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await createPost({ ...postData });
      postContextDispatch({
        type: "SUCCESS_CREATE_POST",
        payload: resData,
      });
    } catch (err) {
      postContextDispatch({
        type: "FAIL_CREATE_POST",
      });
    }
  }
  async function fetchingPosts() {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await fetchPosts();
      postContextDispatch({
        type: "SUCCESS_FETCH_POSTS",
        payload: { posts: [...resData.posts], totalPosts: resData.totalPosts },
      });
    } catch (err) {
      postContextDispatch({
        type: "FAIL_FETCH_POSTS",
      });
    }
  }
  async function fetchingPost(postId) {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await fetchPost(postId);
      postContextDispatch({
        type: "SUCCESS_FETCH_POST",
        payload: {
          post: resData.post,
        },
      });
    } catch (err) {
      postContextDispatch({
        type: "FAIL_FETCH_POST",
      });
    }
  }
  async function updatingPost(postId, postData) {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await updatePost(postId, { ...postData });
      postContextDispatch({
        type: "SUCCESS_UPDATE_POST",
      });
    } catch (err) {
      postContextDispatch({
        type: "FAIL_UPDATE_POST",
      });
    }
  }
  async function deletingPost(postId) {
    try {
      postContextDispatch({
        type: "START_DELETE_POST",
        payload: {
          postId,
        },
      });
      const resData = await deletePost(postId);
    } catch (err) {
      postContextDispatch({
        type: "FAIL_DELETE_POST",
      });
    }
  }

  //ctxValue
  const ctxValue = {
    postContextState,
    creatingPost,
    fetchingPosts,
    fetchingPost,
    updatingPost,
    deletingPost,
  };
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
