import icon from "../assets/book_icon.jpg";
import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <div
      className="
        flex flex-col
        w-[370px] h-[250px]
        rounded-[14px]
        border border-[#ccc]
        bg-[FAFAFA]
        transition-all duration-300 ease-in-out
        hover:shadow-[0_4px_60px_rgba(0,0,0,0.2)]
        hover:scale-[1.005] p-4"
    >
      {/* Logo */}
      <div
        className="
          w-[53px] h-[52px]
           mt-[6px]
          rounded-[6px]
          bg-[#D9D9D9]
        "
      >
          <img
            src={icon}
            alt="Book Icon"
            className="w-[53px] h-[53px] object-contain rounded-[6px]"
          />
      </div>

      {/* Title */}
      <div
        className="
          text-[24px]
          font-bold 
          flex 
           mt-[10px]
        "
      >
        {props.cardTitle}
      </div>

      {/* Description */}
      <div className="text-[14px] mt-[6px] ">
        {props.cardDescription}
      </div>

      {/* Link */}
      <Link
        to={props.cardLink}
        className="
          text-[#2563EB] mt-[20px] 
          cursor-pointer
          underline
          decoration-[#2563EB]
        "
      >
        {props.cardUrlName}
      </Link>
    </div>
  );
}
