import Data from "../../utils/CompontStaticData";

const JolCard = () => {
  return (
    <div className=" flex justify-between p-5 mt-10 flex-wrap gap-5">
      {Data?.JolpayCard?.map((item) => (
        <div className="w-[14rem] h-[14rem] flex flex-col items-center justify-evenly bg-[#F2F2F2] shadow-lg rounded-lg">
          <div>{item.icon}</div>
          <span className="text-[#024873] text-[1.5rem]">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default JolCard;
