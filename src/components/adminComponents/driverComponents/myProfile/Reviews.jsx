import CardReview from "./CardReview";

const Reviews = () => {
  return (
    <div className="text-[1.25rem] font-inter text-[#024873] mt-10 ">
      {[1, 2, 3, 4, 5].map((item) => (
        <CardReview />
      ))}
    </div>
  );
};

export default Reviews;
