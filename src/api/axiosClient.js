import axios from 'axios';

const url=process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const api =axios.create({
    baseURL:url,
    withCredentials: true
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (!error.response) {
      
      alert("Server not reachable. Please try again later.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        alert("Session expired. Please login again.");
        localStorage.removeItem("user")
        window.location.href("/auth/login");
        break;

      case 403:
        alert("You are not authorized to perform this action.");
        localStorage.removeItem("user");
        window.location.href("/auth/login");
        break;

    //   case 404:
    //     alert("Requested resource not found.");
    //     break;

    //   case 500:
    //     alert("Internal server error.");
    //     break;

      default:
        alert("Something went wrong!");
    }

    return Promise.reject(error);
  }
);

export default api;