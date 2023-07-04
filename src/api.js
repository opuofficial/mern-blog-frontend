import axios from "axios";

import { store } from "./app/store";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const setAuthorizationHeader = (config) => {
  const { user } = store.getState().auth;

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
};

api.interceptors.request.use(setAuthorizationHeader, (error) => {
  return Promise.reject(error);
});

export default api;
