import {useEffect, useState } from "react"; 
import  Axios  from "axios";   
import { Data } from "../../../utils/CompontStaticData";

const CardDasBoard = ({toast,token}) => {      
  const [data,setData]=useState(Data?.DashboardCard)  
  const [loader,setLoader]=useState(true)
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/Get`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Stats Fetched Successfully"}</p> });
         //setData(res?.data?.data)    
         
          let statobj=[]
            data.map(item=>{   
              if(item.tag === "Bookings"){  
                   let obj2={...item} 
                   obj2.number=` ${(res?.data?.data?.bookings)?.toFixed(2)}`  
                    statobj.push(obj2)
              } 
              else if(item.tag === "Today’s order"){  
                let obj2={...item} 
                obj2.number=` ${res?.data?.data?.orders}`   
                 statobj.push(obj2)
           } 
           else if(item.tag === "Today’s Revenue"){  
             let obj2={...item} 
             obj2.number=`€${(res?.data?.data?.revenue)?.toFixed(2)}` 
              statobj.push(obj2)
        } 
        else if(item.tag === "New users"){  
          let obj2={...item} 
          obj2.number=` +${(res?.data?.data?.newUsers)}`  
           statobj.push(obj2)
     } 
     setData(statobj)
            })
       
         setLoader(false)
    }).catch((error)=>{        
       
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Stats Fetching Failed"}</p> });
      
    })   
  },[])   
  return (
    <div className="flex w-full gap-4 mt-10  p-5 flex-row flex-wrap  justify-center">
      {data?.map((item) => (
        <div className=" justify-center pb-4   h-[100px] w-[302px] mt-10 shadow-custom p-3 rounded-xl font-inter ">
          <div className="flex  justify-between">
            <div
              className={`w-[64px] h-[64px] -mt-8 flex  justify-center items-center rounded-lg bg-main`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-main-color font-[300] font-normal">{item.tag}</p>
              <p className="flex justify-end font-inter font-bold  text-[28px] text-main-color">
                {" "}
                {item.number}
              </p>
            </div>
          </div>
        {/*  <div className="mt-5 ">
            <span className="text-admin-percent font-bold">+{item.persent}%</span>{" "}
           <span className="text-main-color"> {item.dayPast}</span>
          </div>   */}
        </div>
      ))}
    </div>
  );
};

export default CardDasBoard;
