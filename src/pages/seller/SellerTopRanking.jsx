import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { useState } from "react"
import CampaignManagment from "../../components/sellerComponents/TopRanking/CampaignManagment/MainCampaign"
import Review from "../../components/sellerComponents/TopRanking/CampaignManagment/Review/Review"
export default function SellerTopRanking(){    
    const [compaignManagment,setCompaignManagment]=useState(true)  
   const [performance,setPerformance]=useState(false)  
   const [currentStatus,setCurrentStatus]=useState(1) 
   const [searchCampaign,setSearchCampaign]=useState("")
   const [showStartCampaign,setShowStartCampaign]=useState(false)
   const [accountStatment,setAccountStatment]=useState(false)  
     return( 
        <div  className="p-2 md:p-10 text-main-color mt-[70px]">  
         <div className="flex flex-wrap items-center flex-row justify-between">  
         <div> 
             <h1 className="font-medium text-[18px]">Sponsor</h1>
         </div>
    <div className="flex flex-wrap w-full  md:w-auto flex-row justify-left"> 
    <Button iconPos="left" icon="pi pi-plus" className={`border font-poppins border-[#A25EDF] p-1 w-full mt-2 md:mt-0 md:w-auto  ${compaignManagment ? "bg-main-color text-white ":"text-main-color" } pl-2 pr-2 `} onClick={()=>{  
      setCompaignManagment(true)
      setShowStartCampaign(false)
    }} label="Create New Campaign"/> 
    <Button iconPos="left"  onClick={()=>{  
      setCompaignManagment(false)
      setShowStartCampaign(true)
    }} className={`border font-poppins border-[#A25EDF] ${showStartCampaign ? "bg-main-color text-white":"text-main-color" } p-1 w-full mt-2 md:mt-0 md:w-auto md:ml-2 pl-2 pr-2 `}  label="All Campaigns"/>
    </div>
         </div>    
          <div className="flex flex-wrap flex-row mt-[40px] items-center justify-between">
         {compaignManagment ? <div className="flex flex-wrap flex-row  mt-4 justify-left">  
                  <p  className={`${compaignManagment ? "border-b":""}  mt-2 ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} 
                  > Campaign Managment
                   </p> 
                 {/* <p   
                   className={`mt-2 ${performance ? "border-b":""} ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} >  
              Performance</p>
                  <p   className={`${accountStatment ? "border-b":""} mt-2  ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} >  
                       Account Statment
                    </p> */}
                  
                </div> :         
                 <div className="flex flex-row flex-wrap  justify-left mt-4  items-center">  
                    <Dropdown placeholder="Status" value={currentStatus} onChange={(e)=>{ 
     setCurrentStatus(e.value)
                    }} options={[{label:"Approved",value:1},{label:"Rejected",value:2},{label:"Pending",value:0}]} optionLabel="label" optionValue="value" className="text-main-color border border-[#C3C3C3] rounded-md"/>  
                     {/*<div className=" border-[#C3C3C3]  pl-2 pr-2 h-[40px] rounded-md border ml-2 flex items-center flex-wrap flex-row justify-left"> 
                       <InputText value={searchCampaign} onChange={(e)=>{ 
                        setSearchCampaign(e.target.value)
                       }} className="p-1" placeholder="Input Campaign Name"   /> 
                        <i className="pi pi-search ml-1"></i>
                     </div>   */}
                 </div>   
} 
                  { 
                    compaignManagment ? <CampaignManagment/>:showStartCampaign ? <Review searchCampaign={searchCampaign} currentStatus={currentStatus} /> :""
                   }
                 </div> 
                 
          </div>
     )
}