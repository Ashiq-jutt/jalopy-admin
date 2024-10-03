import { Dollar } from "./assets/Svg";
export default function CompaignStats(){  
     const data=[{ 
    label:"Total Spend", 
    amount:"€233434", 
     
    Svg:Dollar
     },{ 
        label:"Total Budget", 
        amount:"€23334",
        Svg:Dollar
     },{ 
        label:"+/-", 
        amount:"€2334434", 
       Svg:Dollar
     }]
    return(    
      <div className="flex flex-wrap  flex-row items-center justify-center ">
        <div className="flex flex-wrap mt-10 shadow-sm p-4 w-[90%] rounded-md flex-row justify-evenly">  
           { 
            data.map((stat,index)=>{ 
                const Svg=stat.Svg; 
                return( < div className={`w-[300px] ${  index === 1 || index === 0 ? "border-r-[3px] border-main-color":""} flex flex-wrap flex-row justify-evenly  items-center font-poppins p-4  shadow-sm`}>
                                       <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-2 rounded-full">
                      <Svg/>
                         
                         </div>
                         <div className="w-[150px]">  
                             <h1 className="text-main-color w-full">{stat.label}</h1> 
                             
                             <h1 className="text-main-color  font-bold text-[25px] w-full">{stat.amount}</h1> 
                         
                            </div> 
                         </div>
                )
            })
            }
          
          </div> 
           </div>
    )
}