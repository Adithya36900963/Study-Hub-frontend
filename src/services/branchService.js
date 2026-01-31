import api from '../api/axiosClient';

const branches="/api/branches";

//Post regulation
export const addBranch=(regulationId,branch)=>api.post(`${branches}/${regulationId}`,branch);

//Get regulations
export const getBranches=(regulationId)=>api.get(`${branches}/${regulationId}`);

//Update regulation
export const updateBranch=(branchId,branch)=>api.patch(`${branches}/${branchId}`,branch);

//Delete regulation
export const deleteBranch=(regulationId,brancheId)=>api.delete(`${branches}/${regulationId}/${brancheId}`);

