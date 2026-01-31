import { Link } from "react-router-dom";
import ItemsContext from "../context/ItemsContext";
import { useContext, useState } from "react";
import book_icon from "../assets/book_icon.jpg";

export default function Card(props) {
  const [toogle, setToogle] = useState(true);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { deleteData, updateData, title } = useContext(ItemsContext);

  //Update Form
  if (toogle === false) {
    return (
      <div className="w-[370px] h-[250px] rounded-[14px] border border-gray-300 bg-white flex items-center justify-center">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateData(props.cardId, { name, code });
            setToogle(true);
          }}
        >
          <label className="text-sm font-medium">
            {title} id:
          </label>
          <input
            type="text"
            value={props.cardId}
            readOnly
            className="border px-2 py-1 rounded bg-gray-100"
          />

          <label className="text-sm font-medium">
            Enter {title}:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />

          {(title === "Branch" || title === "Subject") && (
            <>
              <label className="text-sm font-medium">
                Enter {title} Code:
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
            </>
          )}

          <div className="flex gap-4 mt-3">
            <button
              type="button"
              onClick={() => setToogle(true)}
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
      </div>
    );
  }

  //Card View 
 return (
  <div className="w-[370px] h-[250px] rounded-[14px] border border-gray-300 bg-[#F5F5F5]
                  flex flex-col justify-between p-4
                  transition-all duration-300 hover:shadow-[0_4px_60px_rgba(0,0,0,0.2)]
                  hover:scale-[1.005]">

    <div className="flex items-center justify-between">
      
      <div className="bg-[#D9D9D9] w-[53px] h-[52px] rounded-[6px] flex items-center justify-center">
        <img
          src={book_icon}
          alt="card-icon"
          className="w-full h-full rounded-[6px] object-contain p-2"
        />
      </div>

      {title !== "Semester" && (
        <div className="flex gap-6 text-sm">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setToogle(false)}
          >
            Update
          </span>

          <span
            className="cursor-pointer hover:underline"
            onClick={() => deleteData(props.cardId)}
          >
            Delete
          </span>
        </div>
      )}
    </div>

    <div className="text-center font-bold text-[24px]">
      {props.cardTitle}
    </div>

    <div className="text-sm text-gray-700">
      {props.cardDescription}
    </div>

    <Link
      to={props.cardLink}
      className="underline cursor-pointer text-sm self-start"
    >
      {props.cardUrlName}
    </Link>
  </div>
);
}