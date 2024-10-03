import ListUserDetailToTable from "./ListUserDetailToTable";
const ListUsers = ({ TableHead, Data }) => {
  ;
  return (
    <div className="overflow-hidden p-5 overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg ">
        <thead className="bg-main rounded-lg  ">
          <tr className="rounded-lg">
            {TableHead?.map((item) => (
              <th className=" px-6 py-3  text-left text-xs leading-4 font-normal text-white uppercase tracking-wider">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 p-3">
          {Data?.map((customer, index) => (
            <ListUserDetailToTable customer={customer} index={index}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
