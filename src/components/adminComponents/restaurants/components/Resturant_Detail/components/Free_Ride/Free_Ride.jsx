import  { useRef,useEffect, useState } from "react";

import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button"; 
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast"; 
import Axios  from "axios";
import Loader from "../../../../../../Loaders/Components";
export default function SellerFreeRide({resturantDetailView,vendorId}) {  
  
  const toast=useRef()   
  const [submitLoader,setSubmitLoader]=useState(false)  
  const [menu,setMenu]=useState("")
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
  const [rideSetting,setRideSetting]=useState([])      
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
                <p className="font-poppins">
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
      { headers: { Authorization: `Bearer ${token}` },params:{VendorId:vendorId} }
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
    <div className="mt-10 font-poppins text-main-color  w-full ">
      <div className="transform ml-[calc(100%-220px)]  "></div>
      <div className="flex flex-wrap flex-row justify-center">     
        <div className=" p-4 pt-[10px] w-full  flex flex-row flex-wrap justify-between">  
           <div className="flex  w-full   flex-wrap flex-row justify-between"> 
               <h1 className="font-medium text-[24px]">Free Ride</h1> 
                 <h1 className="text-center bg-main-color  hidden md:block text-white font-medium text-[18px] max-w-[400px] rounded-sm p-1 ">reach more customer by enabling more green area

</h1>
           </div> 

         { rideSetting.length !== 0 ? <> 
          
          <div className="w-full overflow-x-auto">
          {rideSetting.map((item) => (  
            <div className="mt-4  min-w-[600px] w-full flex flex-row justify-between items-center flex-wrap"> 
           
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
                <p className=" text-white rounded w-[180px] flex flex-wrap flex-row items-center justify-center  p-2">
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
                  {[1, 2, 3, 4, 5].map((item2) => {
                    return (
                      <>
                        <div
                          className={`  w-[26px] h-[16px] rounded ml-1  h-[16px] ${
                            item2 <= item.strong
                              ? item.strongstatus
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
              
          
          ))}     
           </div>
           </>
        : 
        <div className="w-full mt-4 mb-4 flex flex-wrap flex-row justify-center items-center "> 
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
      </div>  
     
                            
                  <div className="flex flex-wrap flex-row   mt-8 w-full justify-center gap-4 ">
           <Button
          label="Edit"
          className={`border  mt-2 ml-5 border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        /> 
          <Button
          label="Reject"
          className={`border  mt-2 ml-5 border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        />
        <Button
      
      label="Inquiry"
          className={`border mt-2 ml-5 border-main-color  font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      
        <Button
          label="Approve"  
          onClick={()=>{ 
    UpdateResturantSetting()
                     }} loading={submitLoader} disabled={submitLoader}
          className={`border mt-2 ml-5 border-main-color font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
 <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto  
    mt-[70px]
    md:transform-none
  "    ref={toast} />
    </div>
  );
}
