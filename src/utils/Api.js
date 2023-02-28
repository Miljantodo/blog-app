const API_TOKEN =
  "?access-token=04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const FETCH_USERS_API = "https://gorest.co.in/public/v1/users?page=";
const FECTH_POSTS_API = "https://gorest.co.in/public/v1/posts?page=";

const FETCH_USER_API = "https://gorest.co.in/public/v2/users/";
const FETCH_POST_API = "https://gorest.co.in/public/v2/posts/";

const CREATE_POST_API = "https://gorest.co.in/public/v2/users/702677/posts";

export const fetchUsers = async (page) => {
  const res = await fetch(FETCH_USERS_API + page + "&per_page=30" + API_TOKEN);
  return res.json();
};

export const fetchUserInfo = async (userID) => {
  const res = await fetch(FETCH_USER_API + userID + API_TOKEN);
  if (res.ok) {
    return res.json();
  }
  throw new Error("User doesn't exist.");
};

export const fetchUserPosts = async (userID) => {
  const res = await fetch(FETCH_USER_API + userID + "/posts" + API_TOKEN);
  return res.json();
};

export const fetchPosts = async (page) => {
  const res = await fetch(FECTH_POSTS_API + page + "&per_page=20" + API_TOKEN);
  return res.json();
};

export const fetchPostInfo = async (postID) => {
  const res = await fetch(FETCH_POST_API + postID + API_TOKEN);
  return res.json();
};

export const fetchComments = async (postID) => {
  const res = await fetch(FETCH_POST_API + postID + "/comments" + API_TOKEN);
  return res.json();
};

export const createPost = async (data) => {
  const res = await fetch(CREATE_POST_API + API_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: data.Title, body: data.Body }),
  });
  return res.json();
};
