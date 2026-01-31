import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Body from "../components_jsx/Body";
import Cards from "../components_jsx/Cards";
import {
  addBranch,
  getBranches,
  updateBranch,
  deleteBranch,
} from "../services/branchService";
import ItemsContext from "../context/ItemsContext";

export default function Regulation() {
  const [data, setData] = useState([]);

  // Regulation Id
  const { regulationId } = useParams();

  //Image section Content
  const imgHeading = "Welcome to Study Hub";
  const imgSpam =
    "Find study materials, syllabus pdfs and regulation updates in one place.";
  const regulation = false;

  //Cards Content
  const url = `/api/semester/${regulationId}`;
  const title = "Branch";

  //Get Branches by Regulation Id
  useEffect(() => {
    const fetchBranches = async () => {
      const res = await getBranches(regulationId);
      setData(res.data.data);
    };
    fetchBranches();
  }, [regulationId]);

  //Add Branch by Regulation Id
  const addData = async (branch) => {
    const res = await addBranch(regulationId, branch);
    setData((prev) => [...prev, res.data.data]);
  };

  //Delete Branch by Regulation Id
  const deleteData = async (branchId) => {
    const res = await deleteBranch(regulationId, branchId);
    setData((prev) =>
      prev.filter((item) => item.id !== res.data.data.id)
    );
  };

  //Update Branch by Regulation Id
  const updateData = async (branchId, branch) => {
    const res = await updateBranch(branchId, branch);
    setData((prev) =>
      prev.map((item) =>
        item.id === res.data.data.id ? res.data.data : item
      )
    );
  };

  //Cards description
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
