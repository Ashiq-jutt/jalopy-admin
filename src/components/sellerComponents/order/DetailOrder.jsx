import burder from "../../../assets/burger.jpg";

const DetailOrder = () => {
  return (
    <>
      {" "}
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="flex justify-between items-center mt-3">
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={burder} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-normal text-[1.25rem]">Chicken Burger</p>
            <p>Nulla pulvinar ex id orci tempor</p>
          </div>
          <p>Just Now</p>
        </div>
      ))}
    </>
  );
};

export default DetailOrder;
