import React, { useRef, useState } from "react"   
import { InputText } from "primereact/inputtext"; 
import Axios from "axios" 
import {Button} from "primereact/button"
import { Toast } from "primereact/toast";
export default function ProvideReason({selectedRide,token}){  
     const [loader,setLoader]=useState()  
     let toast=useRef()
     const [reason,setReason]=useState("")
     return (
      <div> 
         <div className="w-full font-poppins"> 
            <label className="text-main-color"> 
                Reason
            </label>  
            <InputText className="w-full mt-2 border border-main-color p-1" value={reason} onChange={(e)=>{ 
               setReason(e.target.value)
            }}/>
               <Button onClick={()=>{ 
                  setLoader(true)  
                  Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/RidePartnerDashboard/RideRejectionReason`,{ 
                     id:selectedRide?.id, 
                     reason:reason,
                  }, {
                     headers: { 'Authorization': `Bearer ${token}` }
                   }).then((res) => { 
                  
                     toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message : "Cancelled Reason Added Successfully "}</p> });  
                        setLoader(false)
                  
                     }).catch(err=>{ 
                        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message : "Cancelled Reason Addition Failed "}</p> });   
                        setLoader(false)
                     })
                   
               }} loading={loader} disabled={loader} className="mt-2 bg-main-color text-white p-1 pl-2 pr-2 " label="Submit"/>
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
     )
}