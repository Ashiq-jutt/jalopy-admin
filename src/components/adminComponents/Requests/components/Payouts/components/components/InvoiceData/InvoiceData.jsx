import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Axios from "axios"
import { format } from 'date-fns';
import { Dropdown } from "primereact/dropdown";
import "./css/InvoiceData.css" 
 import Loader from "../../../../../../../Loaders/Components";
import { Toast } from "primereact/toast";
import InvoiceDownload from "./invoice_download/Invoice_Download"; 
import moment from "moment";
import { Dialog } from "primereact/dialog";
import PayoutDetails from "../../Payout_Details";
export default function InvoicesData() {
  const invoiceData = [{
    id: "12123123",
    ref: "Rest Testy Trail",
    customerName: "Ellex hales",
    date: "22-07-2023",
    date: "22-08-2023",
    amount: "€323",
    status: "Paid",

  }]  
  const [deleteInvoiceLoader,setDeleteInvoiceLoader]=useState(false)  
  const [deleteInvoiceDialog,setDeleteInvoiceDialog]=useState(false)
   const   [currentselected,setCurrentSelected]=useState()
  const toast = useRef() 
   const  [refresh,setRefresh]=useState(false)
  const [loader, setLoader] = useState(true)
  const [invoicesData, setInvoicesData] = useState([])    
  const [renderFirst,setRenderFirst]=useState(true)
  const [currentInvoice,setCurrentInvoice]=useState(null)   
   
  const [refreshInvice,setRefreshInvice]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;  
   const [filter,setFilter]=useState("0")
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Invoices/List`,
      { headers: { Authorization: `Bearer ${token}` } }
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
   const [detailView,setDetailView]=useState(false)
  const tableActions = (rowData) => {
    return (
      <div className="w-[100px]  flex flex-wrap flex-row justify-left gap-2">
        {" "}
       {/* <Button
          onClick={() => { 
            setCurrentInvoice(rowData) 
              setRefreshInvice(prev=>!prev)
            
            //setResturantDetailView(rowData) 
           //setShowResturantDetail(prev=>!prev) 
           
          }}
          icon="pi pi-download"
          className="w-[20px] h-[20px]  text-main-color "
        />
        <Button
          onClick={() => { 
             setCurrentSelected(rowData) 
              setDetailView(true)
            
           // setResturantDetailView(rowData) 
           //setShowResturantDetail(prev=>!prev) 
           
          }}
          icon="pi pi-trash"
          className="w-[20px] h-[20px]  text-main-color "
        /> */}
          <Button
          onClick={() => { 
             setCurrentSelected(rowData) 
             setDetailView(true)
            /*
            setResturantDetailView(rowData) 
           setShowResturantDetail(prev=>!prev) 
           */
          }}
          icon="pi pi-eye"
          className="w-[20px] h-[20px]  text-main-color "
        />

      </div>
    );
  };
  return (    
     <>
     { 
       detailView ? <PayoutDetails data={currentselected} setDetailView={setDetailView}/>:
    <div>
      <div className=" text-main-color font-poppins mt-4  items-center font-normal flex flex-row flex-wrap gap-4 justify-end">
      {/*  <h1 className="text-[21px] ">All Invoices</h1>
       <div className="flex flex-wrap flex-row  rounded-md p-2 mt-2  md:mt-0 bg-[#F9FBFF] items-center w-full md:w-[200px] justify-between">
          <i className="pi pi-search w-[20px]" />
          <InputText className="w-[calc(100%-25px)] bg-[#F9FBFF]" placeholder="Search"></InputText>
        </div>*/}
        <div className="flex flex-wrap flex-row rounded-md   bg-[#F9FBFF] items-center w-full md:mt-0 md:w-[230px] pl-2 justify-between">
          <h1 className=" w-[100px] text-[#7E7E7E]">Sort by: </h1>
          <Dropdown          
          value={filter} 
           onChange={(e)=>{ 
            setFilter(e.value)
           }}
             options={[{label:"Newest",value:"0"},{label:"Oldest",value:"1"}]}
           className="w-[calc(100%-100px)] my-dropdown font-poppins  font-normal text-main-color bg-[#F9FBFF]" placeholder="Newest" />
        </div>
      </div>
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
        className="  w-full  mt-4 overflow-x-hidden all-customers text-main-color font-poppins "
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
              <p>{rowData?.issueDate ? moment()?.utc(rowData?.issueDate).format("d MMMM yyyy, [at] hh:mm a") : ""}</p>
            )
          }}
        ></Column>

        <Column header="Due Date"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="dueDate"
          body={(rowData) => {
            return (
              <p>{rowData?.dueDate ? moment()?.utc(rowData?.dueDate).format("d MMMM yyyy, [at] hh:mm a") : ""}</p>
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
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />  
       <div className="mt-[70px] "> 
        <InvoiceDownload token={token} refreshInvice={refreshInvice} setCurrentInvoice={setCurrentInvoice} invoiceData={currentInvoice}/>
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
                        {res?.data?.message
                          ? res?.data?.message
                          : "Invoice Deleted Successfully"}
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
                            : "Invoice Deletetion Failed"}
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
    
  }  
   </>
  )
}