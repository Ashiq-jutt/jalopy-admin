import { useState } from "react";   
import { useEffect } from "react";
import Axios  from "axios";
import { formattedDate } from "../../../Utils";
import Loader from "../../../Loaders/Components";
export default function Reviews(){    
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
     const [reviewerData,setReviewerData]=useState([])    
     const [loading,setLoading]=useState(true)
   
useEffect(()=>{ 
  Axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/v1/Rating/List`,
    
    {params:{RidePartnerId:1}, headers: { Authorization: `Bearer ${token}` } }
  ).then(res=>{ 
          setReviewerData(res?.data?.data)   
          setLoading(false)
          
        }).catch(err=>{

  })
 },[])
     return(   <>  
        {  
           loading ? <div className="flex flex-wrap w-full mt-[20%] flex-row justify-center items-center h-[100vh-200px]">    
            <div className="flex flex-wrap flex-row justify-center items-center mt-4 mb-4"><Loader/></div>
              
           </div>:
         
        <div className="flex flex-wrap flex-row justify-between gap-2"> 
         
         { 
          reviewerData.map(item=>{ 
            return( 
                <div className="w-full md:w-[49%] lg:w-[32.5%] mt-4 border border-[#EEEEEE] p-2 rounded-md ">  
               
                 <div className="w-full mt-4  flex  flex-wrap flex-row justify-between">   
                  <div className=" flex  flex-wrap flex-row justify-left">
                 <div className="relative h-[60px] w-[60px]  rounded-full overflow-hidden bg-[#969ba0]">
  <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }} className="absolute inset-0 w-full h-full object-cover" src={item?.customer?.image ? item?.customer?.image :"https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" } alt="Image" />
</div>  
               
                <div className="ml-2 mt-1 "> 
                    <p>{item.customer.name && item.customer.name !== " " ? item?.customer?.name :"Customer" }</p>
                     <p className="text-[14px]">{item?.createdAt ? formattedDate(item?.createdAt):"Not Populated createdAt"}</p> 
                     <p className="text-[14px]">{item?.vehicle?.company ? item?.vehicle?.company :"Vehicle"}</p> 
                     <p className="text-[14px]">{item?.vehicle?.color}</p>
                </div>       
                </div>
                <p className="text-right">Food Item</p>
                {/*<div className="ml-4"> 
                    <p>{item.product }</p> 
        </div>*/}
                 </div>     
                 <div className="mt-8 flex flex-wrap flex-row  items-center justify-left ">
                 {[1, 2, 3, 4, 5].map((item2) => {
              return (
                <span
                  className={`inline w-[16px] ml-1 pi pi-star-fill  h-[16px] ${
                    item2 <= item?.rating ? "text-[#FEEF06]" : "text-[#D6D7DB]"
                  }`}
                />
              );
            })}   
             {/*<p className="block w-full">({item?.description})</p>*/} 
              <span>&nbsp;&nbsp;({item?.rating})</span>
            </div> 
                 </div>
            )
          })
           }
        </div>    
}
         </>
     )
}