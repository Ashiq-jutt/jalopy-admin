import { KeyboardArrowLeft } from "@mui/icons-material";
import ChatDetail from "../../adminComponents/chatwithpartner/ChatDetail";
const HelpSupport = () => {
  return (
    <div className="text-[#024873] font-inter text-[1.25rem] flex justify-between p-5">
      <div className="w-1/3  ">
        <div className="flex items-center w-full  h-[3.75rem] justify-between p-3 rounded-lg shadow-lg">
          <p className="">Live Chats</p>
          <KeyboardArrowLeft className="rotate-180" />
        </div>

        <div className="flex items-center w-full mt-5 h-[3.75rem] justify-between p-3 rounded-lg shadow-lg">
          <p className="">Voice Call</p>
          <KeyboardArrowLeft className="rotate-180" />
        </div>

        <div className="flex items-center w-full mt-5 h-[3.75rem] justify-between p-3 rounded-lg shadow-lg">
          <p className="">Support</p>
          <KeyboardArrowLeft className="rotate-180" />
        </div>
      </div>
      <div className="w-1/2">
        <ChatDetail />
      </div>
    </div>
  );
};

export default HelpSupport;
