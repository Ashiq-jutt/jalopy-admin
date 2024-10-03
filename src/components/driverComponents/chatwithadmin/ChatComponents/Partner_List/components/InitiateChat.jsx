import React from "react"
import { InputText } from "primereact/inputtext";
import { useState } from "react"
import { Button } from "primereact/button"
import  Axios  from "axios";


export default function InitateChat({user,toast,token}){   
    const [loader,setLoader]=useState(false)
    const [message,setMessage]=useState()
    function initatechat(){  
     setLoader(true)
     Axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/V1/Message/SendFirst`,{ 
               userId:user.id, 
               message:message
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {  
               setLoader(false)
            
            toast.current.show({
              severity: "success",
              summary: "Info",
              detail: (
                <p className="font-poppins text-main-color">
                  {res?.data?.message
                    ? res?.data?.message
                    : "Chat Initiated Successfully"}
                </p>
              ),
            })}).catch(error=>{  
               setLoader(false)
              toast.current.show({
                severity: "error",
                summary: "Info",
                detail: (
                  <p className="font-poppins">
                    {error?.response?.data?.message
                      ? error?.response?.data?.message
                      : "Chat Initiation Failed"}
                  </p>
                ),
              });
    } )
}
    return( 
         <div className="font-poppins"> 
            <h1 className="w-full text-main-color font-medium ">Enter Message</h1> 
             <InputText className="mt-2 w-full border border-main-color opacity-[0.8] p-1" value={message}  onChange={(e)=>{ 
                setMessage(e.target.value)}} /> 
               
              <Button loading={loader} disabled={loader} onClick={()=>{ 
   initatechat()
              }}  label="Initate Chat" className="mt-2 p-1 pl-2 pr-2 bg-main-color text-white"/>
         </div>
    )
}