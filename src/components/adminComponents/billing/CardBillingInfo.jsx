import { useEffect, useRef, useState } from "react";
import Loader from "../../Loaders/Components";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; 
import Axios from "axios"; 
import { Toast } from "primereact/toast";
import CreateInvoice from "./dialogs/Create-Invoice";

const CardBillingInfo = ({payouts,setRefresh,toast,loader}) => {   
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
   const [ridePartner,setRidePartner]=useState(false) 
    const [seller,setSeller]=useState(true)  
    const [createInvoiceDialog,setCreateInvoiceDialog]=useState(false)  
    const [updateStatusDialog,setUpdateStatusDialog]=useState(false) 
    const [updateStatusLoader,setUpdateStatusLoader]=useState(false)  
    const [currentSelected,setCurrentSelected]=useState()  
     const [currentBill,setCurrentBill]=useState([])  
     const [showLoader,setShowLoader]=useState(false)
     useEffect(()=>{    
      if(seller){   
        setShowLoader(true)
      const filteredItems = payouts.filter(item => item.ridePartner === null);
          setCurrentBill(filteredItems)  
          setTimeout(()=>{ 
            setShowLoader(false)
          },500)
      } 
      else{   
        setShowLoader(true)
        const filteredItems = payouts.filter(item => item.vendorShop === null);
        setCurrentBill(filteredItems)   
        setTimeout(()=>{ 
          setShowLoader(false)
        },500)
      }
     },[seller,ridePartner,payouts])
  return (
    <>      

     <div className="flex mt-10 flex-wrap flex-row justify-left gap-4"> 
      <Button onClick={()=>{ 
        setRidePartner(true) 
        setSeller(false)
      }} label="Ride Partner" className={`p-1 pl-2 pr-2 ${ridePartner ? "bg-main-color text-white":""}`}> 

      </Button> 
      <Button onClick={()=>{ 
        setRidePartner(false) 
        setSeller(true)
      }}  label="Seller" className={`p-1 pl-2 pr-2 ${seller ? "bg-main-color text-white":""}`}> 

</Button>
     </div>
      {" "}
      {loader || showLoader ? <div className="flex flex-wrap flex-row justify-center items-center mt-[70px]"><Loader/> </div> :<>{ 
         currentBill?.length === 0 ? <h1 className="w-full text-red-500  text-[12px] mt-10 text-center"> 
          Billings Not Found
          </h1>:
        currentBill.map((item) => (
        <div className="bg-[#F2F2F2] mt-5 p-5  rounded-xl m-4">  
           <div className="flex flex-wrap w-full flex-row justify-end"> 
              <div className="flex flex-wrap flex-row text-red-500 justify-left gap-4"> 
               <Button label="Delete"     
                 onClick={()=>{ 
                   setCurrentSelected(item) 
                    setUpdateStatusDialog(prev=>!prev)
                 }}
                icon="pi pi-trash"  /> 
               <Button label="Create Invoice" className="text-[#344767]" onClick={()=>{ 
                 setCurrentSelected(item) 
                 setCreateInvoiceDialog(prev=>!prev)
               }}  icon="pi pi-edit"  />
             
              </div>
           </div>
          <div>   
            <p className="font-normal">{seller ? `${item?.firstName ? item?.firstName:""} ${item?.lastName ? item?.lastName :"" }`:""}</p>
           { seller ? <> <p className="text-[16px] font-semibold mt-2">
              Seller: &nbsp;&nbsp; 
            </p>     
            <p className="font-normal block">{item?.vendorShop?.name}</p>
             </>
             :   <>  <p className="text-[16px] font-semibold mt-2">
             Company Name :&nbsp;&nbsp; 
           </p>   
           <p className="font-normal block">{item?.ridePartner?.firstName} {item?.ridePartner?.lastName}</p>
            </>
      }
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
      ))}                
         </>
      }   
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
              <h1 className="text-main-color">Are You Sure You Want To Delete Payout Request? </h1>
            </div>
            <div className="flex flex-wrap mt-4  flex-row justify-around">
              <Button 
               loading={updateStatusLoader} 
               disabled={updateStatusLoader}
                label="Yes"
                onClick={() => {   
                  setUpdateStatusLoader(true)
                  Axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/Delete/${currentSelected?.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(()=>{   
                  toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Vehicle Status Updated Successfully</h1> });
          setRefresh(prev=>!prev)
              setUpdateStatusLoader(prev=>!prev) 
              setUpdateStatusLoader(false)
               setUpdateStatusDialog(prev=>!prev) 
                  }).catch(err=>{ 
                    toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Vehicle Status Updation Failed</h1> });
         
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
         <Dialog header="Invoice Creation" headerClassName="text-main-color font-poppins" visible={createInvoiceDialog} onHide={()=>{ 
           setCreateInvoiceDialog(prev=>!prev)
         }}> 
       <CreateInvoice setCreateInvoiceDialog={setCreateInvoiceDialog} setRefresh={setRefresh} currentPayout={currentSelected} />
         </Dialog>
       
    </>
  );
};

export default CardBillingInfo;
