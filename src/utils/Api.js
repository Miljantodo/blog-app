import axios from "axios";

const axios_api = axios.create({
  baseURL: "https://gorest.co.in/public/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 9c87990f1e6a61374d9c28eedf5c168d5c021b7d761ce8466a5d9e4c4a079e6a",
  },
});

export const fetchUsers = async (page) => {
  const res = await axios_api.get(`v1/users?page=${page}&per_page=30`);
  return res.data;
};

export const fetchUserInfo = async (userID) => {
  const res = await axios_api.get(`v2/users/${userID}`);
  return res.data;
};

export const fetchUserPosts = async (userID) => {
  const res = await axios_api.get(`v2/users/${userID}/posts`);
  return res.data;
};

export const fetchPosts = async (page) => {
  const res = await axios_api.get(`v1/posts?page=${page}&per_page=2`);
  return res.data;
};

export const fetchPostInfo = async (postID) => {
  const res = await axios_api.get(`v2/posts/${postID}`);
  return res.data;
};

export const fetchComments = async (postID) => {
  const res = await axios_api.get(`v2/posts/${postID}/comments`);
  return res.data;
};

export const createPost = async (data) => {
  const res = await axios_api.post(`v2/users/997879/posts`, {
    title: data.title,
    body: data.body,
  });
  return res.data;
};

export const postComment = async (body, postID) => {
  const res = await axios_api.post(`v2/posts/${postID}/comments`, {
    name: "Petar Vucic",
    email: "vucko.petar@gmail.com",
    body: body.comment,
  });
  return res.data;
};

export const updateUser = async (data, userID) => {
  const res = await axios_api.put(`v2/users/${userID}`, {
    name: data.name,
    email: data.email,
    gender: data.gender,
    status: data.status,
  });
  return res.data;
};

export const updatePost = async (data, postID) => {
  const res = await axios_api.put(`v2/posts/${postID}`, {
    title: data.title,
    body: data.body,
  });
  return res.data;
};
