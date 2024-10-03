";
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
      <div className="flex flex-wrap flex-row items-center justify-center ">
        <div className="w-[90%] shadow-md p-4 rounded-md  flex flex-wrap flex-row   justify-around ">
          

          {statdata.map((item,index) => {
            let Svg = item.svg;
            return (
              <div className={`w-[230px] ${  index === 1 || index === 0 ? "border-r-[3px] border-main-color":""} p-2  pl-3  mt-4 flex flex-wrap flex-row justify-between items-center `}>
                <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-2 rounded-full">
                  <Svg />
                </div>   
                 <div> 
                 <h1 className="mt-1">{item.label}</h1>
                <h1 className="mt-2">  
                 {item.amount}
                </h1>
                
                <h1 className="mt-1 text-[14px] text-left font-normal">{item.increase ? <p> <i className=" text-green-500 pi pi-arrow-up"></i>{item?.increaseBy} this month </p>:<p> <i className=" text-red-500 pi pi-arrow-down"></i>{item?.decreaseBy} this month </p>}</h1> 
                 </div>
              </div>
            );
          })}
        </div>
    
      </div>
    </div>
  );
}
