import { useState } from "react";
import facbook from "../../../assets/facbook.svg";
import insta from "../../../assets/insta.svg";
import twetter from "../../../assets/twetter.svg";
const SocialMediaIntegration = () => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <div className="py-16 px-10 font-inter flex justify-evenly gap-5">
      <div className="w-[20rem] h-[20rem] rounded-[1.5rem] border shadow-md ">
        <div className="flex place-content-center">
          <div className="w-[8rem] h-[8rem]  border-b shadow-lg -mt-16 bg-white rounded-full flex items-center justify-center ">
            <div className="w-[4.9rem] h-[4.9rem] bg-[#F2F2F2] rounded-[0.69rem] rotate-45 flex justify-center items-center">
              <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={facbook} alt="" className="-rotate-45" />
            </div>
          </div>
        </div>
        <p className="flex justify-center mt-10 text-[#024873] text-[1.25rem] font-normal border-b border-[#A0E3F2] pb-3">
          Facbook
        </p>
        <div className="flex justify-evenly mt-5">
          <p className="text-[#024873] text-[1.25rem] font-normal flex justify-center">
            Connect Profile
          </p>
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
        <p className="text-[#C3C3C3] mt-3 text-[1.25rem] font-normal flex justify-center">
          Connect Page
        </p>
        <p className="text-[#C3C3C3] mt-3 text-[1.25rem] font-normal flex justify-center">
          Connect Group
        </p>
      </div>
      <div className="w-[20rem] h-[20rem] rounded-[1.5rem] border shadow-md ">
        <div className="flex place-content-center">
          <div className="w-[8rem] h-[8rem]  border-b shadow-lg -mt-16 bg-white rounded-full flex items-center justify-center ">
            <div className="w-[4.9rem] h-[4.9rem] bg-[#F2F2F2] rounded-[0.69rem] rotate-45 flex justify-center items-center">
              <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={insta} alt="" className="-rotate-45" />
            </div>
          </div>
        </div>
        <p className="flex justify-center mt-10 text-[#024873] text-[1.25rem] font-normal border-b border-[#A0E3F2] pb-3">
          Facbook
        </p>

        <p className="text-[#C3C3C3] mt-3 text-[1.25rem] font-normal flex justify-center">
          Connect Page
        </p>
        <p className="text-[#C3C3C3] mt-3 text-[1.25rem] font-normal flex justify-center">
          Connect Group
        </p>
      </div>
      <div className="w-[20rem] h-[20rem] rounded-[1.5rem] border shadow-md ">
        <div className="flex place-content-center">
          <div className="w-[8rem] h-[8rem]  border-b shadow-lg -mt-16 bg-white rounded-full flex items-center justify-center ">
            <div className="w-[4.9rem] h-[4.9rem] bg-[#F2F2F2] rounded-[0.69rem] rotate-45 flex justify-center items-center">
              <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={twetter} alt="" className="-rotate-45" />
            </div>
          </div>
        </div>
        <p className="flex justify-center mt-10 text-[#024873] text-[1.25rem] font-normal border-b border-[#A0E3F2] pb-3">
          Facbook
        </p>

        <p className="text-[#C3C3C3] mt-10 text-[1.25rem] font-normal flex justify-center">
          Connect Page
        </p>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;
