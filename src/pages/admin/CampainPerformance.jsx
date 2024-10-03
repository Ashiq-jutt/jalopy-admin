import Data from "../../utils/CompontStaticData";
import BudgeVsSpend from "../../components/adminComponents/campainPerformence/BudgeVsSpend";
import CardImpretion from "../../components/adminComponents/campainPerformence/CardImpretion";
import GraphCampain from "../../components/adminComponents/campainPerformence/GraphCampain";
import ChartAquation from "../../components/adminComponents/campainPerformence/ChartAquation";
import TableCampaign from "../../components/adminComponents/campainPerformence/TableCampain";
import CompaignStats from "../../components/adminComponents/campainPerformence/Compaign_Stats/stats/Request_Stats";

const CampainPerformance = () => {
  return (
    <div className="p-2 mt-[70px] w-full  font-inter">
      <CompaignStats/>
      <div className=" w-full mt-8 ">
        <p className="text-[#A0E3F2] font-poppins font-normal text-main-color font-normal mb-5">
          Budget Vs Spend
        </p>
        <BudgeVsSpend />
        <CardImpretion />
        <div className="flex flex-row flex-wrap justify-evenly mt-20">
          <div className="w-[90%] md:w-[47%]">
            <p className=" mb-5 font-poppins text-[1.5rem] font-bold text-main-color">
              CPA Per Campaign
            </p>
            <GraphCampain color={"#022859"} />
          </div>
          <div className="w-[90%] md:w-[47%]">
            <p className="text-[#A0E3F2] font-inter text-[1.5rem] font-normal mb-5 font-poppins font-normal text-main-color">
              CPC Per Campaign
            </p>
            <GraphCampain color={"#A0E3F2"} />
          </div>
        </div>
        <div className="flex w-full  flex flex-wrap flex-row justify-evenly mt-20">
          <div className="w-[90%] md:w-[47%]">
            <p className=" mb-5 font-poppins  text-[1.5rem] font-bold text-main-color">
              CTR Per Campaign
            </p>
            <GraphCampain color={"#022859"} />
          </div>
          <div className="w-[90%] md:w-[47%]">
            <p className=" mb-5 font-poppins text-[1.5rem] font-bold text-main-color">
              CPC Per Campaign
            </p>
            <ChartAquation />
          </div>
        </div>
      </div>
      <TableCampaign HeadTable={Data.Data.headTableCampain} />
      <div className=" mt-10 font-poppins font-normal text-main-color">
        <p className="">Over All</p>
        <TableCampaign HeadTable={Data.Data.headTableOverAll} />
      </div>
    </div>
  );
};

export default CampainPerformance;
