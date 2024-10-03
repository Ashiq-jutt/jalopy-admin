const CardImpretion = () => {
  return (
    <div className="flex flex-row flex-wrap justify-evenly mt-10">
      {[1, 2, 3, 4, 5, 6,7].map((item,index) => (
        <div className="flex flex-col justify-center items-center">
          <div className="w-[7.5rem] h-[7.5rem] rounded-lg flex text-main-color font-poppins font-normal justify-center items-center bg-[#F2F2F2]">
            928392
          </div>
          <p className=" mt-3 font-normal  text-main-color font-poppins ">{ index === 6 ? "Overall ROI": index === 5 ? "CPA" :index === 4 ? "acquisitions":index === 1 ? "CTR" :index === 0 ? "Clicks":index === 2 ? "Impressions":index === 3 ? "CPC":undefined}</p>
        </div>
      ))}
    </div>
  );
};

export default CardImpretion;
