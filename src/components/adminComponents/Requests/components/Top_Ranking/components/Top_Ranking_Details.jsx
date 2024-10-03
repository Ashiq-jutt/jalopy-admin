import { Button } from "primereact/button"; 
import moment from "moment";
export default function TopRankingDetail({data,setDetailView}){     
     
     return( 
              <div className="pt-[10px] font-poppins overflow-y-auto fixed bg-white w-[100%] lg:w-[calc(100%-320px)] h-[calc(100%-70px)] top-[70px] z-30 text-main-color">   
                   <Button label="Back" className="bg-main-color text-white p-2 pr-3 pl-3 " onClick={()=>{ 
                     setDetailView(false)
                   }} />
                     <h1 className="font-bold  text-[18px] mt-4 ">Promotion Details</h1>  
                     <h1 className="font-bold mt-4 ">ID</h1> 
                     <h1>{data?.id}</h1> 
                      <h1 className="font-bold mt-4  ">Campaign Type</h1> 
                      <h1>{data?.compaignType}</h1> 
                      <h1 className="font-bold mt-4 ">Resturant Name</h1> 
                      <h1>{data?.restaurantName}</h1> 
                      <h1  className="font-bold mt-4 ">Category</h1> 
                      <h1>{data?.category}</h1> 
                      <h1 className="font-bold mt-4 ">Paid Amount</h1> 
                      <h1>{data?.amount}</h1> 
                      <h1 className="font-bold mt-4 ">Starting Date</h1> 
                      <h1>{moment().utc(data?.startData).format("DD MMMM YYYY ")}</h1> 
                      <h1 className="font-bold mt-4 ">End Date</h1> 
                      <h1>{moment().utc(data?.endData).format("DD MMMM YYYY ")}</h1> 
                     
                       <div className="flex  mt-8 flex-wrap flex-row justify-center"> 
                         <Button label="Reject" className="border border-main-color mr-5 p-1 pr-3 pl-3 " />  
                          <Button  label="Approved" className="bg-main-color  border border-main-color p-1 pr-3 pl-3 ml-5 text-white"/>
                       </div>
               </div>
     )
}