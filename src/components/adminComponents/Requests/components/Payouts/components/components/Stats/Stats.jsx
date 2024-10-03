import {
    PaidInvoices,
  PendingInvoices,
  TotalInvoices,
 
} from "./assets"; 
export default function InvoiceStat() {
  const statdata = [
    {
      label: "Total Invoices",
      amount: "€5000k",
      svg: TotalInvoices, 
      increase:true, 
      increaseBy:"16%",  
    },
    {
      label: "Paid Invoices",
      amount: "€1893k",
      svg: PaidInvoices, 
      decrease:true, 
      decreaseBy:"19%", 
    },
    {
        label: "Pending Invoices",
        amount: "€1893k",
        svg: PendingInvoices, 
        decrease:true, 
        decreaseBy:"5%", 
    },
  ];
  return (
    <div>
      <div className="flex flex-wrap flex-row font-poppins items-center justify-center ">
        <div className="flex rounded-md w-full  rounded flex-wrap flex-row justify-between ">
          

          {statdata.map((item,index) => {
            let Svg = item.svg;
            return (
              <div className={`w-full rounded-md border border-[#EEEEEE]   mt-2 md:mt-0 h-[120px] w-full md:w-[32.5%]  p-2  pl-3  mt-4 flex flex-wrap flex-row justify-between items-center `}>
                <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-2 rounded-full">
                  <Svg />
                </div>   
                 <div> 
                 <h1 className="mt-1  ">{item.label}</h1>
                <h1 className="mt-2 font-bold">  
                 {item.amount}
                </h1>
                
               
                 </div>
              </div>
            );
          })}
        </div>
    
      </div>
    </div>
  );
}
