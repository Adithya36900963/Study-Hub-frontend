import { useEffect, useState } from "react";
import Body from "../components_jsx/Body";
import Card from "../components_jsx/Card";
import addIcon from "../assets/Add.png";

export default function Home() {
  const [data, setData] = useState([
    {
        "id": 1,
        "name": "R23"
    }
  ]);
  const [regulation, setRegulation] = useState("");
  const [toggle, setToggle] = useState(1);

  const url = "http://localhost:8080/api/regulations";

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const addData = (regulation) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: regulation })
    })
      .then(res => res.json())
      .then(newReg => setData(prev => [...prev, newReg]));
  };

  return (
    <>
      <Body
        imgHeading="Welcome to Study Hub"
        imgSpam="Find study materials, syllabus pdfs and regulation updates in one place."
        regulation
      />

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">
        {data.map(d => (
          <Card
            key={d.id}
            cardTitle={`Regulation ${d.name}`}
            cardDescription={`Comprehensive study materials and syllabus for the ${d.name} batch.`}
            cardLink={`/api/regulation/${d.id}`}
            cardUrlName={`View ${d.name} Materials`}
          />
        ))}

        {/* Add Regulation Card */}
        <div className="
          w-[370px] h-[250px]
          rounded-[14px]
          border border-[#ccc]
          bg-white
          flex flex-col
          justify-between
          p-4
        ">
          {toggle === 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addData(regulation);
                setToggle(1);
              }}
              className="flex flex-col  items-center"
            >
              <label className="head">
                Enter Regulation 
              </label>

              <input
                value={regulation}
                onChange={(e) => setRegulation(e.target.value)}
                required
                className="border rounded-md px-3 py-1"
              />

              <div className="flex gap-4 mt-5">
                <button
                  type="button"
                  onClick={() => setToggle(1)}
                  className="border px-4 py-2 rounded-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="head">
                Add Regulation
              </div>

              <button
                onClick={() => setToggle(0)}
                className="
                  flex justify-center items-center
                  transition-all duration-300
                  
                  hover:scale-[1.005]
                "
              >
                <img
                  src={addIcon}
                  alt="Add"
                  className="w-[150px] h-[150px] justify-center items-center object-contain my-6"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
