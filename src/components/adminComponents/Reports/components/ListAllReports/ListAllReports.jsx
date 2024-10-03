import {useEffect, useRef, useState} from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown"; 
import Axios  from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ReportDetails from "./components/Report_Details/Report_Details";
import { Toast } from "primereact/toast";
export default function ListAllReports() { 
    const [resturantReportDetailView,setResturantReportDetailView]=useState(false)  
    
    const [courierReportDetailView,setCourierReportDetailView]=useState(false) 
    const [rowData,setRowData]=useState(null)  
     const [sellerLoader,setSellerLoader]=useState(false)  
      const [riderLoader,setRiderLoader]=useState(false) 
      const [sellerValue,setSellerValue]=useState("")
      const [riderValue,setRiderValue]=useState("")
        const [sellerSortBy,setSellerSortBy]=useState(0) 
        
        const [riderSortBy,setRiderSortBy]=useState(0)     
        const [resturantreports,setResturantReports]=useState([]) 
        const  [riderReports,setRiderReports]=useState([])
  const [showSellerToast,setShowSellerToast]=useState(true)
  let toast=useRef()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
   useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Order/GetSellerOrders`,
      { headers: { Authorization: `Bearer ${token}` } ,params:{ 
        IncludeAll:true, 
        SortBy:sellerSortBy, 
        Search:sellerValue,
      }}
    )
      .then((res) => { 
        
        setResturantReports(res?.data?.data) 
        if(showSellerToast){
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Seller Reports Successfully Fetched"}
            </p>
          ),
        });   
        setShowSellerToast(false)  
      }
        // resetForm()

        setSellerLoader(false); 
         
      })
      .catch((error) => {
        ;
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.Message
                ? error?.response?.data?.Message
                : "Seller Reports Fetching Failed"}
            </p>
          ),
        });
        setSellerLoader(false);
      });
   },[sellerValue,sellerSortBy])  
   const [rideShowToast,setRideToast] =useState(true)
   useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/CustomerRide/RidePartnerRides`,
      { headers: { Authorization: `Bearer ${token}` } ,params:{ 
        IncludeAll:true, 
        SortBy:riderSortBy, 
        Search:riderValue,
      }}
    )
      .then((res) => { 
        setRiderReports(res?.data?.data) 
         if(rideShowToast){
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Rides Reports Successfully Fetched"}
            </p>
          ),
        });  
        setRideToast(false)
         
      }
        // resetForm()

        setRiderLoader(false); 
         
      })
      .catch((error) => {
        ; 
         
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.Message
                ? error?.response?.data?.Message
                : "Rides Reports Fetching Failed"}
            </p>
          ),
        });
        setRiderLoader(false);
      });
   },[riderValue,riderSortBy])
  return (
    <div className="font-poppins font-normal text-main-color">   
     { resturantReportDetailView || courierReportDetailView ? <ReportDetails setResturantReportDetailView={setResturantReportDetailView} setCourierReportDetailView={setCourierReportDetailView} rowData={rowData}/>:<>
      <h1 className="mt-10 text-[20px]">Reports</h1>
      <div className= "flex transform mt-4  md:ml-[100%]  md:translate-x-[-500px]  flex-row justify-around md:justify-between flex-wrap md:w-[400px]"> 
                <div className="flex w-full  h-[40px]  md:w-[250px] rounded-2xl mt-2 pl-4 bg-[#F1E9FE] flex-wrap flex-row items-center justify-between">  
                     <i className="pi pi-search w-[25px]"></i> 
                     <InputText className="bg-[#F1E9FE] w-[calc(100%-45px)] md:w-[calc(100%-35px)]" value={sellerValue} onChange={(e)=>{ 
                         setSellerValue(e.target.value)
                      }} placeholder="Search"/>
                   </div>        
                  <div className="md:w-auto w-full"> 
                  <Dropdown placeholder="Sort By "  options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} optionLabel="label" optionValue="value" onChange={(e)=>{ 
                       setSellerSortBy(e.value)
                        
                      }} value={sellerSortBy} className=" md:w-auto w-full bg-[#F9FBFF] font-poppins font-normal text-main-color rounded-2xl mt-2  "/>
                     </div>
             </div>  
      
      <DataTable
        value={resturantreports}
        onSelectionChange={() => {} /*(e) => setSelectedRows(e.value)*/}
        size="small"
        resizableColumns
        paginator
        rows={5}
        rowsPerPageOptions={[25, 50]}
        emptyMessage="No Reports found."
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          /*setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev) */  
          setResturantReportDetailView(true) 
          setRowData(rowData)
        }}
        rowClassName="cursor-pointer"
        className="  w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header=""
          headerClassName="rounded-l-2xl text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="id"
        ></Column>
        <Column
          header=""
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="owner"
        ></Column>

        <Column
          header="Resturant"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="restaurantName"
        ></Column>

        <Column
          header="Sales"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="grandTotal"
        ></Column>

        <Column
          header="Expenses"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="expense"
        ></Column>
        <Column
          header="Profit"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="profit"
        ></Column>
        <Column
          header="Vat"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="taxAmount"
        ></Column>
        <Column
          header="Payout"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="payout"
        ></Column>

      {/*  <Column
          header=""
          headerClassName=" rounded-r-2xl   text-white bg-main-color"
          className="text-main-color font-normal"
          field="action"
          body={() => {
            return <i className="pi pi-ellipsis-h"></i>;
          }}
        ></Column>  */}
      </DataTable>       
      <div className= "flex transform mt-4  md:ml-[100%]  md:translate-x-[-500px]  flex-row justify-around md:justify-between flex-wrap md:w-[400px]"> 
                <div className="flex w-full md:w-[250px] h-[40px]  rounded-2xl mt-2 pl-4 bg-[#F1E9FE] flex-wrap flex-row items-center justify-between">  
                     <i className="pi pi-search w-[25px]"></i> 
                     <InputText className="bg-[#F1E9FE] w-[calc(100%-45px)] md:w-[calc(100%-35px)]" value={riderValue} onChange={(e)=>{ 
                         setRiderValue(e.target.value)
                      }} placeholder="Search"/>
                   </div>        
                  <div className="md:w-auto w-full"> 
                  <Dropdown placeholder="Sort By "  options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} optionLabel="label" optionValue="value" onChange={(e)=>{ 
                       setRiderSortBy(e.value)
                        
                      }} value={riderSortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color md:w-auto w-full rounded-2xl mt-2  "/>
                     </div>
             </div>  
      <DataTable
        value={riderReports}
        onSelectionChange={() => {} /*(e) => setSelectedRows(e.value)*/}
        size="small"
        resizableColumns
        paginator
        rows={5}
        rowsPerPageOptions={[25, 50]}
        emptyMessage="No customers found."
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          /*setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev) */ 
          setCourierReportDetailView(true) 
          setRowData(rowData)
        }}
        rowClassName="cursor-pointer"
        className="  w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header=""
          headerClassName="rounded-l-2xl font-normal text-white bg-main-color"
          className="text-main-color font-normal"
          field="id"
        ></Column>
        <Column
          header=""
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="owner" 
          body={(rowData)=>{ 
    return( 
    <p>{rowData?.rider?.name}</p>
    )
          }}
        ></Column>

        <Column
          header="Car"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="vehicleName"
        ></Column>

        <Column
          header="Sales"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="sales"       
             body={(rowData)=>{ 
              return( 
           <p>{rowData?.grandTotal}</p>
              )
             }}
        ></Column>

        <Column
          header="Expenses"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="expenses"
        ></Column>
        <Column
          header="Profit"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="profit"
        ></Column>
        <Column
          header="Vat"
          headerClassName="text-white  font-normal bg-main-color"
          className="text-main-color font-normal"
          field="vat"
        ></Column>
        <Column
          header="Payout"
          headerClassName="text-white font-normal bg-main-color"
          className="text-main-color font-normal"
          field="payout"
        ></Column>

    {/*    <Column
          header=""
          headerClassName=" rounded-r-2xl font-normal  text-white bg-main-color"
          className="text-main-color font-normal"
          field="action"
          body={() => {
            return <i className="pi pi-ellipsis-h"></i>;
          }}
        ></Column>
        <Column
          header={() => {
            return (
              <>
                <i className="pi pi-ellipsis-v"></i>
              </>
            );
          }}
          headerClassName=" bg-white"
          className="text-main-color font-normal"
          field="hllo"
        ></Column>  */}
      </DataTable>    
      </>
      } 
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
}
