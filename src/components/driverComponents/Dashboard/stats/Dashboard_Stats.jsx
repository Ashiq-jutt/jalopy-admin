import { useEffect, useState } from "react";
import { CancelledRides, Rides, Trinkleguad } from "./assets/Svg"; 
import Axios from "axios"
export default function DriverStats({toast}){    
  const [loader,setLoader]=useState(true)
     const [data,setData]=useState([{ 
    label:"Tips", 
    no:"0",
    Svg:Trinkleguad
     },{ 
        label:"Total Rides", 
          no:"0", 
        Svg:Rides
     },{ 
        label:"Cancelled Rides", 
        no:"0", 
       Svg:CancelledRides
     },{ 
      label:"Total Earnings", 
      no:"0", 
     Svg:Trinkleguad
     }] 
    ) 
    let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
    useEffect(()=>{ 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/RidePartnerDashboard/Dashboard`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Stats Fetched Successfully"}</p> });
           //setData(res?.data?.data)    
           
            let statobj=[]
              data.map(item=>{   
                if(item.label === "Cancelled Rides"){  
                     let obj2=item 
                     obj2.no=`${(res?.data?.data?.cancelledRides)?.toFixed(2)}`  
                      statobj.push(obj2)
                } 
                else if(item.label === "Total Rides"){  
                  let obj2=item 
                  obj2.no=`${(res?.data?.data?.totalRides)?.toFixed(2)}`   
                   statobj.push(obj2)
             } 
             else if(item.label === "Total Earnings"){  
               let obj2=item 
               obj2.no=`€${(res?.data?.data?.totalEarnings).toFixed(2)}` 
                statobj.push(obj2)
          } 
          else if(item.label === "Tips"){  
            let obj2=item 
            obj2.no=`€${(res?.data?.data?.tip)?.toFixed(2)}`  
             statobj.push(obj2)
       } 
       setData(statobj)
              })
         
           setLoader(false)
      }).catch((error)=>{       
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{error?.response?.data?.message ? error?.response?.data?.message :"Stats Fetching Failed"}</p> });
        
      })   
    },[])   
    return(  
        <div className="flex flex-wrap font-poppins text-main-color w-full rounded gap-4   flex-row justify-center">  
           { 
            data.map((stat,index)=>{ 
                const Svg=stat.Svg; 
                return(  
                    <div className="w-[203.66px] h-[154.78px] pl-[20px]  mt-1 p-2 flex flex-wrap border border-[#EFEEEB] rounded-2xl flex-row justify-between">    
                         <div className={`flex w-full fill-text-main-color flex-row flex-wrap justify-between `}>  
                           <div className={`flex flex-row flex-wrap  bg-[#E8E8E8] rounded-xl w-[34.62px] h-[34.62px]  ${index === 1 ? "pt-[6px] pl-[4px]" :  index === 2 ? "pt-[4px] pl-[4px]":"pl-[1px]"}`} >
                             <Svg className=""/>  
                              </div>
                             
                         <h1 className="w-full text-[18px] mt-[-10px]">{stat.label}</h1> 
                         <h1 className="w-full font-bold text-[22px]  mt-[-25px]">{stat.no}</h1>
                          </div>
                      </div>
                )
            })
            }
          
          </div>
    )
}