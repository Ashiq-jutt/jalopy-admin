import { useEffect, useState } from "react";
import {
    PaidInvoices,
  PendingInvoices,
  TotalInvoices,
 
} from "./assets"; 
import { invoiceStats } from "../../../commonstats/CommonStats";
export default function InvoiceStat() {
  const [data,setData] =useState([
    {
      label: "Total Invoices",
      amount: "0",
      svg: TotalInvoices, 
      increase:true, 
      increaseBy:"16%",  
    },
    {
      label: "Paid Invoices",
      amount: "0",
      svg: PaidInvoices, 
      decrease:true, 
      decreaseBy:"19%", 
    },
    {
        label: "Pending Invoices",
        amount: "0",
        svg: PendingInvoices, 
        decrease:true, 
        decreaseBy:"5%", 
    },
  ])  
  useEffect(() => {  

    const fetchData = async () => {
      const res = await invoiceStats();
  
  
    let statobj=[]
    data.map(item=>{   
      if(item.label === "Total Invoices"){  
           let obj2={...item} 
           obj2.amount=` ${res?.total}`  
            statobj.push(obj2)
      } 
      else if(item.label === "Paid Invoices"){  
        let obj2={...item} 
        obj2.amount=` ${res?.paid}`   
         statobj.push(obj2)
   } 
   
else if(item.label === "Pending Invoices"){  
  let obj2={...item} 
  obj2.amount=` ${(res?.pending)}`  
   statobj.push(obj2) 
   
} 
else if(item.label === "Rejected"){  
 let obj2={...item} 
 obj2.no=` ${(res?.rejected)}`  
  statobj.push(obj2) 
  
} 
setData(statobj)
    })      

  }
    fetchData();
  }, []);
  return (
    <div>
      <div className="w-full flex flex-wrap flex-row justify-center ">
        <div className="flex rounded-md shadow-md p-3  w-full max-w-[985px] pt-5 pb-5 pl-10 pr-10  mt-4 rounded flex-wrap flex-row justify-around md:justify-between"> 
         

          {data.map((item,index) => {
            let Svg = item.svg;
            return (
              < div className={`  ${index === 1 || index === 0 ? "md:border-r-[2px]":"border-none"} border-main-color    mt-2 md:mt-0  w-[250px]     mt-4 flex flex-wrap flex-row justify-left gap-2  `}>
                  <div className={`bg-gradient-to-b  rounded-full w-[84px] h-[84px]  flex flex-wrap flex-row justify-center items-center from-blue-100 via-blue-200 to-blue-300`}>
                  <Svg />
                </div>   
                 <div> 
                 <h1 className="mt-1  ">{item.label}</h1>
                <h1 className=" font-bold text-[25px]">  
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
