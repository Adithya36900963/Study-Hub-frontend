import Cards from "../components_jsx/Cards";
import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsContext from "../context/ItemsContext";
import {
  addPDF,
  deletePDF,
  updatePDF,
  getPDFS,
} from "../services/pdfService";

export default function PDFs() {
  const [data, setData] = useState([]);

  // Getting Subject Id
  const { subjectId } = useParams();

  //Image Section Content
  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "Find study materials, syllabus pdfs and regulation updates in one place.";
  const regulation = false;

  //Cards Content
  const title = "PDF";
  const url = `http://localhost:8080/api/pdfs/download`;

  //Get PDFS by Subject Id
  useEffect(() => {
    const fetchPDFS = async () => {
      const res = await getPDFS(subjectId);
      setData(res.data.data);
    };
    fetchPDFS();
  }, [subjectId]);

  //Add pdf by Subject Id
  const addData = async (subjectId, pdf) => {
    const res = await addPDF(subjectId, pdf);
    setData((prev) => [...prev, res.data.data]);
  };

  //Delete pdf by Subject Id
  const deleteData = async (pdfId) => {
    const res = await deletePDF(pdfId);
    setData((prev) =>
      prev.filter((item) => item.id !== res.data.data.id)
    );
  };

  //Update pdf by Subject Id
  const updateData = async (pdfId, pdf) => {
    const res = await updatePDF(pdfId, pdf);
    setData((prev) =>
      prev.map((item) =>
        item.id === res.data.data.id ? res.data.data : item
      )
    );
  };

  //Description for cards
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
