import axios from "axios";
import { store } from "@/redux/store";
import { clearUser } from "@/redux/slices/user";
import { clearSeller } from "@/redux/slices/seller";

// Enable credentials (cookies) for every request
axios.defaults.withCredentials = true;

// Create a global axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor to handle expired or missing token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      store.dispatch(clearUser());
      store.dispatch(clearSeller());
    }
    return Promise.reject(error);
  }
);

export default API;
