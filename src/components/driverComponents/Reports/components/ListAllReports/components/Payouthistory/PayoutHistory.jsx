import React,{useEffect, useState,useRef} from "react";
import Axios from "axios";
import { format } from 'date-fns';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"; 
import InvoiceDownload from "./invoice_download/Invoice_Download";
import { Toast } from "primereact/toast";     
import Loader from "../../../../../../Loaders/Components";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
function formatDate(dateString) {
  // Parse the date string into a Date object
  var dateObj = new Date(dateString);

  // Extract year, month, and day
  var year = dateObj.getFullYear().toString().substr(-2); // Get last two digits of the year
  var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
  var day = dateObj.getDate().toString().padStart(2, '0');

  // Format the date
  var formattedDate = month + '-' + day + '-' + year;

  return formattedDate;
} 
export default function PayoutHistory() { 
    const   [currentselected,setCurrentSelected]=useState() 
    
   const  [refresh,setRefresh]=useState(false) 
   
  const [renderFirst,setRenderFirst]=useState(false)    
  const [refreshInvice,setRefreshInvice]=useState(false)
    const [deleteInvoiceLoader,setDeleteInvoiceLoader]=useState(false)  
    const [deleteInvoiceDialog,setDeleteInvoiceDialog]=useState(false)
    const [currentInvoice,setCurrentInvoice]=useState(null) 
  const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [loader,setLoader]=useState(true)  
  const [reportsData,setReportsData]=useState([]) 
  const [payoutDialogVisibility,setPayoutDialogVisibility]=useState(false)
  let  ridePartnerId= JSON.parse(localStorage.getItem("userData"))?.data?.ridePartnerId;
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Invoices/List`,{params:{RidePartnerId:ridePartnerId},headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{    
         if(!renderFirst){
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Payout History Fetched Successfully"}</p> }); 
        setRenderFirst(true)      
    }
         setReportsData(res?.data?.data) 
         setLoader(false)
    }).catch((error)=>{   
        if(!renderFirst){      
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Fetching Invoices List Failed"}</p> });  
       setRenderFirst(true)     
    }
      
    })   
  },[refresh])   
  const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-evenly">
        {" "}
        <Button
          onClick={() => { 
            setCurrentInvoice(rowData) 
               setRefreshInvice(prev=>!prev)
            /*
            setResturantDetailView(rowData) 
           setShowResturantDetail(prev=>!prev) 
           */
          }}
          icon="pi pi-download"
          className="w-[20px] h-[20px]  text-main-color "
        />
        <Button
          onClick={() => { 
             setCurrentSelected(rowData) 
              setDeleteInvoiceDialog(true)         
            /*
            setResturantDetailView(rowData) 
           setShowResturantDetail(prev=>!prev) 
           */
          }}
          icon="pi pi-trash"
          className="w-[20px] h-[20px]  text-main-color "
        />

      </div>
    );
  };
  return (
    <div className="font-poppins font-normal text-main-color">    
   
    
      <h1 className="mt-4 text-[20px] font-semibold tracking-wide">Payout History</h1>
     
      <DataTable
        value={reportsData}
        onSelectionChange={(e) => {/*setSelectedRows(e.value)*/ }}
        size="small"
        resizableColumns
        paginator
        rows={10}  
             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        emptyMessage={loader ? <div className="flex flex-wrap mt-4 items-center justify-center ">

          <Loader />
        </div> :<h1 className="flex flex-wrap mt-4 items-center text-main-color justify-center "> No Payout Found</h1>}
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          /*
        setResturantDetailView(rowData.data) 
        setShowResturantDetail(prev=>!prev) 
        */
        }}
        rowClassName="cursor-pointer"
        className="  w-full md:p-4 md:ml-2  mt-4 md:mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header="Invoice ID"
          headerClassName="rounded-l-2xl text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="number"

        ></Column>
        <Column header="Ref." headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal"

          field="companyName"></Column>

        <Column header="Date"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="date"
          body={(rowData) => {
            return (
              <p>{rowData?.issueDate ? format(rowData?.issueDate, "d MMMM yyyy, 'at' hh:mm a") : ""}</p>
            )
          }}
        ></Column>

        <Column header="Due Date"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="dueDate"
          body={(rowData) => {
            return (
              <p>{rowData?.dueDate ? format(rowData?.dueDate, "d MMMM yyyy, 'at' hh:mm a") : ""}</p>
            )
          }}
        ></Column>
        <Column header="Amount"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="totalAmount"
          body={(rowData) => {
            return (
              <p>

                $ {rowData?.totalAmount.toFixed(2)}
              </p>
            )
          }}

        ></Column>


        <Column header="Status" body={(rowData) => {
          return (
            <div className={` flex items-center   justify-left`}>
              <p className={`${rowData.isPaid ? "border-[green] text-green-500 " : "border-[red] text-red-500"} border pl-2 pr-2 p-1 rounded-md`}>
                {rowData.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          )
        }} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
        <Column header="Actions" headerClassName=" rounded-r-2xl font-normal  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
      </DataTable>

      <Dialog className="font-poppins" header="Invoice Delete Confirmation" headerClassName="text-main-color" visible={deleteInvoiceDialog} onHide={()=>{ 
             setDeleteInvoiceDialog(prev=>!prev)
          }}> 
             <p className="font-poppins text-main-color">Are You Sure You Want To Delete Invoice</p>   
              <div className="mt-4 flex flex-wrap flex-row justify-center gap-4"> 
              <Button  
                 onClick={()=>{    
                    setDeleteInvoiceLoader(true)
                  Axios.delete(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/Invoices/Delete/${currentselected?.id}`,
                    { headers: { Authorization: `Bearer ${token}` },params:{id:currentselected?.id} }
                  ).then(res=>{    
                     setDeleteInvoiceLoader(false)  
                      setRefresh(prev=>!prev)  
                       setDeleteInvoiceDialog(false)
                  toast.current.show({
                    severity: "success",
                    summary: "Info",
                    detail: (
                      <p className="font-poppins">
                        {res?.data?.message
                          ? res?.data?.message
                          : "Invoice Deleted Failed"}
                      </p>
                    ),   
                  
                  });     
                
                   
                  }).catch(error=>{  
                     setDeleteInvoiceLoader(false)
                    toast.current.show({
                      severity: "error",
                      summary: "Info",
                      detail: (
                        <p className="font-poppins">
                          {error?.response?.data?.message
                            ? error?.response?.data?.message
                            : "Invoice Deletion Failed"}
                        </p>
                      ),
                    });      
                  }) 
                  

                 }}
               loading={deleteInvoiceLoader} disabled={deleteInvoiceLoader} className="text-white bg-main-color p-1 pl-2 pr-2 "  label="Yes"   /> 
              <Button className="text-white bg-main-color p-1 pl-2 pr-2 " onClick={()=>{ 
                 setDeleteInvoiceDialog(false)
              }} label="No"    />
              </div>
          </Dialog>  
          <div className="mt-[70px] "> 
        <InvoiceDownload refreshInvice={refreshInvice} token={token} ridePartnerId={ridePartnerId} setCurrentInvoice={setCurrentInvoice} invoiceData={currentInvoice}/>
       </div> 
    
      
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/> 
          
    
    </div>
  );
}
