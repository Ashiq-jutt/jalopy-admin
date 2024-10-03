import { Toast } from "primereact/toast";
import Axios from "axios"
import { useEffect, useRef, useState } from "react";
import Loader from "../../../../../Loaders/Components";

const CardBillingInfo = ({toast}) => {       
  const [payouts,setPayouts]=useState([]) 
  const [loader,setLoader]=useState(true)  
  const [refresh,setRefresh]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{  
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/List`,
      { headers: { Authorization: `Bearer ${token}` },params:{status:0} }
    ).then(res=>{  
      setLoader(false)
    setPayouts(res?.data?.data) 
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Billing Data Successfully Fetched"}
        </p>
      ),
    });
    }).catch(error=>{ 
      setLoader(false)
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: (
          <p className="font-poppins">
            {error?.response?.data?.Message
              ? error?.response?.data?.Message
              : "Billing Data Fetching Failed"}
          </p>
        ),
      });
    })
   },[refresh]) 
  return (
    <>   
    <div className="flex pb-4 mt-4 md:mt-0 w-full flex-wrap flex-row justify-between items-center"> 
       <h1 className="font-medum  text-[16px] font-[600] tracking-wide">Billing Information</h1> 
     
     </div>
      {" "}   
       <div className="flex flex-wrap flex-row justify-left gap-3">
      {loader ?    <div className="flex flex-wrap flex-row justify-center items-center w-full mt-4 mb-4"><Loader/> </div> : payouts?.length === 0 ?  <div className="flex flex-wrap flex-row justify-center items-center w-full mt-4 mb-4"><h1>Billing Data Not Found</h1> </div> :     
      payouts.map((item) => (
          <div className="bg-[#F2F2F2] mt-5 p-5  rounded-xl m-4">  
          <div className="flex flex-wrap w-full flex-row justify-end"> 
             <div className="flex flex-wrap flex-row justify-left gap-4"> 
              <Button label="Delete"     
                onClick={()=>{ 
                  setCurrentSelected(item) 
                   setUpdateStatusDialog(prev=>!prev)
                }}
               icon="pi pi-trash"  /> 
              <Button label="Edit" onClick={()=>{ 
                setCurrentSelected(item) 
                setCreateInvoiceDialog(prev=>!prev)
              }}  icon="pi pi-edit"  />
            
             </div>
          </div>
         <div>   
           <p className="font-normal">{seller ? `${item?.firstName ? item?.firstName:""} ${item?.lastName ? item?.lastName :"" }`:""}</p>
         <p className="text-[16px] font-semibold mt-2">
             Seller: &nbsp;&nbsp; 
           </p>     
           <p className="font-normal block">{item?.vendorShop?.name}</p>
            
          
     
           <p className="text-[16px] font-semibold w-full">
             Email Address: &nbsp;&nbsp;
            </p> 
            <p className="text-[16px]">
            {item?.ridePartner ? item?.ridePartner?.email:item?.vendorShop?.email}
           </p>
           <p className="text-[16px] font-semibold">
             VAT Number: 
           </p> 
           <p className="font-normal">{item?.ridePartner ? item?.ridePartner?.taxId:item?.vendorShop?.taxId}</p>
         </div>
         
       </div>
      )) 
    } 
     
       </div> 
       
    </>
  );
};

export default CardBillingInfo;
