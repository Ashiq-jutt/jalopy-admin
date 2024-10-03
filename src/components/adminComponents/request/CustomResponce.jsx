import  { useState } from "react";

const CustomResponse = () => {
  const [rejectionReason, setRejectionReason] = useState(""); // State to store the rejection reason

  const handleInputChange = (e) => {
    // Update the state with the user's input
    setRejectionReason(e.target.value);
  };

 

  return (
    <div className="p-16 font-inter">
      <p className="text-[1.5rem]  font-bold text-[#A0E3F2] cursor-pointer">
        {" "}
        Create Custom Response
      </p>
      <div className="p-10 mt-3 bg-[#F2F2F2] rounded-lg">
        <p className="text-[1.5rem] font-bold text-[#A0E3F2] cursor-pointer">
          {" "}
          Rejection Reason
        </p>
        <textarea
          className="w-full h-40 p-2 mt-3"
          value={rejectionReason}
          onChange={handleInputChange}
          placeholder="Enter rejection reason here..."
        />
      </div>
      <div className="flex justify-end">
        <button
          className="mt-3 bg-[#022859] text-white px-4 py-2  rounded-lg"
          onClick={handleSaveResponse}
        >
          Send Mail
        </button>
      </div>
    </div>
  );
};

export default CustomResponse;
