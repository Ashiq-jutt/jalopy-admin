import {useState} from "react";  
import { Button } from "primereact/button";
import moment from "moment";
export default function CarDetails({cardetails,setShowDetails}){    
  const [showEditComponent,setShowEditComponent]=useState(false) 
  const [driverDetailActive,setDriverDetailActive]=useState(false) 
  const [carDetailActive,setCarDetailActive]=useState(true)   
   const [addedDriver,setAddedDriver]=useState(false)     
   console.log("car complete details",cardetails)
     return ( 
        <div className="text-main-color flex flex-wrap flex-row justify-center">     
         <div className="w-full ml-2 mt-4 flex flex-wrap flex-row justify-left"> 
         <Button     onClick={()=> 
               {
               setShowDetails(false)

               }
               } label="Back" className={`pl-2 pr-2 w-[150px] rounded-lg  p-1 bg-main-color text-white`}  
            />   
             </div>
        <div className="flex ml-2 flex-wrap w-full font-poppins mt-4 flex-row justify-left gap-3"> 
           <Button     onClick={()=> 
               {
                setCarDetailActive(true) 
                setDriverDetailActive(false) 

               }
               } label="Car Details" className={`pl-2 pr-2 w-[150px] rounded-lg  p-1 ${carDetailActive ? "bg-main-color text-white":"text-main-color border border-main-color"}`}  
            />   
             <Button    
               onClick={()=> 
               {
                setCarDetailActive(false) 
                setDriverDetailActive(true) 

               }
               }
              label="Driver Details" className={`pl-2 w-[150px] rounded-lg pr-2 p-1 ${driverDetailActive ? "bg-main-color text-white":"text-main-color border border-main-color"}`}  
            />
          </div>  
        { !showEditComponent ?     
           carDetailActive ?
          <div className="w-[100%] ml-2 md:w-[80%] lg:w-[50%]">
          <h1 className="font-poppins font-bold text-[21px] mt-4 ">
          Car Details
         </h1>   
          
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car No :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4  inline font-poppins">
           {cardetails?.carNo}
         </h1>        
         </div>      
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="font-poppins font-normal mt-4 inline text-[16px]  ">
           Manufacture :
         </h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
           {cardetails?.company}
         </h1> 
         </div>
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="font-poppins font-normal mt-4 inline text-[16px]  ">
           Model :
         </h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
           {cardetails?.model}
         </h1> 
         </div>
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">Year:</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
           {cardetails?.madeYear}
         </h1> 
          </div>   
          <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
           Color :
         </h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
           {cardetails?.color}
         </h1> 
         </div>   
         <div className="mt-4 flex flex-wrap flex-row justify-between">  
          <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">No Of Seats :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.noOfSeats}
         </h1>
           </div>
          <div className="mt-4 flex flex-wrap flex-row justify-between" >  
          <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registeration Date :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.registerationDate ? moment.utc(cardetails?.registerationDate).format('DD MMM YYYY [at] HH:mm'):""}
         </h1>
           </div> 
           <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Status :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
           {cardetails?.status ? "Yes" :"No" }
         </h1>        
         </div>  
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Tuv :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
           {cardetails?.tuvData ? moment.utc(cardetails?.tuvDate).format(format('DD MMM YYYY [at] HH:mm')):"" }
         </h1>        
         </div>       
         <h1 className="font-poppins font-bold text-[21px] mt-8 ">
         Documents
         </h1>             
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Image :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.image ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.image)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.image?.split('/').pop();
      
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
          
            
           }} className="underline cursor-pointer">Image File</h1>:"Not Submitted"}
         </h1>        
         </div>  
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car License :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.license ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.license)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.license?.split('/').pop();
      
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
          
            
           }} className="underline cursor-pointer">License File</h1> : "Not Submitted"}
         </h1>        
         </div>     
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car Registration:</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.registeration ? <h1 onClick={()=>{ 
          
          fetch(cardetails?.registeration)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.registeration?.split('/').pop();
      
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
          
            
           }} className="underline cursor-pointer">Registration File</h1>:"Not Submitted"}
         </h1>        
         </div>   
         <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">TUV :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.tuv ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.tuv)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.tuv?.split('/').pop();
      
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
          
            
           }} className="underline cursor-pointer">Tuv File</h1>:"Not Submitted"}
         </h1>        
         </div>   
           
        
            </div>: <> 
            {cardetails?.driver ?
              <div className="ml-2  w-[100%] md:w-[80%] lg:w-[50%]">
              <h1 className="font-poppins font-bold text-[21px] mt-4 ">
              Driver Details
             </h1>   
              
             <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Name :</h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4  inline font-poppins">
              {/* {cardetails?.lastName} {cardetails?.firstName}*/  } 
              {cardetails?.driver?.fullName}
        
             </h1>        
             </div>      
              <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="md:w-[200px] w-[150px]  font-poppins font-normal mt-4 inline text-[16px]  ">
               DOB :
             </h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
             
               {cardetails?.driver?.dob ? moment.utc(cardetails?.driver?.dob).format('DD MMM YYYY [at] HH:mm'):""}
             </h1> 
             </div>
              <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="w-[155px] md:w-[200px] font-poppins inline font-normal text-[16px] mt-4 ">License Class:</h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">
               {cardetails?.driver?.driverDocument?.licenseClass}
             </h1> 
              </div>   
              <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
               Email :
             </h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal mt-4 inline font-poppins">
               {cardetails?.driver?.email}
             </h1> 
             </div>   
            
              <div className="mt-4 flex flex-wrap flex-row justify-between" >  
              <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">City , State :</h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
               {cardetails?.driver?.city}  {cardetails?.driver?.state}
             </h1>
               </div> 
               <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registration Date :</h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline  mt-4 font-poppins">     
             {cardetails?.driver?.driverDocument?.registerationDate ? moment.utc(cardetails?.driver?.driverDocument?.registerationDate).format('DD MMM YYYY [at] HH:mm'):""}
             </h1>        
             </div>  
              
             <h1 className="font-poppins font-bold text-[21px] mt-8 ">
             Documents
             </h1>          
             <div className="mt-4 flex flex-wrap flex-row justify-between">
         <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Image :</h1>
         <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
           {cardetails?.driver?.imagePath ?  <h1 onClick={()=>{ 
          
          fetch(cardetails?.driver?.imagePath)
          .then(response => {
            const filename = response.headers.get('Content-Disposition')
              ?.split('filename=')[1]
              ?.split(';')[0]
              ?.replace(/"/g, '') || cardetails?.driver?.imagePath?.split('/').pop();
      
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
          
            
           }} className="underline cursor-pointer">Image File</h1>:"Not Submitted"}
         </h1>        
         </div>  
             <div className="mt-4 flex flex-wrap flex-row justify-between">
             <h1 className="w-[150px] md:w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">ID CARD :</h1>
             <h1 className="w-[calc(100%-155px)] md:w-[200px] font-normal inline mt-4 font-poppins">
               {cardetails?.driver?.driverDocument?.idCard ?  <h1 onClick={()=>{ 
              
              fetch(cardetails?.driver?.driverDocument?.idCard)
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
               {cardetails?.driver?.driverDocument?.license ?   <h1 onClick={()=>{ 
              
              fetch(cardetails?.driver?.driverDocument?.license)
              .then(response => {
                const filename = response.headers.get('Content-Disposition')
                  ?.split('filename=')[1]
                  ?.split(';')[0]
                  ?.replace(/"/g, '') || cardetails?.driver?.driverDocument?.license?.split('/').pop();
          
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
               {cardetails?.driver?.driverDocument?.registeration ?  <h1 onClick={()=>{ 
              
              fetch(cardetails?.driver?.driverDocument?.registeration)
              .then(response => {
                const filename = response.headers.get('Content-Disposition')
                  ?.split('filename=')[1]
                  ?.split(';')[0]
                  ?.replace(/"/g, '') || cardetails?.driver?.driverDocument?.registeration?.split('/').pop();
          
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
               {cardetails?.driver?.driverDocument?.transportLicense ?  <h1 onClick={()=>{ 
              
              fetch(cardetails?.driverDocument?.transportLicense)
              .then(response => {
                const filename = response.headers.get('Content-Disposition')
                  ?.split('filename=')[1]
                  ?.split(';')[0]
                  ?.replace(/"/g, '') || cardetails?.driver?.driverDocument?.transportLicense?.split('/').pop();
          
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
            
               
            
                </div>   :<h1 className="text-main-color font-poppins w-full text-center">Driver Not Assigned</h1>    

} 
</>
             :<h1>Added Driver Will Show Here</h1>} 

     </div>
     )
}