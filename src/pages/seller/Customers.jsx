import { sellerData } from "../../utils/CompontStaticData";
const Customers = () => {
  return (
    <div className="font-inter p-5 text-[1.125rem] text-[#024873]">
      <p className="text-[2rem] font-normal text-[#A0E3F2]">All Customers</p>
      <div className="flex justify-end">
        Short by : <span className="font-bold">Newest</span>
      </div>
      <div className=" font-inter mt-5 p-5">
        <p className="text-[1.21rem]  font-normal">Active Members</p>
        <table className="w-full border-collapse mt-3">
          <thead className="border-b bg-[#022859] text-white ">
            <tr>
              {sellerData.AllCustomerHead.map((header, index) => (
                <th key={index} className="p-2 text-left text-[1rem] ">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[#024873]">
            {sellerData.AllCustomer.map((item, index) => (
              <tr key={index}>
                <td className="p-2 flex items-center gap-3">{item.cname}</td>
                <td className="p-2">{item.orderItem}</td>
                <td className="p-2">{item.phonenum}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.location}</td>
                <td className="p-2">{item.bill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
