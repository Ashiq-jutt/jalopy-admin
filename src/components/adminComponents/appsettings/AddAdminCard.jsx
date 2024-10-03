import messanger from "../../../assets/messanger.png";
import { Add } from "@mui/icons-material";
const AddAdminCard = () => {
  return (
    <div className="bg-[#F2F2F2] p-5 mt-4 rounded-md">
      <p className="text-[21px] text-main-color font-bold mb-4">Admins</p>
      <div className="flex flex-wrap flex-row justify-center md:justify-left rounded-md items-center gap-3">
        <div className="bg-main-color text-white w-[10rem] h-[5rem] flex flex-col justify-center p-3 rounded-lg">
          <div className="flex items-center gap-3 text-[14px] ">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={messanger} alt="" className="h-10 w-10 rounded-full" />
            <p>Roberts . M</p>
          </div>
          <div className="flex justify-center items-center font-bold">
            Owner
          </div>
        </div> 
        <div className="bg-main-color text-white w-[10rem] h-[5rem] flex flex-col justify-center p-3 rounded-lg">
          <div className="flex  gap-3 text-[14px] ">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={messanger} alt="" className="h-10 w-10 rounded-full" />
            <p>Roberts . M</p>
          </div>
          
        </div>
        <button className="bg-main-color text-white h-10 p-1 rounded-xl">
          Add Admin <Add />
        </button>
      </div>
    </div>
  );
};

export default AddAdminCard;
