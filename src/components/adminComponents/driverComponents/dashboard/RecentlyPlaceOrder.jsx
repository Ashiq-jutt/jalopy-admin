import { sellerData } from "../../../utils/CompontStaticData";

function RecentlyPlaceOrder({ tag }) {
  return (
    <div className="bg-[#EFEEEB] font-inter mt-20 p-5">
      <p className="text-[2rem] text-[#A0E3F2] font-normal">{tag}</p>
      <table className="w-full border-collapse mt-3">
        <thead className="bg-[#022859] text-white">
          <tr>
            {sellerData.ROPOhead.map((header, index) => (
              <th key={index} className="p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#024873]">
          {sellerData.ROP.map((item, index) => (
            <tr key={index}>
              <td className="p-2">{item.oid}</td>
              <td className="p-2">{item.ordername}</td>
              <td className="p-2">{item.Location}</td>
              <td className="p-2">${item.price}</td>

              <td className="p-2">
                <p
                  className={`border flex justify-center w-24 rounded-lg ${
                    item.status === "Delivered"
                      ? "border-[#20D994] text-[#20D994]"
                      : item.status === "Pending"
                      ? "border-[#024873] text-[#024873]"
                      : item.status === "Cancelled"
                      ? "border-[#EF004C] text-[#EF004C]"
                      : "" // You can add a default style or leave it empty
                  }`}
                >
                  {item.status}
                </p>
              </td>

              <td className="p-2  ">{item.deliveredTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentlyPlaceOrder;
