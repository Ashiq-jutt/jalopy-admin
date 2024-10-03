import { useState } from "react";

const Status = () => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <div className="font-inter p-5 text-[1.5rem] font-normal text-[#024873]">
      <div className="flex items-center gap-10">
        <p className=""> Online Status</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="8" cy="8" r="8" fill="#20D994" />
        </svg>
      </div>
      <div className="flex gap-10 mt-10">
        <p>Profile Status</p>
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {/* Switch */}
          <div
            className={
              "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Status;
