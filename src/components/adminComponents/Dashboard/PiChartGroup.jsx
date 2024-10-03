import PiChart from "./PiChart";
import { MoreVert } from "@mui/icons-material";

const PiChartGroup = () => {
  return (
    <div className=" p-3 card shadow-2xl rounded-xl ml-5">
      <div className="flex justify-between">
        <p className=" text-[1.5rem] text-[#A0E3F2] font-inter">
          Your Pie Chart
        </p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <input type="checkbox" />
            <p className="font-inter text-[#022859]">Chart</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" />
            <p className="font-inter text-[#022859]">Show Value</p>
          </div>
          <MoreVert />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-5">
          <PiChart persent={60} strok={"stroke-[#024873]"} />
          <p className="text-[#022859] font-inter font-bold">Total Order</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <PiChart persent={22} strok={"stroke-[#024873]"} />
          <p className="text-[#022859] font-inter font-bold">Customer Growth</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <PiChart persent={22} strok={"stroke-[#A0E3F2]"} />
          <p className="text-[#022859] font-inter font-bold">Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default PiChartGroup;
