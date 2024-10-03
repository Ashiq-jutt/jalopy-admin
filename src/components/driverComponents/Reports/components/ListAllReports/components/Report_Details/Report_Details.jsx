import { Button } from "primereact/button";
import moment from "moment";
export default function ReportDetails({rowData,setResturantReportDetailView,setCourierReportDetailView}){  
   
    return( 
        <div className=" bg-[white] font-poppins font-normal text-main-color">      
            <Button className="bg-main-color p-1 pr-2 pl-2 text-white" label="Back" onClick={()=>{ 
                setResturantReportDetailView(false) 
                
                setCourierReportDetailView(false)
            }}></Button>
               <h1 className="font-semibold  text-[18px] mt-4 ">Report Details</h1>
      <h1 className="font-semibold mt-4  ">ID</h1>
      <h1  className="mt-2">{rowData?.id}</h1> 
      <h1 className="font-semibold mt-4  ">Vehicle</h1>
      <h1  className="mt-2">{rowData?.vehicleName}</h1> 
      
      <h1 className="font-semibold mt-4  ">Rider</h1>
      <h1  className="mt-2">{rowData?.rider?.name}</h1>
      <h1 className="font-semibold mt-4 ">From Location</h1>
      <h1 className="mt-2">{rowData?.fromLocation}</h1>
      <h1 className="font-semibold mt-4 ">To Location</h1>
      <h1 className="mt-2">{rowData?.toLocation}</h1> 
      
      <h1 className="font-semibold mt-4 ">Distance</h1>
      <h1 className="mt-2">{rowData?.distance}</h1>
      <h1 className="font-semibold mt-4 ">Distance</h1>
      <h1 className="mt-2">{
      moment().utc(rowData?.createdAt).format("DD MMMM YYYY ")}</h1>
         </div>
    )
}