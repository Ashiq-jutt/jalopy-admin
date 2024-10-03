import React,{useState,useEffect,useRef} from "react" 
import { InputSwitch } from "primereact/inputswitch" 
import { DataTable } from "primereact/datatable"      
import Axios from "axios";
//import { Paginator } from "primereact/paginator"      
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Column } from "primereact/column" 
import EditViewAddDrinks from "./components/edit_view_addproductmain";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { setRef } from "@mui/material";
import Loader from "../../../../../Loaders/Components";
import { EditIcon } from "../../../../../driverComponents/Car/components/Add_Car/Edit_Car_Detail/assets";
export default function ViewTable({itemId,refreshMenuItem}){            
    const [activationLoader,setActivationLoader]=useState(false) 
    const [changeActiveDialog,setChangeActiveDialog]=useState(false)  
    
const tableActions = (rowData) => {
  return (
    <div className="w-full  flex flex-wrap flex-row justify-left"> 
        {" "}
         <div onClick={()=>{  
            
            setSelectedItemData(rowData)
       setShowAiDetailView(prev=>!prev) 
     }}> <EditIcon/> 
          </div>
    </div>
  );
};      
const [refreshOnStatusChange,setRefreshOnStatusChange]=useState(false)
 function ChangeProductStatus(){   
   setRefreshOnStatusChange(true)
   setActivationLoader(prev=>!prev) 
   Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Product/ChangeStatus`,{id:selectedProduct?.id,isActive:!selectedProduct?.isActive},{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
     setRefresh(prev=>!prev)
     toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins text-main-color">{res?.data?.message ? res?.data?.message :`Successfully ${selectedProduct?.isActive ? "DeActivate":"Activate"} the Product`}</p> });
          setActivationLoader(prev=>!prev)  
          setChangeActiveDialog(prev=>!prev)
   }).catch((error)=>{       
    toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :`Product ${selectedProduct?.isActive ? "DeActivation":"Activation"} failed`}</p> });
    setActivationLoader(prev=>!prev) 
   }) 
 }
       const [itemData,setSelectedItemData]=useState()
     const [showAiDetailView,setShowAiDetailView]=useState(false)
    const toast=useRef()   
    const [refresh,setRefresh]=useState(false)
    const [menuItem,setMenuItems]=useState()
   let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken       
      const [loader,setLoader]=useState(false)
      let vendorId = JSON.parse(localStorage.getItem("userData")).data.vendorId;       
      const [tableLoader,setTableLoader]=useState(true)  
      const [selectedProduct,setSelectedProduct]=useState()
      useEffect(()=>{     
        
           if(!refreshOnStatusChange){
         setTableLoader(true)  
         setMenuItems([])  
           }
         setShowAiDetailView(false)
        Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Product/GetProductsByCategory/${itemId}`,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
         // toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Successfully Fetched MenuItems"}</p> });
               
          setMenuItems(res?.data?.data)  
             setLoader(false)    
             if(!refreshOnStatusChange){
             setTableLoader(false)   
             }  
             else{ 
              setRefreshOnStatusChange(false)
             }
        }).catch((error)=>{       
         // toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message :"Menu Items Fetching Failed"}</p> });
         if(!refreshOnStatusChange){
          setTableLoader(false)   
          }  
          else{ 
           setRefreshOnStatusChange(false)
          }
        })   
      },[itemId,refresh,refreshMenuItem])  
     
     return ( 
        <div> 
       {showAiDetailView ? <EditViewAddDrinks setRefresh={setRefresh} setShowAiDetailView={setShowAiDetailView} itemData={itemData} vendorId={vendorId}/>: <DataTable
          value={menuItem}
          size="small"
          resizableColumns
          paginator
          rows={10}
           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" 
        emptyMessage={ tableLoader ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
           <Loader/>
       </div> : <h1 className="text-main-color mt-4 mb-4">Products Not Found</h1>}
          style={{ backgroundColor: "white"}} 
        onRowClick={(rowData)=>{    
          
        }}       
        rowClassName="cursor-pointer"
          className="  w-[99%] p-2 mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="ID"  
            headerClassName="rounded-l-sm font-normal text-white bg-main-color"
            className="text-main-color font-normal"
            field="id"
            
          ></Column>
          <Column header="Image" 
            headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="img" body={(rowData)=>{ 
              return(     
                 <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
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
        
                 }}  className="w-[30px]" src={`${rowData?.imagePath ? rowData?.imagePath :"./drinks.png"}`}/> 
                  </div>
              )
            }}></Column>
          <Column header="Title"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="name"></Column>  
          <Column header="Stock/Out"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="totalStocks" body={(rowData)=>{ return (<p>{rowData?.totalStock > 0 ? "In Stock":"Out Of Stock"}</p>)}}></Column>  
          
           <Column header="Status" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-left`}>
               <InputSwitch 
               onClick={()=>{ 
                setSelectedProduct(rowData) 
                setChangeActiveDialog(prev=>!prev)
               }}
                 checked={rowData.isActive}
                 className="" 
                
               /> 
             </div>
          )}} headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="status"></Column>
             <Column header="Price"  headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="price"></Column>  
         
          <Column header="Actions"  headerClassName=" rounded-r-sm font-normal  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable>      
         
          }    
            <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none 
    mt-[70px]
  "   ref={toast}   /> 
             <Dialog visible={changeActiveDialog} onHide={()=>{ 
              setChangeActiveDialog(prev=>!prev)
             }} header="Change Product Status" className="font-poppins text-main-color"   headerClassName=" text-main-color font-poppins"> 
                    <h1 className="text-main-color">Do You Want To {selectedProduct?.isActive ? "DeActivate":"Activate"} the Product</h1> 
                       <div className="flex mt-4 flex-wrap flex-row justify-evenly"> 
                             <Button onClick={()=>{ 
                              ChangeProductStatus()
                             }}  loading={activationLoader} disabled={activationLoader} className="bg-main-color text-white p-1 pr-2 pl-2" label="Yes"/>
                             <Button  className="bg-main-color text-white p-1 pr-2 pl-2" label="No"/>
               
                       </div>
               </Dialog>  
                   
        </div>
     )
}   