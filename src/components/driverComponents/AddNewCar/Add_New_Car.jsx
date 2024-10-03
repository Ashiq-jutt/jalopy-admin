import {useEffect, useState,useRef} from "react";
import Axios from "axios"; 
import { Toast } from "primereact/toast";
import CarsList from "./components/Car_Data/Car_List";
const AddNewCarDriver = () => {    
     const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [CarsData,setCarsData]=useState([]) 
   const [refreshList,setRefreshList]=useState(false)   
   const [search,setSearch]=useState("") 
   const [sortBy,setSortBy]=useState(1)   
    const [renderFirst,setRenderFirst]=useState(false)
  const [loader,setLoader]=useState(true)
  useEffect(()=>{   
       
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/List?version=1`,{params:{ Search:search,SortBy:sortBy},headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{  
      if(!renderFirst){
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Fetched Drivers List"}</p> });  
      setRenderFirst(true)
      } 
    
         setCarsData(res?.data?.data) 
         setLoader(false)
    }).catch((error)=>{   
       if(!renderFirst){ 
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Driver List Fetching Failed"}</p> }); 
       setRenderFirst(true)   
    }
      
    })   

  },[refreshList]) 
  useEffect(()=>{   
       
    Axios.get(`${process.env.REACT_APP_BASE_URL}//api/v1/Drivers/List?version=1`,{params:{ Search:search,SortBy:sortBy},headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
       setCarsData(res?.data?.data) 
         setLoader(false)
    }).catch((error)=>{   
     
    })   

  },[search,sortBy])
  return (
    <div>
      <div className="mt-[70px]">
       {/* <DriverStats /> */}     
           
           
       
        <CarsList search={search} setSearch={setSearch} setSortBy={setSortBy} sortBy={sortBy} setRefreshList={setRefreshList} carsData={CarsData} loader={loader}/>
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

export default AddNewCarDriver;