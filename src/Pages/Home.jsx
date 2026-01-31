import { useEffect, useState } from "react";
import Body from "../components_jsx/Body";
import Cards from "../components_jsx/Cards";
import {
  addRegulation,
  getRegulations,
  updateRegulation,
  deleteRegulation,
} from "../services/regulationService";
import ItemsContext from "../context/ItemsContext";

export default function Home() {
  const [data, setData] = useState([]);

  /* ================= BODY ================= */
  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "Find study materials, syllabus pdfs and regulation updates in one place.";
  const regulation = true;

  /* ================= CARDS ================= */
  const url = "/api/regulation";
  const title = "Regulation";

  /* ================= GET REGULATIONS ================= */
  useEffect(() => {
    const fetchRegulations = async () => {
      const res = await getRegulations();
      setData(res.data.data);
    };
    fetchRegulations();
  }, []);

  /* ================= ADD ================= */
  const addData = async (regulation) => {
    const res = await addRegulation(regulation);
    setData((prev) => [...prev, res.data.data]);
  };

  /* ================= DELETE ================= */
  const deleteData = async (regulationId) => {
    const res = await deleteRegulation(regulationId);
    setData((prev) =>
      prev.filter((item) => item.id !== res.data.data.id)
    );
  };

  /* ================= UPDATE ================= */
  const updateData = async (regulationId, regulation) => {
    const res = await updateRegulation(regulationId, regulation);
    setData((prev) =>
      prev.map((item) =>
        item.id === res.data.data.id ? res.data.data : item
      )
    );
  };

  /* ================= DESCRIPTION ================= */
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
