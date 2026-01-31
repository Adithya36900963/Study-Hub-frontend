import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components_jsx/Cards";
import ItemsContext from "../context/ItemsContext";
import {
  addSubject,
  deleteSubject,
  updateSubject,
  getSubjects,
} from "../services/subjectService";

export default function Semester() {
  const { regulationId, branchId, semesterId } = useParams();
  const [data, setData] = useState([]);

  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "Find study materials, syllabus pdfs and regulation updates in one place.";
  const regulation = false;

  const url = `/api/pdfs`;
  const title = "Subject";

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await getSubjects(regulationId, branchId, semesterId);
      setData(res.data.data);
    };
    fetchSubjects();
  }, [regulationId, branchId, semesterId]);

  const addData = async (subject) => {
    const res = await addSubject(
      regulationId,
      branchId,
      semesterId,
      subject
    );
    setData((prev) => [...prev, res.data.data]);
  };

  const deleteData = async (subjectId) => {
    const res = await deleteSubject(
      regulationId,
      branchId,
      semesterId,
      subjectId
    );
    setData((prev) =>
      prev.filter((item) => item.id !== res.data.data.id)
    );
  };

  const updateData = async (subjectId, subject) => {
    const res = await updateSubject(subjectId, subject);
    setData((prev) =>
      prev.map((item) =>
        item.id === res.data.data.id ? res.data.data : item
      )
    );
  };

  const description = (name) => {
    return (
      <div className="text-sm text-gray-600 mt-2">
        {`Comprehensive study materials and syllabus for the ${name} batch. Updated for the latest academic year.`}
      </div>
    );
  };

  return (
    <ItemsContext.Provider
      value={{
        addData,
        deleteData,
        updateData,
        description,
        title,
        url,
        data,
        imgHeading,
        imgSpam,
        regulation,
      }}
    >
      <Body />
      <Cards />
    </ItemsContext.Provider>
  );
}
