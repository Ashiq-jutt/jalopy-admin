import consumer from "../../../assets/consumer.png"; 

import { useState,useEffect } from "react";
import Axios from "axios"
const LatestConsumer = ({toast,token}) => {  
  const [loader,setLoader]=useState(true) 
  const [topConsumers,setTopConsumers]=useState([])
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/Get`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Latest Customers Fetched Successfully"}</p> });
         //setData(res?.data?.data)    
         
    
        setTopConsumers(res?.data?.data?.latestCustomers)
         setLoader(false)
    }).catch((error)=>{        
      
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Latest Constomers Fetching Failed"}</p> });
      
    })   
  },[]) 
  return (
    <div className="gap-3 shadow-topproducts  p-[24px] rounded-md ">
    
    {topConsumers?.map((item,index) => (
        <div className={`flex justify-between text-main-color font-inter card items-center  p-4 pl-0 pr-0 pb-2 ${index === 5 ? "":"border-b border-b-[#E5E7EB]"}`}>
          <div className="flex  items-center gap-3">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}   
              onError={(e)=>{ 
                e.target.src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }}
             src={item?.image ? item?.image :"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} className="w-12  rounded-md h-12 object-cover" />
            <div>
              <p className="font-medium">{item?.fullName}</p>
              <p className="text-[10px] text-[#6B7280]">{item?.email}</p>
            </div>
          </div>
          <p className="font-medium">${367}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestConsumer;
