import {useState} from "react";  

import { Button } from "primereact/button";
export default function DriverDetailsPage({driverDetailView}){   
  
  const [showEditComponent,setShowEditComponent]=useState(false)  
     return ( 
        <>    
          { !showEditComponent ?   
          <>
      <h1 className="font-poppins font-bold text-[21px] mt-4 ">
      Driver Details
     </h1>   
      
     <div className="flex flex-wrap flex-row justify-left mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 ">Last Name, Name :</h1>
     <h1 className="font-normal font-poppins mt-4 ml-3 ">
       {driverDetailView.driverData.lastname}, {driverDetailView.driverData.name}
     </h1>   
     </div> 
      <div className="mt-4">
     <h1 className="font-poppins font-bold inline text-[16px]  ">
       Handy No  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.driverData?.handyno}
     </h1> 
     </div>
      <div className="mt-4">
     <h1 className="font-poppins inline font-bold text-[16px] mt-4 ">D:O:B  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.driverData?.dob}
     </h1> 
      </div>   
      <div className="mt-4">
     <h1 className="font-poppins inline font-bold text-[16px] mt-4 ">
       License Class  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.driverData?.licenseclass}
     </h1> 
     </div>   
     <div className="mt-4">  
      <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Email  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.driverData?.email}
     </h1>
       </div>   
       <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Address  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.driverData?.address}
     </h1>        
     </div>   
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">City , State  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.driverData?.city} {driverDetailView?.driverData?.state}
     </h1>        
     </div>  
      <div className="mt-4" >  
      <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Registration Date  </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.driverData?.registrationdate}
     </h1>
       </div>     
       <h1 className="font-poppins font-bold text-[21px] mt-8 ">
     Documents
     </h1>      
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Ausweis (ID) :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.Ausweis}
     </h1>        
     </div>     
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Führschein (License) :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.Führschein}
     </h1>        
     </div>   
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Anmeldung ( Registration) :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.Anmeldung}
     </h1>        
     </div>   
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">P-Schein (Passenger transport license) :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView.carData.PSchein}
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
          onClick={()=>{setShowEditComponent(prev=>!prev)}}
          label="Unlock"
          className={`border border-main-color mt-1 text-white bg-main-color  rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2`}
        />
        <Button
          label="Inquiry" 
          onClick={()=>{ setShowEditComponent(prev=>!prev)}}
          className={`border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px]  font-normal  p-1 pl-2 pr-2`}
        />  
          <Button
          label="Save" 
          onClick={()=>{ setShowEditComponent(prev=>!prev)}}
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>  </>:undefined    
      }
     </>
     )
}