import { useRef, useState } from "react";
import NavResturantDriverPartner from "../../ResubleComponents/nav_resturant_driver_partner/nav_resturant_driver_partner";
import { Button } from "primereact/button";
import CarsList from "./components/Car_Data/Car_List";
import { Dialog } from "primereact/dialog";
import Axios  from "axios";
import { Toast } from "primereact/toast";
import DriverStats from "./components/stats/Courier_Stats";
import { Dropdown } from "primereact/dropdown";
export default function Cars(){  
  const [sortBy,setSortBy]=useState(0)
  const CarsData = [
   { 
    drivername:"Alex Hales", 
    driverlastname:"benjamin", 
    img:"", 
     vehicalModel:"Lamburgini", 
     madeYear:"2021", 
     list:"2", 
     registrationNo:"123 ID 01", 
     color:"Black", 
     registrationDate:"12 May 2024", 
     status:true, 
     register:"Yes", 
     noOfSeats:"4"
   } 
  ];  
  let toast=useRef() 
  const [payoutDialogVisibility,setPayoutDialogVisibility]=useState(false)
  const [payoutLoading,setPayoutLoading]=useState(false) 
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken; 
  let  ridePartnerId= JSON.parse(localStorage.getItem("userData"))?.data?.ridePartnerId;
  return (
    <div>
      <div className="p-2  mt-[70px]">
        <DriverStats /> 
        <div className= "flex transform mt-0 md:mt-4 p-2 md:p-0 w-full w-full  flex-row  gap-2 flex-wrap justify-left md:justify-end items-center"> 
              
                  <div className="mt-2 md:mt-0 w-[50%] md:w-[200px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">    
                          <p className="w-[70px] text-[#7E7E7E] ">Sort By:</p>
                     <Dropdown placeholder="Sort By " optionLabel="label" optionValue="value" options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} onChange={(e)=>{ 
                       setSortBy(e.value)
                        
                      }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-70px)] rounded-md md:rounded-2xl   "/>
                    </div>
             </div>
         <div className="flex flex-wrap   justify-left items-center mt-4 flex row ">
        <NavResturantDriverPartner identifier="car"/>     
      
         
        </div>      
    
           
        <CarsList sortBy={sortBy} carsData={CarsData}/>
      </div> 
       <Dialog  header="Payout Confirmation" headerClassName="font-poppins text-main-color" visible={payoutDialogVisibility} onHide={()=>{ 
           setPayoutDialogVisibility(prev=>!prev)
       }} >   
         <p className="text-main-color font-poppins">Do You Want To Request For Payout</p> 
           <div className="mt-4 flex font-poppins flex-wrap flex-row justify-evenly"> 
               <Button onClick={()=>{ 
                setPayoutLoading(prev=>!prev)
                  Axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/Create`,
                    {ridePartnerId:ridePartnerId},
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                    .then((res) => {  
                      
                setPayoutLoading(prev=>!prev)
                setPayoutDialogVisibility(prev=>!prev)
                      toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: (
                          <p className="font-poppins">
                            {res?.data?.message
                              ? res?.data?.message
                              : "Payout Request Submited Successfully"}
                          </p>
                        ),
                      })}).catch(err=>{  
                        
                setPayoutLoading(prev=>!prev)
                        toast.current.show({
                          severity: "error",
                          summary: "Info",
                          detail: (
                            <p className="font-poppins">
                              {err?.data?.message
                                ? err?.data?.message
                                : "Payout Request Submission Failed"}
                            </p>
                          ),
                      })  
                    })
               }} loading={payoutLoading} disabled={payoutLoading} label="Yes" className="text-white bg-main-color p-1 pl-2 pr-2" /> 
               
               <Button label="No" className="text-white font-poppins bg-main-color p-1 pl-2 pr-2" />
           </div>
        </Dialog>  
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "    ref={toast}/>
    </div>
  );
};

