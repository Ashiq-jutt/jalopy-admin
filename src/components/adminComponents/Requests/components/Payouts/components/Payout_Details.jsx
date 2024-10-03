import { Button } from "primereact/button"; 
import moment from "moment";
export default function PayoutDetails({ data, setDetailView }) {
  ;
  return (
    <div className="p-2 overflow-y-auto font-poppins fixed bg-white w-[100%] lg:w-[calc(100%-320px)] h-[calc(100%-70px)] top-[70px] z-30 text-main-color">
      <Button
        label="Back"
        className="bg-main-color text-white p-2 pr-3 pl-3 "
        onClick={() => {
          setDetailView(false);
        }}
      />
      <h1 className="font-semibold  text-[18px] mt-4 ">Payout Details</h1>
      <h1 className="font-semibold mt-4  ">ID</h1>
      <h1  className="mt-2">{data?.id}</h1> 
      <h1 className="font-semibold mt-4  ">Company Name</h1>
      <h1  className="mt-2">{data?.companyName}</h1> 
      
      <h1 className="font-semibold mt-4  ">Total Amount</h1>
      <h1  className="mt-2">{data?.totalAmount}</h1>
      <h1 className="font-semibold mt-4 ">Number</h1>
      <h1 className="mt-2">{data?.number}</h1>
      <h1 className="font-semibold mt-4 ">Request Date</h1>
      <h1 className="mt-2">{moment().utc(data?.issueData).format("DD MMMM YYYY ")}</h1> 
      
      <h1 className="font-semibold mt-4 ">Due Date</h1>
      <h1 className="mt-2">{moment().utc(data?.dueData).format("DD MMMM YYYY ")}</h1>
      <div className="flex mt-8 flex-wrap flex-row justify-center">
        <Button
          label="Reject"
          className="border border-main-color mr-5 p-1 pr-3 pl-3 "
        />
        <Button
          label="Approved"
          className="bg-main-color  border border-main-color p-1 pr-3 pl-3 ml-5 text-white"
        />
      </div>
    </div>
  );
}
