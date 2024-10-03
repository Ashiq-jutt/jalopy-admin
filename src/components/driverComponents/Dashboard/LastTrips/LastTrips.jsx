import { useEffect, useState } from "react";
import { Car,Map } from "./assets/Svg"; 
import Axios from "axios"
import CommonLoaderBlue from "../../../Common/Components/Loader/LoaderBlue";
export default function LastTrips({toast}){  
     const [TripsData,setTripsData]=useState([{
    start:"08:55 PM New Jerersy stree 1",  

    end:"09:55 PM New Jerersy stree 10", 
    carname:"Sedan",  
    svgcar:Car, 
    svgkms:Map, 
    tagged:"Business",
    km:"5km"
     },{
        start:"08:55 PM New Jerersy stree 1",  
         tagged:"Untagged",
        end:"09:55 PM New Jerersy stree 10", 
        carname:"Sedan",  
        svgcar:Car, 
        svgkms:Map,
        km:"5km"
     },{
        start:"08:55 PM New Jerersy stree 1",  
      tagged:"Private",
        end:"09:55 PM New Jerersy stree 10", 
        carname:"Sedan",  
        svgcar:Car, 
        svgkms:Map,
        km:"5km"
     }])  
     let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken  
     const [loader,setLoader]=useState(true)
    useEffect(()=>{ 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/RidePartnerDashboard/Dashboard`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Last Trip Data Fetched Successfully"}</p> });   
         setTripsData(res?.data?.data?.lastTrips)
        setLoader(false) 

      }).catch(err=>{ 
         toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins ">{err?.response?.data?.message ? err?.response?.data?.message :"Last Trip Data Fetching Failed"}</p> }); 
      })},[])
    return(  
         <div className="font-poppins overflow-y-auto h-auto md:h-[540px] text-main-color bg-[#F8F5FE] p-4 mt-4 rounded-md"> {  
            loader ? <div className="w-full h-full flex flex flex-wrap flex-row justify-center items-center"><CommonLoaderBlue/></div> :  
             <>
           <h1 className="font-[600] tracking-wide">Last Trips</h1>   
           <div className="mt-2">
           <hr className="bg-main-color border-main-color text-main-color"/>   
         
           </div>  
            { 
             TripsData.map(item=>{  
                let CarSvg=Car; 
                let KmSvg=Map;
                return( 
                    <div className="flex flex-wrap mt-2 text-main-color items-center flex-row justify-between w-full"> 
                              {/*    <div className="flex w-full mt-[-4px] flex-wrap flex-row justify-end">
        <h1 className={`${item.tagged !== "Untagged" ?"bg-main-color text-white":"text-[#EF004C] border border-[#EF004C]"} text-center  p-1 pl-2 w-[90px] pr-2 rounded-b-md`}>{item.tagged}</h1>
           </div>   */}
                              <p className="w-full md:w-[calc(100%-200px)]"><i className="pi pi-stop-circle mr-2 "/>{item.fromLocation}</p>  
                               <div className="hidden md:flex text-main-color flex-wrap items-center justify-between flex-row w-[200px]"> 
                                  <CarSvg/>
                               <p className="text-[#D3D3D3]">{item.vehicleName}</p>  
                                </div>   
                                
                                <div className="h-[20px] md:h-[40px] border-dashed border-l-[2px] ml-[8px] w-full  "></div>
                                 <div className="flex mt-1 flex-wrap  text-main-color items-center flex-row justify-between w-full">  
                                 <p><i className="pi pi-map-marker mr-2"/><span>{item.toLocation} 
                                     </span></p>  
                                 <div className=" mt-2 mb-2 flex md:hidden text-main-color flex-wrap items-center justify-between flex-row w-[200px]"> 
                                  <CarSvg/>
                               <p className="text-[#D3D3D3]">{item.vehicleName}</p>  
                                </div>
                               <div className="flex text-main-color flex-wrap items-center justify-between flex-row w-[100px]"> 
                                  <KmSvg/>
                               <p className="text-[#D3D3D3]" >{item.distance}</p>  
                                </div> 
                                   </div>
                          
           <hr className="bg-main-color w-full mt-4 border-main-color text-main-color"/>   
                    </div>
                )
             })
             }
              {/*  <div>
                   <h1 className="text-right mr-[30px] mt-4"><span className="mr-2">See All Trips</span> <i className="pi absolute mt-[6px] pi-angle-right"></i></h1>
             </div>       */}
              </>
              
}      
         </div>
    )
}