import { Add, Delete } from "@mui/icons-material";
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux

import { NavLink } from "react-router-dom";
import {
  RejectionReson,
  RejectionResonDel,
} from "../../../utils/adminDashboardSlice/adminDashboardSlice";

const Reject = () => {
  const [ShowInput, setShowInput] = useState(false);
  const [reason, setReason] = useState(""); // State to store the rejection reason
  const { rejectionReason } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleReason = () => {
    if (reason) {
      dispatch(RejectionReson(reason)); // Dispatch the action with the reason
      setShowInput(false); // Hide the input field after dispatching
      setReason(""); // Clear the input field
    } else {
      setShowInput(false); // Hide the input field after dispatching
      setReason("");
    }
  };

  const handleInputChange = (e) => {
    setReason(e.target.value); // Update the reason when input changes
  };
  const handleDelete = (item) => {
    dispatch(RejectionResonDel(item));
  };
  return (
    <div className="p-20 font-inter">
      <div className="bg-[#F2F2F2] p-5 rounded-xl">
        <p className="text-[1.5rem] font-bold text-[#A0E3F2]">
          {" "}
          Rejection Reason
        </p>
        <p className="text-[#024873]">
          Quick Reason Why Application Is Rejected
        </p>
      </div>
      {rejectionReason.map((item, index) => (
        <div className="flex items-center">
          <div
            key={index}
            onClick={handleReason}
            className="bg-[#022859] w-1/4 flex mt-5 cursor-pointer gap-3 items-center text-white p-1 rounded-lg text-[14px] max-w-[150px]"
          >
            <div className="truncate">{item}</div>
          </div>

          <Delete
            onClick={() => handleDelete(item)}
            className="mt-5 cursor-pointer"
          />
        </div>
      ))}

      {ShowInput ? (
        <input
          type="text"
          placeholder="Enter reason"
          className="outline-none  border-2 w-[15rem] h-10 p-1 rounded-lg border-[#024873] mt-5"
          onChange={handleInputChange} // Add onChange event handler
          value={reason} // Bind the input value to the state
        />
      ) : (
        ""
      )}
      {ShowInput ? (
        <div
          onClick={handleReason}
          className="bg-[#022859] w-[11rem] flex mt-5 justify-center cursor-pointer gap-3 items-center text-white p-1 rounded-lg text-[14px]"
        >
          Add <Add fontSize="small" />
        </div>
      ) : (
        <div
          onClick={() => setShowInput(true)} // Simplified logic for ShowInput
          className="bg-[#022859] w-[11rem] flex mt-5 justify-center cursor-pointer gap-3 items-center text-white p-1 rounded-lg text-[14px]"
        >
          Add New Reasons <Add fontSize="small" />
        </div>
      )}
      <NavLink
        to={"customresponce"}
        className="text-[1.5rem] mt-5 font-bold text-[#A0E3F2] cursor-pointer"
      >
        {" "}
        Create Custom Response
      </NavLink>
    </div>
  );
};

export default Reject;
