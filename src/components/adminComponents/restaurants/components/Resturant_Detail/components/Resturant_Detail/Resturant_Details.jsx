import { Button } from "primereact/button";
import { Info } from "@mui/icons-material";  
export default function ResturantDetailPage({setUpdateResturant,setDetailPage,setShowEditComponent,resturantDetailView}){ 
    return(   
        <div className="mb-8">
        
       
      <h1 className="font-poppins font-bold text-[21px] mt-4 ">
        Resturant Details
      </h1>   
       <div className="flex w-full flex flex-wrap flex-row justify-between"> 
       <div className="flex flex-wrap justify-left items-center">
      <h1 className="font-normal font-poppins text-[21px]">
        {resturantDetailView?.name}
      </h1>   
      <div className="ml-4 mt-[-2px]">      
      <div className="flex flex-wrap flex-row justify-center items-center "> 
         <div className="overflow-hidden w-[100px] border mt-4  border-main-color rounded-full h-[100px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >
                 
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }} onLoad={(event)=>{ 
          const { naturalWidth, naturalHeight } = event.target; 
           if(naturalWidth > naturalHeight){ 
            event.target.style="width:auto;height:100%"  
             
           } 
           else{ 
            event.target.style="width:100%;height:auto"  
         
           }

         }}   src={resturantDetailView?.image} />  
         </div>

         
        </div>   
       </div>  
        
      </div>  
      
       </div>
      <div className="flex flex-wrap flex-row justify-left">
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">Name : </h1>
      <h1 className="font-normal font-poppins mt-4 ml-3 ">
        {resturantDetailView?.firstName} {resturantDetailView?.lastName}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] ml-5  mt-4 ">DOB :</h1>
      <h1 className="font-normal font-poppins mt-4 ml-3">{resturantDetailView?.dob ? moment().utc(resturantDetailView?.dob).format("DD MMMM YYYY "):""}</h1>     
        <h1 className="mt-4 md:ml-[200px] font-poppins"><span className="text-[#109B2F] mr-3 ">See</span>  <Button label="Delete" className="bg-main-color text-white w-[100px]"/></h1>
      </div>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">
        Resturant Address :&nbsp;&nbsp;
      </h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.street1Address} {resturantDetailView?.street2Address}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">Name :</h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView.name}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">Description</h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.description}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">
        Available Space :
      </h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.maxPersons}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">Website :</h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.website}
      </h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">
        PickUp And Delivery :&nbsp;&nbsp;
      </h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.isProvidingPickup ? "Yes":"No"}
      </h1>
      

      <h1 className="font-poppins font-bold text-[16px] mt-4 ">Tax ID :&nbsp;&nbsp;</h1>
      <h1 className="font-normal font-poppins">{resturantDetailView?.taxId}</h1>
      <h1 className="font-poppins font-bold text-[16px] mt-4 ">
        Additional Information :&nbsp;&nbsp;
      </h1>
      <h1 className="font-normal font-poppins">
        {resturantDetailView?.additionalInfo}
      </h1>  
          <div className="flex flex-wrap mt-8 flex-row justify-center gap-4 w-full"> 
    <Button label="Delete" className="border w-[100px] border-main-color pl-4 pr-4 p-1"/> 
    <Button label="Inquiry" className="border w-[100px] border-main-color pl-4 pr-4 p-1"/> 
    <Button label="Edit" onClick={()=>{  
      setUpdateResturant(true) 
        setDetailPage(prev=>!prev) 
      
      //setShowEditComponent(prev=>!prev)  
       
    
    }} className="border w-[100px] border-main-color pl-4 pr-4 p-1"/> 
    <Button label="Approve" className="border w-[100px] bg-main-color text-white border-main-color pl-4 pr-4 p-1"/> 
          </div>
       </div>
    )
}