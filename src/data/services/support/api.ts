import axios from "axios";
import ApiPathConstant from "../../commons/constants/ApiPathContant";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || ApiPathConstant.fallbackBaseApiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
