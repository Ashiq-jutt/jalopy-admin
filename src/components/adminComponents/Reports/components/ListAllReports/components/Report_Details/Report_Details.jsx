import { Button } from "primereact/button";
export default function ReportDetails({rowData,setResturantReportDetailView,setCourierReportDetailView}){  
    return( 
        <div className="mt-10 font-poppins font-normal text-main-color">      
            <Button className="bg-main-color p-1 pr-2 pl-2 text-white" label="Back" onClick={()=>{ 
                setResturantReportDetailView(false) 
                
                setCourierReportDetailView(false)
            }}></Button>
              <h1 className=" text-[20px] font-semibold">Report Details</h1>
          <h1 className="text-[18px] font-semibold">ID :</h1>   
          <h1>{rowData?.data?.id}</h1> 
          <h1 className="text-[18px] font-semibold">Name :</h1>   
          <h1>{rowData?.data?.owner}</h1>  
           { 
             rowData?.data?.car !== undefined ? <> 
              <h1 className="text-[18px] font-semibold">Car Name :</h1>   
          <h1>{rowData?.data?.car}</h1>  
          <h1 className="text-[18px] font-semibold">Courier Address :</h1>   
          <h1>{rowData?.data?.address}</h1> 
            </> :  <>  <h1 className="text-[18px] font-semibold">Resturant Name :</h1>   
          <h1>{rowData?.data?.resturant}</h1>   
          <h1 className="text-[18px] font-semibold">Resturant Address :</h1>   
          <h1>{rowData?.data?.address}</h1>      
           
              </>
            }    
            
          <h1 className="text-[18px] font-semibold">Total Sales :</h1>   
          <h1>{rowData?.data?.salesqty}</h1>   
          <h1 className="text-[18px] font-semibold">Top Items :</h1>   
          {/*<ul> {  
          
            (rowData?.data?.topItems).map((item,index)=>{  
                return(
               <li className="bullet"> {item}</li>
    )}) 
          
            }   
              </ul>  */}
          <h1 className="text-[18px] font-semibold">Sales Amount:</h1>   
          <h1>{rowData?.data?.sales}</h1> 
          <h1 className="text-[18px] font-semibold">Total Expenses 20% :</h1>   
          <h1>{rowData?.data?.expenses}</h1> 
          <h1 className="text-[18px] font-semibold">Top Items :</h1>   
         {/* <ul> {  
          
            (rowData?.data?.expenseDetails).map((item,index)=>{  
                return(
               <li className="bullet">{index} {item.name} {item.amount}</li>
    )}) 
          
            }   
              </ul>*/}
          <h1 className="text-[18px] font-semibold">Profit :</h1>   
          <h1>{rowData?.data?.profit}</h1> 
          <h1 className="text-[18px] font-semibold">Vat :</h1>   
          <h1>{rowData?.data?.vat}</h1> 
          <h1 className="text-[18px] font-semibold">Payout :</h1>   
          <h1>{rowData?.data?.payout}</h1>
        </div>
    )
}