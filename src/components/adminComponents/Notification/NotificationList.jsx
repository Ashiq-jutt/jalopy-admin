
const NotificationList = () => {
  return (
    <div className="p-5 font-poppins font-normal">
      <p className="text-[#A0E3F2] text-[1.5rem] font-bold ">
        Notifications
      </p>
      <div className=" flex justify-end gap-3 pr-5">
        <button className="border bg-[#022859] font-normal text-[1rem] text-[#F2F2F2] w-32 p-3 rounded-lg">
          All
        </button>
        <button className="border border-[#022859] font-normal text-[1rem] w-32 p-3 rounded-lg">
          Un Read
        </button>
        <button className="border border-[#EF004C] text-[#EF004C] font-normal text-[1rem]   w-32 p-3 rounded-lg">
          Error
        </button>
        <button className="border border-[#FEEF06] text-[#FEEF06] font-normal text-[1rem]   w-32 p-3 rounded-lg">
          Warning
        </button>
      </div>
      {[, 1, 2, 3].map((item) => ( 
        <div className="rounded-xl bg-[#F2F2F2] shadow-2xl mt-3 p-5 text-[#024873] font-inter">
          <div className="flex justify-between items-center">
             <p className={`text-[14px] ${item == 1 ? "text-warning":""} `}> 
            
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            </p> 

            <p className="w-[25rem]  flex items-center justify-end text-[#A0E3F2]">
              Mark As Read
            </p>
          </div>
          <p className="text-[12px] mt-3">10 minutes ago</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
