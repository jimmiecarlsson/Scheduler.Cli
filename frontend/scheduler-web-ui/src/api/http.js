import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.error ||
            error?.message ||
            "Ett fel uppstod vid kommunikation med servern";
        console.error("Axios error:", message);
        return Promise.reject(new Error(message));
    }
);

export default http;
