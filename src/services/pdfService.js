import api from '../api/axiosClient';

const pdfs="/api/pdfs";

//Post PDF
export const addPDF = (subjectId, pdf) =>
  api.post(`${pdfs}/${subjectId}`, pdf);

//Get regulations
export const getPDFS=(subjectId)=>api.get(`${pdfs}/${subjectId}`);


//Update regulation
export const updatePDF=(pdfId,pdf)=>api.patch(`${pdfs}/${pdfId}`,pdf);

//Delete regulation
export const deletePDF=(pdfId)=>api.delete(`${pdfs}/${pdfId}`);
