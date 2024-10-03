import { DataTable } from "primereact/datatable"    
import { Column } from "primereact/column" 
import  Axios  from "axios" 
import React, {useEffect,useState} from "react"
import moment from "moment/moment"
import CommonLoaderBlue from "../../../Common/Components/Loader/LoaderBlue"
export default function RecentlyPlacedOrder({toast}){  
  const [loader,setLoader]=useState(true)         
  const [firstrender,setFirstRender]=useState(false)  
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;        
  const [data,setData]=useState([])
 useEffect(()=>{   
 Axios.get(
   `${process.env.REACT_APP_BASE_URL}/api/v1/SellerDashboard/RecentOrders`,
   { headers: { Authorization: `Bearer ${token}` }}
 ).then(res=>{  
   setLoader(false)
 setData(res?.data?.data) 
    if(!firstrender){      
     toast.current.show({
       severity: "success",
       summary: "Info",
       detail: 
         <p className="font-poppins">
           {res?.data?.Message
             ? res?.data?.Message
             : "Recent Orders  Successfully Fetched"}
         </p>
       
     });
     setFirstRender(true)      
    }}).catch(err=>{ 
     if(!firstrender){   
       toast.current.show({
         severity: "success",
         summary: "Info",
         detail: 
           <p className="font-poppins">
             {res?.data?.Message
               ? res?.data?.Message
               : "Recent Orders Fetching Failed"}
           </p>
         
       });
       setFirstRender(true)         
      }
    })},[]) 
  
     return(  
        <div className="p-2  mb-10 mt-4 bg-[#FBF8FF] rounded-md"> 
             <h1 className="text-main-color text-[18px] font-medium mb-4">Recently Placed Orders</h1>
        <DataTable 
        paginator
        value={data} 
        rows={10}
     onSelectionChange={(e) => {/*setSelectedRows(e.value)*/}}
        size="small"
        resizableColumns
      
        style={{ backgroundColor: "#FBF8FF"}} 
      onRowClick={(rowData)=>{   
        /*
        setResturantDetailView(rowData.data) 
        setShowResturantDetail(prev=>!prev) 
        */
      }}           
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" 
      rowClassName="cursor-pointer bg-[#FBF8FF]" 
      emptyMessage={loader ? <div className="w-full flex flex-wrap flex-row justify-center items-center mt-[14px]"><CommonLoaderBlue/></div>:"Orders Not Found"}
        className="  w-[99%]   mt-2 overflow-x-hidden all-customers text-main-color font-poppins bg-[#FBF8FF]  "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header="Order ID" 
          headerClassName="rounded-l font-normal text-white bg-main-color"
          className="text-main-color font-normal"
          field="id"
          
        ></Column>
        <Column header="Resturant Name" 
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="restaurantName"></Column>
           <Column header="Resturant Name" 
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="restaurantName"></Column>
           <Column header="Delivery Address" 
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal"  
          body={(rowData) => {
            const address = rowData?.deliveryAddress || '';
            const truncatedAddress = address.length > 30 ? address.slice(0, 30) + '...' : address;
    
            return <p>{truncatedAddress}</p>;
        }} 
           field="deliveryAddress"></Column> 
           <Column header="Price"  headerClassName=" font-normal text-white bg-main-color" className="text-main-color font-normal" field="grandTotal" body={(rowData)=>{ 
          return <p>€{rowData?.grandTotal}</p>
        }}></Column>  
             <Column header="Status"  headerClassName=" font-normal text-white bg-main-color" className="text-main-color font-normal" body={(item)=>{ 
          return(
            <p className={`pl-2 pr-2 ${item?.status === "Pending" ? " border border-[#A767E0] text-main-color":item?.status === "Delivered" ? " border border-[#20D994] text-[#20D994]":item?.status === "Cancelled" ? " border border-[#EF004C] text-[#EF004C]":""} text-center rounded pt-1 pb-1`}>{item?.status}</p>
          )
        }} field="price"></Column>  
          <Column header="Placing Time"  headerClassName="rounded-r font-normal text-white bg-main-color" className="text-main-color font-normal" field="grandTotal" body={(rowData)=>{ 
          return <p>{moment(rowData?.createdAt)
            .utc()
            .format('DD MMMM YYYY [at] HH:mm:ss')}</p>
        }}></Column>    
          </DataTable>  
        </div>
     )
}