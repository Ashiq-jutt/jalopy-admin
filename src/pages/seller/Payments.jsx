import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"; 
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"; 
import ContactEmails from "../../components/sellerComponents/payments/billing/CardBillingInfo";
import Axios from "axios"
import { format } from 'date-fns';
import { Dropdown } from "primereact/dropdown"; 
import Loader from "../../components/Loaders/Components";
import { Toast } from "primereact/toast";
import InvoiceDownload from "../../components/adminComponents/Invoices/components/InvoiceData/invoice_download/Invoice_Download";
import { Dialog } from "primereact/dialog";
export default function SellerPayments() { 
  const [filter,setFilter]=useState(0)
  const invoiceData = [{
    id: "12123123",
    ref: "Rest Testy Trail",
    customerName: "Ellex hales",
    date: "22-07-2023",
    date: "22-08-2023",
    amount: "€323",
    status: "Paid",

  }]   
  let vendorId = JSON.parse(localStorage.getItem("userData")).data.vendorId;       
  const [deleteInvoiceLoader,setDeleteInvoiceLoader]=useState(false)  
  const [deleteInvoiceDialog,setDeleteInvoiceDialog]=useState(false)
   const   [currentselected,setCurrentSelected]=useState()
  const toast = useRef() 
   const  [refresh,setRefresh]=useState(false)
  const [loader, setLoader] = useState(true)
  const [invoicesData, setInvoicesData] = useState([])    
  const [renderFirst,setRenderFirst]=useState(true) 
  const [refreshInvice,setRefreshInvice]=useState(false)
  const [currentInvoice,setCurrentInvoice]=useState(null)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
  const [proceedNext,setProceedNext]=useState(true) 
  
  const [downloadAllClicked,setDownloadAllClicked]=useState(false)
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Invoices/List`,
      { headers: { Authorization: `Bearer ${token}` },params:{VendorId:vendorId} }
    )
      .then((res) => {
        setInvoicesData(res?.data?.data)

        setLoader(false)  
        if(renderFirst){
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Invoices Data Successfully Fetched"}
            </p>
          ), 
        })  
        setRenderFirst(false)
      }
      }).catch(err => {

        setLoader(false) 
        if(renderFirst){
        toast.current.show({
          severity: "success",
          summary: "Error",
          detail: (
            <p className="font-poppins text-main-color">
              {err?.response?.data?.Message
                ? err?.response?.data?.Message
                : "Invoices Data Fetching Failed"}
            </p>
          ),
        })  
        setRenderFirst(false)
      }
      })
  }, [refresh]) 
  const buttonsRef = useRef([]); 
  function DownloadAllInvoices(){   
    setProceedNext(true)
    setDownloadAllClicked(true)
    let totalinvoices=buttonsRef.current.length;    
   
    let i=0;
  let intervalhere=  setInterval(    
    
      RunCode
     
      ,500)
    
    function RunCode(){  
        
    
      if(proceedNext){     
      if(i<totalinvoices){
        buttonsRef.current[i].click()  
        setProceedNext(false) 
        i++
       } 
       else{ 
    clearInterval(intervalhere) 
    setDownloadAllClicked(false)
       }  
      
      }
       
       
     }
    //buttonsRef.current.forEach(button => button && button.click());
  }
  const tableActions = (rowData,{ rowIndex }) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-evenly">
        {" "}
        <Button 
        ref={(el) => (buttonsRef.current[rowIndex] = el)}
          onClick={() => { 
          
              setRefreshInvice(prev=>!prev) 
              setCurrentInvoice(rowData)  
            /*
            setResturantDetailView(rowData) 
           setShowResturantDetail(prev=>!prev) 
           */
          }}
        
          label="Download"
          className=" rounded-md text-white bg-main-color pl-4 pr-4  "
        />
     {/*   <Button
          onClick={() => { 
             setCurrentSelected(rowData) 
              setDeleteInvoiceDialog(true)
            
            setResturantDetailView(rowData) 
           setShowResturantDetail(prev=>!prev) 
           
          }}
          icon="pi pi-trash"
          className="w-[20px] h-[20px]  text-main-color "
        />  */}

      </div>
    );
  };
  return (
    <div className="md:p-4 bg-white p-1 mt-[70px]">

      {/*<div className=" flex flex-wrap flex-row mt-4 justify-evenly">
        <div className="w-[98%]   border rounded-2xl  p-1  ">
             <ContactEmails/>
        </div>    

        </div>  */}
      <div className=" text-main-color w-full font-poppins mt-4 gap-2 items-center font-normal flex flex-row flex-wrap justify-between ">
        <h1 className="text-[16px] text-[#A0E3F2]">Billing History</h1>
      {/* <div className="flex flex-wrap flex-row   mt-2 md:mt-0 p-2 rounded-md bg-[#F9FBFF] items-center w-[95%] md:w-[200px] justify-between">
          <i className="pi pi-search w-[20px]" />
          <InputText className="w-[calc(100%-20px)] bg-[#F9FBFF]" placeholder="Search"></InputText>
        </div>
        <div className="flex flex-wrap flex-row pl-1 mt-2 md:mt-0 p-0 rounded-md bg-[#F9FBFF] items-center w-[95%] md:w-[230px] justify-between">
          <h1 className=" w-[100px] text-[#7E7E7E]">Sort by: </h1>
          <Dropdown value={filter} onChange={(e)=>{ 
            setFilter(e.value)
          }} optionLabel="label" optionValue="value" options={[{label:"New",value:"0"},{label:"Old",value:"1"}]} className="w-[calc(100%-100px)] my-dropdown font-poppins  font-normal text-main-color bg-[#F9FBFF]" placeholder="Newest" />
        </div>  */}  
        <Button disabled={downloadAllClicked} loading={downloadAllClicked} onClick={DownloadAllInvoices} className="text-main-color border border-main-color rounded-md p-1 pl-4 pr-4  bg-[#F9FBFF] " label="Download All"/>
      </div>      
      <div  className="w-full flex flex-wrap flex-row md:justify-left justify-center items-center">    
      <DataTable
        value={invoicesData}
        onSelectionChange={(e) => {/*setSelectedRows(e.value)*/ }}
        size="small"
        resizableColumns
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          
        emptyMessage={loader ? <div className="flex flex-wrap mt-4 items-center justify-center ">

          <Loader />
        </div> : "No Invoice Found"}
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          /*
        setResturantDetailView(rowData.data) 
        setShowResturantDetail(prev=>!prev) 
        */
        }}
        rowClassName="cursor-pointer"
        className="  w-full   mt-4 overflow-x-hidden all-customers text-main-color font-poppins "
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

       
        <Column header="Amount"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="totalAmount"
          body={(rowData) => {
            return (
              <p>

€{rowData?.totalAmount.toFixed(2)}
              </p>
            )
          }}

        ></Column>


        <Column header="Status" body={(rowData) => {
          return (
            <div className={` flex items-center   justify-left`}>
              <p className={`${rowData.isPaid ? "border-[green] text-green-500 " : "border-[red] text-red-500"} border pl-4 pr-4  rounded-md`}>
                {rowData.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          )
        }} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
        <Column header="Action" headerClassName=" rounded-r-2xl font-normal  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
      </DataTable> 
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />  
       <div className="mt-[70px] p-4 "> 
        <InvoiceDownload setProceedNext={setProceedNext} downloadAllClicked={downloadAllClicked}  proceedNext={proceedNext} token={token} refreshInvice={refreshInvice} setCurrentInvoice={setCurrentInvoice} invoiceData={currentInvoice}/>
       </div>  
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
                        {res?.data?.Message
                          ? res?.data?.Message
                          : "Invoice Deletion Failed"}
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
                          {error?.response?.data?.Message
                            ? error?.response?.data?.Message
                            : "Invoice Deleted Successfully"}
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
           <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "    ref={toast}/> 
    </div>
  )
}