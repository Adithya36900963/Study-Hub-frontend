import api from '../api/axiosClient';

export const addUser= (user) => api.post("/api/users",user);

export const getUsers= ()=> api.get("/api/users");

export const updateUser=(id,user)=> api.patch(`/api/users/${id}`,user);

export const deleteUser=(id)=> api.delete(`api/users/${id}`);
