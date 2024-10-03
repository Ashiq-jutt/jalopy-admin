import { useRef, useState } from "react"; 
import { InputText } from "primereact/inputtext"; 
import { InputTextarea } from 'primereact/inputtextarea'; 
import { useFormik } from "formik";  
import Axios  from "axios";
import * as Yup from "yup"
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import SupportTicketDetail from "../Support_Tickets/component/Support_TicketDetails";
import SupportTickets from "../Support_Tickets/Support_Tickets";
import { Forward } from "../../../adminComponents/Requests/components/Support_Tickets/component/assets";
export default function Chat_Support({accountactive}){   
  const [loader,setLoader]=useState(false)
  const [showSupport,setShowSupport]=useState(false)  
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken       
  const toast=useRef() 
   const formik=useFormik({ 
    initialValues:{ 
      subject:"", 
      message:""
    }, 
    validationSchema:Yup.object().shape({
      subject: Yup.string().required("Subject Is Required"),
      message: Yup.string().required("Message Is Required"),   
    })  ,onSubmit:(values,{resetForm})=>{  
       setLoader(true)
      Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/SupportTickets/Create`,values,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message :"Support Ticket Created Sucessfully"}</p> });
       resetForm()     
        setLoader(false) 

      }).catch((error)=>{           
        
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{error?.response?.data?.message ? error?.response?.data?.message :"Support Ticket Creation Failed"}</p> });
        setLoader(false)
      
    })
    }
   })
    const connectionmessage=[{ 
        name:"Ahmad",  
        
        img:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", 
        latestmessage:"Hello",  
         messagefrome:["Hello","How Are You"], 
          messagefromother:["Fine","How Are You ","hey about you","how are going your day"], 
        latestago:"12m"  
     }]
     return(        
       
       
       

     <div className="w-full flex flex-wrap flex-wrap justify-center   md:justify-between">    
       
     
        <div className="w-full relative overflow-y-auto mt-2 rounded-2xl border border-[#EEEEEE] p-4"> 
       
         {  showSupport ?<>  
          <div className="w-full flex flex-wrap flex-row justify-end gap-4">
      <Button onClick={()=>{ 
            setShowSupport(false)
          }}   
          className="bg-main-color  text-white p-1 pl-3 pr-3 "
          label="Support Tickets "  /> 
            </div>
         <h1>Support</h1> 
           <p className="mt-2 text-[#CFCFCF]">Tell Us How We Can Help</p>  
            <form onSubmit={formik.handleSubmit}  className="mt-2 w-full flex flex-wrap flex-row justify-center">  
            <InputText  value={formik.values.subject} onChange={formik.handleChange} name="subject" placeholder="Subject" className="h-[40px] p-1  font-poppins border border-main-color  w-full"/>
            {formik.touched.subject && formik.errors.subject ? (
              <p className=" w-full text-red-500 text-[14px]">
                {formik.errors.subject}
              </p>
            ) : undefined}
            <InputTextarea value={formik.values.message} onChange={formik.handleChange} name="message" placeholder="Type A Message"  className="w-full border p-1 font-poppins mt-4 border-main-color rounded-md"/>
            {formik.touched.message && formik.errors.message ? (
              <p className=" w-full text-red-500 text-[14px]">
                {formik.errors.message}
              </p>
            ) : undefined} 
                <Button  label="Submit" loading={loader} disabled={loader} type="submit"  className="bg-main-color mt-4 text-white p-2 pl-4 pr-4"/>
               </form> 
                <h1 className="mt-4 text-center w-full text-main-color">Send Us</h1> 
                
                <h1 className="mt-2 text-center w-full text-main-color">Or</h1> 
                
                <h1 className="mt-2 text-center w-full text-main-color">Mail Us</h1>
         </> :   <div><div className="w-full flex flex-wrap flex-row justify-end gap-4">
      <Button onClick={()=>{ 
            setShowSupport(true)
          }}   
          className="bg-main-color  text-white p-1 pl-3 pr-3 "
          label="Add New " icon="pi pi-plus"  /> 
            </div>
      <SupportTickets accountactive={true}/>
     </div>
        }
        </div>   
          <Toast ref={toast} />
         </div>
     )
}