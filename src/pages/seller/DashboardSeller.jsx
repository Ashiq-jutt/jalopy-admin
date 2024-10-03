import { OrderTimingChart } from "../../components/sellerComponents/dashbord/orderTimingChart/OrderTimingChart";
import TrendingOrder from "../../components/sellerComponents/dashbord/TrendingOrder";
import SellerStats from "../../components/sellerComponents/dashbord/stats/Dashboard_Stats";
import RevenueChart from "../../components/sellerComponents/dashbord/RevenueChart/SellerRevenueChart";
import CustomerReviews from "../../components/sellerComponents/dashbord/customerreviews/CustomerReviews";
import RecentlyPlacedOrder from "../../components/sellerComponents/dashbord/RecentlyPlacedOrder/RecentOrderRequest";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const DashboardSeller = () => { 
   let toast=useRef()
  return ( 
    <div className="card mt-[90px] md:pl-6 md:pr-6 pl-2 pr-2 overflow-hidden "> 
        <SellerStats toast={toast}/>       
         <div className="w-full    text-main-color flex flex-wrap flex-row gap-1 justify-center md:justify-between">   
          <div className="w-[99%] mt-2  md:w-[49.5%]  "> 
          
          <RevenueChart toast={toast}/>  
           </div>  
           <div className="w-[99%] mt-2  md:w-[49.5%]  "> 
          
          <OrderTimingChart toast={toast}/>  
           </div>       
          
           <div className="w-[99%] mt-2   "> 
          
          <CustomerReviews  toast={toast}/>  
           </div> 
           </div>
 
      
      <div className="flex justify-left gap-1  flex-row  flex-wrap mt-4">    

         <h1 className="w-full font-[700] tracking-wide  font-Inter  text-main-color ml-1 font-medium text-[20px] mt-4 mb-4 ">Trending Orders</h1>
         
         <div className="w-full flex pr-[80px] flex-wrap flex-row justify-around gap-20">
          <TrendingOrder toast={toast} /> 
           </div>
        
      </div>  
       <div className=""> 
        
       <RecentlyPlacedOrder toast={toast}/> 
        </div> 
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "
ref={toast}/> 
    </div>
  );
};

export default DashboardSeller;
