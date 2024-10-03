import {useState} from "react";  
import { Button } from "primereact/button";
export default function CarDetails({driverDetailView}){   
  const [showEditComponent,setShowEditComponent]=useState(false) 

     return ( 
        <>   
        { !showEditComponent ?   
          <>
      <h1 className="font-poppins font-semibold text-[21px] mt-4 ">
      Car Details
     </h1>   
      
     <div className="flex flex-wrap flex-row justify-left mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 ">Manufacturer :  </h1>
     <h1 className="font-normal font-poppins mt-4 ml-3 ">
       {driverDetailView?.carData?.manufacture}
     </h1>   
     </div>  
     <div className="mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">Car No :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.carno}
     </h1>        
     </div>
      <div className="mt-4">
     <h1 className="font-poppins font-semibold inline text-[16px]  ">
       Model :
     </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.model}
     </h1> 
     </div>
      <div className="mt-4">
     <h1 className="font-poppins inline font-semibold text-[16px] mt-4 "> Made Year :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.year}
     </h1> 
      </div>   
      <div className="mt-4">
     <h1 className="font-poppins inline font-semibold text-[16px] mt-4 ">
       Color :
     </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.color}
     </h1> 
     </div>   
     <div className="mt-4">  
      <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">No Of Seats :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.seats}
     </h1>
       </div> 
       <div className="mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">Registration Status :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.status}
     </h1>        
     </div>
      <div className="mt-4" >  
      <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">TÜV :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.registrationdate}
     </h1>
       </div> 
     
               
     <h1 className="font-poppins font-semibold text-[21px] mt-8 ">
     Documents
     </h1>      
     <div className="mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">Car License :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.license}
     </h1>        
     </div>     
     <div className="mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">Car Reg No. :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.carregno}
     </h1>        
     </div>   
     <div className="mt-4">
     <h1 className="font-poppins font-semibold text-[16px] mt-4 inline ">TÜV :  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.tuv}
     </h1>        
     </div>   
         
     <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete Profile"
          className="border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button
          label="Freeze"
          className="border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button  
         label="Unlock"
          className={`border border-main-color mt-1 text-white bg-main-color  rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2`}
        />
        <Button
          label="Inquiry" 
          
          className={`border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px]  font-normal  p-1 pl-2 pr-2`}
        />  
          <Button
          label="Save" 
          
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
        </>:undefined} 

     </>
     )
}