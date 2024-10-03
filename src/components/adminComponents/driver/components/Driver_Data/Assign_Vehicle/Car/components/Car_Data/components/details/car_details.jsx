import {useState} from "react";  
import { Button } from "primereact/button";
export default function CarDetails({cardetails,setShowDetails}){   
  const [showEditComponent,setShowEditComponent]=useState(false) 

     return ( 
        <div className="text-main-color flex flex-wrap flex-row justify-center">   
            <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-left flex-row">
         
         <Button
         label="Back" 
           onClick={()=>{ 
            setShowDetails(prev=>!prev)
           }}
         className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
       />
     </div>  
        { !showEditComponent ?   
          <div className="w-[100%] md:w-[80%] lg:w-[50%]">
      <h1 className="font-poppins font-bold text-[21px] mt-4 ">
      Car Details
     </h1>   
      
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car No :</h1>
     <h1 className="w-[200px] font-normal mt-4  inline font-poppins">
       {cardetails?.carNo}
     </h1>        
     </div>      
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="font-poppins font-normal mt-4 inline text-[16px]  ">
       Manufacture :
     </h1>
     <h1 className="w-[200px] font-normal mt-4 inline font-poppins">
       {cardetails?.company}
     </h1> 
     </div>
      <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="font-poppins font-normal mt-4 inline text-[16px]  ">
       Model :
     </h1>
     <h1 className="w-[200px] font-normal mt-4 inline font-poppins">
       {cardetails?.model}
     </h1> 
     </div>
      <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">Year:</h1>
     <h1 className="w-[200px] font-normal inline  mt-4 font-poppins">
       {cardetails?.madeYear}
     </h1> 
      </div>   
      <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
       Color :
     </h1>
     <h1 className="w-[200px] font-normal mt-4 inline font-poppins">
       {cardetails?.color}
     </h1> 
     </div>   
     <div className="mt-4 flex flex-wrap flex-row justify-between">  
      <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">No Of Seats :</h1>
     <h1 className="w-[200px] font-normal inline mt-4 font-poppins">
       {cardetails?.noOfSeats}
     </h1>
       </div>
      <div className="mt-4 flex flex-wrap flex-row justify-between" >  
      <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Registration Date :</h1>
     <h1 className="w-[200px] font-normal inline mt-4 font-poppins">
       {cardetails?.registerationDate}
     </h1>
       </div> 
       <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Status :</h1>
     <h1 className="w-[200px] font-normal inline  mt-4 font-poppins">
       {cardetails?.status ? "Yes" :"No" }
     </h1>        
     </div>  
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Tuv :</h1>
     <h1 className="w-[200px] font-normal inline  mt-4 font-poppins">
       {cardetails?.tuv }
     </h1>        
     </div>       
     <h1 className="font-poppins font-bold text-[21px] mt-8 ">
     Documents
     </h1>      
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car License :</h1>
     <h1 className="w-[200px] font-normal inline mt-4 font-poppins">
       {cardetails?.license ? "Submitted" : "Not Submitted"}
     </h1>        
     </div>     
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">Car Reg No :</h1>
     <h1 className="w-[200px] font-normal inline mt-4 font-poppins">
       {cardetails?.registeration ? "Submitted":"Not Submitted"}
     </h1>        
     </div>   
     <div className="mt-4 flex flex-wrap flex-row justify-between">
     <h1 className="w-[200px] font-poppins font-normal text-[16px] mt-4 inline ">TUV :</h1>
     <h1 className="w-[200px] font-normal inline mt-4 font-poppins">
       {cardetails?.Tuv ? "Submitted" :"Not Submitted"}
     </h1>        
     </div>   
       
    
        </div>:undefined} 

     </div>
     )
}