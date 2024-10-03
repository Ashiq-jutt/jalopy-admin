import {DataTable} from "primereact/datatable" 
import { Column } from "primereact/column"  
import {  useRef, useState } from "react"; 
 import CarDetails from "./components/details/car_details"
 import Axios  from "axios";
import { Button } from "primereact/button";
import EditCar from "./components/Edit_Car_Detail/EditCar";  
import Loader from "../../../../../../../../../../Loaders/Components";
import { Dialog } from "primereact/dialog";
import AddCar from "../Add_Car/Edit_Car_Detail/AddCar";
import { Toast } from "primereact/toast"; 
import {formattedDate} from "../../../../../../../../../../Utils"
import { InputSwitch } from "primereact/inputswitch";
export default function AssignCarsList({setRefreshDrivers,carsData,loader,driverDetail}){         
   const [showCarEdit,setShowCarEdit]=useState(false)   
   const toast=useRef()      
      
  const [isUnassignedClick,setIsUnAssignedClick]=useState(false)
   const [assignVehicleDialog,setAssignVehicleDialog]=useState(false)  
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken  
   const [rowData,setRowData]=useState(null)         
   const [assignVehicleLoader,setAssignVehicleLoader]=useState(false)
   const [showAddCar,setShowAddCar]=useState(false)
   const [showDetails,setShowDetails]=useState(false)  
   const [selectedRow,setSelectedRow]=useState()
  const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-left gap-2 w-[220px]"> 
          {" "}
          
            <Button     
             disabled={rowData?.vehicle !== null} 
              onClick={()=>{ 
                setSelectedRow(rowData)   
                setAssignVehicleDialog(prev=>!prev) 
              }}
             label="Assign"  
             className="bg-main-color p-1 rounded-md pl-3 pr-3 text-white "
          />     
           <Button     
             disabled={rowData?.vehicle === null} 
              onClick={()=>{  
                setIsUnAssignedClick(true)
                setSelectedRow(rowData)   
                setAssignVehicleDialog(prev=>!prev) 
              }}
             label="UnAssign"  
             className="bg-main-color p-1 rounded-md pl-3 pr-3 text-white "
          />  
        
      </div>
    );
  }; 
    return(  
      <>     
      
      {!showCarEdit && !showDetails ? 
          <>        
              <Dialog headerClassName="font-poppins" className="w-[90%]" visible={showAddCar} onHide={()=>{ 
                setShowAddCar(prev=>!prev)
              }}> 
                 <AddCar/>
              </Dialog>
         
         <DataTable
          value={carsData}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          size="small" 
          
          resizableColumns
          paginator
          rows={10} 
           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          
          emptyMessage={ loader ?    
           <div className="flex flex-wrap flex-row justify-center ">
            <Loader />   
                </div>
              : "Car Not Found"}
          style={{ backgroundColor: "white"}} 
            
        rowClassName="cursor-pointer"
          className=" w-full mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column header="Driver"  headerClassName="rounded-l-2xl text-white font-normal bg-main-color" className="text-main-color font-normal"   
                body={(rowData)=>{ 
                  return( 
                    <div className="flex flex-wrap justif5-left w-[215px] items-center flex-row"> 
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
    
             }}  src={`${rowData?.imagePath ? rowData?.imagePath :"https://cdn2.vectorstock.com/i/1000x1000/68/01/man-driver-car-avatar-character-vector-24216801.jpg"}`} /> 
                             </div>
                          <p className="ml-2">{rowData?.fullName}</p>
                    </div>
                  )
                 }}
              field="driverData.name"></Column>  
           
           <Column header="Company"  field="vehicle.company"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" ></Column>
          
          <Column header="Car No" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.carNo"></Column> 
            
          <Column header="Seats" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.noOfSeats"></Column>
       
       
          <Column header="Status" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-left`}>
               <InputSwitch
                 checked={rowData?.status}   
                 onClick={()=>{   
                  // setRowData(rowData)
                   //setUpdateStatusDialog(prev=>!prev)
                 }}
                 className="" 
                
               /> 
             </div>
          )}} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
       
        
          <Column header="Actions"  headerClassName=" rounded-r-2xl font-normal text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable> 
             <Dialog headerClassName="text-main-color" className="font-poppins text-main-color" header="Confirmation" visible={assignVehicleDialog} onHide={()=>{ 
              setAssignVehicleDialog(prev=>!prev)
             }}>    
            <h1 className="text-center text-main-color">Do You Want To {isUnassignedClick ? "UnAssign":"Assign"} Driver </h1>
             <div className="flex mt-4 flex-wrap flex-row justify-evenly"> 
              <Button   onClick={()=>{ 
                

                setAssignVehicleLoader(prev=>!prev)   
                Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/AssignDriver?version=1`,{vehicleId:isUnassignedClick ? selectedRow?.vehicle?.id:driverDetail?.id,driverId:selectedRow?.id},{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
                 toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{isUnassignedClick ? "Successfully UnAssigned Driver":"Successfully Assigned Driver"}</p> });
                    //setCarsData(res?.data?.data)       
                    setAssignVehicleLoader(prev=>!prev)  
                    setAssignVehicleDialog(prev=>!prev)
                     setRefreshDrivers(prev=>!prev)
                    
               }).catch((error)=>{  
                    
                 toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{isUnassignedClick ? "Driver UnAssigning Failed":"Driver Assigning Failed"}</p> });
                  setAssignVehicleLoader(prev=>!prev)
               })
             }} loading={assignVehicleLoader}  disabled={assignVehicleLoader} label="Yes" className="border text-main-color pl-2 pr-2"></Button> 
               <Button label="No"  onClick={()=>{
                   setAssignVehicleDialog(prev=>!prev)
               }} className="border text-main-color pl-2 pr-2"></Button>
             </div>
             </Dialog> 
              <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
       </>
        :
        showCarEdit ?
        <EditCar headerClassName="font-poppins" carDetailView={rowData}  setShowCarEdit={setShowCarEdit}/> :<CarDetails cardetails={rowData} setShowDetails={setShowDetails}/> }
       
         </>
    )
}
 /*  <Dialog visible={showCarEdit} onHide={()=>{setShowCarEdit(false)}} style={{width:"80vw"}}>
      </Dialog> */ 
