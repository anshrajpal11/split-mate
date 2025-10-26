import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

export { BASE };
export default api;
