import api from "../api/axiosClient";

export const login=(user)=>api.post("auth/login",user);

export const logout= ()=> {
    localStorage.removeItem("user");
    api.get("/auth/logout");
}