export async function fetchPosts() {
  const response = await fetch("http://localhost:8080/feed/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch post.");
  }
  const resData = response.json();
  return resData;
}
export async function createPost(post) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/feed/post", {
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
export async function login(userData) {
  const response = await fetch("http://localhost:8080/auth/login", {
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
  const response = await fetch("http://localhost:8080/auth/signup", {
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
export async function getUserPost() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/feed/user-post", {
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
