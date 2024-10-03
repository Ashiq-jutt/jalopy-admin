import DriverStats from "../../components/driverComponents/Dashboard/stats/Dashboard_Stats"
import Earnings from "../../components/driverComponents/Dashboard/EarningChart/Earning"
import Reviews from "../../components/driverComponents/Dashboard/Reviews/Reviews"
import LastTrips from "../../components/driverComponents/Dashboard/LastTrips/LastTrips"
import BookingActivity from "../../components/driverComponents/Dashboard/BookingActivity/BookingActivity"
import { useRef } from "react"
import { Toast } from "primereact/toast"
export default function DriverDahboard(){  
    let toast=useRef()
       return( 
          <div className="card mt-[90px] p-4"> 
             <DriverStats toast={toast}/>  
              <div className="flex flex-wrap justify-center md:justify-between"> 
               <div className="w-full   md:w-[59%]">
             <Earnings toast={toast}/>  
              </div> 
              <div className="w-full  md:w-[40%]">
             <Reviews toast={toast}/>  
              </div>   
              <div className="w-full  md:w-[49%]">
             <LastTrips toast={toast}/>  
              </div>    
              <div className="w-full  md:w-[49%]">
              <BookingActivity toast={toast}/> 
              </div>
              </div> 
              <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "
ref={toast}/>
          </div>
       )
}