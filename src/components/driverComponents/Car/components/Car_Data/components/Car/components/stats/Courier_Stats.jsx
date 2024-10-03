import { OpenNow, RidePartner } from "./assets/Svg";
export default function DriverStats(){  
     const data=[{ 
    label:"Total Drivers", 
    no:"233434", 
    percent:"16%", 
    up:true,  
    Svg:RidePartner
     },{ 
        label:"New Registration", 
        no:"2334434", 
        percent:"21%", 
        up:false,  
        Svg:RidePartner
     },{ 
        label:"Active Now", 
        no:"2334434", 
       Svg:OpenNow
     }]
    return(  
        <div className="flex p-4 shadow-md rounded flex-wrap flex-row justify-evenly">  
           { 
            data.map((stat,index)=>{ 
                const Svg=stat.Svg; 
                return( < div className={`w-[230px] ${  index === 1 || index === 0 ? "border-r-[3px] border-main-color":""} p-2  pl-3  mt-4 flex flex-wrap flex-row justify-between items-center `}>
                    <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-2 rounded-full">
                 
                      <Svg/> 
                       </div>
                        
                         <div className="w-[150px]">  
                             <h1 className="text-main-color w-full">{stat.label}</h1> 
                             
                             <h1 className="text-main-color  font-bold text-[25px] w-full">{stat.no}</h1> 
                             <>{stat.percent ? stat.up ? <h1 className=" font-poppins font-normal text-[#00AC4F]"><span className="pi pi-arrow-up mr-1"></span>{stat.percent} <span className="text-main-color">this month</span></h1>:<h1 className="text-[#D0004B] font-poppins font-normal "><span className="pi pi-arrow-down mr-1  "/>{stat.percent} <span className="text-main-color">this month</span></h1> :undefined} 
                             </>
                            </div> 
                         </div>
                )
            })
            }
          
          </div>
    )
}