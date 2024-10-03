import { Button } from "primereact/button"
export default function ShowAllNotifications(){ 
    const notificationdata=[
    { 
        msg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
        type:"normal",
        time:"4:05 AM" 

    }
    ,{
        msg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
        type:"warning", 
        time:"4:05 AM" 
    }, 
    { 
        msg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
        type:"normal",
        time:"4:05 AM" 

    }
    ,{
        msg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
        type:"error", 
        time:"4:05 AM" 
    } 
]
    return(  
  <div className="p-5  mt-[90px]  m-5 rounded-lg font-poppins font-normal">    
      <div className="flex flex-wrap justify-between flex-row ">       
        <h1 className="text-main-color text-[24px]   font-medium">Notifications</h1> 
          <div className="w-[100%] sm:w-[100%] md:w-[50%] lg:w-[50%] text-center text-main-color mt-10 flex flex-row flex-wrap justify-around"> 
            <Button label="All" className="border mt-2 w-[100px] border-main-color  pl-4 pr-4  rounded text-main-color text-white bg-main" /> 
            <Button label="Updates" className="border mt-2  w-[100px] border-main-color pl-4 pr-4 rounded text-main-color"/> 
            <Button label="Errors " className="border mt-2  w-[100px] border-warning  pl-4 pr-4 rounded text-warning"/> 
            <Button label="Warnings" className="border mt-2 w-[100px] border-yellow pl-4 pr-4 rounded text-yellow" />
           
          </div>
        </div>  
        <div className="flex flex-wrap  mt-8 justify-around flex-row jusitfy-center">
         { 
          notificationdata.map(item=>{ 
             
            return( <div className={` p-3 pl-14 pr-10 pb-5 mt-4 shadow-custom  w-full rounded-md  flex flex-wrap items-center flex-row justify-around sm:justify-around md:justify-between  ${item.type === "normal"?" bg-[#F2F2F2] text-main-color":item.type === "warning"? "text-yellow border border-[yellow]":"text-warning border border-warning"}`}>
                 <div className=" mt-2 w-[100%] sm:w-[100%] md:w-[60%] lg:w-[60%]"> 
                        <p>{ 
                        item.msg}  
                        </p> 
                        <p> {item.time}</p>
                    </div>  
                     <p className="mt-2 text-main-color cursor-pointer">Mark As Read</p>
                    </div>
            )
          })
         } 
         </div>
         </div>
    )
}