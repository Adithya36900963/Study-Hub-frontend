import api from '../api/axiosClient';

const regulations="/api/regulations";

//Post regulation
export const addRegulation=(regulation)=>api.post(regulations,regulation);

//Get regulations
export const getRegulations=()=>api.get(regulations);

//Update regulation
export const updateRegulation=(regulationId,regulation)=>api.patch(`${regulations}/${regulationId}`,regulation);

//Delete regulation
export const deleteRegulation=(regulationId)=>api.delete(`${regulations}/${regulationId}`);

