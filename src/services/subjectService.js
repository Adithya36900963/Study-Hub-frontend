import api from '../api/axiosClient';

const subjects="/api/subjects";

//Post subject
export const addSubject=(regulationId,branchId,semesterId,subject)=>api.post(`${subjects}/${regulationId}/${branchId}/${semesterId}`,subject);

//Get subjects 
export const getSubjects=(regulationId,branchId,semesterId)=>api.get(`${subjects}/${regulationId}/${branchId}/${semesterId}`);

//Update subject
export const updateSubject=(subjectId,subject)=>api.patch(`${subjects}/${subjectId}`,subject);

//Delete subject
export const deleteSubject=(subjectId)=>api.delete(`${subjects}/${subjectId}`);

