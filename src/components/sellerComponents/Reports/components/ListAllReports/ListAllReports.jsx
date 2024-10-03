import React,{useState,useEffect,useRef} from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";  
import moment from "moment";
import Axios from "axios"
import { Column } from "primereact/column";      
import { Toast } from "primereact/toast";
import Loader from "../../../../Loaders/Components";
import ReportDetails from "./components/Report_Details/Report_Details";
import { Button } from "primereact/button";  
import { Dialog } from "primereact/dialog";
function formatDate(dateString) {
  var dateObj = new Date(dateString);

  // Extract year, month, and day
  var year = dateObj.getFullYear(); // Get full year
  var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
  var day = dateObj.getDate().toString().padStart(2, '0');

  // Extract hours, minutes, and seconds
  var hours = dateObj.getHours().toString().padStart(2, '0');
  var minutes = dateObj.getMinutes().toString().padStart(2, '0');
  var seconds = dateObj.getSeconds().toString().padStart(2, '0');

  // Format the date and time to day-month-year at hours:minutes:seconds
  var formattedDate = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ':' + seconds;

  return formattedDate;
} 
export default function ListAllReports() {  
     
  const [search,setSearch]=useState("") 
  const [sortBy,setSortBy]=useState(1)  
 const toast=useRef()
 let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
 const [loader,setLoader]=useState(true)  
 const [reportsData,setReportsData]=useState([])
    const [resturantReportDetailView,setResturantReportDetailView]=useState(false)  
    const [rowData,setRowData]=useState(null)   
    const [payoutDialogVisibility,setPayoutDialogVisibility]=useState(false)
    const [payoutLoading,setPayoutLoading]=useState(false) 
    let  vendorId= JSON.parse(localStorage.getItem("userData"))?.data?.vendorId;
          
    useEffect(()=>{ 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Order/GetSellerOrders`,{params:{ Search:search,SortBy:sortBy},headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Fetched Reports Data"}</p> });
           setReportsData(res?.data?.data) 
           setLoader(false)
      }).catch((error)=>{       
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Fetching Reports Data Failed"}</p> });
        
      })   
    },[])   
    useEffect(()=>{ 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Order/GetSellerOrders`,{params:{ Search:search,SortBy:sortBy},headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
          setReportsData(res?.data?.data) 
      }).catch((error)=>{       
       
      })   
    },[search,sortBy])
  return (
    <div className="font-poppins font-normal text-main-color">   
   {   
     resturantReportDetailView ?    
       <ReportDetails  rowData={rowData} setResturantReportDetailView={setResturantReportDetailView}/>
      : 
      <>
     <div className="flex flex-wrap flex-row justify-end"> 
            <Button  onClick={()=>{ 
                   setPayoutDialogVisibility(prev=>!prev)
               }} label="Request For Payout" className="mt-[80px] p-1 pl-8 pr-8 rounded-2xl  text-white bg-main-color" iconPos="right" icon="pi pi-angle-right"/>
     </div>   
    
    <div className= "flex transform mt-0 md:mt-8 p-2 md:p-0 w-full md:w-[85%]  flex-row  gap-2 flex-wrap justify-between  items-center"> 
         <h1 className=" font-[600] tracking-wide md:w-auto w-full  text-[20px]">Reports</h1>
             <div className="flex  p-2 w-[45%]  md:5-0 md:w-[348px] rounded-2xl mt-2 md:pl-4 bg-[#F9FBFF] flex-wrap flex-row items-center justify-between">  
             <i className="pi pi-search w-[25px]"></i> 
                      <InputText className="bg-[#F9FBFF]  text-main-color  w-[calc(100%-35px)]" value={search} onChange={(e)=>{ 
                         setSearch(e.target.value)
                      }} placeholder="Search"/>  
                     
                  </div>        
                  <div className="mt-2 md:mt-0 w-[50%] md:w-[166px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">    
                          <p className="w-[50px] text-[#7E7E7E] text-[12.97px]">Sort By:</p>
                     <Dropdown placeholder="Sort By " options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} onChange={(e)=>{ 
                       setSortBy(e.value)
                        
                      }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-50px)] rounded-md md:rounded-2xl   "/>
                    </div>
             </div>
      <DataTable
        value={reportsData}
        onSelectionChange={() => {} /*(e) => setSelectedRows(e.value)*/}
        size="small"
        resizableColumns
        paginator
        rows={10} 
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          
        emptyMessage={ loader ?<div className="flex flex-wrap flex-row justify-center items-center mt-4 mb-4"><Loader /> </div>: "Reports Not Found"}
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          /*setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev) */  
          setResturantReportDetailView(true) 
          setRowData(rowData)
        }}
        rowClassName="cursor-pointer"
      
        className="w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header="Customer"
          headerClassName="rounded-l-2xl text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="id" 
           body={(rowData)=>{ 
            return( 
              <div className="flex w-[200px] flex-wrap justify-left items-center flex-row"> 
              <div className="w-[40px] rounded-full h-[40px] flex flex-wrap flex-row justify-center items-center overflow-hidden" >
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

         }} src={`${rowData?.userInfoDto?.image ? rowData?.userInfoDto?.image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}`}/> 
                   </div>
                <p className="ml-2">{rowData?.userInfoDto?.name}</p>
          </div>
            )
           }}
        ></Column> 
        <Column
          header="Date"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="reportDate"   
          body={(rowData)=>{ 
             return( 
      <p>{moment(rowData?.createdAt)
        .utc()
        .format('DD-MM-YYYY [at] HH:mm:ss')}</p>
             )
          }}
        ></Column>

        <Column
          header="Delivery/Pickup"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="deliveryType"
        ></Column>
       <Column
          header="Price"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="grandTotal" 
          body={(rowData)=>{ 
            return ( <p>€{rowData?.grandTotal}</p>)
          }}
        ></Column>
        <Column
          header="Expenses"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="expense" 
          body={(rowData)=>{ 
            return ( <p>€{rowData?.expense}</p>)
          }}
        ></Column>
             <Column
          header="Actions"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          body={(rowData)=>{ 
             return( 
               <i onClick={()=>{  
                     setRowData(rowData) 
                     setResturantReportDetailView(true)
               }} className="pi pi-eye"/>
             )
          }}
        ></Column>
       
      </DataTable>
        
      </>  
}
      <Dialog className="font-poppins" header="Payout Confirmation" headerClassName="text-main-color tracking-wide" visible={payoutDialogVisibility} onHide={()=>{ 
           setPayoutDialogVisibility(prev=>!prev)
       }} >   
         <p className="text-main-color">Do You Want To Request For Payout</p> 
           <div className="mt-4 flex flex-wrap flex-row justify-evenly"> 
               <Button onClick={()=>{ 
                setPayoutLoading(prev=>!prev)
                  Axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/Create`,
                    {vendorId:vendorId},
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                    .then((res) => {  
                      
                setPayoutLoading(prev=>!prev)
                setPayoutDialogVisibility(prev=>!prev)
                      toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: (
                          <p className="font-poppins">
                            {res?.data?.message
                              ? res?.data?.message
                              : "Payout Request Submited Successfully"}
                          </p>
                        ),
                      })}).catch(err=>{  
                        
                setPayoutLoading(prev=>!prev)
                        toast.current.show({
                          severity: "error",
                          summary: "Info",
                          detail: (
                            <p className="font-poppins">
                              {err?.data?.message
                                ? err?.data?.message
                                : "Payout Request Submission Failed"}
                            </p>
                          ),
                      })  
                    })
               }} loading={payoutLoading} disabled={payoutLoading} label="Yes" className="text-white bg-main-color p-1 pl-4 pr-4" /> 
               
               <Button label="No" className="text-white bg-main-color p-1 pl-5 pr-5" />
           </div>
        </Dialog>
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}  />
    </div>
  );
}
