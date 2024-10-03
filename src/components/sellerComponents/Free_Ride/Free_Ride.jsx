import React, { useRef,useEffect, useState } from "react";

import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button"; 
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast"; 
import Axios  from "axios"; 
import Loader from "../../Loaders/Components";
export default function SellerFreeRide() {  
   
  const toast=useRef()   
  const [submitLoader,setSubmitLoader]=useState(false) 
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
  let vendorId = JSON.parse(localStorage.getItem("userData")).data.vendorId;  
  const [rideSetting,setRideSetting]=useState([])     
  const [mainAgree,setMainAgree]=useState(false)  
  const [IsAgree,setIsAgree]=useState(false) 
  const [ISAgreeError,setIsAgreeError]=useState(false) 
  const [isMainAgreeError,setIsMainAgreeError]=useState(false)
  const [menu,setMenu]=useState()  
  useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/${vendorId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => { 
          setMenu(res?.data?.data?.menu)
      }).catch(err=>{ 
  
      }) 
    },[])
  function UpdateResturantSetting(){ 
    setSubmitLoader(prev=>!prev) 
    /*Axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/UpdateDeliveryCharges`,{ 
        vendorId:vendorId, 
        isProvidingPickup:pickup, 
        pickupRebate:isPickUpRebate ? pickupRebate:0,
        deliveryCharge: delivery ? deliveryCharge:0,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {  
        
    setSubmitLoader(false) 
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins text-main-color">
              {res?.data?.message
                ? res?.data?.message
                : "Seller Details Updated Successfully"}
            </p>
          ),
        })}).catch(error=>{  
          
    setSubmitLoader(false)
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Seller Details Updation  Failed"}
              </p>
            ),
          });
        })    */
        Axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/RideSettings/CreateOrUpdate`,rideSetting,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {  
            
        setSubmitLoader(false) 
            toast.current.show({
              severity: "success",
              summary: "Info",
              detail: (
                <p className="font-poppins text-main-color">
                  {res?.data?.message
                    ? res?.data?.message
                    : "Free Ride Setting Updated Successfully"}
                </p>
              ),
            })}).catch(error=>{  
              
        setSubmitLoader(false)
              toast.current.show({
                severity: "error",
                summary: "Info",
                detail: (
                  <p className="font-poppins">
                    {error?.response?.data?.message
                      ? error?.response?.data?.message
                      : " Freen Ride Setting Updation  Failed"}
                  </p>
                ),
              });
            }) 
  }
  const freeRide = [
    {
      number: "1 Customer",
      status: false,  
      "minCustomers": 1,
    "maxCustomers": 1,
    "discount": 0,
      id:1, 
      vendorShopId:vendorId
    },
    {
      number: "2 Customer",
      status: false,    
      "minCustomers": 2,
    "maxCustomers": 2,
    "discount": 0,
      id:2, 
      vendorShopId:vendorId 
    },
    {
      number: "3-4 Customer",
      status: false, 
      "minCustomers": 3,
    "maxCustomers": 4,
    "discount": 0, 
      id:3, 
      vendorShopId:vendorId
    },
    {
      number: "5-6 Customer",
      status: false,  
      "minCustomers": 5,
    "maxCustomers": 6,
    "discount": 0,
      id:4, 
      vendorShopId:vendorId
    },
    {
      number: "7 Customer", 
      id:5,  
      "minCustomers": 7,
    "maxCustomers": 12,
    "discount": 0,
      vendorShopId:vendorId,
      status: false,
    },
  ]; 
  useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/RideSettings/Get`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {   
         if(res?.data?.data?.length > 0){ 
        setRideSetting(res?.data?.data)
         } 
         else{ 
          setRideSetting(freeRide)
         }
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Ride Settings Fetched Successfully"}
            </p>
          ),
        })}).catch(error=>{ 
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Ride Setting Fetching Failed"}
              </p>
            ),
          });
        })       
  },[]) 
  const pricemap = [
    {
      price: "€2",
      strong: 4,
      strongstatus: true,
    },
    {
      price: "€2",
      strong: 4,
      strongstatus: true,
    },
    {
      price: "€2",
      strong: 4,
      strongstatus: true,
    },
    {
      price: "€2",
      strong: 4,
      strongstatus: true,
    },
    {
      customer: "7",
      strong: 4,
      increasecustomer: "",
      strongstatus: false,
    },
  ];
  return (
    <div className="mt-10 font-poppins text-main-color ">
      <div className="transform ml-[calc(100%-220px)]  "></div>
      <div className="flex flex-wrap flex-row justify-center">     
        <div className=" p-4 pt-[10px] w-full  flex flex-row flex-wrap justify-between">  
           <div className="flex w-full   flex-wrap flex-row justify-between"> 
               <h1 className="font-semibold text-[18px]">Free Ride</h1> 
                 <h1 className="text-center mt-2 md:mt-0 bg-main-color text-white text-[18px] max-w-[400px] rounded-sm p-1 ">reach more customer by enabling more green area

</h1>
           </div>
         { rideSetting.length !== 0 ? <> 
         
          <div className="w-full overflow-auto">
          {rideSetting.map((item) => (   
            <div className="mt-4 min-w-[600px] flex flex-row justify-between items-center flex-wrap"> 
           
              <p className="w-[140px]">{!item.dynamic ? item.minCustomers === item.maxCustomers ? `${item.minCustomers}`:`${item.minCustomers}-${item.maxCustomers}`:`${item.minCustomers}`} Customers</p> 
              <InputSwitch  
                    onChange={()=>{   
                          
                      const updatedItems = rideSetting.map(items =>
                        item.id === items.id ? { ...items, status: !item.status } : items
                      );    
                 setRideSetting(updatedItems)
                    }}
                  checked={item.status }
                  className=""
                />
              <div className="bg-main-color rounded p-2 mt-2">
                <p className=" text-white rounded w-[180px] flex flex-wrap flex-row items-center justify-center  p-1">
                  <i className="text-white cursor-pointer pi pi-plus mr-2" onClick={()=>{ 
                  
                    const updatedItems =rideSetting.map(items =>
                      item.id === items.id ? { ...items, discount: item.discount+1 } : items
                    );    
               setRideSetting(updatedItems)
                
                  }}></i>
                  €{item.discount}
                  <i onClick={()=>{ const updatedItems = rideSetting.map(items =>
                      item.id === items.id ? { ...items, discount: item.discount > 0 ? item.discount-1:0 } : items
                    );    
               setRideSetting(updatedItems) }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
                </p>
                {item.minCustomers === 7 ? (
                  <p className=" text-white rounded w-[180px] flex flex-wrap flex-row items-center justify-center  p-2">
                    <i onClick={()=>{ 
                  
                  const updatedItems = rideSetting.map(items =>
                    item.id === items.id ? { ...items, maxCustomers: item.maxCustomers+1 } : items
                  );    
             setRideSetting(updatedItems)
              
                }} className="text-white cursor-pointer pi pi-plus mr-2"></i>
                   <p> {item.maxCustomers} Customers
                    </p>
                    <i onClick={()=>{ const updatedItems = rideSetting.map(items =>
                      item.id === items.id ? { ...items, maxCustomers: item.maxCustomers > item.minCustomers ? item.maxCustomers-1:item.minCustomers } : items
                    );    
               setRideSetting(updatedItems) }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
                  </p>
                ) : undefined}
              </div>
              <div> 
              <div>
                <div className="flex flex-row flex-wrap justify-center">
                  {[1, 2, 3, 4, 5].map((item2,index) => {
                    return (
                      <>
                        <div
                          className={`  w-[26px] h-[16px] rounded ml-1  h-[16px] ${
                            index < 4
                              ? index < 4
                                ? "bg-[#0EF232]"
                                : !item.strongstatus
                                ? "bg-[#EF004C]"
                                : "bg-[#F1E9FE]"
                              : "bg-[#F1E9FE]"
                          }`}
                        ></div>
                      </>
                    );
                  })}
                </div>
              </div>
              </div>
            </div> 
        
          ) 
           
          )}    
              </div>
           </>
        : 
        <div className="flex flex-wrap w-full mt-[5%] flex-row justify-center items-center h-[100vh-200px]">    
               <Loader/>
           </div>
        }
           
        </div>                   
        <div className="flex flex-wrap flex-row w-full items-center justify-center">
          <div className="p-4 pl">
            <h1 className="text-left">Menu Card {menu ? <span onClick={()=>{ 
      
      fetch(menu)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || menu?.split('/').pop();
  
        return response.blob().then(blob => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename; // Use the filename from the server
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Download failed:', error));
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</h1>
          </div> 
            
         
          <div className="flex flex-wrap  flex-row justify-center items-center ml-20 "> 
         <div className="overflow-hidden max-w-[70vw] rounded-sm max-h-[70vh]  mt-4     flex flex-wrap flex-row justify-center items-center overflow-hIdden" >
                 
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }} onLoad={(event)=>{ 
          const { naturalWidth, naturalHeight } = event.target; 
           if(naturalWidth > naturalHeight){ 
            event.target.style="width:auto;height:100%"  
             
           } 
           else{ 
            event.target.style="width:100%;height:auto"  
         
           }

         }}   src={menu} />  
         </div>

         </div> 
        </div>  
        <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
            <h1 className="mt-4 font-poppins ml-8 font-semibold font-normal">Terms And Conditions</h1> 
            <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
            <div className="flex flex-wrap flex-row justify-left "> 
                    <i onClick={()=>{  
                       if(!mainAgree){ 
                        setIsMainAgreeError(false)
                       } 
                       else{ 
                        setIsMainAgreeError(true)
                       }
                        setMainAgree(prev=>!prev)     
                       
                    }} className={`pi rounded-full ${mainAgree ? "pi-check":""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `}/>
                </div>   
                <p className="ml-3 w-[calc(100%-70px)]">
                By submitting this form, you agree to our terms and conditions. <span className="underline cursor-pointer"></span></p> 
                {isMainAgreeError ? (
              <p className="mt-2 ml-8 text-red-500">Terms And Conditions Is Required</p>
            ) : null}
 </div>   
              <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
            <div className="flex flex-wrap flex-row justify-left "> 
                    <i onClick={()=>{  
                      if(!IsAgree){ 
                        setIsAgreeError(false)
                       } 
                       else{ 
                        setIsAgreeError(true)
                       }
                        setIsAgree(prev=>!prev)    
                         
                    }} className={`pi rounded-full ${IsAgree ? "pi-check":""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `}/>
                </div>   
                <p className="ml-3 w-[calc(100%-70px)]">
                I Agree to <span className="underline cursor-pointer">terms and conditions</span></p> 
 </div>        
 {ISAgreeError ? (
              <p className="mt-2 ml-8 text-red-500">Terms And Condition Is Required</p>
            ) : null}
          </div>
      </div>  
     
                 <div className="flex w-full mt-8 flex-wrap flex-row justify-center"> 
                     <Button onClick={()=>{   
                       if(IsAgree && mainAgree ){
    UpdateResturantSetting() 
                       } 
                       else{ 
                        if(!IsAgree){ 
                          setIsAgreeError(true)
                        } 
                        if(!mainAgree){ 
                          setIsMainAgreeError(true)
                        }
                       }
                     }} loading={submitLoader} disabled={submitLoader} className="p-2 pl-10 pr-10 font-[500] font-Poppins tracking-wide text-[16px] bg-main-color text-white" label="Submit"/>
                  </div> 
 <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
}
