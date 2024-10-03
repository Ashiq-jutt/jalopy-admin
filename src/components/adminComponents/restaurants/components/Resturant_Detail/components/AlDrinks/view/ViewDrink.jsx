import { Button } from "primereact/button";
export default function ViewDrink({ aiDrinkData }) {
  return (
    <div className="mt-4  md:pl-[10%] md:pr-[10%]">
      <div className="flex flex-wrap flex-row justify-center ">
        <img
          className="w-[40%] rounded-md "
          src="https://www.foodandwine.com/thmb/_hz1-1jxHmNJxNLZxIjlOs2QQ3E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg"
        />
      </div>
      <div className="mt-4 w-[100%] flex flex-wrap flex-row justify-between">
        <div className="w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Category</p>
          <p className="inline w-[40%]">{aiDrinkData?.category}</p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Product Name:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.title2 ?? "Chicken Burger"}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Description:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.description ??
              "mit Rindfleisch, Gouda, Tomaten, roten Zwiebeln, sauren Gurken, Lolo Bionda und hausgemachtem Dressing"}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">PickUp Cost:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.pickupcost ??
              "mit Rindfleisch, Gouda, Tomaten, roten Zwiebeln, sauren Gurken, Lolo Bionda und hausgemachtem Dressing"}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Delivery Cost:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.deliverycost ??
              "mit Rindfleisch, Gouda, Tomaten, roten Zwiebeln, sauren Gurken, Lolo Bionda und hausgemachtem Dressing"}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Allergian:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.allergian ??
              "mit Rindfleisch, Gouda, Tomaten, roten Zwiebeln, sauren Gurken, Lolo Bionda und hausgemachtem Dressing"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap flex-row  justify-evenly md:justify-between ">
        <Button
          label="Inquiry"
          className={`border mt-2 ml-5 border-main-color  font-semibold text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          label="Delete"
          className={`border  mt-2 ml-5 border-main-color font-semibold   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        />
        <Button
          label="Approve"
          className={`border mt-2 ml-5 border-main-color font-semibold text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
    </div>
  );
}
