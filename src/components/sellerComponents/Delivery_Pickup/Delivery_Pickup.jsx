import React, { useRef,useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";  
import { Button } from "primereact/button";   
import "./css/delivery_pickup.css"   
import { Toast } from "primereact/toast";  
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from "axios"; 
import { Dialog } from "primereact/dialog";
import Loader from "../../Loaders/Components";
const containerStyle = {
  width: '100%',
  height: '400px'
};
export default function DeliveryPickupFreeRide() {   
  const [submitLoader,setSubmitLoader]=useState(false)
  const [postalCode,setPostalCode]=useState(70173)
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);  
  const [unBlockDialog,setUnblockDialog]=useState(false)
  const [unblockLoader,setUnblockLoader]=useState(false) 
  const [selectedBlock,setSelectedBlock]=useState()
  const [refreshBlockList,setRefreshBlockList]=useState(false)
 const [blockedPostalCodes1,setBlockedPostalCodes1]=useState([])  
 
 const [blockedPostalCodes2,setBlockedPostalCodes2]=useState([])         
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [postalCode]);
  const toast=useRef()   
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
  let vendorId = JSON.parse(localStorage.getItem("userData")).data.vendorId;  
  const [delivery,setDelivery]=useState(false) 
  const [pickup,setPickup]=useState(false) 
  const [pickupRebate,setPickupRebate]=useState(0)  
  const [isPickUpRebate,setIsPickupRebate]=useState(false)
  const [deliveryCharge,setDeliveryCharge]=useState(0)  
  const [createPostalCodeLoader,setCreatePostalCodeLoader]=useState(false)  

  function CreatePostalCode(){  
    setCreatePostalCodeLoader(true)
    Axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/BlockPostalCodes/Create`,{code:postalCode},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {  
        
    setCreatePostalCodeLoader(false) 
    setRefreshBlockList(prev=>!prev)
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins text-main-color">
              {res?.data?.message
                ? res?.data?.message
                : "Postal Code Blocked Successfully"}
            </p>
          ),
        })}).catch(error=>{  
          
    setCreatePostalCodeLoader(false)
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Postal Code Blocking Failed"}
              </p>
            ),
          });
        }) 
  }
  useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/MinPriceSettings/Get`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {   
         if(res?.data?.data?.length > 0){ 
        setFreeRider(res?.data?.data)
         } 
         else{ 
          setFreeRider(defaultMinPrice)
         }
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Minimum Order Price Settings Fetched Successfully"}
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
                  : "Minimum Order Price Fetching Failed"}
              </p>
            ),
          });
        })  
        Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/${vendorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {   
             setPickup(res?.data?.data?.isProvidingPickup ? res?.data?.data?.isProvidingPickup : false )  
             setDeliveryCharge(res?.data?.data?.deliverCharges ? res?.data?.data?.deliverCharges : 0  )   
              setPickupRebate(res?.data?.data?.pickupRebate ? res?.data?.data?.pickupRebate  : 0)
            toast.current.show({
              severity: "success",
              summary: "Info",
              detail: (
                <p className="font-poppins">
                  {res?.data?.message
                    ? res?.data?.message
                    : "Delivery Setting Fetched Successfully"}
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
                      : "Delivery Setting Fetching Failed"}
                  </p>
                ),
              });
            }) 
       
  },[])  
   useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/BlockPostalCodes/List`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {   
        if(res?.data?.data?.length > 1){   
          setBlockedPostalCodes1([]) 
          setBlockedPostalCodes2([])
             let mean=res?.data?.data?.length/2  
             let blockpostal1=[] 
             let blockpostal2=[]
              for(let k=0;k<res?.data?.data?.length;k++){ 
                 if(k+1 <= mean){ 
                     blockpostal1.push(res?.data?.data[k])
                 } 
                  else{ 
                    
                    blockpostal2.push(res?.data?.data[k])
                  }
              }
                setBlockedPostalCodes2(blockpostal2) 
                setBlockedPostalCodes1(blockpostal1)
        } 
        else{
        setBlockedPostalCodes1(res?.data?.data)  
    
        }
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins ">
              {res?.data?.message
                ? res?.data?.message
                : "Blocked Postal Codes Fetched Successfully"}
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
                  : "Blocked Postal Codes Fetching Failed"}
              </p>
            ),
          });
        })
   },[refreshBlockList])  
   function Unblock(){ 
        setUnblockLoader(prev=>!prev) 
        Axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/v1/BlockPostalCodes/Delete/${selectedBlock?.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {  
            
        setUnblockLoader(false) 
        setRefreshBlockList(prev=>!prev)  
        setTimeout(()=>{ 

          setUnblockDialog(prev=>!prev)
        },500)
            toast.current.show({
              severity: "success",
              summary: "Info",
              detail: (
                <p className="font-poppins text-main-color">
                  {res?.data?.message
                    ? res?.data?.message
                    : "Postal Code UnBlocked Successfully"}
                </p>
              ),
            })}).catch(error=>{  
              
        setUnblockLoader(false)
              toast.current.show({
                severity: "error",
                summary: "Info",
                detail: (
                  <p className="font-poppins">
                    {error?.response?.data?.message
                      ? error?.response?.data?.message
                      : "Postal Code UnBlocking Failed"}
                  </p>
                ),
              });
            }) 
   }
  const [freeRide,setFreeRider] =useState([]) 
  const defaultMinPrice=[
    {
      minDistance:1, 
      maxDistance:2,  
      status: true, 
      price: 2, 
      id:1,
      strong: 4, 
       vendorShopId:vendorId
    },
    {
      minDistance:3, 
      maxDistance:4,   
      
      id:2,
      status: true, 
      price: 2,
      strong: 4, 
       vendorShopId:vendorId
    },
    {
      minDistance:5,  
      
      id:3,
      maxDistance:7,  
      status: false, 
      price: 2,
      strong: 4, 
       vendorShopId:vendorId
    },
    {
      minDistance:8, 
      maxDistance:10,  
      status: false, 
      price: 2, 
      
      id:4,
      strong: 4, 
       vendorShopId:vendorId
    },
    {
      minDistance:11,
      status: false,  
      maxDistance:13, 

      id:5,
      price: 2, 
       dynamic:true,
      strong: 4, 
       vendorShopId:vendorId
    },
  ]     
  const blocks=[{ 
     label:"12345", 
    
  },{ 
    label:"12345", 
   
 },{ 
  label:"12345", 
 
},{ 
  label:"12345", 
 
},{ 
  label:"12345", 
 
},{ 
  label:"12345", 
 
}] 
function UpdateResturantSetting(){ 
  setSubmitLoader(prev=>!prev) 
  Axios.put(
    `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/UpdateDeliveryCharges`,{ 
      vendorId:vendorId, 
      pickup:pickup, 
      pickupRebate:pickupRebate,
      deliveryCharges: deliveryCharge,
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
      })  
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/MinPriceSettings/CreateOrUpdate`,freeRide,
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
                  : "Seller Min Price Setting Updated Successfully"}
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
                    : "Seller Min Price Setting Updation  Failed"}
                </p>
              ),
            });
          }) 
}
 
  return (
    <div className=" font-poppins p-4 "> 
     <div className="w-full mt-4 flex flex-row flex-wrap justify-between items-center">
            <h1 className="text-main-color w-full   text-[20px] rounded  ">
              Min Order Price
            </h1>
           
          </div>
      <div className="flex flex-wrap overflow-auto w-full   flex-row justify-center">
        <div className=" min-w-[600px] flex flex-wrap flex-row justify-between ">
         
        </div>
        <div className=" p-4 pt-[40px]  w-full flex flex-row flex-wrap justify-between"> 
         { freeRide.length !== 0 ? <> 
           <div className="overflow-auto w-full min-w-[600px] flex flex-wrap flex-row justify-between">
          {freeRide.map((item) => (
            <div className="mt-4 w-full min-w-[60  flex flex-row justify-between items-center flex-wrap"> 
           
              <p className="w-[140px]">{!item.dynamic ? `${item.minDistance}-${item.maxDistance}`:`${item.minDistance}`} Km</p> 
              <InputSwitch  
                    onChange={()=>{   
                          
                      const updatedItems = freeRide.map(items =>
                        item.id === items.id ? { ...items, status: !item.status } : items
                      );    
                 setFreeRider(updatedItems)
                    }}
                  checked={item.status }
                  className=""
                />
              <div className="bg-main-color rounded p-2 mt-2">
                <p className=" text-white rounded w-[140px] flex flex-wrap flex-row items-center justify-center  p-2">
                  <i className="text-white cursor-pointer pi pi-plus mr-2" onClick={()=>{ 
                  
                    const updatedItems = freeRide.map(items =>
                      item.id === items.id ? { ...items, price: item.price+1 } : items
                    );    
               setFreeRider(updatedItems)
                
                  }}></i>
                  €{item.price}
                  <i onClick={()=>{ const updatedItems = freeRide.map(items =>
                      item.id === items.id ? { ...items, price: item.price > 0 ? item.price-1:0 } : items
                    );    
               setFreeRider(updatedItems) }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
                </p>
                {item.minDistance === 11 ? (
                  <p className=" text-white rounded w-[140px] flex flex-wrap flex-row items-center justify-center  p-2">
                    <i onClick={()=>{ 
                  
                  const updatedItems = freeRide.map(items =>
                    item.id === items.id ? { ...items, maxDistance: item.maxDistance+1 } : items
                  );    
             setFreeRider(updatedItems)
              
                }} className="text-white cursor-pointer pi pi-plus mr-2"></i>
                   <p> {item.maxDistance} Km 
                    </p>
                    <i onClick={()=>{ const updatedItems = freeRide.map(items =>
                      item.id === items.id ? { ...items, maxDistance: item.maxDistance > item.minDistance ? item.maxDistance-1:item.minDistance } : items
                    );    
               setFreeRider(updatedItems) }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
                  </p>
                ) : undefined}
              </div>
              <div>
                <p>Min: Order Price</p>
              </div>
            </div>
          ))}  
          </div>  
           </>
        : 
        <div className="flex flex-wrap w-full mb-[5%] mt-[5%] flex-row justify-center items-center h-[100vh-200px]">    
        <Loader/>
    </div> 
       }
           
        </div>
      </div>
      
      <div className="flex flex-wrap flex-row  justify-left">
        <div className="w-[310px]">
          <h1 className=" w-full font-semibold">Delivery Charges</h1>
          <div className="flex flex-wrap flex-row  mt-4 items-center jusitfy-between ">
            <label >Charges</label>
            <p className=" text-white bg-main-color  rounded w-[112px] ml-[60px] flex flex-wrap flex-row items-center justify-center  p-2">
              <i  onClick={()=>{ 
                 if(deliveryCharge >= 0){ 
                    setDeliveryCharge(prev=>prev=prev+1)
                 } 
                 else{ 
                  setDeliveryCharge(0)
                 }
              }} className="text-white cursor-pointer pi pi-plus mr-2"></i>
              <h1>€ {deliveryCharge}</h1>
              <i onClick={()=>{ 
                 if(deliveryCharge > 0){ 
                    setDeliveryCharge(prev=>prev=prev-1)
                 } 
                 else{ 
                  setDeliveryCharge(0)
                 }
              }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
            </p>
          </div>
        </div>
        <div className="w-[310px]"></div>
      </div>
      <div className="flex flex-wrap flex-row  mt-4  justify-left">
        <div className="w-[310px]">
          <h1 className=" w-full font-semibold">Pick Up</h1>
          <div className="flex flex-wrap flex-row  mt-4 items-center justify-left">
            <i  onClick={()=>{ 
              setPickup(prev=>!prev)
            }} className={`pi pi-none cursor-pointer w-[21px] h-[21px] p-1 pl-[3px] text-[12px] border border-main-color rounded-full ${pickup ? "pi-check":""}`} />
            <label className="ml-5">Yes</label>
            <div className=" text-white  rounded w-full  flex flex-wrap flex-row items-center justify-left  p-2 pl-[0px]">
              <label className="text-main-color">Pick Up Rebate</label>
              <p className="  text-white bg-main-color  w-[112px]  ml-2 flex flex-wrap flex-row items-center justify-center  p-2">
                <i  onClick={()=>{ 
                   if(pickupRebate >=0){ 
                    setPickupRebate(prev=>prev=prev+1)
                   } 
                   else{ 

                   }
                }} className="text-white cursor-pointer pi pi-plus mr-2"></i>
                <h1>{pickupRebate}%</h1>
                <i  onClick={()=>{ 
                   if(pickupRebate >0){ 
                    setPickupRebate(prev=>prev=prev-1)
                   } 
                   else{ 

                   }
                }} className="pi pi-minus  cursor-pointer text-white ml-4   "></i>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[310px]"></div>
      </div>
      <div className="flex w-full flex-wrap flex-row mt-4 justify-center">
        <div className="w-[90%] ml-[0%] md:w-[70%] md:ml-[16%] transform ">
          <h1 className=" w-full">PostCode Block/Unblock</h1>
          <div className="flex w-full flex-wrap p-2  border-b border-gray-500 mb-2 flex-row shadow-sm  mt-2 items-center justify-left">
            <div className="flex w-full flex-wrap flex-row  items-center justify-left">
              <i className="pi pi-search"></i>
              <InputText
                className="ml-5 w-[60%] md:w-[90%] p-1"
                placeholder="Search" 
                value={postalCode} 
                onChange={(e)=>{ 
      setPostalCode(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="mt-4"> 
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
        onLoad={() => setMapLoaded(true)}
      >
        {mapLoaded && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
          </div>
          <div className="flex flex-wrap flex-row mt-4 justify-center w-full">
          
            <Button 
            loading={createPostalCodeLoader}
             disabled={createPostalCodeLoader} 
             onClick={()=>{ 
              CreatePostalCode()
             }}
            label="Block"
              className=" p-2 pl-3 pr-3 border border-main-color ml-5 text-white bg-main-color"
            />
          </div>         
         
        </div>
      </div>    
      <div className="flex flex-wrap mt-10 blocktable flex-row  justify-between">  
            <div className="w-[48%] border border-[#000000]"> 
               { 
                 blockedPostalCodes1.map(item=>(
                    <div className="p-1 w-full  border-main-color border-b last:border-none  items-center flex flex-wrap border-[#000000] w-full flex-row justify-between">  
                            <p className="text-main-color ">{item.code}</p> 
                                <Button onClick={()=>{ 
                                   setUnblockDialog(prev=>!prev) 
                                   setSelectedBlock(item)
                                }} className="bg-main-color text-white p-1 pl-2 pr-2 "  label="UnBlock" />
                     </div>
                 ))
                }
            </div> 
            <div className="w-[48%] border border-[#000000] "> 
               { 
                 blockedPostalCodes2.map(item=>(
                    <div className="w-full p-1  flex flex-wrap border-b border-[#000000] items-center last:border-none w-full flex-row justify-between">  
                            <p className="text-main-color ">{item.code}</p> 
                                <Button  onClick={()=>{ 
                                   setUnblockDialog(prev=>!prev) 
                                   setSelectedBlock(item)
                                }} className="bg-main-color text-white p-1 pl-2 pr-2 " label="UnBlock" />
                     </div>
                 ))
                }
            </div>
        </div>  
        <div className="w-full flex flex-wrap flex-row justify-center"> 
        <Button onClick={()=>{ 
          UpdateResturantSetting()
        }} label="Submit" loading={submitLoader} disabled={submitLoader} className="p-2  pl-10 pr-10 bg-main-color text-white text-[18px] mt-8" />
        </div>  
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} /> 
        <Dialog className="text-main-color font-poppins" header="Unblocking Confirmation" headerClassName="text-main-color" visible={unBlockDialog} onHide={()=>{ 
           setUnblockDialog(prev=>!prev)
         }} > 
           
           <div> 
             <p className="text-main-color">Do You Want to Unblock the Postal Code ?</p> 
               <div className="flex mt-4 flex-wrap flex-row justify-evenly"> 
              <Button  onClick={()=>{ 
                 Unblock()
              }}  loading={unblockLoader} disabled={unblockLoader} label="Yes" className="bg-main-color text-white p-1 pl-2 pr-2"/> 
              
              <Button  label="No" className=" ml-4 bg-main-color text-white p-1 pl-2 pr-2"/>
               </div>
           </div>
         </Dialog>
    </div>
  );
}
