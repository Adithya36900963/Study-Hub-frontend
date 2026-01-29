import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/Add.png";

export default function Regulation() {
  const [data, setData] = useState([
    {
      "id": 12,
      "name": "CSE"
    }
  ]);

  const [branch, setBranch] = useState("");
  const [toggle, setToggle] = useState(1);

  const { regulationId } = useParams();
  const url = `http://localhost:8080/api/branches/${regulationId}`;

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
      body: JSON.stringify({ name: branch }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add branch");
        return res.json();
      })
      .then((newBranch) => {
        setData((prev) => [...prev, newBranch]);
        setBranch("");
      })
      .catch((err) => console.error("POST error:", err.message));
  };

  return (
    <>
      <Body
        imgHeading="Select Your Department"
        imgSpam="Choose your specific branch to access study materials and syllabus copies for your curriculum"
        regulation={false}
      />

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">
        {data.map((d) => (
          <Card
            key={d.id}
            cardTitle={`Branch ${d.name}`}
            cardDescription={`Specialized materials for ${d.name}`}
            cardLink={`/api/semester/${regulationId}/${d.id}`}
            cardUrlName={`View ${d.name} Materials`}
          />
        ))}

        {/* Add Information Card (same as AddInformation.jsx) */}
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
  {/* Title */}
  <div className="head">
    Enter Branch
  </div>

  {/* Form */}
  <form
    className="
      flex flex-col
      items-center 
      gap-3
      py-12
      w-full justify-center
    "
    onSubmit={(e) => {
      e.preventDefault();
      addData();
      setToggle(1);
    }}
  >
    {/* Input */}
    <input
      type="text"
      value={branch}
      onChange={(e) => setBranch(e.target.value)}
      required
      placeholder="Enter branch name"
      className="
        border border-gray-300
        rounded-md
        px-4 py-2
        w-[80%]
        text-center
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
      "
    />

    {/* Buttons */}
    <div className="flex gap-5 mt-1">
      <button
        type="button"
        onClick={() => setToggle(1)}
        className="
          px-5 py-2
          rounded-[8px]
          border border-gray-400
          hover:bg-gray-100
        "
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
                Add Branch
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
                    className="w-[150px] h-[150px] justify-center items-center object-contain my-6"
                  />
                </button>
              </div>

              <div /> {/* spacer to match justify-between */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
