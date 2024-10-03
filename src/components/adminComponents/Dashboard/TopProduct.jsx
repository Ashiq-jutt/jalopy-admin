import { useState,useEffect } from "react";
import Axios from "axios"
const TopProduct = ({toast,token}) => { 
  const [loader,setLoader]=useState(true) 
  const [topProducts,setTopProducts]=useState([])
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/Get`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Top Products Fetched Successfully"}</p> });
         //setData(res?.data?.data)    
         
    
        setTopProducts(res?.data?.data?.topProducts)
         setLoader(false)
    }).catch((error)=>{        
      
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Top Products Fetching Failed"}</p> });
      
    })   
  },[]) 
  return (
    <div className="gap-3   p-[24px] rounded-md ">
      {topProducts?.map((item,index) => (
        <div className={`flex justify-between text-main-color font-inter card   p-4 pl-0 pr-0  items-center pb-2 ${index === 5 ? "":"border-b border-b-[#E5E7EB]"}`}> 

          <div className="flex flex-wrap flex-row justify-left gap-2 ">     
       
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}onError={(e)=>{ 
              e.target.src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"
            }} src={item?.image ? item?.image :"https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"} className="w-12  rounded-md h-12 object-cover" />
             
            <div>
            <p className="font-medium">{item?.name}</p>
            <p className="text-[12px] text-[#6B7280]">{item?.description}</p>
          </div>  
           </div>
          <div>
   
            <p >{item?.sales} &nbsp; <span className="text-[#6B7280]">sales</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProduct;
