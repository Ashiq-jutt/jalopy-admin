import { Button } from "primereact/button"; 
import { useState } from "react";
//import EditDriverDetail from "./components/Edit_Resturents_Detail/Edit_RidePartner_Details";
//import EditDriverDetail from "./components/Edit_Driver_Detail/Edit_Courier_Details";
//import CarDetails from "./components/details/car_details";
import DriverDetailsPage from "./components/details/driver_details";
export default function DriverDetails({
  driverDetailView,
  setShowResturantDetail,
}) {           
  
  const [showDriverDetail,setShowDriverDetail]=useState(true)  
  const [showCarDetails,setShowCarDetail]=useState(false)
  return (   
    <div className="text-main-color overflow-y-auto fixed ml-[-20px] w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]  h-[calc(100vh)]  z-20 bg-white p-4 font-poppins fixed top-[0px]">
        
        <div className="flex flex-wrap  flex-row justify-end">  
         <span className="fixed cursor-pointer pi pi-times" onClick={()=>{ 
             setShowResturantDetail(prev=>!prev)
         }}></span>
        </div>     
        <div className="flex mt-4 flex-wrap flex-row justify-left">    
           <Button className={`border border-main-color pl-2 pr-2  rounded ${showDriverDetail ? "bg-main-color text-white":""}`}  onClick={()=>{ 
             setShowCarDetail(prev=>!prev)     
             setShowDriverDetail(prev=>!prev) 
           }}>Car Details</Button>  
           <Button className={`ml-5 border border-main-color pl-2 pr-2  rounded ${showCarDetails ? "bg-main-color text-white":""}`}   onClick={()=>{ 
             setShowCarDetail(prev=>!prev)     
             setShowDriverDetail(prev=>!prev) 
           }}>Driver Details</Button>  
           
           <Button className="ml-5 border border-main-color pl-2 pr-2  rounded">Added Driver</Button>
          </div>
       <>   
           {showDriverDetail ? 
           <DriverDetailsPage driverDetailView={driverDetailView} /> :showCarDetails ? <CarDetails driverDetailView={driverDetailView}/>:undefined
}  
          
       </>               
      
    
    </div>
  );
}
