import InvoicesData from "./Invoices/components/InvoiceData/InvoiceData";
import CardBillingInfo from "./Invoices/components/CardBillingInfo";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const Review = () => {
  let toast=useRef()
  return (
    <div className="md:mt-[20px] font-poppins  text-main-color  bg-white   md:pt-4">
      
      
         <InvoicesData toast={toast}/>  
         <CardBillingInfo toast={toast}/> 
         <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />  
    </div>
  );
};

export default Review;
