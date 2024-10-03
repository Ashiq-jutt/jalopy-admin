import { Add, ArrowForward, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { sellerData } from "../../utils/CompontStaticData";
const Promotion = () => {
  // State variables for input fields
  const [promotionName, setPromotionName] = useState("");
  const [promotionTime, setPromotionTime] = useState("");

  // Event handlers to update state
  const handlePromotionNameChange = (e) => {
    setPromotionName(e.target.value);
  };

  const handlePromotionTimeChange = (e) => {
    setPromotionTime(e.target.value);
  };

  return (
    <div className="p-10">
      <div className="text-[#022859] text-2xl font-bold font-['Inter'] tracking-tight">
        Promotions
      </div>
      <div className="flex gap-20 py-3 border-b">
        <div className="text-[#022859] text-xl font-normal font-['Inter'] capitalize leading-loose">
          Create a Promotion
        </div>
        <div className="text-[#022859] text-xl font-normal font-['Inter'] capitalize leading-loose">
          Manage your Promotions
        </div>
      </div>
      <div className="flex  justify-between">
        <div>
          <div className="text-[#022859] text-2xl pt-5 font-normal font-['Inter']">
            Percentage Off
          </div>
          <div className="w-96 text-cyan-200 mt-5 text-xl font-normal font-['Inter']">
            Lorem ipsum dolor sit amet. Cum placeat impedit 33 possimus sint qui
            debitis ducimus. Ad nobis numquam qui quia mollitia.
          </div>
          <div className="w-20 h-11 p-2.5 mt-5 bg-[#022859] rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-xl font-normal font-['Inter'] capitalize">
              Create
            </div>
          </div>
        </div>
        <div>
          <div className="text-[#022859] text-2xl pt-5 font-normal font-['Inter']">
            Buy One Get One Free
          </div>
          <div className="w-96 text-cyan-200 mt-5 text-xl font-normal font-['Inter']">
            Lorem ipsum dolor sit amet. Cum placeat impedit 33 possimus sint qui
            debitis ducimus. Ad nobis numquam qui quia mollitia.
          </div>
          <div className="w-20 h-11 p-2.5 mt-5 bg-[#022859] rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-xl font-normal font-['Inter'] capitalize">
              Create
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-[#022859] rounded-lg flex items-center px-5 mt-10 justify-between">
        <div className="text-white text-[1.3rem] font-normal font-['Inter'] capitalize leading-9">
          Step 1: details
        </div>

        <ArrowForwardIos className="text-white -rotate-90" />
      </div>
      <div className="flex gap-10 pt-10">
        <div className="flex items-center gap-3 ">
          <div className="text-[#022859] text-[16px] font-normal font-['Inter'] capitalize ">
            Promotion Name
          </div>
          <input
            className="w-[300px] h-[50px] rounded-[15px] px-3 border-2 border-stone-300"
            value={promotionName}
            onChange={handlePromotionNameChange}
          />
        </div>
        <div className="flex items-center gap-3 ">
          <div className="text-[#022859] text-[16px] font-normal font-['Inter'] capitalize ">
            Promotion Time
          </div>
          <input
            className="w-[300px] h-[50px] rounded-[15px] border-2 border-stone-300 px-3"
            value={promotionTime}
            onChange={handlePromotionTimeChange}
          />
        </div>
      </div>
      <div className="w-full h-10 bg-[#022859] rounded-lg flex items-center px-5 mt-10 justify-between">
        <div className="text-white text-[1.3rem] font-normal font-['Inter'] capitalize leading-9">
          Step 2: Discount Levels
        </div>

        <ArrowForwardIos className="text-white -rotate-90" />
      </div>
      <div className="flex gap-10 pt-10">
        <div className="text-[#022859] text-[22px] font-normal font-['Inter'] capitalize leading-[33px]">
          Promotion Condition
        </div>
        <div>
          <div className="flex gap-10">
            <div className="flex gap-5">
              <input type="radio" />
              <div className="text-[#022859] text-xl font-normal font-['Inter'] capitalize leading-[30px]">
                Percentage
              </div>
            </div>
            <div className="flex gap-5">
              <input type="radio" />
              <div className="text-stone-300 text-xl font-normal font-['Inter'] capitalize leading-[30px]">
                Money
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <div className="flex items-center gap-3">
              <div className="text-[#022859] text-sm font-normal font-['Inter'] capitalize leading-[30px]">
                Buy
              </div>
              <input className="w-[150px] h-[50px] rounded-[15px] border-2 border-stone-300" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#022859] text-sm font-normal font-['Inter'] capitalize leading-[30px]">
                Same product. get for each item
              </div>
              <input className="w-[150px] h-[50px] rounded-[15px] border-2 border-stone-300" />
              <div className="text-[#022859] text-sm font-normal font-['Inter'] capitalize leading-[30px]">
                Off
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[300px] text-[#022859] mt-5 h-[43px] px-[30px] py-[5px] rounded-[15px] border border-[#022859] justify-start items-center gap-5 inline-flex">
              <Add className="text-[sky-950]" />
              <p className="font-bold">Add a quantity level</p>
            </div>
            <input
              type="file"
              className="w-[234px] text-[#022859] mt-5 h-[43px] px-[30px] py-[5px] rounded-[15px]  border-[#022859] justify-start items-center gap-5 inline-flex"
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-[#022859] rounded-lg flex items-center px-5 mt-10 justify-between">
        <div className="text-white text-[1.3rem] font-normal font-['Inter'] capitalize leading-9">
          Step 2: Add Product
        </div>

        <ArrowForwardIos className="text-white -rotate-90" />
      </div>
      <div className="w-[234px] text-[#022859] mt-5 h-[43px] px-[30px] py-[5px] rounded-[15px] border border-[#022859] justify-start items-center gap-5 inline-flex">
        <Add className="text-[sky-950]" />
        <p className="font-bold">Add Product</p>
      </div>
      <div className=" h-auto bg-neutral-100 rounded-[15px] mt-10">
        <table className="w-full border-collapse mt-3">
          <thead className="border-b bg-[#022859] text-white ">
            <tr>
              {sellerData.promotionHead?.map((header, index) => (
                <th key={index} className="p-2 text-left text-[1rem] ">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[#024873]">
            {sellerData.promotion?.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{item.pName}</td>

                <td className="p-2 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2">{item.retail}</td>
                <td className="p-2">{item.saleprice}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2">{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-5 mt-10">
        <div className="w-[86px] h-11 p-2.5 rounded-[5px] border border-[#022859] justify-center items-center gap-2.5 inline-flex">
          <div className="text-[#022859] text-xl font-normal font-['Inter'] capitalize">
            Cancel
          </div>
        </div>
        <div className="w-[87px] h-11 p-2.5 bg-sky-950 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-xl font-normal font-['Inter'] capitalize">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
