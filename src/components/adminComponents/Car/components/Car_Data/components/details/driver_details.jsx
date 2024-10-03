import {useState} from "react";  

import { Button } from "primereact/button";
export default function DriverDetailsPage({driverDetailView}){   
  console.log("driver detail view is",driverDetailView)
  const [showEditComponent,setShowEditComponent]=useState(false)      
  const [driverDetailActive,setDriverDetailActive]=useState(false) 
  const [carDetailActive,setCarDetailActive]=useState(true)
     return ( 
        <div className="text-main-color">    
          { !showEditComponent ?       
          carDetailActive ?
          <>
      <h1 className="font-poppins font-bold text-[21px] mt-4 ">
      Car Details
     </h1>   
      
     <div className="text-main-color flex flex-wrap flex-row justify-left mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 ">Last Name, Name :</h1>
     <h1 className="font-normal font-poppins mt-4 ml-3 ">
       {driverDetailView?.carData?.lastname}, {driverDetailView?.carData?.name}
     </h1>   
     </div> 
      <div className="mt-4">
     <h1 className="font-poppins font-bold inline text-[16px]  ">
       Model :
     </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.model}
     </h1> 
     </div>
      <div className="mt-4">
     <h1 className="font-poppins inline font-bold text-[16px] mt-4 ">Year:</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.year}
     </h1> 
      </div>   
      <div className="mt-4">
     <h1 className="font-poppins inline font-bold text-[16px] mt-4 ">
       Color :
     </h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.color}
     </h1> 
     </div>   
     <div className="mt-4">  
      <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">No Of Seats :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.seats}
     </h1>
       </div>
      <div className="mt-4" >  
      <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Registration Date :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.registrationdate}
     </h1>
       </div> 
       <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Status :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.status}
     </h1>        
     </div>  
     <div className="mt-4">
     <h1 className="font-poppins font-bold text-[16px] mt-4 inline ">Car No :</h1>
     <h1 className="font-normal inline font-poppins">
       {driverDetailView?.carData?.carno}
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
      </div>  </>:  
       <div className="w-[100%] md:w-[80%] lg:w-[50%]">
       <h1 className="font-poppins font-bold text-[21px] mt-4 ">
       Driver Details
      </h1>   
       
      <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Name :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4  inline font-poppins">
       {/* {driverDetailView?.lastName} {driverDetailView?.firstName}*/  } 
       {driverDetailView?.fullName}
 
      </h1>        
      </div>      
       <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="md:w-[200px] w-[150px]  font-poppins font-normal mt-4 inline text-[16px]  ">
        DOB :
      </h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
        {formattedDate(driverDetailView?.dob)}
      </h1> 
      </div>
       <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[155px] md:w-[200px] font-poppins inline font-normal text-[16px] mt-4 ">License Class:</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
        {driverDetailView?.driverDocument?.licenseClass}
      </h1> 
       </div>   
       <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
        Email :
      </h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
        {driverDetailView?.email}
      </h1> 
      </div>   
     
       <div className="mt-4 flex flex-wrap flex-row justify-between" >  
       <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">City , State :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
        {driverDetailView?.city}  {driverDetailView?.state}
      </h1>
        </div> 
        <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registration Date :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
        {formattedDate(driverDetailView?.driverDocument?.registerationDate)}
      </h1>        
      </div>  
       
      <h1 className="font-poppins font-bold text-[21px] mt-8 ">
      Documents
      </h1>          
      <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">ID CARD :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
        {driverDetailView?.driverDocument?.idCard ?  <h1 onClick={()=>{ 
       
       fetch(driverDetailView?.driverDocument?.idCard)
       .then(response => {
         const filename = response.headers.get('Content-Disposition')
           ?.split('filename=')[1]
           ?.split(';')[0]
           ?.replace(/"/g, '') || driverDetailView?.driverDocument?.idCard?.split('/').pop();
   
         return response.blob().then(blob => ({ blob, filename }));
       })
       .then(({ blob, filename }) => {
         const url = window.URL.createObjectURL(blob);
         const anchor = document.createElement('a');
         anchor.href = url;
         anchor.download = filename; // Use the filename from the server
         document.body.appendChild(anchor);
         anchor.click();
         document.body.removeChild(anchor);
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error('Download failed:', error));
       
         
        }} className="cursor-pointer underline">ID Card</h1> : "Not Submitted"}
      </h1>        
      </div>      
      <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">License :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
        {driverDetailView?.driverDocument?.license ?   <h1 onClick={()=>{ 
       
       fetch(driverDetailView?.driverDocument?.license)
       .then(response => {
         const filename = response.headers.get('Content-Disposition')
           ?.split('filename=')[1]
           ?.split(';')[0]
           ?.replace(/"/g, '') || driverDetailView?.driverDocument?.license?.split('/').pop();
   
         return response.blob().then(blob => ({ blob, filename }));
       })
       .then(({ blob, filename }) => {
         const url = window.URL.createObjectURL(blob);
         const anchor = document.createElement('a');
         anchor.href = url;
         anchor.download = filename; // Use the filename from the server
         document.body.appendChild(anchor);
         anchor.click();
         document.body.removeChild(anchor);
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error('Download failed:', error));
       
         
        }} className="cursor-pointer underline">License File</h1> : "Not Submitted"}
      </h1>        
      </div>        
      <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registeration :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
        {driverDetailView?.driverDocument?.registeration ?  <h1 onClick={()=>{ 
       
       fetch(driverDetailView?.driverDocument?.registeration)
       .then(response => {
         const filename = response.headers.get('Content-Disposition')
           ?.split('filename=')[1]
           ?.split(';')[0]
           ?.replace(/"/g, '') || driverDetailView?.driverDocument?.registeration?.split('/').pop();
   
         return response.blob().then(blob => ({ blob, filename }));
       })
       .then(({ blob, filename }) => {
         const url = window.URL.createObjectURL(blob);
         const anchor = document.createElement('a');
         anchor.href = url;
         anchor.download = filename; // Use the filename from the server
         document.body.appendChild(anchor);
         anchor.click();
         document.body.removeChild(anchor);
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error('Download failed:', error));
       
         
        }} className="cursor-pointer underline">Registration File</h1> : "Not Submitted"}
      </h1>        
      </div>   
      
    
      <div className="mt-4 flex flex-wrap flex-row justify-between">
      <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Passenger Transport License :</h1>
      <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
        {driverDetailView?.driverDocument?.transportLicense ?  <h1 onClick={()=>{ 
       
       fetch(driverDetailView?.driverDocument?.transportLicense)
       .then(response => {
         const filename = response.headers.get('Content-Disposition')
           ?.split('filename=')[1]
           ?.split(';')[0]
           ?.replace(/"/g, '') || driverDetailView?.driverDocument?.transportLicense?.split('/').pop();
   
         return response.blob().then(blob => ({ blob, filename }));
       })
       .then(({ blob, filename }) => {
         const url = window.URL.createObjectURL(blob);
         const anchor = document.createElement('a');
         anchor.href = url;
         anchor.download = filename; // Use the filename from the server
         document.body.appendChild(anchor);
         anchor.click();
         document.body.removeChild(anchor);
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error('Download failed:', error));
       
         
        }} className="cursor-pointer underline">Transport License File</h1> :"Not Submitted"}
      </h1>        
      </div>    
     
        
     
         </div>
      :undefined    
      }
     </div>
     )
}