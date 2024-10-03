const TableCampaign = ({ HeadTable }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full table-auto border text-main-color font-poppins bg-[#F2F2F2]">
        <thead>
          <tr className="text-[12px] font-bold border">
            {HeadTable.map((item) => (
              <th className="border ">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr className="text-[12px]">
              <td className="border p-2">Campaign 1</td>
              <td className="border p-2">529,254</td>
              <td className="border p-2">529,254</td>
              <td className="border p-2">8.06%</td>
              <td className="border p-2">98</td>
              <td className="border p-2">€52,000</td>
              <td className="border p-2">€49,000</td>
              <td className="border p-2">€3,000</td>
              <td className="border p-2">€0.22</td>
              <td className="border p-2">€365</td>
              <td className="border p-2">€60,000</td>
              <td className="border p-2">€90,000</td>
              <td className="border p-2">€30,000</td>
              <td className="border p-2">€365,479</td>
              <td className="border p-2">526%</td>
            </tr>
          ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableCampaign;
