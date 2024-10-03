import  { useState } from "react";  
import RequestStats from "./components/stats/Request_Stats";
import RequestCard from "./components/Request_Card/Request_Card";
import { Button } from "primereact/button";
import TopRanking from "./components/Top_Ranking/Top_Ranking"; 
import Compaigns from "./components/Campaigns/Campaigns";
import Payouts from "./components/Payouts/Payouts";
import SupportTickets from "./components/Support_Tickets/Support_Tickets";
export default function Requests(){  
    const [hideStat,setHideStat]=useState(false)   
    const [showCampaign,setShowCampaign]=useState(false) 
    
    const [showPayout,setShowPayout]=useState(false) 
    const [showSupportTicket,setShowSupportTicket]=useState(false) 
     const [showTopRanking,setShowTopRanking]=useState(false) 
      const [request,setRequests]=useState(true)
    return(  <div className="mt-4  p-2 mt-[70px]"> 
     {!hideStat ?  
         <RequestStats/> :undefined 
     }   
          
           <div className="flex flex-row flex-wrap   mb-4 items-center gap-2 justify-left mt-2 "> 
           <Button label="Account Request" onClick={()=>{ 
            setShowCampaign(false) 
            setShowPayout(false) 
            setShowTopRanking(false) 
            setShowSupportTicket(false)    
            setRequests(true)
           }} className={` mt-4 text-main-color pt-1 w-full md:w-[171px] pb-1  pr-3 pl-3 rounded-md border border-main-color ${request ? "bg-main-color text-white":""}`}/>              
           <Button label="Campaign" onClick={()=>{ 
            setShowCampaign(true) 
            setShowPayout(false)  
            setRequests(false)
            setShowTopRanking(false) 
            setShowSupportTicket(false)
           }} className={` mt-4 text-main-color pt-1 w-full md:w-[171px] pb-1  pr-3 pl-3 rounded-md border border-main-color ${showCampaign ? "bg-main-color text-white":""}`}/>  
           <Button label="Payouts"  
           onClick={()=>{ 
            setShowCampaign(false) 
            setShowPayout(true)  
            
            setRequests(false)
            setShowTopRanking(false) 
            setShowSupportTicket(false)
           }} className={` mt-4 text-main-color pt-1 w-full md:w-[171px] pb-1  pr-3 pl-3 rounded-md border border-main-color ${showPayout ? "bg-main-color text-white":""}`}/>  
          <Button onClick={()=>{ 
             setShowCampaign(false) 
             setShowPayout(false) 
             setShowTopRanking(true)  
             
            setRequests(false)
             setShowSupportTicket(false)
           }} label="Top Ranking" className={` mt-4 text-main-color pt-1 w-full md:w-[171px] pb-1  pr-3 pl-3 rounded-md border border-main-colorl ${showTopRanking ? "bg-main-color text-white":""}`}/> 
           <Button  onClick={()=>{ 
             setShowCampaign(false) 
             setShowPayout(false)  
             
            setRequests(false)
             setShowTopRanking(false) 
             setShowSupportTicket(true)
           }} label="Support Tickets" className={` mt-4 text-main-color pt-1 w-full md:w-[171px] pb-1  pr-3 pl-3 rounded-md border border-main-color ${showSupportTicket ? "bg-main-color text-white":""} `}/> 
        
         </div>
          {  
          showTopRanking ? <TopRanking/>: showCampaign ? <Compaigns/>: showPayout ? <Payouts/>:showSupportTicket ? <SupportTickets/>:
          <RequestCard setHideStat={setHideStat}/> 
        }
    </div>
    )
} 
// <RequestCard setHideStat={setHideStat}/> 