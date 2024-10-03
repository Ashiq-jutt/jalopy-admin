import { Button } from "primereact/button";
export default function CustomResponse({setCustomResponse,setHideStat}){ 
    return( 
        <div className="text-main-color ">       
                 <Button className="bg-main-color text-white pr-2 pl-2 p-1" label="Back" onClick={()=>{  
                   setCustomResponse(prev=>!prev) 
                   setHideStat(true)
                 }} 
                 />
                 <h1 className="text-[20px] mt-4">Create Custom Response</h1>
                 <div className="bg-[#F2F2F2] mt-4 rounded-md p-4"> 
              <h1 className="text-[20px]">Rejection Reasons</h1> 
              <p className="mt-4 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>   
          <h1 className="w-full mt-4 pr-2 text-right"> Send Email</h1>
            
        </div>
    )
} 