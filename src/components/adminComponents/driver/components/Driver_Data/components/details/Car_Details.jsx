import{useState} from "react";  
import moment from "moment";
import { formattedDate } from "../../../../../../Utils";
export default function DriverDetails({cardetails,setShowDetails}){   
  const [showEditComponent,setShowEditComponent]=useState(false) 

     return ( 
        <div className="text-main-color flex flex-wrap flex-row justify-center">   
          
        { !showEditComponent ?   
          <div className="w-[100%] md:w-[80%] lg:w-[50%]">
          <h1 className="font-poppins font-bold text-[21px] mt-4 ">
          Driver Details
         </h1>   
          
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Name :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4  inline font-poppins">
          {/* {cardetails?.lastName} {cardetails?.firstName}*/  } 
          {cardetails?.fullName}
    
         </h1>        
         </div>      
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="md:w-[200px] w-[150px]  font-poppins font-normal mt-4 inline text-[16px]  ">
           DOB :
         </h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
           {formattedDate(cardetails?.dob)}
         </h1> 
         </div>
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[155px] md:w-[200px] font-poppins inline font-normal text-[16px] mt-4 ">License Class:</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
           {cardetails?.driverDocument?.licenseClass}
         </h1> 
          </div>   
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
           Email :
         </h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
           {cardetails?.email}
         </h1> 
         </div>   
        
          <div className="mt-4 flex flex-wrap flex-row justify-between" >  
          <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">City , State :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.city}  {cardetails?.state}
         </h1>
           </div> 
           <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registration Date :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
           {formattedDate(cardetails?.driverDocument?.registerationDate)}
         </h1>        
         </div>  
          
         <h1 className="font-poppins font-bold text-[21px] mt-8 ">
         Documents
         </h1>  
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Image :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.imagePath ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.imagePath)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.imagePath?.split('/').pop();
      
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
          
            
           }} className="cursor-pointer underline">Image File</h1> : "Not Submitted"}
         </h1>        
         </div>           
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">ID CARD :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.driverDocument?.idCard ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.driverDocument?.idCard)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.driverDocument?.idCard?.split('/').pop();
      
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
           {cardetails?.driverDocument?.license ?   <h1 onClick={()=>{ 
          
          fetch(cardetails?.driverDocument?.license)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.driverDocument?.license?.split('/').pop();
      
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
           {cardetails?.driverDocument?.registeration ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.driverDocument?.registeration)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.driverDocument?.registeration?.split('/').pop();
      
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
           {cardetails?.driverDocument?.transportLicense ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.driverDocument?.transportLicense)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.driverDocument?.transportLicense?.split('/').pop();
      
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
        
           
        
            </div>:undefined} 

     </div>
     )
}