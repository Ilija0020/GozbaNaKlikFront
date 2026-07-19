import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5128",
});

AxiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      console.log("Prijavljeni korisnik nema dozvolu za ovu akciju");
    }

    return Promise.reject(error);
  },
);

export default AxiosConfig;
