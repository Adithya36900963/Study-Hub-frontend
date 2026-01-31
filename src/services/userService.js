import api from '../api/axiosClient';

//Post user
export const addUser= (user) => api.post("/api/users",user);

//Get users
export const getUsers= ()=> api.get("/api/users");

//Update user
export const updateUser=(id,user)=> api.patch(`/api/users/${id}`,user);

//Delete user
export const deleteUser=(id)=> api.delete(`api/users/${id}`);
