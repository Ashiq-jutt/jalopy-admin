import search from "../../../assets/search.svg";
import { Add, KeyboardArrowDown } from "@mui/icons-material";
import ListUsers from "../ListUsers";
import Data from "../../../utils/CompontStaticData";
const AddUser = ({ name, HeadData, Data }) => {
  return (
    <>
      {" "}
      <div className="flex justify-between p-5 mt-5 mb-5 font-inter">
        <p className="text-[1.5rem] text-main-color font-bold">{name}</p>
        {name === "Reports" ? (
          ""
        ) : (
          <button className="bg-[#022859] flex justify-center items-center text-[#F2F2F2] rounded-xl text-[14px] h-10 w-[8rem]">
            ADD NEW <Add fontSize="small" />
          </button>
        )}
        <div className="flex bg-[#F9FBFF]  items-center rounded-xl p-3">
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={search} className="w-7 h-7" />
          <input
            type="search"
            className="outline-none w-[20rem] bg-[#F9FBFF] rounded-xl  pl-2 pr-2"
            placeholder="search"
          />
        </div>
        <div className="flex items-center font-inter text-[#024873]">
          <p>
            Short by : <span className="font-bold">Newest</span>
          </p>
          <KeyboardArrowDown fontSize="large" />
        </div>
      </div>
      <ListUsers TableHead={HeadData} Data={Data} />
    </>
  );
};

export default AddUser;
