import  { useRef, useState,useEffect } from "react";
//import { Seaters4, Seaters6, Seaters7or8, Seaters8 } from "./components/assets"; 
import { DataTable } from "primereact/datatable"; 
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";   
import Axios  from "axios";  
import { Toast } from "primereact/toast";
import Loader from "../../Loaders/Components"; 
import { Dialog } from "primereact/dialog";
import AddNewVehicleType from "./components/AddVehicleType/AddVehicleType";
import EditVehicleType from "./components/EditAddVehicleType/EditAddVehicleType";
import { EditIcon } from "./components/assets";
const PricingModel = () => {      
  let toast=useRef() 
  const [loader,setLoader]=useState(true)
  const [vehicleList,setVehicleList]=useState([])   
   const [firstRender,setFirstRender]=useState(false)
  const [refresh,setRefresh]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{  
   
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/VehicleType/List`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res=>{  
      setLoader(false)
    setVehicleList(res?.data?.data)  
     if(!firstRender){
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Vehicle Types Successfully Fetched"}
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
              : "Vehicle Types Fetching Failed"}
          </p>
        ),
      }); 
      setFirstRender(true) 
    }
    })
   },[refresh])
  const [showResturantDetail,setShowResturantDetail]=useState(false)
  const [resturantDetailView,setResturantDetailView]=useState(null)  
  const [addNewDialog,setAddNewDialog]=useState(false)    
  const  [vehicleDetails,setVehiclesDetails]=useState()
  const [EditDialog,setEditDialog]=useState(false)
  const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-left"> 
          {" "}
           
          <div  className="cursor-pointer" onClick={()=>{   
            setVehiclesDetails(rowData)  
            setEditDialog(prev=>!prev)
          }}>
          <EditIcon/>  
            </div>
        
      </div>
    );
  };
   return (  
    <div className="overflow-hidden p-2 mt-[80px]">     
      <div className=" w-full flex flex-wrap flex-row justify-end"> 
        <Button label="Add New" onClick={()=>{ 
          setAddNewDialog(prev=>!prev)
        }} className=" p-1 pl-2 pr-2 bg-main-color text-white" icon="pi pi-plus "></Button>
      </div>
       <DataTable
          value={vehicleList}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          size="small"
          resizableColumns
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         
         
          emptyMessage={ loader ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
            <Loader/>
        </div> : "Vehicle Pricing Not Found"}
          style={{ backgroundColor: "white"}} 
        onRowClick={(rowData)=>{ 
          setResturantDetailView(rowData.data) 
          setShowResturantDetail(prev=>!prev)
        }}       
        rowClassName="cursor-pointer"
          className="  w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="Label"  
            headerClassName="rounded-l-2xl font-normal  text-white bg-main-color"
            className="text-main-color font-normal"
            field="label" 
            body={(rowData)=>{  
                 let Svg=rowData?.svg; 
                  
                return( 
                    <div className="w-[120px]" > 
                         
                           <h1>{rowData?.type}</h1> 
                            
                   </div>
                )
            }}
            
          ></Column> 
             <Column header="Base Fare"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal"   
               body={(rowData)=>{ 
                return( 
                 <p className="ml-2">€ {rowData?.baseRate}</p>
                )
               }}
              field=""></Column>  
           
           <Column header="Minimum price"   headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
              return(  
                <p>€ {rowData?.minPrice}</p>
              )
            }} field="minPrice"></Column>
          
          <Column header="Price Pro KM" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
              return(  
                <p>€ {rowData?.perKmRate}</p>
              )
            }} field="perKmRate"></Column> 
            
          <Column header="Seats" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="noOfSeats"></Column>
       <Column header="Waiting Time" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal"   body={(rowData)=>{ 
              return(  
                <p>{rowData?.waitingTimeRate} €/Min </p>
              )
            }} field="waitingtime"></Column>
         <Column header="Cancel" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" body={(rowData)=>{ 
              return(  
                <p>€ {rowData?.cancelCharges}  </p>
              )
            }} field="cancel"></Column>

             <Column header="Promo" 
            headerClassName="font-normal text-white bg-main-color"  className="text-main-color font-normal" body={(rowData)=>{ 
              return(  
                <p>{rowData?.promo} %  </p>
              )
            }} field="promo"></Column>
 
         <Column header="Actions"  headerClassName=" rounded-r-2xl font-normal  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable>  
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>  
        <Dialog className="w-[95vw] md:w-[90vw]"  header="Add New Vehicle Pricing" headerClassName="text-main-color font-poppins tracking-wide" visible={addNewDialog} onHide={()=>{     
          setRefresh(prev=>!prev)
          setAddNewDialog(prev=>!prev)
        }}> 
      <AddNewVehicleType setAddNewDialog={setAddNewDialog} setRefresh={setRefresh}/>
        </Dialog>   
        <Dialog className="w-[95vw] md:w-[90vw]" header="Update Vehicle Pricing" headerClassName="text-main-color font-poppins tracking-wide" visible={EditDialog} onHide={()=>{     
          setRefresh(prev=>!prev)
          setEditDialog(prev=>!prev)
        }}> 
      <EditVehicleType vehicledetails={vehicleDetails} setEditNewDialog={setEditDialog} setRefresh={setRefresh}/>
        </Dialog>
      </div>
  );
};

export default PricingModel;
