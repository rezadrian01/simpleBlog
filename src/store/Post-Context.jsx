import { createContext, useReducer, useCallback } from "react";

import {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
  getUserPost,
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
  fetchingUserPosts: () => {},
  updatingPost: () => {},
  deletingPost: () => {},
});

function postContextReducer(state, action) {
  let tempValue;
  switch (action.type) {
    case "STARTING_LOADING":
      return {
        ...state,
        isLoading: true,
        posts: [],
        totalPosts: 0,
        hasError: false,
      };

    //create
    case "SUCCESS_CREATE_POST":
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case "FAIL_CREATE_POST":
      return {
        ...state,
        isLoading: false,
        hasError: "Failed to create post.",
      };

    //fetch
    case "SUCCESS_FETCH_POSTS":
      return {
        ...state,
        posts: [...action.payload.posts],
        totalPosts: action.payload.totalPosts,
        isLoading: false,
        hasError: false,
      };
    case "FAIL_FETCH_POSTS":
      return {
        ...state,
        isLoading: false,
        hasError: "Failed to fetch posts",
      };

    case "SUCCESS_FETCH_POST":
      return {
        ...state,
        currentPost: action.payload.post,
        isLoading: false,
        hasError: false,
      };

    case "FAIL_FETCH_POST":
      return {
        ...state,
        hasError: "Failed to fetch post",
        isLoading: false,
      };
    case "SUCCESS_FETCH_USER_POST":
      return {
        ...state,
        isLoading: false,
        posts: [...action.payload.posts],
        totalPosts: action.payload.totalPosts,
        hasError: false,
      };
    case "FAIL_FETCH_USER_POST":
      return {
        ...state,
        hasError: "Failed to fetch user posts",
        isLoading: false,
      };

    //update
    case "SUCCESS_UPDATE_POST":
      return { ...state, isLoading: false, hasError: false };
    case "FAIL_UPDATE_POST":
      return {
        ...state,
        isLoading: false,
        hasError: "Failed to update post",
      };

    //delete
    case "START_DELETE_POST":
      tempValue = [...state.posts];
      const deletedPosts = state.posts.filter(
        (post) => post.id !== action.payload.postId
      );
      return {
        ...state,
        posts: deletedPosts,
      };
    case "FAIL_DELETE_POST":
      return {
        ...state,
        posts: [...tempValue],
        hasError: "Failed to deleting post.",
      };
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
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_CREATE_POST",
      });
      return false;
    }
  }
  const fetchingPosts = useCallback(async function fetchingPosts() {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await fetchPosts();
      postContextDispatch({
        type: "SUCCESS_FETCH_POSTS",
        payload: { posts: [...resData.posts], totalPosts: resData.totalPosts },
      });
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_FETCH_POSTS",
      });
      return false;
    }
  }, []);
  const fetchingPost = useCallback(async function fetchingPost(postId) {
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
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_FETCH_POST",
      });
      return false;
    }
  });
  const fetchingUserPosts = useCallback(async function fetchingUserPost() {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await getUserPost();
      console.log(resData);
      postContextDispatch({
        type: "SUCCESS_FETCH_USER_POST",
        payload: {
          posts: resData.posts,
          totalPosts: resData.totalPosts,
        },
      });
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_FETCH_USER_POST",
      });
      return false;
    }
  }, []);

  async function updatingPost(postId, postData) {
    postContextDispatch({
      type: "STARTING_LOADING",
    });
    try {
      const resData = await updatePost(postId, { ...postData });
      postContextDispatch({
        type: "SUCCESS_UPDATE_POST",
      });
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_UPDATE_POST",
      });
      return false;
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
      return true;
    } catch (err) {
      postContextDispatch({
        type: "FAIL_DELETE_POST",
      });
      return false;
    }
  }

  //ctxValue
  const ctxValue = {
    postContextState,
    creatingPost,
    fetchingPosts,
    fetchingPost,
    fetchingUserPosts,
    updatingPost,
    deletingPost,
  };
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
