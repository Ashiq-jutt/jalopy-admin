import joinus from "../../assets/joinus.svg";
const JoinUs = () => {
  return (
    <div className="flex max-sm:flex-col  p-10 mb-20">
      <div className="w-1/2 max-sm:w-full flex flex-col max-sm:gap-10  gap-24 ">
        <div className="flex flex-col  gap-10 max-sm:gap-2">
          <p className="flex text-[3rem] max-sm:text-[2rem] text-[#A0E3F2] font-inter font-normal">
            Grow Your Business
          </p>
          <p className="w-1/2 max-sm:w-full text-[#024873] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <button className="bg-[#022859] text-[1.5rem] p-5 max-sm:p-3 rounded-xl text-white font-inter font-normal max-sm:w-full w-[10rem]">
          Join Us
        </button>
      </div>
      <div className="w-1/2 max-sm:w-full flex max-sm:mt-10 justify-center items-center">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={joinus} />
      </div>
    </div>
  );
};

export default JoinUs;
