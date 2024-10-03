import { Button } from "primereact/button";
import moment from "moment"; 
import Axios from "axios";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
export default function CampaignDetails({token,setRefresh,data,setDetailView}){     
  
       
    const [updateStatusDialog,setUpdateStatusDialog]=useState(false)  
    const [updateStatusLoader,setUpdateStatusLoader]=useState(false)
        const [status,setstatus]=useState(data?.status) 
       let toast=useRef()
     return( 
              <div className="pt-4   font-poppins overflow-y-auto fixed bg-white w-[100%] lg:w-[calc(100%-320px)] h-[calc(100%-70px)] top-[70px] z-30 text-main-color">   
                   <Button label="Back" className="bg-main-color text-white p-2 pr-3 pl-3 " onClick={()=>{   
                    setRefresh(prev=>!prev)
                     setDetailView(false)
                   }} />
                     <h1 className="font-medium  text-[21px] mt-4 ">Campaign Details</h1> 
                      <h1 className="font-semibold mt-4 t ">Campaign Type</h1> 
                      <h1 className="mt-2">{data?.compaignType}</h1> 
                      <h1  className="font-semibold mt-4 ">ID</h1> 
                      <h1 className="mt-2">{data?.id}</h1> 
                      <h1 className="font-semibold mt-4 ">Start Date</h1> 
                      <h1 className="mt-2"> {moment().utc(data?.startData).format("DD MMMM YYYY ")}</h1> 
                      <h1 className="font-semibold mt-4 ">End Date</h1> 
                      <h1 className="mt-2">{moment().utc(data?.endData).format("DD MMMM YYYY ")}</h1> 
                    
                      <h1 className="font-semibold mt-4 ">Resturant Name</h1> 
                      <h1 className="mt-2">{data?.resturantName}</h1>  
                      <h1 className="font-semibold mt-4 ">Amount</h1> 
                      <h1 className="mt-2">{data?.amount}</h1> 
                       <div className="flex flex-wrap flex-row justify-center"> 
                         <Button disabled={status === 2} label="Reject" 
                            onClick={()=>{   
                             setUpdateStatusDialog(true)  
                            }}
                           className="border border-main-color mr-5 p-1 pr-3 pl-3 " />  
                          <Button 
                            onClick={()=>{   
                              setUpdateStatusDialog(true)  
                             }}
                           disabled={status === 1} label="Approved" className="bg-main-color  border border-main-color p-1 pr-3 pl-3 ml-5 text-white"/>
                       </div>      
                       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto  
    mt-[70px]
    md:transform-none
  " ref={toast} />
    <Dialog
          headerClassName="font-poppins text-main-color font-medium"
          header="Confirmation"
          onHide={() => {
            setUpdateStatusDialog(false);
          }}
          visible={updateStatusDialog}
        >   
    
          <div className="font-poppins text-medium text-[#AFAFAF]">
          
            <div className="flex flex-wrap flex-row justify-around">
              <h1 className="text-main-color">Are You Sure You Want To {status === 1 ? "Reject": status === 0 || status === 2 ? "Approve" :""} the Campaign? </h1>
            </div>
            <div className="flex flex-wrap mt-4  flex-row justify-around">
              <Button 
               loading={updateStatusLoader} 
               disabled={updateStatusLoader}
                label="Yes"
                onClick={() => {   
                  setUpdateStatusLoader(true)
                  Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/Status`,{id:data?.id,status:status === 1 ? 2 : status === 0 || status === 2 ? 1 :""}, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(()=>{   
                  toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Campaign {status === 1 ? "Rejected": status === 0 || status === 2 ? "Approved" :""} Successfully</h1> });
       
              setUpdateStatusLoader(prev=>!prev) 
              setUpdateStatusLoader(false)
               setUpdateStatusDialog(prev=>!prev)  
                setstatus(status === 1 ? 2 : status === 0 || status === 2 ? 1 :"")
                  }).catch(err=>{ 
                    toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Campaign {status === 1 ? "Rejection": status === 0 || status === 2 ? "Approval" :""} Failed</h1> });
         
               setUpdateStatusLoader(false)
                  }) 
                }}
                className=" text-white bg-main-color pl-2 pr-2 "
              />
              <Button
                label="No"
                onClick={() => {
                  setUpdateStatusDialog(false);
                }}
                className="text-white bg-main-color pl-3 pr-3 "
              />
            </div>
          </div>  
        </Dialog>  
               </div>
     )
}