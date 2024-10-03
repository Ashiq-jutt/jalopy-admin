import burder from "../../../assets/burger.jpg";

const ReviewOrder = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div className="flex justify-between items-center mt-3">
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={burder} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-normal text-[1.25rem]">Sergio Ramasis</p>
            <p className="w-[16rem] text-[#A0E3F2] px-3">
              Simply awesome. Professional staff , fast service.
            </p>
            <div className="flex gap-3 mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="129"
                height="20"
                viewBox="0 0 129 20"
                fill="none"
              >
                <path
                  d="M9.76413 15.6945L15.7984 19.5283L14.197 12.3028L19.5283 7.44129L12.5078 6.81433L9.76413 0L7.02041 6.81433L0 7.44129L5.33121 12.3028L3.7299 19.5283L9.76413 15.6945Z"
                  fill="#FDFF56"
                />
                <path
                  d="M37.6626 15.6945L43.6968 19.5283L42.0955 12.3028L47.4267 7.44129L40.4063 6.81433L37.6626 0L34.9188 6.81433L27.8984 7.44129L33.2297 12.3028L31.6283 19.5283L37.6626 15.6945Z"
                  fill="#FDFF56"
                />
                <path
                  d="M66.2561 15.6945L71.8594 19.5283L70.3724 12.3028L75.3228 7.44129L68.8039 6.81433L66.2561 0L63.7084 6.81433L57.1895 7.44129L62.1399 12.3028L60.6529 19.5283L66.2561 15.6945Z"
                  fill="#FDFF56"
                />
                <path
                  d="M94.852 15.6945L100.886 19.5283L99.2849 12.3028L104.616 7.44129L97.5957 6.81433L94.852 0L92.1083 6.81433L85.0879 7.44129L90.4191 12.3028L88.8178 19.5283L94.852 15.6945Z"
                  fill="#FDFF56"
                />
                <path
                  d="M118.987 15.6945L125.021 19.5283L123.42 12.3028L128.751 7.44129L121.731 6.81433L118.987 0L116.243 6.81433L109.223 7.44129L114.554 12.3028L112.953 19.5283L118.987 15.6945Z"
                  fill="#FDFF56"
                />
              </svg>
              <p className="font-bold">5.0</p>
            </div>
          </div>
          <p>Just Now</p>
        </div>
      ))}
    </>
  );
};

export default ReviewOrder;
