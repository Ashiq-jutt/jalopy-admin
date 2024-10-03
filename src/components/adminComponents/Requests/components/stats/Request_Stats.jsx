import { useEffect, useState } from "react";
import { registrationStats } from "../../../commonstats/CommonStats";
import { Approved,Pending,RidePartner } from "./assets/Svg";
export default function DriverStats(){  
     const [data,setData]=useState([{ 
    label:"Total Requests", 
    no:"0", 
    percent:"16%", 
    up:true,  
    Svg:RidePartner
     },{ 
        label:"Approved", 
        no:"0", 
        percent:"21%", 
        up:false,  
        Svg:Approved
     },{ 
        label:"Pending", 
        no:"0", 
       Svg:Pending
     }]  )
     useEffect(() => {  

      const fetchData = async () => {
        const res = await registrationStats();
    
    
      let statobj=[]
      data.map(item=>{   
        if(item.label === "Total Requests"){  
             let obj2={...item} 
             obj2.no=` ${res?.total}`  
              statobj.push(obj2)
        } 
        else if(item.label === "Approved"){  
          let obj2={...item} 
          obj2.no=` ${res?.approved}`   
           statobj.push(obj2)
     } 
     
  else if(item.label === "Pending"){  
    let obj2={...item} 
    obj2.no=` ${(res?.pending)}`  
     statobj.push(obj2) 
     
} 
else if(item.label === "Rejected"){  
  {/* let obj2={...item} 
   obj2.no=` ${(res?.rejected)}`  
    statobj.push(obj2)  
    */}
    
} 
setData(statobj)
      })      

    }
      fetchData();
    }, []);
    return(    
      <div className="w-full flex flex-wrap flex-row justify-center ">
      <div className="flex rounded-md shadow-md p-3  w-full max-w-[985px] pt-5 pb-5 pl-10 pr-10  mt-4 rounded flex-wrap flex-row justify-around md:justify-between"> 
          { 
            data.map((stat,index)=>{ 
                const Svg=stat.Svg; 
                return( < div className={`  ${index === 1 || index === 0 ? "md:border-r-[2px]":"border-none"} border-main-color    mt-2 md:mt-0  w-[250px]     mt-4 flex flex-wrap flex-row justify-left gap-2  `}>
                  <div className={`bg-gradient-to-b  rounded-full w-[84px] h-[84px]  flex flex-wrap flex-row justify-center items-center from-blue-100 via-blue-200 to-blue-300`}>
                   <Svg/>
                         
                         </div>
                         <div className="w-[150px]">  
                             <h1 className="text-main-color w-full">{stat.label}</h1> 
                             
                             <h1 className="text-main-color  font-bold text-[25px] w-full">{stat.no}</h1> 
                            
                            </div> 
                         </div>
                )
            })
            }
          
          </div> 
           </div>
    )
}