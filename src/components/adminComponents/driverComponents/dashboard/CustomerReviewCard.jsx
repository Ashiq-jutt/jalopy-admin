import  { useState } from "react";
import drag from "../../../assets/drag.svg";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import RiviewCard from "./RiviewCard";
import ReviewCard from "./RiviewCard";

const CustomerReviewCard = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Sally D.",
      time: "20m ago",
      rating: "5/5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    // Add more reviews here...
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <div className="font-inter rounded-xl  shadow-2xl border h-fit">
      <div className="flex justify-between border-b-[#024873] border-b p-3">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={drag} alt="" className="w-10 h-10" />
        <div className="">
          <p className="text-[1.5rem] text-[#A0E3F2]">Customer Reviews</p>
          <p className="text-[#868E96] ">Message</p>
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8567 35.9521C22.2261 35.9521 20.9043 34.6302 20.9043 32.9997C20.9043 31.3691 22.2261 30.0473 23.8567 30.0473C25.4872 30.0473 26.8091 31.3691 26.8091 32.9997C26.8091 34.6302 25.4872 35.9521 23.8567 35.9521ZM23.8567 27.0949C22.2261 27.0949 20.9043 25.7731 20.9043 24.1425C20.9043 22.512 22.2261 21.1902 23.8567 21.1902C25.4872 21.1902 26.8091 22.512 26.8091 24.1425C26.8091 24.9256 26.498 25.6765 25.9443 26.2302C25.3906 26.7839 24.6397 27.0949 23.8567 27.0949ZM23.8567 18.2378C22.2261 18.2378 20.9043 16.9159 20.9043 15.2854C20.9043 13.6548 22.2261 12.333 23.8567 12.333C25.4872 12.333 26.8091 13.6548 26.8091 15.2854C26.8091 16.0684 26.498 16.8194 25.9443 17.373C25.3906 17.9267 24.6397 18.2378 23.8567 18.2378Z"
            fill="#343A40"
          />
        </svg>
      </div>
      {displayedReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
      <div className="flex justify-end p-3">
        <button className="flex items-center" onClick={toggleShowAllReviews}>
          {showAllReviews ? "SHOW LESS" : "SEE ALL REVIEWS"}
          {showAllReviews ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </button>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
``;
