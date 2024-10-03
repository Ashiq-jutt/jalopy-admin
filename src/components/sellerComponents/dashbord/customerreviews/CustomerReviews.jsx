import { useEffect, useState } from "react";
import { Expand, Star } from "./assets";  
import Axios  from "axios";
import moment from "moment";

export default function CustomerReviews({toast}){   
  const [data,setData]=useState([{  
    name:"Sally D.", 
    time:"20m ago", 
    reviewmsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    reviewrank:5
    },{ 
        name:"Sally D.", 
        time:"20m ago", 
        reviewmsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        reviewrank:5
    },{ 
        name:"Sally D.", 
        time:"20m ago", 
        reviewmsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        reviewrank:5
    }]) 
    
    let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
      const [loader,setLoader]=useState(false)
      useEffect(()=>{  
        Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Rating/List`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
          toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message :"Successfully Fetched Reviews"}</p> });
            // setReportsData(res?.data?.data)  
            setData(res?.data?.data)
             setLoader(false)
        }).catch((error)=>{       
          toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Fetching Reviews Failed"}</p> });
          
        })   
      },[])
     return( 
        
        <div className="p-4 pl-0 pr-0 w-full bg-[#FBF8FF] rounded-md">  
         <div className="flex w-full pl-4 pr-4  flex-wrap flex-row items-center justify-between"> 
           
           <div>
         <h1 >CustomerReviews</h1>  
          <h1 className="mt-1 text-[#868E96]">Messages</h1>   
          </div> 
          </div> 
           <div className="w-full p-0 h-[5px] border-[#024873] border-t  mt-4"></div>  
           { 
           data.map((item,index)=>{ 
            return( 
                <div className={`flex flex-wrap ${" border-[#A767E0] border-b"}   m-4 pb-2 flex-row justify-between`}>  
                        <p className="text-main-color">{item?.customer?.name} <span className="text-[#868E96] text-[12px]">{moment(item?.createdAt).format('DD-MM-YY [at] HH:mm')}</span></p>   
                          <div className="flex flex-wrap flex-row justify-left"><Star/> <p className="ml-2">{item?.rating}/5</p></div>
                        <p className="w-full text-[#024873]  mt-2">{item?.description}</p>
                    </div>
            )
           })
           }  
            {/*<div className="flex flex-wrap mr-5 mt-10 flex-row items-center justify-end">   
             <p>SEE ALL REVIEWS</p>  
              <i className="ml-5 pi pi-chevron-right"/>
                 
            </div>  */}
         </div>
     )
}