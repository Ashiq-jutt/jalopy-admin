import { useState } from "react";
import userpro from "../../../assets/userprofile.jpg";
import camera from "../../../assets/camra.svg";
import em from "../../../assets/em.svg";
import shopingcard from "../../../assets/shopingcard.svg";
import notification from "../../../assets/notification.svg";
const MyProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const data = [
    { label: "First Name", type: "text" },
    { label: "Second Name", type: "text" },
    { label: "Email", type: "text" },
    { label: "Number", type: "text" },
    { label: "Password", type: "text" },
    { label: "Country", type: "text" },
    { label: "City", type: "text" },
    { label: "State", type: "text" },
    { label: "Birthday", type: "text" },
    { label: "Zipcode", type: "text" },
  ];
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // You can handle the selected file here, for example, upload it or perform any other action.
  };

  const openFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };
  return (
    <div className="flex gap-3 font-inter text-[#024873] ">
      <div className="w-1/4 ">
        <div className="border mt-3 text-[#024873] gap-5 p-5 rounded-[1.27rem] flex flex-col items-center">
          <div className="flex flex-col place-content-end">
            <img
              src={userpro}
              className="w-[6.9375rem] relative h-[6.9375rem] rounded-full"
            />
            <img
              src={camera}
              className="absolute ml-20 cursor-pointer"
              onClick={openFileInput}
            />
          </div>
          <p className="text-[1.5rem] ">Robert John</p>
          <p className="text-[1.25rem]">Seller</p>
          <button className="text-[1rem] p-1 px-2 rounded-lg bg-[#024873] text-white">
            Logout
          </button>
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileSelection}
        />
        <div className="p-5 border rounded-2xl mt-3 font-normal">
          <div className="flex justify-between w-full items-center">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={em} alt="" />
            <p>Messages</p>
            <p className="text-white bg-[#022859] w-6 px-1 rounded-full flex justify-center items-center">
              11
            </p>
          </div>
          <div className="flex justify-between w-full items-center mt-5">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={notification} alt="" />
            <p>Notifications</p>
            <p className="text-white bg-[#022859] w-6 px-1 rounded-full flex justify-center items-center">
              2
            </p>
          </div>
          <div className="flex justify-between w-full items-center mt-5">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={shopingcard} alt="" />
            <p>Orders</p>
            <p className="text-white bg-[#022859] w-6 px-1 rounded-full flex justify-center items-center">
              2
            </p>
          </div>
        </div>

        <p className="text-[1.5] text-[#024873] font-normal mt-96 ">
          Delete Account
        </p>
      </div>
      <div className="w-2/3 mt-3 items-center flex flex-col   rounded-xl border p-5">
        {data.map((field, index) => (
          <div className=" w-1/2  mt-5" key={index}>
            <div className=" ">
              <p className="text-[1rem]">{field.label}</p>
              <p className="h-[2.5rem] rounded-lg p-2 shadow-lg border border-[#C1C1C1] outline-none">
                {field.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyProfile;
