import {useEffect, useRef, useState} from "react";
//import ResturantStats from "./components/stats/Resturant_Stats"; 
import ResturantStats from "./components/stats/RidePartner_Stats"
//import ListResturants from "./components/Resturant_Data/Resturant_List"; 
import ListResturants from "./components/RidePartner_Data/RidePartner_List" 
import  Axios  from "axios"; 
import NavResturantDriverPartner from "../../ResubleComponents/nav_resturant_driver_partner/nav_resturant_driver_partner";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
const Driver = () => {  
  const [loader,setLoader]=useState(true)
  const toast=useRef()    
  const [ridePartner,setridePartner]=useState([]) 
  const [renderFirst, setRenderFirst] = useState(true) 
  
  const [sortBy,setSortBy]=useState(1)
  const [refresh,setRefresh]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{  
   
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/ApprovedList`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res=>{  
      setLoader(false)
    setridePartner(res?.data?.data)  
     if(renderFirst){
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Ride Partners Data Successfully Fetched"}
        </p>
      ),
    });  
    setRenderFirst(false)
  }
    }).catch(error=>{ 
      setLoader(false) 
      if(renderFirst){
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: (
          <p className="font-poppins">
            {error?.response?.data?.Message
              ? error?.response?.data?.Message
              : "Ride Partners Data Fetching Failed"}
          </p>
        ),
      }); 
      setRenderFirst(fale) 
    }
    })
   },[refresh,sortBy])  
  return (
    <div>
      <div className="p-2 mt-[70px]">
        <ResturantStats />   
        <div className= "flex transform mt-0 md:mt-4 p-2 md:p-0 w-full w-full  flex-row  gap-2 flex-wrap justify-left md:justify-end items-center"> 
              
              <div className="mt-2 md:mt-0 w-[50%] md:w-[200px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">    
                      <p className="w-[70px] text-[#7E7E7E] ">Sort By:</p>
                 <Dropdown placeholder="Sort By " optionLabel="label" optionValue="value" options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} onChange={(e)=>{ 
                   setSortBy(e.value)
                    
                  }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-70px)] rounded-md md:rounded-2xl   "/>
                </div>
         </div>
         <div className="flex flex-wrap justify-left  items-center mt-4 flex row ">
        <NavResturantDriverPartner identifier="ridepartner"/>  
         
        </div>
        <ListResturants loader={loader}  setRefresh={setRefresh} ridePartner={ridePartner}/>
      </div> 
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
};

export default Driver;
