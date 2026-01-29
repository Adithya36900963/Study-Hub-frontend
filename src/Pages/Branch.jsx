import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Body from "../components_jsx/Body";
import Card from "../components_jsx/Card";

export default function Branch() {
  const { regulationId, branchId } = useParams();
  const [data, setData] = useState([
    {
      Id: 1,
      number: "1-1",

    },
    {
      Id: 2,
      number: "1-2",

    },
    {
      Id: 3,
      number: "2-1",

    }
    
  ]);

  const url = "http://localhost:8080/api/semesters";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok)
          throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error("Fetch failed:", err.message));
  }, [url]);

  return (
    <>
      <Body
        imgHeading="Select Your Semester"
        imgSpam="Choose your current semester to access subject-wise pdfs and syllabus pdfs"
        regulation={false}
      />

      <div className="flex flex-row flex-wrap justify-center gap-[50px] mt-[20px]">
        {data.map((d) => (
          <Card
            key={d.id}
            cardTitle={`Semester ${d.number}`}
            cardDescription={`Comprehensive study materials and syllabus for the ${d.number} batch. Updated for the latest academic year.`}
            cardLink={`/api/subject/${regulationId}/${branchId}/${d.number}`}
            cardUrlName={`View ${d.number} Materials`}
          />
        ))}
      </div>
    </>
  );
}
