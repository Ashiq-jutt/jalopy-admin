";
import { Button } from "primereact/button";
export default function ViewDrink({ aiDrinkData }) {
  return (
    <div className="mt-4  md:pl-[10%] md:pr-[10%]">
      
      <div className="mt-10 w-[100%] flex flex-wrap flex-row justify-between">
        <div className="w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Category</p>
          <p className="inline w-[40%]">{aiDrinkData?.category}</p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Product Name:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.title}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Description:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.description}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">PickUp Cost:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.pickupcost}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Delivery Cost:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.deliverycost}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Allergian:</p>
          <p className="inline w-[40%]">
            {aiDrinkData?.allergian }
          </p>
        </div>
      </div>
      <div className="flex flex-wrap flex-row  justify-evenly  ">
     
     <Button
       label="Delete"
       className={`border  mt-2 ml-5 border-main-color mt-[30px] font-normal   text-main-color rounded-lg w-[100px] font-normal p-1 pl-2 pr-2 `}
     />
    
   </div>
    </div>
  );
}
