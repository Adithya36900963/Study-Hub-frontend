import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Body from "../components_jsx/Body";
import Cards from "../components_jsx/Cards";
import { getSemesters } from "../services/semesterService";
import ItemsContext from "../context/ItemsContext";

export default function Branch() {
  const { regulationId, branchId } = useParams();
  const [data, setData] = useState([]);

  /* ================= BODY PROPS ================= */
  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "Find study materials, syllabus pdfs and regulation updates in one place.";
  const regulation = false;

  /* ================= CARDS PROPS ================= */
  const url = `/api/subject/${regulationId}/${branchId}`;
  const title = "Semester";

  /* ================= SEM FORMAT ================= */
  const formatSemester = (number) => {
    const year = Math.ceil(number / 2);
    const sem = number % 2 === 1 ? 1 : 2;
    return `${year}-${sem}`;
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      const res = await getSemesters(regulationId);

      const formatted = res.data.data.map((s) => ({
        id: s.id,
        name: formatSemester(s.number),
      }));

      setData(formatted);
    };

    fetchSemesters();
  }, [regulationId]);

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