import {useEffect, useState,useRef} from "react";
import Axios from "axios"; 
import { Toast } from "primereact/toast"; 
import { Button } from "primereact/button";
import CarsList from "./components/Car_Data/Car_List";  

import { Dialog } from "primereact/dialog";
import AddCar from "./components/Add_Car/Edit_Car_Detail/AddCar";
const AssignVehicle = ({driverDetail}) => {    
     const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [CarsData,setCarsData]=useState([]) 
   const [showAddCar,setShowAddCar]=useState(false)
  const [loader,setLoader]=useState(true) 
  const [refresh,setRefreshList]=useState(false) 
  const [renderFirst,setRenderFirst]=useState(false)
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}//api/v1/Vehicles/List?version=1`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
       if(!renderFirst){
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Fetched Car List"}</p> }); 
      setRenderFirst(true)   
    }
         setCarsData(res?.data?.data) 
         setLoader(false)
    }).catch((error)=>{    
      if(!renderFirst){
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Car List Data Fetching Failed"}</p> }); 
      setRenderFirst(true)  
    }
      
    })
  },[refresh])
  return (
    <div> 
         <div className="w-full flex flex-wrap flex-row font-poppins justify-end gap-4">    
            
               <Button iconPos="left" onClick={()=>{ 
                      setShowAddCar(prev=>!prev)
               }}  icon="pi pi-plus" label="Add Car"  className="mt-2 w-full md:w-[190px] border p-1 text-main-color rounded-2xl  pr-[40px] pl-[40px] border-main-color"></Button>   
               </div>
      <div>
       {/* <DriverStats /> */}     
           
           
       
        <CarsList driverDetail={driverDetail} carsData={CarsData} loader={loader}/>
      </div> 
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
   <Dialog header="Add New Car" headerClassName="text-main-color" className="w-[99%] md:w-[90%]" visible={showAddCar} onHide={()=>{ 
      setShowAddCar(prev=>!prev)   
      setRefreshList(prev=>!prev)
    }}> 
       <AddCar/>
    </Dialog> 
    </div>
    
  );
};

export default AssignVehicle;
