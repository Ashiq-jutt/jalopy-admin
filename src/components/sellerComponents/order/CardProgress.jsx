import burder from "../../../assets/burger.jpg";

const CardProgress = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="flex justify-between p-2">
          <div className="flex items-center gap-2">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={burder} alt="" className="w-10 h-10 rounded-full" />
            <p className="text-[1rem] font-normal">Chicken Burger</p>
          </div>
          <div className="flex items-center">€899</div>
        </div>
      ))}
    </>
  );
};

export default CardProgress;
