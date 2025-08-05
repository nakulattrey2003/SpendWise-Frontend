import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://spendwise-cs42.onrender.com/",
  // headers: {
  //   "Content-Type": "multipart/form-data/json",
  //   // Accept: "application/json",
  // },
});

// list of endpoints that do not require auth headers
const excludeEndpoints = ["/login", "/register", "/health", "/status"];

// request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;

// response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
      window.location.href = "/login";
    } else if (error.response && error.response.status === 500) {
      // Handle server errors
      console.error("Server error - please try again later");
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout errors
      console.error(
        "Request timed out - please check your internet connection"
      );
    }
    return Promise.reject(error);
  }
);
