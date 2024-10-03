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
const CardPayment = ({formik}) => {
  return (
    <>
      {data.map((item,index) => {  
         let Svg=item.svg;
         return(
        <div onClick={()=>{ 
          formik.values.paymentMethod=item?.label 
          formik.setFieldValue("paymentMethod",item?.label)
        }} className={`bg-[#F2F2F2] cursor-pointer mt-4  w-[90%] md:w-[32%]  flex justify-between shadow-lg items-center p-3 rounded-lg text-[14px] font-normal ${formik.values.paymentMethod === item?.label ? "bg-main-color text-white fill-[white]":"fill-[#A25EDF]"}`}>
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
