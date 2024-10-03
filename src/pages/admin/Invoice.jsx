import InvoiceStat from "../../components/adminComponents/Invoices/components/Stats/Stats";
import InvoicesData from "../../components/adminComponents/Invoices/components/InvoiceData/InvoiceData";

const Invoice = () => {

  return (
    <div className="mt-[70px] bg-white p-2 font-poppins  text-main-color ">
       <InvoiceStat/> 
         <InvoicesData/>
    </div>
  );
};

export default Invoice;
