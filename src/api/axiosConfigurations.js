import axios from 'axios';
import { useHref } from 'react-router-dom';
const url=process.env.Rect_App_Url;
axios.create({
    baseURL:url,
    headers:{
        "Content-Type":"application/json"
    },
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
        
        break;

      case 403:
        alert("You are not authorized to perform this action.");
        break;

      case 404:
        alert("Requested resource not found.");
        break;

      case 500:
        alert("Internal server error.");
        break;

      default:
        alert("Something went wrong!");
    }

    return Promise.reject(error);
  }
);

export default api;