import React, { useEffect, useRef, useState }  from "react"; 
import { Car,Map } from "./assets/Svg";    
import {Dropdown} from "primereact/dropdown"  
import moment from "moment/moment";
import Axios from "axios"  
import { Toast } from "primereact/toast"; 
import {Dialog} from "primereact/dialog"
import CommonLoaderBlue from "../../Common/Components/Loader/LoaderBlue";
import ProvideReason from "./dialogs/ProvideReasn";
export default function DriverRides(){    
  function formatDateTimeInUTC(isoDate) {
    const inputDate = moment.utc(isoDate); // Parse the date in UTC
    const currentDate = moment.utc();      // Get the current date in UTC
  
    // Check if the input date is the same as the current date (UTC), comparing only the day
    if (inputDate.isSame(currentDate, 'day')) {
      // If the date is today, return the time in UTC
      return inputDate.format('HH:mm');
    } else {
      // If the date is not today, return the date and time in the specified format (UTC)
      return inputDate.format('DD-MM-YYYY [at] HH:mm');
    }
  }
   const [reasonDialogVisibility,setReasonDialogVisibility]=useState(false)
     const [TripsData,setTripsData]=useState([{
    start:"08:55 PM New Jerersy stree 1",  
    tagged:"Accepted",
    end:"09:55 PM New Jerersy stree 10", 
    carname:"Sedan",  
    svgcar:Car, 
    svgkms:Map, 
    tagged:"Accepted",
    km:"5km"
     },{
        start:"08:55 PM New Jerersy stree 1",  
         tagged:"Not Accepted",
        end:"09:55 PM New Jerersy stree 10", 
        carname:"Sedan",  
        svgcar:Car, 
        svgkms:Map,
        km:"5km"
     },{
        start:"08:55 PM New Jerersy stree 1",  
      tagged:"Accepted",
        end:"09:55 PM New Jerersy stree 10", 
        carname:"Sedan",  
        svgcar:Car, 
        svgkms:Map,
        km:"5km"
     }] )
     const [chartData, setChartData] = useState(null); // Initialize as null 
     let toast=useRef()
     let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken;
     const [loader, setLoader] = useState(true); 
     const [selectedRide,setSelectedRide]=useState()
     const [firstrender,setFirstRender]=useState(false) 
     const [filter,setFilter]=useState("3")    
     const [refreshList,setRefreshList]=useState(false)
     useEffect(() => {
       Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/RidePartnerDashboard/RidesGraph`, {
         params: { TimeUnit: filter },
         headers: { 'Authorization': `Bearer ${token}` }
       }).then((res) => { 
         if(!firstrender){  
         toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message : "Rides Trip Successfully Fetched"}</p> });
       setFirstRender(true)
       } 
         setLoader(false); 
   
  setTripsData(res?.data?.data)
       }).catch((error) => { 
         if(!firstrender){
         toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins ">{error?.response?.data?.message ? error?.response?.data?.message : "Rides Trip Fetching Failed"}</p> }); 
         setFirstRender(true)  
       }
       });
     }, [filter,refreshList]);
    return(  <div className=" w-[100%]  "> 
         <div className="flex font-poppins flex-wrap flex-row justify-between ">
             <h1 className="text-main-color font-semibold tracking-wide ">Fulfilled Orders</h1>  
             <div>   
        <Dropdown value={filter} onChange={(e)=>{ 
          setFilter(e.value)
        }} placeholder='filter'  optionLabel='label' optionValue='value' className='w-[150px] md:w-[200px] text-main-color border border-[#EEEEEE] rounded-md bg-[#FBF8FF]' options={[{label:"Week",value:"1"},{label:"Month",value:"2"},{label:"Year",value:"3"}]}/>
        </div>  
            </div>
         <div className="font-poppins shadow-md text-main-color h-[calc(100vh-320px)] overflow-y-auto p-2  md:p-8 mt-4 rounded-lg"> 
           <h1 className="font-semibold tracking-wide">Trips Overview</h1>   
           
            {   
             loader ? <div className="flex flex-wrap flex-row justify-center items-center w-full  
              mt-8
             "><CommonLoaderBlue/></div> :  
              TripsData?.length === 0 ? <h1 className="w-full text-center font-medium mt-8 mb-8 tracking-wide">No Trip Found</h1> :
             TripsData.map(item=>{  
                let CarSvg=Car; 
                let KmSvg=Map
                return( 
                    <div className="   rounded-md flex flex-wrap  text-main-color items-center flex-row p-2 pt-0 md:p-0 justify-between w-full">   
                      <div className="flex flex-wrap w-full mt-2 flex-row items-center justify-between ">
           <hr className="bg-main-color mr-2  w-[calc(100%-240px)] md:w-[calc(100%-350px)]  border-main-color text-main-color"/>   
           <h1 className={`${item.status == "Completed" ?"bg-main-color text-white":"text-[#EF004C] border border-[#EF004C]"} text-center   md:w-[150px] p-1 pl-2  pr-2 rounded-b-md`}>{item.status}</h1>
           <h1 className={`${item.statusId !== 6 ?" text-[#2EDB12]":"text-main-color"} md:text-center  mt-2 mb-2 md:mb-0 md:mt-0 md:w-[150px] p-1 pl-2  pr-2 rounded-b-md`}>{item?.statusId !== 6 ? "Earn One Point" : "Minus One Point"}</h1>
           { item.statusId === 6 ?<h1 onClick={()=>{  
            setSelectedRide(item)
            setReasonDialogVisibility(true) 
           }} className="w-full flex flex-wrap flex-row justify-end items-center mb-2 md:mb-0  "><span>Provide Reason</span> <i className="pi pi-angle-right mt-[3px]"></i></h1>:undefined 
             }
            </div>
                              <p className="md:w-[50%]"><i className="pi pi-stop-circle mr-2"/><span className="text-[12px]">{formatDateTimeInUTC(item?.createdAt)}</span>&nbsp;{item.fromLocation}</p>  
                               <div className="flex hidden md:flex md:w-[40%] text-main-color flex-wrap items-center justify-between flex-row w-[px]"> 
                                   <div className="w-[40px]">
                                  <CarSvg/> 
                                   </div>
                               <p className=" w-[calc(100%-40px)] text-[#D3D3D3]">{item.vehicleName}</p>  
                                </div>   
                                
                                <div className="h-[10px] md:h-[40px] border-dashed border-l-[2px] ml-[8px] w-full  "></div>
                                 <div className="flex  mt-1 flex-wrap  text-main-color items-center flex-row justify-between w-full">  
                                 <p><i className="pi pi-map-marker mr-2"/><span className="text-[12px]">{formatDateTimeInUTC(item?.createdAt)}</span>&nbsp;{item.toLocation}</p>  
                                 <div className="flex md:hidden md:flex w-full mt-2 md:w-[40%] text-main-color flex-wrap items-center justify-between flex-row w-[px]"> 
                                   <div className="w-[40px]">
                                  <CarSvg/> 
                                   </div>
                               <p className=" w-[calc(100%-40px)] text-[#D3D3D3]">{item.vehicleName}</p>  
                                </div> 
                               <div className=" mt-3 md:mt-0 flex text-main-color flex-wrap items-center gap-4 justify-left flex-row w-[100px] md:w-[40%]"> 
                                  <KmSvg/>
                               <p className="text-[#D3D3D3]" >{item.distance}</p>  
                                </div> 
                                   </div>
                          
                    </div>
                )
             })
             }   
             {/*
                <div>
                   

                   <h1 className="text-right mr-[30px] mt-4"><span className="mr-2">See All Overviews</span> <i className="pi absolute mt-[6px] pi-angle-right"></i></h1>  
             </div> 
             */}
         </div>     
          
          <h1 className="text-red-500 p-4 pt-8 pb-8 mt-4 w-[100%] border border-main-color rounded-2xl md:w-[400px]"> 
          Trips that are not accepted are rated with 1 minus point and accepted trips are rated with 1 plus point!
             </h1> 
          <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "
ref={toast}/>  
 <Dialog  header="Cancelled Ride Reason" headerClassName="font-poppins text-main-color font-[400] text-[12px]" visible={reasonDialogVisibility} onHide={()=>{ 
  setReasonDialogVisibility(false) 
   setRefreshList(prev=>!prev)
 }}> 
<ProvideReason selectedRide={selectedRide} token={token}/>
 </Dialog>
         </div>
    )
}