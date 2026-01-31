import api from '../api/axiosClient';

const branches="/api/branches";

//Post branch
export const addBranch=(regulationId,branch)=>api.post(`${branches}/${regulationId}`,branch);

//Get branches
export const getBranches=(regulationId)=>api.get(`${branches}/${regulationId}`);

//Update branch
export const updateBranch=(branchId,branch)=>api.patch(`${branches}/${branchId}`,branch);

//Delete branch
export const deleteBranch=(regulationId,brancheId)=>api.delete(`${branches}/${regulationId}/${brancheId}`);

