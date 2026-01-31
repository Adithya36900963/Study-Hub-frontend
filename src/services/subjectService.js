import api from '../api/axiosClient';

const subjects="/api/subjects";

//Post regulation
export const addSubject=(regulationId,branchId,semesterId,subject)=>api.post(`${subjects}/${regulationId}/${branchId}/${semesterId}`,subject);

//Get regulations 
export const getSubjects=(regulationId,branchId,semesterId)=>api.get(`${subjects}/${regulationId}/${branchId}/${semesterId}`);

//Update regulation
export const updateSubject=(subjectId,subject)=>api.patch(`${subjects}/${subjectId}`,subject);

//Delete regulation
export const deleteSubject=(subjectId)=>api.delete(`${subjects}/${subjectId}`);

