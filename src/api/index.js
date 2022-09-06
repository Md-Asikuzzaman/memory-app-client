import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080",
});

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => Api.get("/posts");
export const createPost = (data) => Api.post(`/posts/create`, data);
export const removePost = (id) => Api.delete(`/posts/delete/${id}`);
export const updatePost = (newData, id) =>
  Api.patch(`/posts/update/${id}`, newData);
export const likePost = (id) => Api.patch(`/posts/like/${id}`);

// users data send...
export const signIn = (formData) => Api.post(`/auth/signin`, formData);
export const signUp = (formData) => Api.post(`/auth/signup`, formData);
