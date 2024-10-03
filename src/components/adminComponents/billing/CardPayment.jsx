import { Button } from "primereact/button";
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
     <p className="mt-2 mb-2 text-main-color text-[20px]">Payment Methods</p>
      {data.map((item,index) => {  
         let Svg=item.svg;
         return(
        <div className={`bg-[#F2F2F2] mt-5 shadow-paymentMethod flex justify-between items-center p-3 rounded-lg text-[14px] font-normal ${index === 0 ? "":""}`}>
          <div>
            <p>{item.label}</p>
            {/*<p className="text-[12px]"> Set as default</p>*/}
          </div>
          <div className="w-9 h-9">
            <Svg/>
          </div>
        </div> 
         )
})} 
 {/* <div className="flex flex-wrap flex-row justify-center w-full mt-4"> 
    <Button label="ADD NEW" icon="pi pi-plus" className="pl-2 pr-2 border border-main-color"/>
  </div>  */}
    </> 
  );
};

export default CardPayment;
