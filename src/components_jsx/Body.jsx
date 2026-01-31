import { useContext } from "react";
import ItemsContext from "../context/ItemsContext";
import bgImage from "../assets/Books.jpg";

export default function Body() {
  const { imgHeading, imgSpam, regulation } = useContext(ItemsContext);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero / Image Background */}
      <div className="relative h-[278px] w-screen flex flex-col items-center justify-center overflow-hidden text-center bg-cover bg-center">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-white/90 bg-top -z-10"
          style={{ backgroundImage: `url(${bgImage})`,opacity:0.1 }}
        />

        {/* Text Content */}
        <div className="relative z-10 text-black justify-center items-center text-center px-4">
          <div className="text-4xl md:text-5xl font-bold text-black mb-4">
            {imgHeading}
          </div>
          <div className="text-lg md:text-xl text-black max-w-3xl mx-auto">
            {imgSpam}
          </div>
        </div>
      </div>

      {/* Regulation Section */}
      {regulation && (
        <div className="flex flex-col items-center text-center px-6 py-12">
          <div className="text-2xl md:text-3xl font-semibold mb-4">
            Academic Regulation
          </div>
          <div className="max-w-4xl text-gray-600 text-base md:text-lg">
            Select your academic regulation below to access the specific syllabus,
            credit systems, and promotional rules tailored to your batch.
          </div>
        </div>
      )}
    </div>
  );
}
