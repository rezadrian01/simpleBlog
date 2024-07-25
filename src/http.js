const host = "http://localhost:8080";

export async function fetchPosts() {
  const response = await fetch(`${host}/feed/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch post.");
  }
  const resData = response.json();
  return resData;
}
export async function fetchPost(postId) {
  const response = await fetch(`${host}/feed/post/${postId}`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return resData.post;
}
export async function getUserPost() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/feed/user-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch your post");
  }
  const resData = await response.json();
  return resData;
}

export async function createPost(post) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/feed/post`, {
    method: "POST",
    body: JSON.stringify({ ...post }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create post.");
  }
  const resData = await response.json();
  return resData;
}

export async function updatePost(postId, postData) {
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
    throw new Error("Failed to update post");
  }
  return resData;
}

export async function deletePost(postId) {
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
    throw new Error("Failed to delete post");
  }
  return resData;
}

//auth
export async function login(userData) {
  const response = await fetch(`${host}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ ...userData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const resData = response.json();
  return resData;
}
export async function signup(userData) {
  const response = await fetch(`${host}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ ...userData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  console.log(resData);
  if (!response.ok) {
    throw new Error("Failed to create account");
  }
  return resData;
}
