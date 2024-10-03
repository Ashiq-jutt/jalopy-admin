import {useEffect, useState,useRef} from "react";
import Axios from "axios"; 
import { Toast } from "primereact/toast";
import AssignCarsList from "./components/Car_Data/Car_List";
const AssignVehicle = ({driverDetail,setShowAssignVehicle}) => {    
     const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [CarsData,setCarsData]=useState([]) 
   
  const [loader,setLoader]=useState(true)
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/List`,{headers:{'Authorization':`Bearer ${token}`},params:{IncludeAll:true}}).then((res)=>{ 
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Fetched Car List"}</p> });
         setCarsData(res?.data?.data) 
         setLoader(false)
    }).catch((error)=>{   
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Car List Data Fetching Failed"}</p> });
      
    })
  },[])
  return (
    <div className="w-full">
      <div className="w-full">
       {/* <DriverStats /> */}     
           
           
       
        <AssignCarsList driverDetail={driverDetail} carsData={CarsData} loader={loader}/>
      </div> 
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
    </div>
  );
};

export default AssignVehicle;
