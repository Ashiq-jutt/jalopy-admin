const ReviewCard = ({ review }) => {
  return (
    <div className="p-5 border-b-[#024873] border-b ml-3 mr-3">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="font-bold">{review.name}</p>
          <p className="text-[#737B8B]">{review.time}</p>
        </div>
        <div className="flex gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path data */}
          </svg>

          <p>{review.rating}</p>
        </div>
      </div>
      <div className="mt-3 text-[14px] text-[#024873]">{review.content}</div>
    </div>
  );
};

export default ReviewCard;
