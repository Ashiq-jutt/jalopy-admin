import { KeyboardArrowDown } from "@mui/icons-material";
const NewOrderCard = () => {
  return (
    <div className="font-inter pl-5 shadow-2xl p-3 rounded-lg">
      <p className="text-[#A0E3F2] text-[1rem] font-bold">New Orders</p>
      <div className="bg-[#022859] flex flex-col gap-3 mt-3 text-white p-3 rounded-xl">
        <p className="flex justify-center items-center">
          Your Acceptance Rate is 90%
        </p>
        <div className="flex justify-between">
          <p>Food Truck</p>
          <p>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.25 0L26.01 0.045L18 3.15L9 0L0.54 2.85C0.225 2.955 0 3.225 0 3.57V26.25C0 26.67 0.33 27 0.75 27L0.99 26.955L9 23.85L18 27L26.46 24.15C26.775 24.045 27 23.775 27 23.43V0.75C27 0.33 26.67 0 26.25 0ZM10.5 3.705L16.5 5.805V23.295L10.5 21.195V3.705ZM3 5.19L7.5 3.675V21.225L3 22.965V5.19ZM24 21.81L19.5 23.325V5.79L24 4.05V21.81Z"
                fill="white"
              />
            </svg>
          </p>
        </div>
      </div>
      <div className="rounded-xl shadow-xl mt-5 border text-[#024873] p-1">
        <div className="bg-[#022859] text-white flex justify-center items-center p-2 rounded-xl shadow-xl mt-5">
          Order will be ready at 09:30
        </div>
        <div className="p-2">
          <p className="mt-5">Order Detail</p>
          <p className="font-bold mt-2">Z1H-2HDN (#129)</p>
          <p className="mt-2">Robert Jackson</p>
          <p className="font-bold mt-2">
            View order items (2) <KeyboardArrowDown />{" "}
          </p>
        </div>
        <div className="border-t border-b p-3">
          <p className="mt-2">Payment</p>
          <div className="flex justify-between items-center">
            <p className="font-bold mt-2">Paid online</p>
            <p>17 Aug, 2023</p>
          </div>
        </div>
        <div className="flex justify-evenly p-5 items-center">
          <button className="bg-[#022859] w-24 text-white p-2 border rounded-lg">
            Accept
          </button>
          <button className="text-[#022859] w-24 bg-white p-2 border rounded-lg">
            Decline
          </button>
        </div>
      </div>
      <div className=" border-[#022859] border rounded-xl mt-10 mb-5  flex justify-center items-center p-2 gap-3 text-[#022859]">
        <p> Chat with Buyer</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.8 2.8H25.2V19.6H4.438L2.8 21.238V2.8ZM2.8 0C1.26 0 0.014 1.26 0.014 2.8L0 28L5.6 22.4H25.2C26.74 22.4 28 21.14 28 19.6V2.8C28 1.26 26.74 0 25.2 0H2.8ZM5.6 14H22.4V16.8H5.6V14ZM5.6 9.8H22.4V12.6H5.6V9.8ZM5.6 5.6H22.4V8.4H5.6V5.6Z"
            fill="#024873"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewOrderCard;
