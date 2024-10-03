import {DataTable} from "primereact/datatable" 
import { Column } from "primereact/column"  
import { useRef, useState } from "react";
import { Button } from "primereact/button"; 
import Axios  from "axios";
import { InputSwitch } from "primereact/inputswitch";
//import ResturantDetails from "../Resturant_Detail/Resturant_Details";  
import ResturantDetails from "../RidePartner_Detail/RidePartner_Details"
import Loader from "../../../../Loaders/Components";
import Edit_Ride_Partner from "./Edit_RidePartner/Edit_RidePartner";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast"; 
import { EditIcon } from "../../../restaurants/components/stats/assets/Svg";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function ListResturants({resturantData,setRefresh,loader,ridePartner}){  
  const toast=useRef()
  const [showResturantDetail,setShowResturantDetail]=useState(false)
  const [resturantDetailView,setResturantDetailView]=useState(null)  
   const [showResturantEdit,setShowResturantEdit]=useState(false)
   const [deleteInvoiceLoader, setDeleteInvoiceLoader] = useState(false)
   const [deleteInvoiceDialog, setDeleteInvoiceDialog] = useState(false)
   const [currentselected, setCurrentSelected] = useState() 
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const tableActions = (rowData) => {
    return (
      <div className="w-[90px] flex flex-wrap flex-row gap-4 justify-left"> 
          {" "}
          <Button  
          onClick={()=>{
             setResturantDetailView(rowData)  
             setShowResturantEdit(false)
            setShowResturantDetail(true)
          }}
            icon="pi pi-eye"
            className="w-[25px] border border-main-color h-[25px]  text-main-color "
          /> 
           <div
          onClick={()=>{
             setResturantDetailView(rowData)   
             setShowResturantEdit(true)
            setShowResturantDetail(false)
          }}
          >     
           <EditIcon/> 
            
             </div>
        
      </div>
    );
  };
  const [sortBy,setSortBy]=useState() 
  const [search,setSearch]=useState()
    return(  
      <>   
      
        <DataTable
          value={ridePartner}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          size="small"
          resizableColumns
          paginator
          rows={10}   
           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          emptyMessage={ loader ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
            <Loader/>
        </div> : "Ride Partners Not Found"}
          style={{ backgroundColor: "white"}} 
          
        rowClassName="cursor-pointer"
          className="   mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="Serial No"  
            headerClassName="rounded-l-2xl text-white  font-normal  bg-main-color"
            className="text-main-color font-normal"
            field="id"
            
          ></Column>  
             <Column header="Company"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
              return ( 
                 <p>{rowData?.firstName} {rowData?.lastName}</p>
              )
             }}></Column>  
           
             <Column header="Phone No"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="contact"></Column>  
           
           <Column header="Email"   headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="email"></Column>
          
          <Column header="Country" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="land"></Column> 
            
          <Column header="Postal Code" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="postalCode"></Column>
       
       
          <Column header="Status" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-center`}>
               <InputSwitch
                 checked={rowData?.status} 
                 onClick={()=>{  
                  setCurrentSelected(rowData)
                   setDeleteInvoiceDialog(true)
                 }}
                 className="" 
                
               /> 
             </div>
          )}} headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="status"></Column>
          <Column header="Actions"  headerClassName=" rounded-r-2xl  font-normal text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable>  
          
       
        <div> 

        </div> 
         { 
          showResturantDetail ? <ResturantDetails resturantDetailView={resturantDetailView} setShowResturantDetail={setShowResturantDetail}/>: showResturantEdit ? <Edit_Ride_Partner setRefresh={setRefresh} resturantDetailView={resturantDetailView} setShowResturantDetail={setShowResturantEdit}/>:undefined
          }  
           <Dialog className="font-poppins" header="Status Updation Cofirmation" headerClassName="text-main-color" visible={deleteInvoiceDialog} onHide={() => {
        setDeleteInvoiceDialog(prev => !prev)
      }}>
        <p className="font-poppins text-main-color">Are You Sure You Want To {currentselected?.status ? "DeActivate" : "Active"}  the Ride Partner</p>
        <div className="mt-4 flex flex-wrap flex-row justify-center gap-4">
          <Button
            onClick={() => {
              setDeleteInvoiceLoader(true)
              Axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/UpdateStatus`,{ 
                  ridePartnerId: currentselected?.id, status: !currentselected?.status
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then(res => {
                setDeleteInvoiceLoader(false)
                setRefresh(prev => !prev)
                setDeleteInvoiceDialog(false)
                toast.current.show({
                  severity: "success",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {res?.data?.Message
                        ? res?.data?.Message
                        : "Ride Partner Status Updated Successfully"}
                    </p>
                  ),

                });


              }).catch(error => {
                setDeleteInvoiceLoader(false)
                toast.current.show({
                  severity: "error",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {error?.response?.data?.Message
                        ? error?.response?.data?.Message
                        : "Ride Rartner Status Updation Failed"}
                    </p>
                  )
                });
              })


            }}
            loading={deleteInvoiceLoader} disabled={deleteInvoiceLoader} className="text-white bg-main-color p-1 pl-2 pr-2 " label="Yes" />
          <Button className="text-white bg-main-color p-1 pl-2 pr-2 " onClick={() => {
            setDeleteInvoiceDialog(false)
          }} label="No" />
        </div>
      </Dialog> 
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}  />
         </>
    )
}

