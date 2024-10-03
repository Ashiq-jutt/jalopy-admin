import { sellerData } from "../../../utils/CompontStaticData";

function TrendingOrderCard({ tag }) {
  return (
    <div className=" font-inter mt-5 p-5">
      <p className="text-[2rem] text-[#A0E3F2] font-normal">{tag}</p>
      <table className="w-full border-collapse mt-3">
        <thead className="border-b border-b-[#022859] text-[#A0E3F2] ">
          <tr>
            {sellerData.TrendingOrderHead.map((header, index) => (
              <th key={index} className="p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#024873]">
          {sellerData.TrendingOrder.map((item, index) => (
            <tr key={index}>
              <td className="p-2 flex items-center gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                {item.pname}
              </td>
              <td className="p-2">{item.price}</td>
              <td className="p-2">{item.totalitem}</td>

              <td className="p-2">
                <p
                  className={`border flex justify-center w-24 rounded-lg ${
                    item.status === "Completed"
                      ? "border-[#20D994] text-[#20D994]"
                      : item.status === "Preparing"
                      ? "border-[#FFA500] text-[#FFA500]"
                      : item.status === "Cancelled"
                      ? "border-[#EF004C] text-[#EF004C]"
                      : "" // You can add a default style or leave it empty
                  }`}
                >
                  {item.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrendingOrderCard;
