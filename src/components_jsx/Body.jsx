import booksImg from "../assets/Books.jpg";

export default function Body(props) {
  return (
    <div>

      {/* Banner */}
      <div
        className="relative w-[1536px] h-[278px] mx-auto mt-[20px] flex justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${booksImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/90"></div>

        {/* Centered Content */}
        <div className="relative flex flex-col justify-center items-center">
          <h1 className="text-[56px] font-bold text-black">
            {props.imgHeading}
          </h1>
          <p className="text-lg mt-1 text-black">
            {props.imgSpam}
          </p>
        </div>
      </div>

      {/* Academic Regulation */}
      {props.regulation === true && (
        <div className="flex flex-col items-center mt-[20px] mb-[40px] text-center">
          <h2 className="text-[36px] font-extrabold">
            Academic Regulation
          </h2>

          <p className="mt-[15px] text-[18px] max-w-[900px]">
            Select your academic regulation below to access the specific syllabus,
            credit systems, and promotional rules tailored to your batch.
          </p>
        </div>
      )}
    </div>
  );
}
