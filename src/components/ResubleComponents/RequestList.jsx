const RequestList = ({ TableHead, Data }) => {
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
                {customer.customerName || customer.customerid}
              </td>
              {customer.restaurant && (
                <td className=" whitespace-no-wrap">{customer.restaurant}</td>
              )}
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
                    customer.driverName ||
                    customer.courierName ||
                    customer.requester ||
                    customer.productname}
                </div>
              </td>
              <td className=" whitespace-no-wrap">
                {customer.phoneNumber ||
                  customer.subject ||
                  customer.condition ||
                  customer.carname}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {customer.email ||
                  customer.createdate ||
                  customer.price ||
                  customer.requestdate ||
                  customer.carno}
              </td>
              {customer.country ||
                customer.assignee ||
                customer.cartype ||
                customer.campaigntimeline ||
                (customer.from && (
                  <>
                    {" "}
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {customer.country ||
                        customer.assignee ||
                        customer.from ||
                        customer.cartype ||
                        customer.campaigntimeline}
                    </td>
                  </>
                ))}
              {customer.to ||
                (customer.seats && (
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {customer?.to || customer.seats}
                  </td>
                ))}

              {customer?.amount ||
                (customer?.city && (
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {customer?.amount || customer?.city}
                  </td>
                ))}
              {customer.status && (
                <td className="px-3 py-2 whitespace-no-wrap ">
                  <div
                    className={`border p-1 rounded-lg flex items-center justify-center ${
                      (customer.status === "Open" &&
                        "border border-[#20D994] text-[#20D994]") ||
                      (customer.status === "Close" &&
                        "border border-[#EF004C] text-[#EF004C]") ||
                      (customer.status === "Pending" &&
                        "border border-[#024873] text-[#024873]")
                    }`}
                  >
                    {customer.status}
                  </div>
                </td>
              )}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
