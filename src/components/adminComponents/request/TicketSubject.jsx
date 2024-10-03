import consumer from "../../../assets/consumer.png";
const TicketSubject = () => {
  return (
    <div className="font-inter pl-10 text-[#024873] flex mb-16">
      <div className="w-full mt-5 pr-10">
        <div className="flex justify-between">
          <p className="text-[1.5rem] text-[#A0E3F2]">Ticket Subject</p>
          <p className="bg-[#022859] flex justify-center items-center p-3 rounded-lg text-white">
            Close Ticket
          </p>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        <div className="flex gap-10">
          <p>
            Robert jack {"<"}abc@gmail.com{">"}
          </p>
          <p>1 day ago</p>
        </div>
        <div>
          <div className="flex gap-3 mt-8">
            {" "}
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={consumer} />
            <p className="text-[1.5rem] text-[#A0E3F2]">Ticket Subject</p>
          </div>
          <div className="pl-12 mt-5 ">
            <p>Hi support team</p>
            <p className="mt-3 mb-40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex items-center">
            <div className=" rounded-3xl border w-full h-16  flex items-center shadow-lg shadow-slate-500">
              <input
                type="text"
                placeholder="Reply"
                className=" outline-none  w-full h-14 p-3 rounded-3xl  "
              />
              <p className="cursor-pointer">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 67 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.1898 60.8488C17.914 60.8488 5.53125 48.4661 5.53125 33.1903C5.53125 17.9145 17.914 5.53174 33.1898 5.53174C48.4656 5.53174 60.8483 17.9145 60.8483 33.1903C60.8483 48.4661 48.4656 60.8488 33.1898 60.8488Z"
                    stroke="#D0D0D0"
                    strokeWidth="4.14878"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M45.6349 40.1049C45.6349 40.1049 41.4861 45.6366 33.1885 45.6366C24.891 45.6366 20.7422 40.1049 20.7422 40.1049"
                    stroke="#D0D0D0"
                    strokeWidth="4.14878"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M42.8689 24.8927C42.5021 24.8927 42.1504 24.747 41.891 24.4876C41.6317 24.2283 41.486 23.8765 41.486 23.5098C41.486 23.143 41.6317 22.7912 41.891 22.5319C42.1504 22.2725 42.5021 22.1268 42.8689 22.1268C43.2357 22.1268 43.5874 22.2725 43.8468 22.5319C44.1061 22.7912 44.2518 23.143 44.2518 23.5098C44.2518 23.8765 44.1061 24.2283 43.8468 24.4876C43.5874 24.747 43.2357 24.8927 42.8689 24.8927ZM23.5079 24.8927C23.1412 24.8927 22.7894 24.747 22.53 24.4876C22.2707 24.2283 22.125 23.8765 22.125 23.5098C22.125 23.143 22.2707 22.7912 22.53 22.5319C22.7894 22.2725 23.1412 22.1268 23.5079 22.1268C23.8747 22.1268 24.2265 22.2725 24.4858 22.5319C24.7452 22.7912 24.8909 23.143 24.8909 23.5098C24.8909 23.8765 24.7452 24.2283 24.4858 24.4876C24.2265 24.747 23.8747 24.8927 23.5079 24.8927Z"
                    stroke="#D0D0D0"
                    strokeWidth="4.14878"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </div>
            <svg
              width="55"
              height="55"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M60.0482 33.0529L11.9232 8.99043C11.546 8.80179 11.1224 8.72621 10.7032 8.77278C10.2841 8.81935 9.88732 8.98609 9.56074 9.25292C9.24885 9.51432 9.01607 9.85752 8.88854 10.244C8.76102 10.6304 8.74381 11.0447 8.83886 11.4404L15.3139 34.9998L8.75136 58.4935C8.66217 58.824 8.65176 59.1707 8.72097 59.5059C8.79017 59.8411 8.93707 60.1554 9.14984 60.4235C9.36261 60.6916 9.63531 60.906 9.94603 61.0495C10.2567 61.193 10.5968 61.2616 10.9389 61.2498C11.2813 61.2477 11.6185 61.1653 11.9232 61.0092L60.0482 36.9467C60.4066 36.7631 60.7073 36.4842 60.9172 36.1407C61.1272 35.7972 61.2383 35.4024 61.2383 34.9998C61.2383 34.5972 61.1272 34.2024 60.9172 33.8589C60.7073 33.5154 60.4066 33.2365 60.0482 33.0529ZM14.3295 54.9279L19.1639 37.1873H39.3764V32.8123H19.1639L14.3295 15.0717L54.1639 34.9998L14.3295 54.9279Z"
                fill="#024873"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-[#F2F2F2] p-10">
        <p className="text-[1.5rem] text-[#024873] font-bold  flex items-center justify-center w-full">
          Details
        </p>
        <div className="flex  mt-3 justify-between">
          <div className="flex flex-col items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H18V14H3.17L2 15.17V2ZM2 0C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0H2ZM4 10H12V12H4V10ZM4 7H16V9H4V7ZM4 4H16V6H4V4Z"
                fill="#022859"
              />
            </svg>
            <p>Chat</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3445 17.4554C20.5429 16.6478 18.6013 15.4691 17.6593 14.9941C16.4326 14.3762 16.3317 14.3258 15.3675 15.0421C14.7243 15.5201 14.2967 15.9471 13.5441 15.7866C12.7914 15.6261 11.1558 14.721 9.72358 13.2935C8.2914 11.8659 7.33376 10.183 7.17272 9.43287C7.01169 8.68276 7.44583 8.26025 7.91935 7.61564C8.58672 6.70702 8.53624 6.55559 7.96579 5.32896C7.52105 4.37491 6.30797 2.45168 5.49723 1.65412C4.62994 0.797495 4.62994 0.948931 4.07111 1.18113C3.61615 1.37254 3.17968 1.60521 2.76716 1.87622C1.95945 2.41281 1.51117 2.85854 1.19767 3.52839C0.88418 4.19824 0.743336 5.76863 2.36229 8.70951C3.98125 11.6504 5.1171 13.1542 7.46804 15.4984C9.81899 17.8426 11.6268 19.1031 14.2695 20.5851C17.5387 22.416 18.7927 22.0591 19.4646 21.7461C20.1365 21.4331 20.5843 20.9889 21.1219 20.1813C21.3936 19.7695 21.6268 19.3335 21.8186 18.8789C22.0513 18.3222 22.2027 18.3222 21.3445 17.4554Z"
                stroke="#022859"
                strokeWidth="2"
                stroke-miterlimit="10"
              />
            </svg>

            <p>Call</p>
          </div>
        </div>
        <p className="mt-3">Email</p>
        <p>
          {"< "}Abc@gmail.com{">"}
        </p>
        <p className="mt-3">Phone Number</p>
        <p>000-0000-000</p>
        <p className="mt-3">Location</p>
        <p>Abc, Town</p>

        <div className="mt-36">
          <p>Assignee</p>
          <p>Katherine. m</p>
        </div>
      </div>
    </div>
  );
};

export default TicketSubject;
