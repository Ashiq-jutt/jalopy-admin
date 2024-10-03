import burder from "../../../assets/burger.jpg";

const RecentChat = () => {
  return (
    <div className="border p-5 text-[#024873]">
      <p className="text-[#A0E3F2] text-[1.5rem] font-bold">Recent Chats</p>{" "}
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="flex justify-between items-center mt-3">
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={burder} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-normal text-[1.25rem]">Chicken Burger</p>
            <p>Nulla pulvinar ex id orci tempor</p>
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            <p>Just Now</p>
            <p className="w-5 h-5 rounded-full bg-[#024873] text-white flex justify-center items-center">
              2
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentChat;
