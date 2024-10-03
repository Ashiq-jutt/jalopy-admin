const DriverListCard = ({ TableHead, Data }) => {
  ;
  return (
    <div className="overflow-hidden p-5 ">
      <table className="min-w-full divide-y divide-gray-200 rounded-3xl ">
        <thead className="bg-[#022859]  ">
          <tr className="">
            {TableHead?.map((item) => (
              <th className="px-6 py-3  text-left text-xs leading-4 font-normal text-[#A0E3F2] uppercase tracking-wider">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 p-3">
          {Data?.map((customer, index) => (
            <tr key={index} className="text-[#024873]">
              <td className="px-6  whitespace-no-wrap">
                {customer.customerName ||
                  customer.customerid ||
                  customer.nameDriver}
              </td>
              <td className="px-1 py-4 whitespace-no-wrap  ">
                <div className="flex gap-3  ">
                  {customer.image ? (
                    <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={customer.image} className="w-9 h-9" />
                  ) : (
                    ""
                  )}

                  {customer.restaurantName ||
                    customer.DriverName ||
                    customer.courierName ||
                    customer.requester ||
                    customer.name ||
                    customer.ref ||
                    customer.vehicle}
                </div>
              </td>
              <td className=" whitespace-no-wrap">
                {customer.phoneNumber ||
                  customer.subject ||
                  customer.restaurant ||
                  customer.invoicename || (
                    <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={customer.riderImg} className="w-9 h-9" />
                  ) ||
                  customer.rider}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {customer.email ||
                  customer.createdate ||
                  customer.sales ||
                  customer.date ||
                  customer.from}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {customer.country ||
                  customer.assignee ||
                  customer.expense ||
                  customer.duedate}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {customer.amount || customer.city || customer.profit}
              </td>

              {customer.vat && (
                <td className=" whitespace-no-wrap">{customer.vat}</td>
              )}
              {customer.payout && (
                <td className=" whitespace-no-wrap flex justify-center mt-3 items-center">
                  {customer.payout}
                </td>
              )}
              {customer.ref ? (
                <div
                  className={`border p-1 flex justify-center items-center rounded-lg mt-3 ${
                    customer.status === "Paid"
                      ? "text-[#20D994] border-[#20D994]"
                      : "text-[#EF004C] border-[#EF004C]"
                  } `}
                >
                  {customer.status}
                </div>
              ) : !customer.city && !customer.assignee && !customer.vat ? (
                <td className="px-6 py-4 whitespace-no-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="20"
                    viewBox="0 0 130 20"
                    fill="none"
                  >
                    <path
                      d="M10.4438 15.2801L16.3186 19.0125L14.7596 11.9779L19.95 7.24477L13.115 6.63437L10.4438 0L7.7725 6.63437L0.9375 7.24477L6.12792 11.9779L4.56889 19.0125L10.4438 15.2801Z"
                      fill="#FEEF06"
                    />
                    <path
                      d="M38.35 15.2801L44.2249 19.0125L42.6659 11.9779L47.8563 7.24477L41.0213 6.63437L38.35 0L35.6788 6.63437L28.8438 7.24477L34.0342 11.9779L32.4751 19.0125L38.35 15.2801Z"
                      fill="#FEEF06"
                    />
                    <path
                      d="M65.4679 15.2801L70.9231 19.0125L69.4754 11.9779L74.2951 7.24477L67.9483 6.63437L65.4679 0L62.9874 6.63437L56.6406 7.24477L61.4603 11.9779L60.0126 19.0125L65.4679 15.2801Z"
                      fill="#FEEF06"
                    />
                    <path
                      d="M92.6352 15.2801L98.51 19.0125L96.951 11.9779L102.141 7.24477L95.3064 6.63437L92.6352 0L89.9639 6.63437L83.1289 7.24477L88.3193 11.9779L86.7603 19.0125L92.6352 15.2801Z"
                      fill="#FEEF06"
                    />
                    <path
                      d="M120.432 15.2801L126.307 19.0125L124.748 11.9779L129.938 7.24477L123.103 6.63437L120.432 0L117.761 6.63437L110.926 7.24477L116.116 11.9779L114.557 19.0125L120.432 15.2801Z"
                      fill="#D8D8D8"
                    />
                  </svg>
                </td>
              ) : (
                <td className="px-6 py-4 whitespace-no-wrap cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12C7 12.5304 6.78929 13.0391 6.41421 13.4142C6.03914 13.7893 5.53043 14 5 14C4.46957 14 3.96086 13.7893 3.58579 13.4142C3.21071 13.0391 3 12.5304 3 12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12ZM14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12ZM21 12C21 12.5304 20.7893 13.0391 20.4142 13.4142C20.0391 13.7893 19.5304 14 19 14C18.4696 14 17.9609 13.7893 17.5858 13.4142C17.2107 13.0391 17 12.5304 17 12C17 11.4696 17.2107 10.9609 17.5858 10.5858C17.9609 10.2107 18.4696 10 19 10C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12Z"
                      fill="#022859"
                    />
                  </svg>
                </td>
              )}

              {!customer.city && !customer.vat && !customer.ref ? (
                <td className="px-3 py-2 whitespace-no-wrap ">
                  {customer.totalTrip ? (
                    ` ${customer.totalTrip}`
                  ) : (
                    <div
                      className={`border p-1 rounded-2xl flex items-center justify-center ${
                        customer.status === "Open"
                          ? "border border-[#022859] text-[#022859]"
                          : "border bg-[#FFC5C5] text-[#DF0404]"
                      }`}
                    >
                      {customer.status}
                    </div>
                  )}
                </td>
              ) : null}
              {customer.ref && (
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <div className="flex justify-evenly cursor-pointer">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 17.25L4.3125 10.0625L6.325 7.97812L10.0625 11.7156V0H12.9375V11.7156L16.675 7.97812L18.6875 10.0625L11.5 17.25ZM2.875 23C2.08438 23 1.40731 22.7182 0.843815 22.1547C0.280315 21.5912 -0.000955893 20.9147 2.44058e-06 20.125V15.8125H2.875V20.125H20.125V15.8125H23V20.125C23 20.9156 22.7183 21.5927 22.1548 22.1562C21.5913 22.7197 20.9147 23.001 20.125 23H2.875Z"
                        fill="#022859"
                      />
                    </svg>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.0013 15.8333C5.0013 16.2754 5.1769 16.6993 5.48946 17.0118C5.80202 17.3244 6.22594 17.5 6.66797 17.5H13.3346C13.7767 17.5 14.2006 17.3244 14.5131 17.0118C14.8257 16.6993 15.0013 16.2754 15.0013 15.8333V5.83333H5.0013V15.8333ZM6.66797 7.5H13.3346V15.8333H6.66797V7.5ZM12.918 3.33333L12.0846 2.5H7.91797L7.08464 3.33333H4.16797V5H15.8346V3.33333H12.918Z"
                        fill="#022859"
                      />
                    </svg>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverListCard;
