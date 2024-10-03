import { Button } from "primereact/button";
export default function ReportDetails({rowData,setResturantReportDetailView,setCourierReportDetailView}){  

    return( 
        <div className=" font-poppins font-normal mt-[70px] text-main-color">      
            <Button className="bg-main-color   p-1 pr-4 pl-4 mb-4 text-white" label="Back" onClick={()=>{ 
                setResturantReportDetailView(false) 
                
            }}></Button>
              <h1 className=" text-[20px] font-semibold">Report Details</h1>
          <h1 className="text-[16px] mt-4 font-semibold">ID :</h1>   
          <h1 className="">{rowData?.data?.id}</h1> 
          <h1 className="text-[16px] mt-4 font-semibold">Name :</h1>   
          <h1 className="">{rowData?.data?.userInfoDto?.name}</h1>  
           { 
             rowData?.data?.rider !== undefined ? <> 
              <h1 className="text-[16px] mt-4 font-semibold">Car Name :</h1>   
          <h1 className="">{rowData?.data?.car}</h1>  
          <h1 className="mt-4 te6t-[18px] font-semibold">Courier Address :</h1>   
          <h1 className=""> {rowData?.data?.address}</h1> 
            </> :  <>  <h1 className="text-[16px] mt-4 font-semibold">Resturant Name :</h1>   
          <h1 className="">{rowData?.data?.restaurantName}</h1>  
           {  /* 
          <h1 className="text-[16px] mt-4 font-semibold">Resturant Address :</h1>   
          <h1 className="">{rowData?.data?.address}</h1>      
           */}    
           
              </>
            }    
            
         {/* <h1 className="te6t-[18px] font-semibold">Total Sales :</h1>   
          <h1>{rowData?.data?.salesqty}</h1>   
          <h1 className="te6t-[18px] font-semibold">Top Items :</h1>   
          <ul> {  
          
           rowData?.data?.topItems ?  (rowData?.data?.topItems)?.map((item,index)=>{  
                return(
               <li className="bullet">{index} {item}</li>
    )}) :""
          
            }   
              </ul>      */}
         {/* <h1 className="te6t-[18px] font-semibold">Sales Amount:</h1>   
          <h1>{rowData?.data?.sales}</h1>   
           */}
          <h1 className="text-[16px] mt-4 font-semibold">Total Expenses:</h1>   
          <h1>€{rowData?.data?.expense}</h1> 
          {/*<h1 className="te6t-[18px] font-semibold">Top Items :</h1>   
          <ul> {  
          
            (rowData?.data?.expenseDetails)?.map((item,index)=>{  
                return(
               <li className="bullet">{index} {item.name} {item.amount}</li>
    )}) 
          
            }   
              </ul> 
               */}
          <h1 className="text-[16px] mt-4 font-semibold">Profit :</h1>   
          <h1>€{rowData?.data?.totalAmount}</h1> 
          <h1 className="text-[16x]  mt-4 font-semibold">Vat :</h1>   
          <h1>€{rowData?.data?.taxAmount}</h1> 
          <h1 className="text-[16px] mt-4 font-semibold">Payout :</h1>   
          <h1>{rowData?.data?.isPaid ? "Payout":"No Payout"}</h1>
        </div>
    )
}