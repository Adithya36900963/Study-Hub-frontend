import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/Add.png";

export default function Semester() {
  const [data, setData] = useState([
    {
      "id": 1,
      "name": "Mathematics"
    }

  ]);
  const [subject, setSubject] = useState("");
  const [toggle, setToggle] = useState(1);

  const { regulationId, semesterId, branchId } = useParams();

  const url = `http://localhost:8080/api/subjects/${regulationId}/${branchId}/${semesterId}`;

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

  const addData = () => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: subject }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add subject");
        return res.json();
      })
      .then((newSubject) => {
        setData((prev) => [...prev, newSubject]);
        setSubject("");
      })
      .catch((err) => console.error("POST error:", err.message));
  };

  return (
    <>
      <Body
        imgHeading="Select Your Subject"
        imgSpam="Choose your specific branch to access study materials and syllabus copies for your curriculum"
        regulation={false}
      />

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">
        {data.map((d) => (
          <Card
            key={d.id}
            cardTitle={`Subject ${d.name}`}
            cardDescription={`Specialized materials for ${d.name}`}
            cardLink={`/api/pdfs/${regulationId}/${d.id}`}
            cardUrlName={`View ${d.name} Materials`}
          />
        ))}

        {/* Add Subject Card (AddInformation style) */}
        <div
          className="
            w-[370px] h-[250px]
            rounded-[14px]
            border border-[#ccc]
            bg-white
            flex flex-col
            justify-between
            p-4
          "
        >
          {toggle === 0 ? (
            <>
              <div className="head">
                Add Subject
              </div>

              <form
                className="flex flex-col items-center gap-4 py-12"
                onSubmit={(e) => {
                  e.preventDefault();
                  addData();
                  setToggle(1);
                }}
              >
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Enter subject name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-[80%]"
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setToggle(1)}
                    className="px-5 py-2 rounded-[8px] border border-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      bg-[rgb(0,123,255)]
                      text-white
                      px-6 py-2
                      rounded-[8px]
                      hover:bg-blue-600
                    "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="head">
                Add Subject
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={() => setToggle(0)}
                  className="
                    border-0 w-[150px] h-[150px]
                    transition-all duration-300 ease-in-out
                   
                    flex justify-center items-center
                  "
                >
                  <img
                    src={addIcon}
                    alt="Add information"
                    className="w-[150px] h-[150px] object-contain"
                  />
                </button>
              </div>

              <div /> {/* spacer for justify-between */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
