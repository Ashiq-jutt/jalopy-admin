import {DataTable} from "primereact/datatable" 
import { Column } from "primereact/column"  
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast"; 
import Axios from "axios";
import Loader from "../../../../Loaders/Components";
import { Dialog } from "primereact/dialog";
import DriverDetails from "./components/details/Car_Details";
import EditCar from "./components/Edit_Car_Detail/Edit_Car_Details";
import AssignVehicle from "./Assign_Vehicle/Car/AssignVehicle";
import { EditIcon } from "../../../restaurants/components/stats/assets/Svg";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
export default function ListDrivers({sortBy,driversData}){  
  const [loader,setLoader]=useState(true)
  const toast=useRef()    
  const [drivers,setDrivers]=useState([])   
  const [updateStatusDialog,setUpdateStatusDialog]=useState(false) 
  const [updateStatusLoader,setUpdateStatusLoader]=useState(false) 
  
  const [refresh,setRefresh]=useState(false) 
  const [rowData,setRowData]=useState()       
  const  [showAssignVehicle,setShowAssignVehicle]=useState(false)
  const [editDialog,setEditDialog]=useState()  
  const [firstRender,setFirstRender]=useState(false)
  const [detailDialog,setDetailDialog]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{  
   
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/List`,
      { headers: { Authorization: `Bearer ${token}` },params:{IncludeAll:true} }
    ).then(res=>{  
      setLoader(false)
    setDrivers(res?.data?.data)   
     if(!firstRender){
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Drivers Data Successfully Fetched"}
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
              : "Drivers Data Fetching Failed"}
          </p>
        ),
      });  
      setFirstRender(true)
    }
    })
   },[refresh,sortBy])  
    const [search,setSearch]=useState() 
  const [showResturantDetail,setShowResturantDetail]=useState(false)
  const [resturantDetailView,setResturantDetailView]=useState(null) 
  const tableActions = (rowData) => {
    return (
      <div className="w-full w-[500px]  flex flex-wrap  items-center flex-row justify-left gap-2"> 
          {" "}
          <div
          onClick={()=>{
            setRowData(rowData)  
            setEditDialog(prev=>!prev)
          }}
           
          >    
            <EditIcon/>
            </div>
           <Button  
          onClick={()=>{
            setRowData(rowData) 
            setDetailDialog(true)
          }}
            icon="pi pi-eye"
            className="w-[25px] h-[25px]  border border-main-color text-main-color "
          />  
           <Button 
             disabled={rowData?.vehicle !== null}
         label="Assign Vehicle "   
         type="button"
           onClick={()=>{ 
            //setShowCarEdit(prev=>!prev)    
             setRowData(rowData)
            setShowAssignVehicle(prev=>!prev)
           }}
         className={`border border-main-color mt-1 p-1  text-white  bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
       />
        
      </div>
    );
  };
    return(  
      <>          
     
       <div className="overflow-x-auto">
        <DataTable
          value={drivers}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          size="small"
          resizableColumns
          paginator 
           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rows={10}
          rowsPerPageOptions={[25, 50]} 
          emptyMessage={ loader ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
            <Loader/>
        </div> : "Drivers Not Found"}
          style={{ backgroundColor: "white"}} 
        onRowClick={(rowData)=>{ 
          setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev)
        }}       
        rowClassName="cursor-pointer"
          className="  w-full   min-w-[900px] mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          
             <Column header="Driver"  headerClassName="rounded-l-2xl text-white font-normal bg-main-color" className="text-main-color font-normal"   
               body={(rowData)=>{ 
                return( 
                  <div className="flex flex-wrap justify-left items-center flex-row"> 
                      
                        <p className="ml-2">{rowData?.fullName}</p>
                  </div>
                )
               }}
              field="driverData.name"></Column>  
           
           <Column header="Car Name"   headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
             return   ( 
               <p>{rowData?.vehicle?.firstName} {rowData?.vehicle?.firstName}</p>
             )
           }}></Column>
          
          <Column header="Car No" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.carNo"></Column> 
            
          <Column header="Seats" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.noOfSeats"></Column>
       
       
          <Column header="Status" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-left`}>
               <InputSwitch
                 checked={rowData?.status}   
                 onClick={()=>{   
                   setRowData(rowData)
                   setUpdateStatusDialog(prev=>!prev)
                 }}
                 className="" 
                
               /> 
             </div>
          )}} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
          <Column header="Actions"  headerClassName="w-[400px] rounded-r-2xl font-normal text-white bg-main-color" className="text-main-color font-normal w-[330px]" field="action" body={tableActions}></Column>
        </DataTable>  
        <div> 

        </div> 
           <Dialog header='Driver Details'  
            headerClassName="font-poppins text-main-color" className="w-[95%] md:w-[90%]" visible={detailDialog} onHide={()=>{ 
             setDetailDialog(prev=>!prev)
           }}>   
             <DriverDetails  cardetails={rowData}/>
          
             </Dialog>          
             <Dialog header='Update Driver Details' headerClassName="font-poppins text-main-color"   
               className="w-[95%] md:w-[90%]"
              visible={editDialog} onHide={()=>{ 
             setEditDialog(prev=>!prev)
           }}>   
             <EditCar setEditDialog={setEditDialog} setRefreshList={setRefresh}  carDetailView={rowData}/>
          
             </Dialog>      
             <Dialog className="w-[95%] md:w-[90%]" visible={showAssignVehicle} onHide={()=>{   
          setRefresh(prev=>!prev)
      setShowAssignVehicle(prev=>!prev)
     }}> 
         <AssignVehicle  setShowAssignVehicle={setShowAssignVehicle} driverDetail={rowData}/> 
      
     </Dialog>       
     <Dialog
          headerClassName="font-poppins text-main-color font-medium"
          header="Confirmation"
          onHide={() => {
            setUpdateStatusDialog(false);
          }}
          visible={updateStatusDialog}
        >   
    
          <div className="font-poppins text-medium text-[#AFAFAF]">
          
            <div className="flex flex-wrap flex-row justify-around">
              <h1 className="text-main-color">Are You Sure You Want To Update the Driver Status? </h1>
            </div>
            <div className="flex flex-wrap mt-4  flex-row justify-around">
              <Button 
               loading={updateStatusLoader} 
               disabled={updateStatusLoader}
                label="Yes"
                onClick={() => {   
                  setUpdateStatusLoader(true)
                  Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/UpdateStatus`,{id:rowData?.id,status:!(rowData?.status)}, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(()=>{   
                  toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Rent Updated Successfully</h1> });
           setRefresh(prev=>!prev)
              setUpdateStatusLoader(prev=>!prev) 
              setUpdateStatusLoader(false)
               setUpdateStatusDialog(prev=>!prev) 
                  }).catch(err=>{ 
                    toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Rent Updation Failed</h1> });
         
               setUpdateStatusLoader(false)
                  }) 
                }}
                className="text-white bg-main-color pl-2 pr-2 "
              />
              <Button
                label="No"
                onClick={() => {
                  setUpdateStatusDialog(false);
                }}
                className=" text-white bg-main-color   pl-3 pr-3 "
              />
            </div>
          </div>  
        </Dialog>
          <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  " ref={toast} /> 
       </div>
         </>
    )
}

