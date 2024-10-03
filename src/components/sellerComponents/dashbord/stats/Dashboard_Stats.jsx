import React, { useEffect, useState,useRef }  from "react";  
import Axios from "axios"
import {  Expenses,Revenue, TotalSales, OrderValue } from "./assets/Svg";
import { Toast } from "primereact/toast";
export default function SellerStats({toast}){   
  const [loader,setLoader]=useState(false)  
  const [data,setData]=useState([{ 
    label:"Total Sales", 
      no:"€0", 
    Svg:TotalSales, 
    increaseBy:"0%", 
    from:"Jan" 
    
 },{ 
    label:"Avg. Order Value", 
    no:"€0", 
   Svg:OrderValue, 
   increaseBy:"0%", 
   from:"Jan" 
 },{ 
  label:"Revenue", 
  no:"€0", 
 Svg:Revenue, 
 increaseBy:"0%", 
 from:"Jan" 
 },{ 
  label:"Expenses", 
  no:"€0",
  Svg:Expenses, 
  decreaseBy:"0%", 
  from:"Jan" 
   },])
 let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  
   useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/SellerDashboard/Dashboard`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Stats Fetched Successfully"}</p> });
         //setData(res?.data?.data)    
         
          let statobj=[]
            data.map(item=>{   
              if(item.label === "Total Sales"){  
                   let obj2=item 
                   obj2.no=`€${(res?.data?.data?.totalSales).toFixed(2)}`  
                    statobj.push(obj2)
              } 
              else if(item.label === "Avg. Order Value"){  
                let obj2=item 
                obj2.no=`€${(res?.data?.data?.avgOrderAmount).toFixed(2)}`   
                 statobj.push(obj2)
           } 
           else if(item.label === "Revenue"){  
             let obj2=item 
             obj2.no=`€${(res?.data?.data?.totalRevenue).toFixed(2)}` 
              statobj.push(obj2)
        } 
        else if(item.label === "Expenses"){  
          let obj2=item 
          obj2.no=`€${(res?.data?.data?.totalExpense).toFixed(2)}`  
           statobj.push(obj2)
     } 
     setData(statobj)
            })
       
         setLoader(false)
    }).catch((error)=>{       
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Stats Fetching Failed"}</p> });
      
    })   
  },[])   
    
    return(  
      <div className="flex flex-wrap font-poppins text-main-color w-full rounded gap-4   flex-row justify-center">  
           { 
            data.map((stat,index)=>{ 
                const Svg=stat.Svg; 
                return(  
                  <div className="w-[203.66px] h-[154.78px] pl-[20px]  mt-1 p-2 flex flex-wrap border-[2px] border-[#EFEEEB] rounded-2xl flex-row justify-between">   
                      <div className={`flex w-full fill-text-main-color flex-row flex-wrap justify-between `}> 
                         <div className={`flex flex-row flex-wrap  bg-[#E8E8E8] rounded-xl w-[34.62px] h-[34.62px]  ${index === 1 ? "pt-[6px] pl-[4px]" :  index === 2 ? "pt-[7px] pl-[7px]":"pt-[4px] pl-[5px]"}`} >
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