import { useDispatch } from "react-redux";

import { uiActions } from "./ui-slice";

const host = "http://localhost:8080";

export const fetchPosts = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${host}/feed/posts`);
      const resData = response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to fetch post.");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return resData;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to fetch posts"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const fetchPost = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${host}/feed/post/${postId}`);
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return resData;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to fetch post"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const getUserPosts = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/feed/user-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to fetch your post");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return resData;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to fetch user posts"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/feed/post`, {
        method: "POST",
        body: JSON.stringify({ ...post }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to create post.");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return true;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to create post"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const updatePost = (postId, postData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/feed/post/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ ...postData }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to update post");
      }
      return resData;
    };
    //sync
    dispatch(uiActions.toggleLoading());
    try {
      const resData = await sendRequest();
      return true;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to update post"));
      return false;
    } finally {
      dispatch(uiActions.toggleLoading());
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/feed/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to delete post");
      }
      return resData;
    };
    //sync
    try {
      const resData = await sendRequest();
      return true;
    } catch (err) {
      dispatch(uiActions.setError(err.message || "Failed to delete post"));
      return false;
    }
  };
};
