
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import NavResturantDriverPartner from "../../ResubleComponents/nav_resturant_driver_partner/nav_resturant_driver_partner";
import StartCampaignPage from "../Requests/components/Top_Ranking/Top_Ranking";
import SupportTickets from "../Requests/components/Support_Tickets/Support_Tickets";


const SupportTicketNav = () => { 
  const [sortBy,setSortBy]=useState(0)
  return (
    <div>
      <div className="p-2  mt-[70px]">
        {/*<ResturantStats />    */} 
        <div className= "flex transform mt-0 md:mt-4 p-2 md:p-0 w-full w-full  flex-row  gap-2 flex-wrap justify-left md:justify-end items-center"> 
              
              <div className="mt-2 md:mt-0 w-[50%] md:w-[200px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">    
                      <p className="w-[70px] text-[#7E7E7E] ">Sort By:</p>
                 <Dropdown placeholder="Sort By " optionLabel="label" optionValue="value" options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} onChange={(e)=>{ 
                   setSortBy(e.value)
                    
                  }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-70px)] rounded-md md:rounded-2xl   "/>
                </div>
         </div>
         <div className="flex flex-wrap justify-left  items-center mt-4 flex row ">
        <NavResturantDriverPartner identifier="supporttickets"/>  
        
        </div>
        <SupportTickets sortBy={sortBy}/>
      </div>
    </div>
  );
};

export default SupportTicketNav;
