import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";  
import { format } from 'date-fns';
import { Column } from "primereact/column"; 
import  Axios  from "axios";
import SupportTicketDetail from "./component/Support_TicketDetails";
import { Toast } from "primereact/toast";
import Loader from "../../../../Loaders/Components";
export default function SupportTickets({sortBy}){ 
    const SupportTicketData=[{ 
        id:"1", 
        requester:"Robert Jack", 
         subject:"Lorem ipsum dolor sit amet, consectetur adipiscing",  
        assigne:"Katherine. m", 
        createDate:"20-08-2024", 
        to:"20-10-2024", 
        status:"open", 
        email:"abc@gmail.com", 
        about:"1 Day Ago", 
        phone:"000-000-000",  
        img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location:"ABC Town"

     }]  
     let toast=useRef()      
     const [tickets,setTickets]=useState([]) 
     const [loader,setLoader]=useState(true)  
     const [refresh,setRefresh]=useState(false)
     let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;  
     const [firstRender,setFirstRender]=useState(false)
     useEffect(()=>{  
       Axios.get(
         `${process.env.REACT_APP_BASE_URL}/api/v1/SupportTickets/List`,
         { headers: { Authorization: `Bearer ${token}` }}
       ).then(res=>{  
         setLoader(false)
       setTickets(res?.data?.data) 
      if(!firstRender){
       toast.current.show({
         severity: "success",
         summary: "Info",
         detail: (
           <p className="font-poppins">
             {res?.data?.Message
               ? res?.data?.Message
               : "Support Tickets Successfully Fetched"}
           </p>
         ),   
       });    
       setFirstRender(true)
      }
       }).catch(error=>{ 
         setLoader(false)  
           if(!firstRender){
         toast.current.show({
           severity: "error",
           summary: "Info",
           detail: (
             <p className="font-poppins">
               {error?.response?.data?.Message
                 ? error?.response?.data?.Message
                 : "Support Tickets Fetching Failed"}
             </p>
           ),
         });  
          setFirstRender(true)
         }
       })
      },[refresh]) 
      const [data,setData]=useState(null)      
      const [detailView,setDetailView]=useState(false)
     return( 
         <div>   
              { 
              detailView ? <SupportTicketDetail sortBy={sortBy} setRefresh={setRefresh}  token={token} data={data} setDetailView={setDetailView} /> :
        <div>  
        
          <DataTable
          value={tickets}
          onSelectionChange={(e) => {/*setSelectedRows(e.value)*/}}
          size="small"
          resizableColumns
          paginator
          rows={10}   
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
             
          emptyMessage={ loader ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
            <Loader/>
        </div> : "Tickets Not Found"}
          style={{ backgroundColor: "white"}} 
        onRowClick={(rowData)=>{  
             setData(rowData)  
             setDetailView(true)
            /*
          setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev) 
          */
        }}       
        rowClassName="cursor-pointer"
          className=" w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="ID"  
            headerClassName="rounded-l-2xl font-normal  text-white bg-main-color"
            className="text-main-color font-normal"
            field="id"
            
          ></Column> 
             <Column header="Requester"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal"   
                body={(rowData)=>{ 
                 return( 
                     <div className="flex w-[300px] flex-row flex-wrap justify-left items-center "> 
                         <div className="w-[40px] h-[40px] rounded-full  overflow-hidden"> 
                            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={rowData?.user?.img} className="transform  ml-[50%] mt-[50%] translate-x-[-50%] translate-y-[-50%]"/>
                         </div> 
                          <p className="ml-2">{rowData?.user?.name}</p>
                      </div>
                 )
                }}
              field="requester"></Column>  
           
           <Column header="Subject"   headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="subject"></Column>
          
          <Column header="Create Date" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="createDate" body={(rowData)=>{ 
              return( 
               <p> {format(rowData.created, "d MMMM yyyy, 'at' hh:mm a")}</p>
              )
            }}></Column> 
            
          <Column header="Assigne" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="admin.name"></Column>
       
       
          <Column header="Status"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" body={(rowData)=>{    
              return( 
                 
                <p className={` text-center rounded ${rowData?.isClosed === false ? "text-green-500 border border-green-500":"text-red-500 border border-red-500"}`}>{rowData?.isClosed  === false ? "Open":"Close"}</p>
              )
           }} ></Column>
        
        </DataTable> 
          </div>  
} 

<Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto  
     mt-[70px]
    md:transform-none
  " ref={toast}     /> 
           </div> 
     )
}