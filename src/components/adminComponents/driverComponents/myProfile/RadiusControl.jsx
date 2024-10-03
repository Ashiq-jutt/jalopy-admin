import map from "../../../assets/map.png";
const RadiusControl = () => {
  return (
    <div className="py-5 font-inter text-[#024873]">
      <div className="flex justify-evenly">
        <div>
          <p className="text-[1.3rem]  font-normal">Route Type</p>
          <p>Snaps To Road</p>
        </div>
        <div>
          <p className="text-[1.3rem]  font-normal">Travel Mode</p>
          <p>Driving</p>
        </div>
        <div>
          <p className="text-[1.3rem]  font-normal">View</p>
          <div className="flex gap-3">
            <p className="flex gap-3">
              <input type="radio" className="ring-[#024873] right-2" />
              Hybrid
            </p>
            <p className="flex gap-1">
              <input type="radio" className="ring-[#024873] right-2" />
              Map
            </p>
            <p className="flex gap-1">
              <input type="radio" className="ring-[#024873] right-2" />
              Satellite
            </p>
          </div>
        </div>
        <div>
          <p className="text-[1.3rem]  font-normal">Zoom</p>
          <select className="w-20 outline-none border">
            <option value="1">500KM</option>
            <option value="1">1KM</option>
            <option value="1">2KM</option>
          </select>
        </div>
      </div>
      <div className="flex mt-5">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={map} alt="" className="w-[30rem] rounded-xl" />
        <div className="px-3">
          <p className="text-[2rem] font-normal">Radius Calculation</p>
          <p>Distance</p>
          <div className="p-1 flex gap-10">
            <select className="w-40 p-2 outline-none border">
              <option value="1">500M</option>
              <option value="1">1KM</option>
              <option value="1">2KM</option>
            </select>
            <select className="w-20 p-2 outline-none border">
              <option value="1">M</option>
              <option value="1">KM</option>
            </select>
          </div>

          <div className="flex mt-40 justify-center gap-10">
            <button className="p-2 rounded-md border-[#024873] border">
              Cancle
            </button>
            <button className="p-2 rounded-md text-white bg-[#024873] border">
              Save canges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiusControl;
