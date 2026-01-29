import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/Add.png";

export default function Semester() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Sample PDF"
    }
  ]);
  const [pdf, setPdf] = useState(null);
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(1);

  const { regulationId, subjectId } = useParams();

  const url = `http://localhost:8080/api/pdfs/${regulationId}/${subjectId}`;

  // ✅ FETCH PDFs
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PDFs");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [url]);

  // ✅ UPLOAD PDF
  const addData = () => {
    if (!name || !pdf) {
      alert("Please enter name and select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf", pdf);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((newPDF) => {
        setData((prev) => [...prev, newPDF]);
        setName("");
        setPdf(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Body
        imgHeading="Available Subject PDFs"
        imgSpam="Choose your specific branch to access study materials and syllabus copies"
        regulation={false}
      />

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">
        {data.map((d) => (
          <Card
            key={d.id}
            cardTitle={d.name}
            cardDescription={`Specialized materials for ${d.name}`}
            cardLink={`http://localhost:8080/api/pdfs/download/${d.id}`}
            cardUrlName={`View ${d.name} PDF`}
          />
        ))}

        {/* Add PDF Card (AddInformation style) */}
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
              <div className="text-center font-extrabold text-lg">
                Add PDF
              </div>

              <form
                className="flex flex-col items-center gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addData();
                  setToggle(1);
                }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter PDF name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-[80%]"
                />

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                  required
                  className="w-[80%] "
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
              <div className="text-center font-extrabold text-lg">
                Add PDF
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
                    alt="Add PDF"
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
