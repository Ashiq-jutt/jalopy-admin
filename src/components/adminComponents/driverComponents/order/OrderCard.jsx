import { KeyboardArrowDown } from "@mui/icons-material";
import burger from "../../../assets/burger.jpg";
const OrderCard = () => {
  return (
    <div className="font-inter">
      <div className="flex justify-between items-center">
        <p className="text-[#024873] text-[1rem] font-bold">Fulfilled Orders</p>
        <div className="flex gap-5">
          <div className="bg-[#F6F6F6] flex justify-center w-10 h-10 rounded-xl items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6009 4.1001V6.3001C20.6009 7.1001 20.1009 8.1001 19.6009 8.6001L15.3009 12.4001C14.7009 12.9001 14.3009 13.9001 14.3009 14.7001V19.0001C14.3009 19.6001 13.9009 20.4001 13.4009 20.7001L12.0009 21.6001C10.7009 22.4001 8.90086 21.5001 8.90086 19.9001V14.6001C8.90086 13.9001 8.50086 13.0001 8.10086 12.5001L7.63086 12.0101C7.32086 11.6801 7.26086 11.1801 7.51086 10.7901L12.6309 2.5701C12.8109 2.2801 13.1309 2.1001 13.4809 2.1001H18.6009C19.7009 2.1001 20.6009 3.0001 20.6009 4.1001Z"
                fill="#59595A"
              />
              <path
                d="M10.3504 3.6301L6.80039 9.3201C6.46039 9.8701 5.68039 9.9501 5.23039 9.4801L4.30039 8.5001C3.80039 8.0001 3.40039 7.1001 3.40039 6.5001V4.2001C3.40039 3.0001 4.30039 2.1001 5.40039 2.1001H9.50039C10.2804 2.1001 10.7604 2.9601 10.3504 3.6301Z"
                fill="#59595A"
              />
            </svg>
          </div>
          <div className="bg-[#F6F6F6] flex gap-5 items-center p-1 rounded-xl">
            <p>8 Jan - 2 Feb</p>
            <KeyboardArrowDown />
          </div>
        </div>
      </div>
      <div class="w-full mt-3">
        <div class="flex text-[#606060] justify-between items-center border-b">
          <div class="w-1/2 p-2">
            <p class="">Product Name</p>
          </div>
          <div class="w-1/4 p-2">
            <p class="">Price</p>
          </div>
          <div class="w-1/3 p-2 flex items-center">
            <p class="">Picked Up</p>
            <KeyboardArrowDown />
          </div>
          <div class="w-1/4 p-2">
            <p class="">Status</p>
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((item) => (
          <>
            <div class="flex justify-between items-center border-b-[0.3px]">
              <div class="w-1/2  flex gap-3 items-center p-2">
                <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={burger} className="w-8 h-8 rounded-full" alt="" />

                <p class="">Chicken Burger</p>
              </div>
              <div class="w-1/3 p-2">
                <p class="">€1399</p>
              </div>
              <div class="w-1/3 p-2">
                <p class="">Delivered</p>
              </div>
              <div class="w-1/4 p-2">
                <p
                  class={`border border-[#20D994] text-[#20D994] rounded-lg p-1`}
                >
                  Completed
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
