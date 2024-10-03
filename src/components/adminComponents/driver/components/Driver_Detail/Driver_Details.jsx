import { Button } from "primereact/button"; 
import { useState } from "react";
//import EditDriverDetail from "./components/Edit_Resturents_Detail/Edit_RidePartner_Details";
import EditDriverDetail from "./components/Edit_Driver_Detail/Edit_Driver_Details";
import CarDetails from "./components/details/car_details";
import DriverDetailsPage from "./components/details/driver_details";
import EditCarDetail from "./components/Edit_Car_Details/Edit_Car_Details";
import AddedDriver from "./components/Added_Driver/Added_Driver";
export default function DriverDetails({
  driverDetailView,
  setShowResturantDetail,
}) {           
  
  const [showDriverDetail,setShowDriverDetail]=useState(true)  
  const [showCarDetails,setShowCarDetail]=useState(false)   
  
  const [showAddedDriver,setShowAddedDriver]=useState(false)  
   const [showEditCarDetails,setShowEditCarDetails]=useState(false)
  const [showEditDriverDetail,setShowEditDriverDetails]=useState(false)
  return (   
    <div className="text-main-color mt-[70px] overflow-y-auto fixed ml-[-20px] w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]  h-[calc(100vh-70px)]  z-20 bg-white p-4 font-poppins fixed top-[0px]">
        
        <div className="flex flex-wrap  flex-row justify-end">  
         <span className="fixed cursor-pointer pi pi-times" onClick={()=>{ 
             setShowResturantDetail(prev=>!prev)
         }}></span>
        </div>     
        <div className="flex mt-4 flex-wrap flex-row justify-left">    
           <Button className={`border border-main-color pl-2 pr-2  rounded ${showDriverDetail ? "bg-main-color text-white":""}`}  onClick={()=>{ 
             setShowCarDetail(false)    
             setShowEditDriverDetails(false)  
             setShowDriverDetail(true)  
             setShowEditCarDetails(false)   
             setShowAddedDriver(false)    
           }}>Driver Details</Button>  
           <Button className={`ml-5 border border-main-color pl-2 pr-2  rounded ${showCarDetails ? "bg-main-color text-white":""}`}   onClick={()=>{ 
              setShowCarDetail(true)    
              setShowEditDriverDetails(false)  
              setShowDriverDetail(false) 
              
             setShowEditCarDetails(false)  
             setShowAddedDriver(false) 
           }}>Car Details</Button>   
               <Button className={`ml-5 border border-main-color pl-2 pr-2  rounded ${showEditDriverDetail ? "bg-main-color text-white":""}`}   onClick={()=>{ 
                setShowCarDetail(false)    
                setShowEditDriverDetails(true)  
                setShowDriverDetail(false) 
                setShowAddedDriver(false) 
             setShowEditCarDetails(false) 
           }}>Edit Driver Detail</Button>  
            <Button className={`ml-5 border border-main-color pl-2 pr-2  rounded ${showEditCarDetails ? "bg-main-color text-white":""}`}   onClick={()=>{ 
                setShowCarDetail(false)    
                setShowEditDriverDetails(false)  
                setShowDriverDetail(false) 
                setShowAddedDriver(false) 
             setShowEditCarDetails(true) 
           }}>Edit Car Detail</Button> 
           
           <Button className={`ml-5 border border-main-color pl-2 pr-2  rounded ${showAddedDriver ? "bg-main-color text-white":""}`}   onClick={()=>{ 
                setShowCarDetail(false)    
                setShowEditDriverDetails(false)  
                setShowDriverDetail(false) 
                setShowAddedDriver(true) 
             setShowEditCarDetails(false) 
           }}>Added Driver</Button> 
           </div>
       <>   
           {showDriverDetail ? 
           <DriverDetailsPage driverDetailView={driverDetailView} /> :showCarDetails ? <CarDetails driverDetailView={driverDetailView}/>:showEditDriverDetail ? <EditDriverDetail driverDetailView={driverDetailView}/>:showEditCarDetails ? <EditCarDetail carDetailView={driverDetailView}/>:<AddedDriver/>
}  
          
       </>               
      
    
    </div>
  );
}
