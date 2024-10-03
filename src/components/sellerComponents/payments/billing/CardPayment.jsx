//import bank from "../../../assets/bank.svg";
import { Bank, Card, Paypal } from "./assets";
const data=[{ 
   label:"Bank", 
   svg:Bank, 
},{ 
  label:"Credit Card", 
  svg:Card,  
},{ 
  label:"PayPal", 
  svg:Paypal,  
}]
const CardPayment = () => {
  return (
    <>
      {data.map((item,index) => {  
         let Svg=item.svg;
         return(
        <div className={`bg-[#F2F2F2] mt-5 flex justify-between shadow-lg items-center p-3 rounded-lg text-[14px] font-normal ${index === 0 ? "bg-main-color text-white":""}`}>
          <div>
            <p>{item.label}</p>
            <p className="text-[12px]"> Set as default</p>
          </div>
          <div className="w-9 h-9">
            <Svg/>
          </div>
        </div> 
         )
})}
    </>
  );
};

export default CardPayment;
