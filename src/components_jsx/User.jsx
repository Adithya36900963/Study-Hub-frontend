
import { useContext, useState } from "react";
import ItemsContext from "../context/ItemsContext";
import book_icon from "../assets/book_icon.jpg";

export default function UserCard(props) {

  const { updateData, deleteData } = useContext(ItemsContext);

  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState(props.cardTitle);
  const [password, setPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // UPDATE FORM
  if (!toggle) {
    return (
      <div className="w-[370px] h-[300px] rounded-[14px] border border-gray-300 bg-white flex items-center justify-center">

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            updateData(props.cardId, {
              name,
              password
            });

            setToggle(true);
            setPassword("");
          }}
        >

          <label className="text-sm font-medium">User ID</label>
          <input
            type="text"
            value={props.cardId}
            readOnly
            className="border px-2 py-1 rounded bg-gray-100"
          />

          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            className="border px-2 py-1 rounded"
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
            className="border px-2 py-1 rounded"
          />

          <div className="flex gap-4 mt-3">

            <button
              type="button"
              onClick={() => setToggle(true)}
              className="px-4 py-1 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              Update
            </button>

          </div>

        </form>

      </div>
    );
  }

  // CARD VIEW
  return (
    <div className="w-[370px] h-[250px] rounded-[14px] border border-gray-300 bg-[#F5F5F5]
                    flex flex-col justify-between p-4
                    transition-all duration-300 hover:shadow-[0_4px_60px_rgba(0,0,0,0.2)]
                    hover:scale-[1.005]">

      {/* Top Row */}
      <div className="flex items-center justify-between">

        <div className="bg-[#D9D9D9] w-[53px] h-[53px] rounded-[6px] flex items-center justify-center">
          <img
            src={book_icon}
            alt="card-icon"
            className="w-full h-full rounded-[6px] object-cover"
          />
        </div>

        {user && user.role === "ADMIN" && (
          <div className="flex gap-6 text-sm">

            <span
              className="cursor-pointer hover:underline"
              onClick={() => setToggle(false)}
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

      {/* Username */}
      <div className="text-center font-bold text-[24px] p-2">
        {props.cardTitle}
      </div>

      {/* Description */}
      <div className="text-sm text-gray-700">
        {props.cardDescription}
      </div>

    </div>
  );
}
