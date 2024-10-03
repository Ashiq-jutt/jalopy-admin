import customar from "../../../assets/consumer.png";
import { ArrowRight, North } from "@mui/icons-material";
import { useNavigate, NavLink } from "react-router-dom";
const CardRequest = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-3 p-5 justify-center">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div className="text-[#024873] w-1/4 font-inter bg-[#F2F2F2] rounded-lg overflow-hidden">
          <p className="text-[1rem] font-bold flex p-3">
            Restaurant register request
          </p>
          <div className="flex items-center gap-3 mt-3 p-3">
            <img
              src={customar}
              alt="profile"
              className="h-8 w-8 object-cover rounded-full"
            />
            <p className="text-[14px] font-bold truncate">
              Robert jack about 2 days ago
            </p>
          </div>

          <div className="bg-[#A0E3F2]">
            <p className="text-[1.5rem] font-bold flex items-center justify-center">
              2 days ago
            </p>
            <p className=" flex items-center justify-center text-[12px] font-bold">
              5 August 2023
            </p>
            <div className="flex text-[8px] justify-evenly p-3">
              <div className="flex ">
                <p className="text-white bg-[#024873]  w-[2rem]   flex justify-center items-center rounded-xl">
                  Step 1
                </p>
                <div className="rotate-90">
                  <North fontSize="small" />
                </div>
              </div>
              <div className="flex ">
                <p className="text-white bg-[#024873]  w-[2rem]   flex justify-center items-center rounded-xl">
                  Step 1
                </p>
                <div className="rotate-90">
                  <North fontSize="small" />
                </div>
              </div>
              <div className="flex">
                <p className="text-white bg-[#024873]  w-[2rem]   flex justify-center items-center rounded-xl">
                  Step 1
                </p>
                <div className="rotate-90">
                  <North fontSize="small" />
                </div>
              </div>
              <div className="flex">
                <p className="text-white bg-[#024873]  w-[2rem]   flex justify-center items-center rounded-xl">
                  Step 1
                </p>
              </div>
            </div>
          </div>
          <p className="text-[12px] p-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor
            adipiscing <span className="font-bold underline">Details</span>
          </p>
          <div className="flex items-center gap-3 mt-3 p-3">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={customar} alt="profile" />
            <NavLink
              to={"restaurantdetail"}
              className="bg-[#022859] text-white p-1 rounded-lg w-[5rem]"
            >
              Approve
            </NavLink>
            <NavLink
              to="reject"
              className="border-[#022859] border flex items-center
              justify-center p-1 rounded-lg w-[5rem]"
            >
              {" "}
              Reject
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardRequest;
