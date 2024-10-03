import Data from "../../utils/CompontStaticData";
import { ArrowBack } from "@mui/icons-material";

const CardProgres = ({ Data }) => {
  return (
    <div>
      <div className="flex justify-evenly p-2 shadow-2xl rounded-xl mt-10 ml-20 mr-20">
        {Data?.map((item, index) => (
          <div
            key={index}
            className={`flex gap-5 card   p-5 ${
              index !== Data?.length - 1 ? "border-r-2 border-[#024873]" : ""
            }`}
          >
            <div className="bg-[#F2F2F2] p-3 rounded-full w-20 h-20 flex justify-center items-center ">
              {item.icon}
            </div>
            <div>
              <p className="text-[#A0E3F2] font-inter">{item.name}</p>
              <p className="text-[2rem] font-inter font-bold mt-2 text-[#022859]">
                {item.price}
              </p>
              <div className="flex items-center font-inter">
                <div className={`${item.color}`}>{item.arrow}</div>
                {item.persent ? (
                  <p className="text-[#024873] text-[14px]">
                    <span className={`${item.color}`}>{item.persent}%</span>{" "}
                    this month
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProgres;
