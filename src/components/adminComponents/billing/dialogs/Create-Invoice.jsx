import {useRef,useState} from "react"; 
import Axios  from "axios";
import { Button } from "primereact/button"; 
import { Toast } from "primereact/toast";
import { setRef } from "@mui/material";
export default function CreateInvoice({setRefresh,setCreateInvoiceDialog,currentPayout}){ 
    let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken 
  const toast=useRef() 
  const [loaderShow,setLoaderShow]=useState(false)   
  return(  
    <div className="font-poppins text-medium text-[#AFAFAF]">
          
    <div className="flex flex-wrap flex-row justify-around">
      <h1 className="text-main-color">Are You Sure You Want To Create Invoice? </h1>
    </div>
    <div className="flex flex-wrap mt-4  flex-row justify-around">
      <Button 
       loading={loaderShow} 
       disabled={loaderShow}
        label="Yes"
        onClick={() => {   
          setLoaderShow(true)
          Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/Invoices/Create`,{payoutId:currentPayout?.id}, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(()=>{   
          toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Invoice Created Successfully</h1> });
           setLoaderShow(false)  
            setTimeout(()=>{ 
              setRefresh(prev=>!prev) 
                setCreateInvoiceDialog(prev=>!prev)
            },500)
          }).catch(err=>{ 
            toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">{ err?.response?.data?.Message ? err?.response?.data?.Message : "Invoice Creation Failed"}</h1> });
 
       setLoaderShow(false)
          }) 
        }}
        className=" text-white bg-main-color pl-2 pr-2 "
      />
      <Button
        label="No"
        onClick={() => {
          setCreateInvoiceDialog(false);
        }}
        className="text-white bg-main-color pl-3 pr-3 "
      />
    </div> 
     <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
  </div> 
     )
}