import axios from "axios";
import { getToken } from "../helpers/token";

const apiUrl = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: `${apiUrl}`
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
  return Promise.reject(error)
});