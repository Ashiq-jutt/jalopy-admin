import car from "../../../assets/car.jpg";
const CarDetail = () => {
  const cardata = [
    { value: 2020, name: "Year" },
    { value: 4, name: "No. of Seats" },
    { value: "832ug4", name: "Registration" },
    { value: "Registered", name: "Registration Status" },
    { value: "20-08-2025", name: "Registration Exp" },
    { value: "Black", name: "Color" },
    { value: "Utility Cab", name: "Body Type" },
    { value: "Honda", name: "Company" },
    { value: "5 Tons", name: "GVM" },
    ,
    { value: "Civic", name: "Model" },
  ];
  return (
    <div className="p-5 font-inter text-[#024873] flex w-full justify-between">
      <div className="w-1/3 ">
        {cardata.map((item) => (
          <div className="flex justify-between mt-5">
            <p className="font-normal w-full">{item.name}</p>
            <p className="w-1/2 ">{item.value}</p>
          </div>
        ))}
        <div></div>
      </div>
      <div className="w-1/2 justify-center items-center ">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={car} alt="" className="rounded-lg" />
      </div>
    </div>
  );
};

export default CarDetail;
