import addIcon from "../assets/Add.png";
import { useContext, useState } from "react";
import ItemsContext from "../context/ItemsContext";

export default function AddInformation() {
  const { addData, title } = useContext(ItemsContext);
  const [toogle, setToogle] = useState(1);

  // Normal form
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  // PDF form
  const [pdfName, setPdfName] = useState("");
  const [pdf, setPdf] = useState(null);

  if (title === "Semester") return null;

  //PDF form
  if (title === "PDF") {
    return (
      <div className="w-[370px] h-[250px] rounded-[14px] border border-gray-300 bg-white flex flex-col items-center">
        {toogle === 0 ? (
          <form
            className="mt-[100px] ml-[50px] flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              if (!pdfName || !pdf) {
                alert("Please enter PDF name and select a PDF");
                return;
              }

              const formData = new FormData();
              formData.append("name", pdfName);
              formData.append("pdf", pdf);

              addData(formData);
              setToogle(1);
              setPdfName("");
              setPdf(null);
            }}
          >
            <label className="text-sm font-medium">Enter PDF Name:</label>
            <input
              type="text"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />

            <label className="text-sm font-medium">Upload PDF:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="text-sm"
              required
            />

            <div className="flex gap-4 mt-5 ml-[50px]">
              <button
                type="button"
                onClick={() => setToogle(1)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-center mt-2 font-semibold">
              Add PDF
            </div>
            <button
              onClick={() => setToogle(0)}
              className="transition-all duration-300 hover:shadow-[0_4px_60px_rgba(0,0,0,0.2)] hover:scale-[1.005]"
            >
              <img
                src={addIcon}
                alt="Add PDF"
                className="h-[210px] w-[300px]"
              />
            </button>
          </>
        )}
      </div>
    );
  }

  //Normal form for Branch and Subject
  return (
    <div className="w-[370px] h-[250px] rounded-[14px] border border-gray-300 bg-white flex flex-col items-center">
      {toogle === 0 ? (
        <form
          className="mt-[100px] ml-[50px] flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addData({ name, code });
            setToogle(1);
            setName("");
            setCode("");
          }}
        >
          <label className="text-sm font-medium">Enter {title}:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
            required
          />

          {(title === "Branch" || title === "Subject") && (
            <>
              <label className="text-sm font-medium">Enter Code:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded"
                required
              />
            </>
          )}

          <div className="flex gap-4 mt-5 ml-[50px]">
            <button
              type="button"
              onClick={() => setToogle(1)}
              className="px-4 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-center mt-2 font-semibold">
            Add {title}
          </div>
          <button
            onClick={() => setToogle(0)}
            className="transition-all duration-300 hover:shadow-[0_4px_60px_rgba(0,0,0,0.2)] hover:scale-[1.005]"
          >
            <img
              src={addIcon}
              alt="Add information"
              className="h-[210px] w-[300px]"
            />
          </button>
        </>
      )}
    </div>
  );
}