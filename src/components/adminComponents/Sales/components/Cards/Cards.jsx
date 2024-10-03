import {
  TotalCustomers,
  TotalOrders,
  TotalProductSold,
  TotalSales,
} from "./assets"; 

import ReactSpeedometer from "react-d3-speedometer"
export default function CardStats() {
  const statdata = [
    {
      label: "Total Sales",
      amount: "€5k",
      svg: TotalSales,
      yesterday: "+10% from yesterday",
    },
    {
      label: "Total Orders",
      number: "180",
      svg: TotalOrders,
      yesterday: "+10% from yesterday",
    },
    {
      label: "Product Sold",
      number: "180",
      svg: TotalProductSold,
      yesterday: "+10% from yesterday",
    },
    {
      label: "New Customer",
      number: "180",
      svg: TotalCustomers,
      yesterday: "+10% from yesterday",
    },
  ];
  return (
    <div >
      <h1 className="text-[19px] mt-4 font-normal">Today's Sales</h1>
      <div className="flex flex-wrap flex-row items-center justify-center md:justify-between">
        <div className="w-full md:w-[60%] flex flex-wrap flex-row  gap-1  justify-left ">
          <h1 className="w-full mt-2 ">Sales Summary</h1>

          {statdata.map((item) => {
            let Svg = item.svg;
            return (
              <div className="w-full md:w-[49.5%] p-2 rounded  mt-4  bg-main-color text-white">
                <div>
                  <Svg />
                </div>
                <h1 className="mt-2">
                  {item.label === "Total Sales" ? item.amount : item.number}
                </h1>
                <h1 className="mt-1">{item.label}</h1>
                <h1 className="mt-1 text-[14px] text-center font-normal">{item.yesterday}</h1>
              </div>
            );
          })} 
        </div>
        <div className=" w-full md:w-[40%]  h-[350px] mt-4 bg-[#F1E9FE] p-2 rounded-md "> 
            <h1 className="text-[20px] font-medium">Sales</h1> 
             <h1 className="font-normal mt-1">Total Expense</h1> 
              <h1 className="font-medium mt-1  text-[20px]">€6078.99</h1> 
              <h1 className="mt-4">Profit is 48% More than last Month</h1>  
              <div className="flex flex-row mt-4 flex-wrap justify-center items-center ">
              <ReactSpeedometer 
              minValue={0} 
              maxValue={100} 
              
          
  value={84}
  segments={1}
  segmentColors={[
    "#A25EDF",
    
  ]}
  // startColor will be ignored
  // endColor will be ignored
/>
 </div>
          </div>
      </div>
    </div>
  );
}
