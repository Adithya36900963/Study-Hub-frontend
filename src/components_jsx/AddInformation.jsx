import addIcon from "../assets/Add.png";

export default function AddInformation(props) {
  return (
    <div
      className="
        w-[480px] h-[300px]
        rounded-[14px]
        border border-[#ccc]
        bg-white
        flex flex-col
        justify-between
        p-4
      "
    >
      {/* Title */}
      <div className="text-center font-extrabold f text-lg">
        {props.title}
      </div>

      {/* Button with image */}
      <div className="flex justify-center items-center">
        <button
          onClick={props.add}
          className="border-0 w-[10px] h-[10px] transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-105  flex justify-center items-center "
        >
          <img
            src={addIcon}
            alt="Add information"
            className="w-[10px] h-[10px] object-contain"
          />
        </button>
      </div>

      {/* Form */}
      <form className="flex justify-center">
        <button
          type="submit"
          className="bg-[rgb(0,123,255)] text-white px-6 py-2 rounded-[8px] hover:bg-blue-600 " >
          Submit
        </button>
      </form>
    </div>
  );
}
