import {DataTable} from "primereact/datatable" 
import { Column } from "primereact/column"  
import { useRef, useState } from "react"; 
 import CarDetails from "./components/details/car_details"
 import Axios  from "axios";
import { Button } from "primereact/button";
import EditCar from "./components/Edit_Car_Detail/EditCar";
import Loader from "../../../../../../../Loaders/Components"; 
import { formattedDate } from "../../../../../../../Utils";
import { Dialog } from "primereact/dialog";
import AddCar from "../Add_Car/Edit_Car_Detail/AddCar";        
import { Toast } from "primereact/toast";

export default function CarsList({carsData,loader,driverDetail}){         
   const [showCarEdit,setShowCarEdit]=useState(false)   
   const toast=useRef()
   const [assignVehicleDialog,setAssignVehicleDialog]=useState(false)  
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken  
   const [rowData,setRowData]=useState(null)         
   const [assignVehicleLoader,setAssignVehicleLoader]=useState(false)
   const [showAddCar,setShowAddCar]=useState(false)
   const [showDetails,setShowDetails]=useState(false)  
   const [selectedRow,setSelectedRow]=useState()   
   
  const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-evenly"> 
          {" "}
          
            <Button  
              onClick={()=>{ 
                setSelectedRow(rowData)   
                setAssignVehicleDialog(prev=>!prev) 
              }}
             label="Assign"  
             className="bg-main-color rounded-2xl p-1 pl-4 pr-4 text-white "
          />
        
      </div>
    );
  }; 
    return(  
      <>     
      
      {!showCarEdit && !showDetails ? 
          <>        
              <Dialog className="w-[90%]" visible={showAddCar} onHide={()=>{ 
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
          
          emptyMessage={ loader ? <Loader /> : "Car Not Found"}
          style={{ backgroundColor: "white"}} 
            
        rowClassName="cursor-pointer"
          className="  w-full   mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="Car"  
            headerClassName="rounded-l-2xl font-normal text-white bg-main-color"
            className="text-main-color font-normal"
            field="id"   
            
            body={(rowData)=>{ 
              return( 
                <div className="flex flex-wrap justify-left w-[200px] items-center flex-row"> 
                    <div className="w-[40px] rounded-full h-[40px] flex flex-wrap flex-row justify-center items-center overflow-hidden" >
                   <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" /> 
                         </div>
                      <p className="ml-2">{rowData?.company}</p>
                </div>
              )
             }}
            
          ></Column>    
          <Column header="Vehicle Model" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="model"></Column> 
           
               <Column header="Made Year"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal"  field="madeYear"></Column> 
        
               <Column header="Driver"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal"  body={(rowData)=>{  
                return( 
                  <p>{rowData?.driver?"1":"0"}</p>
                )
               }}></Column> 
        
            
            
          <Column header="Registration No" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="carNo"></Column> 
            
            
          <Column header="Color" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="color"></Column> 
            
            
          <Column header="Registration Date" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="registerationDate" 
             body={(rowData)=>{ 
               return( 
                <p>{formattedDate(rowData?.registerationDate)}</p>
               )
             }}
              ></Column>  
             <Column header="Register" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
               return ( 
       <p>{rowData?.registeration ?"Yes":"No"}</p>
               )
            }}></Column>
       
          <Column header="Seats" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="noOfSeats"></Column>
       
       
        
          <Column header="Actions"  headerClassName=" rounded-r-2xl font-normal text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable> 
             <Dialog headerClassName="text-main-color" className="font-poppins text-main-color" header="Confirmation" visible={assignVehicleDialog} onHide={()=>{ 
              setAssignVehicleDialog(prev=>!prev)
             }}>    
            <h1 className="text-center text-main-color">Do You Want To Assign Vehicle </h1>
             <div className="flex mt-4 flex-wrap flex-row justify-evenly"> 
              <Button  onClick={()=>{ 
                

                 setAssignVehicleLoader(prev=>!prev)   
                 Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/AssignDriver?version=1`,{vehicleId:selectedRow?.id,driverId:driverDetail?.id},{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
                  toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Assigned Vehicle"}</p> });
                     //setCarsData(res?.data?.data)       
                     setAssignVehicleLoader(prev=>!prev)  
                     setAssignVehicleDialog(prev=>!prev)
                  
                     
                }).catch((error)=>{  
                     
                  toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Vehicle Assigning Failed"}</p> });
                   setAssignVehicleLoader(prev=>!prev)
                })
              }}  loading={assignVehicleLoader}  disabled={assignVehicleLoader} label="Yes" className="border text-main-color pl-2 pr-2"></Button> 
               <Button label="No" onClick={()=>{ 
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
        <EditCar carDetailView={rowData}  setShowCarEdit={setShowCarEdit}/> :<CarDetails cardetails={rowData} setShowDetails={setShowDetails}/> }
       
         </>
    )
}
 /*  <Dialog visible={showCarEdit} onHide={()=>{setShowCarEdit(false)}} style={{width:"80vw"}}>
      </Dialog> */ 
