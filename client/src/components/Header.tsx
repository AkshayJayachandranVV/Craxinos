import React, { useRef } from "react";
import { MdHelpOutline } from "react-icons/md";
import images from "../assets/images.jpeg";

function Header() {
  const headingRef = useRef(null);

  return (
    <div className="flex justify-between border border-gray-300 px-4 py-2">
      <div className="flex">
        <img src={images} alt="Logo" className="object-contain w-20" />
        <div className="flex-col justify-between items-center mt-2">
          <h1
            ref={headingRef}
            className="font-extrabold text-2xl text-[#ed087f]"
          >
            CRAXI
            <span className="bg-gradient-to-r from-[#ed087f] to-[#fc9369] text-transparent bg-clip-text">
              NNO
            </span>
          </h1>

          <p className="text-sm bg-gradient-to-r from-[#ed087f] to-[#fc9369] text-transparent bg-clip-text">
            TECHNOLOGIES
          </p>
        </div>
      </div>

      <MdHelpOutline className="text-2xl text-gray-600 cursor-pointer mt-6" />
    </div>
  );
}

export default Header;
