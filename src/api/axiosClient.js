import axios from 'axios';

const url="http://localhost:8080";

const api =axios.create({
    baseURL:url,
    withCredentials: true
});

// api.interceptors.response.use(
//   (response) => response, 
//   (error) => {
//     if (!error.response) {
      
//       alert("Server not reachable. Please try again later.");
//       return Promise.reject(error);
//     }

//     const status = error.response.status;

//     switch (status) {
//       case 401:
//         alert("Session expired. Please login again.");
//         window.location.href("/auth/login");
//         break;

//       case 403:
//         alert("You are not authorized to perform this action.");
//         break;

//       case 404:
//         alert("Requested resource not found.");
//         break;

//       case 500:
//         alert("Internal server error.");
//         break;

//       default:
//         alert("Something went wrong!");
//     }

//     return Promise.reject(error);
//   }
// );

export default api;