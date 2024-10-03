import React  from "react";
import {Button} from "primereact/button" 
import { Link } from "react-router-dom";
export default function NavResturantDriverPartner({identifier}){ 
     return(   
      <div className="w-full flex flex-wrap flex-row item-start justify-between ">
        <div className="flex  flex-wrap font-poppins font-normal w-[100%] md:w-[calc(100%-150px)]   lg:mt-0 justify-left gap-4 flex-row">
           <Link to="/sidebar/restaurants"  className={`border border-main-color ${identifier === "resturant" ? "bg-main-color text-white":"text-main-color"} mt-1  rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2}`}   >   
          
        <Button  label="Resturants" className="w-[100%] text-center border-none"/> 
      
         
           </Link>  
           <Link to="/sidebar/RidePartner" className={`border border-main-color mt-1 ${identifier === "ridepartner" ? "bg-main-color text-white":"text-main-color"}  text-main-color rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2`}>  
        
        <Button label="Ride Partner" className="text-center w-[100%]"  /> 
       
        </Link>    
        <Link to="/sidebar/drivers" className={`border border-main-color ${identifier === "driver" ? "bg-main-color text-white":"text-main-color"} mt-1  rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2}`} >  
        <Button  label="Drivers" className="w-[100%] text-center border-none"/> 
        </Link>
           <Link to="/sidebar/Car" className={`border border-main-color ${identifier === "car" ? "bg-main-color text-white":"text-main-color"} mt-1  rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2}`} >  
      
        <Button label="Cars" className="w-[100%] text-center border-none" />   
        </Link>  
        <Link to="/sidebar/topranking" className={`border border-main-color ${identifier === "topranking" ? "bg-main-color text-white":"text-main-color"} mt-1  rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2}`} >  
      
      <Button label="Top Ranking" className="w-[100%] text-center border-none" />   
      </Link>
      <Link to="/sidebar/supporttickets" className={`border border-main-color ${identifier === "supporttickets" ? "bg-main-color text-white":"text-main-color"} mt-1  rounded-lg w-full md:w-[150px] p-1 pl-2 pr-2}`} >  
      
      <Button label="Support Tickets" className="w-[100%] text-center border-none" />   
      </Link>
         
       
           </div>
        </div>
     )
}