import menupic from "../../assets/menupic.png";
const MenuDetail = () => {
  return (
    <div className="flex flex-col justify-center items-center  p-10">
      <div className="flex justify-center">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}className=" h-96 rounded-2xl" src={menupic} />
      </div>
      <div className=" px-10 items-center text-[#024873] w-full">
        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            price
          </div>
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-9">
            €12
          </div>
        </div>
        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Quantity
          </div>
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-9">
            32548
          </div>
        </div>
        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Item Detail
          </div>
          <div className=" w-96  text-[1.5rem] font-normal font-['Inter'] capitalize ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Availability
          </div>
          <div className="  text-[1.5rem] font-normal font-['Inter'] capitalize ">
            in stock
          </div>
        </div>
        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Delivery Charges
          </div>
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize ">
            €10
          </div>
        </div>

        <div className="flex justify-between mt-5 items-center w-full">
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize leading-10">
            Total Orders
          </div>
          <div className="   text-[1.5rem] font-normal font-['Inter'] capitalize ">
            1320
          </div>
        </div>
      </div>
      <div className="flex justify-evenly gap-10 mt-10">
        <div className="w-44 h-16 px-14 py-3.5 bg-sky-950 rounded-lg justify-center items-center inline-flex">
          <div className="w-14 h-8 text-zinc-100 text-2xl font-normal font-['Inter'] capitalize leading-9">
            edit
          </div>
        </div>
        <div className="w-44 h-16 px-11 py-3.5 rounded-lg border border-sky-950 justify-center items-center inline-flex">
          <div className="w-20 h-8 text-sky-900 text-2xl font-normal font-['Inter'] capitalize leading-9">
            delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
