import api from '../api/axiosClient';

const semesters="/api/semesters";


//Get semesters
export const getSemesters=()=>api.get(semesters);

//post semester
export const addSemester=(semester)=>api.post(semesters,semester);
