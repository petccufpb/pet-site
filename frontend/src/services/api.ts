import axios from "axios";

const api = axios.create({
  baseURL: typeof window !== "undefined" ? "/api/proxy" : process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    cache: "no-store",
  },
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
