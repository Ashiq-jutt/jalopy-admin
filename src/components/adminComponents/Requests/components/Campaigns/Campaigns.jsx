import { DataTable } from 'primereact/datatable'; 
import { Button } from "primereact/button";
import { Column } from 'primereact/column';   
import {format} from "date-fns"
import { InputSwitch } from 'primereact/inputswitch';
import { Campaign } from "@mui/icons-material"; 
import Axios from "axios" 
import { Dropdown } from 'primereact/dropdown';
import Loader from '../../../../Loaders/Components';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast'; 
import { Dialog } from 'primereact/dialog';
import CampaignDetails from './component/Support_TicketDetails';
import { setRef } from '@mui/material';
export default function Compaigns(){ 
    const [loading,setLoading]=useState(true)    
    const [updateStatusDialog,setUpdateStatusDialog]=useState(false) 
    const [rowData,setRowData]=useState()  
    const [approveStatus,setApproveStatus]=useState(1) 
    const [currentStatus,setCurrentStatus]=useState(1)
    const [updateStatusLoader,setUpdateStatusLoader]=useState(false) 
    const [allCapmaigns,setAllCampaigns]=useState([])   
    const [approveLoading,setApproveLoading]=useState(true) 
    const [declineLoading,setDeclineLoading]=useState(true) 
     const [approvedList,setApprovedList]=useState([])  
     const [declineStatus,setDeclineStatus]=useState(1)
     const [firstTimeRenderApprove,setFirstTimeRednderApprove]=useState(true) 
     const [firstTimeRenderDecline,setFirstTimeRednderDecline]=useState(true) 
     const [firstTimeRenderNew,setFirstTimeRednderNew]=useState(true)   
       
     const [detailView,setDetailView]=useState(false)
     const [declineList,setDeclineList]=useState([])
    const [refresh,setRefresh]=useState(false)
    const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  useEffect(()=> { 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/List` ,{
          headers: { Authorization: `Bearer ${token}` },params:{ 
            SortBy:0,
            Status:currentStatus
          }
        }).then((res)=>{   
          setLoading(false)  
          setAllCampaigns(res?.data?.data)  
            if(firstTimeRenderNew){ 
                      toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">New Campaigns Fetched Successfully</h1> });
                setFirstTimeRednderNew(false)
        }}).catch(err=>{  
          
          setLoading(false) 
          if(firstTimeRenderNew){ 
           toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">New Campaigns Fetching Failed</h1> });
             setFirstTimeRednderNew(false)  
        }
        })   
     
        
      

  },[currentStatus,refresh])   
    
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/List` ,{
      headers: { Authorization: `Bearer ${token}` },params:{ 
        SortBy:2, 
        Status:declineStatus
      }
    }).then((res)=>{   
      setDeclineLoading(false)   
      setDeclineList(res?.data?.data) 
      if(firstTimeRenderDecline){ 
    toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Declined Campaigns Fetched Successfully</h1> });
     setFirstTimeRednderDecline(false)    
  }  
    }).catch(err=>{    
      
      setDeclineLoading(false)   
      if(firstTimeRenderDecline){
      toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Declined Campaigns Fetching Failed</h1> });
       setFirstTimeRednderDecline(false)  
    }
    })  
  },[declineStatus,refresh]) 
  useEffect(()=>{ 
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/List` ,{
      headers: { Authorization: `Bearer ${token}` },params:{ 
        SortBy:1, 
        Status:approveStatus
      }
    }).then((res)=>{   
      setApproveLoading(false)   
      setApprovedList(res?.data?.data) 
      if(firstTimeRenderApprove){ 
    toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Approved Campaigns Fetched Successfully</h1> });
         setFirstTimeRednderApprove(false)
   }
    }).catch(err=>{  
      
      setApproveLoading(false)    
      if(firstTimeRenderApprove){ 
      toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Approved Campaigns Fetching Failed</h1> });
       setFirstTimeRednderApprove(false)  
    }
    })   
  },[refresh,approveStatus])
    return(    
       <> {
         detailView ? <CampaignDetails token={token} setRefresh={setRefresh} data={rowData} setDetailView={setDetailView}/>: 
    <div className='w-full'>    
    <h1 className='font-poppins text-main-color text-[18px] font-medium'>New</h1> 
          <Dropdown placeholder="Status" value={currentStatus} onChange={(e)=>{ 
     setCurrentStatus(e.value)
                    }} options={[{label:"Approved",value:1},{label:"Pending",value:0},{label:"Rejected",value:2}]} optionLabel="label" optionValue="value" className="text-main-color mt-4 border border-[#C3C3C3] rounded-md"/>  
                   
         <div className='overflow-auto'>
        <div className="mt-4 w-[100%] min-w-[900px] ">  
              <DataTable 
          paginator
          rows={4}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         
          emptyMessage={ loading ? <div className="flex font-poppins flex-wrap mt-4 items-center justify-center "> 
        
        <Loader/>
    </div> : <p className='font-poppins font-poppins text-main-color'>Campaigns Not Found</p>} rowClassName="border-b" value={allCapmaigns} className="font-poppins text-main-color" tableStyle={{ width: '100%' }}>
    <Column field="restaurantName" header="Resturant Name" className="font-poppins text-main-color"  headerClassName="bg-main-color rounded-l-lg text-white border-rounded-r font-normal"></Column>
    <Column field="compaignType" header="Campaign Type"  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="amount" header="Spent"  className="font-poppins text-main-color" headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="status" header="Status" className="font-poppins text-main-color" body={(rowData)=>{ 
    return( 
        <div className={` flex items-center   justify-left`}>
        <InputSwitch
          checked={rowData?.status === 1 ? true :false} 
           onClick={()=>{ 
               //setRowData(rowData)
               //setUpdateStatusDialog(prev=>!prev)
           }}
          className="" 
         
        /> 
      </div>
    )
    }}  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="startDate" header="Start Date" className="font-poppins text-main-color" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.startDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  headerClassName="bg-main-color text-white font-normal"></Column> 
    <Column field="endDate" header="End Date" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.endDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>  
    
    <Column field="endDate" body={(rowData)=>{ 
        
         
        return( 
            <Button icon="pi pi-eye"  onClick={()=>{ 
               setRowData(rowData);setDetailView(true);
            }} label="" className=" font-poppins text-main-color p-1  "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>
</DataTable>   
 </div>
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  " ref={toast} />
        </div>  
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
              <h1 className="text-main-color">Are You Sure You Want To Update the Campaign Status? </h1>
            </div>
            <div className="flex flex-wrap mt-4  flex-row justify-around">
              <Button 
               loading={updateStatusLoader} 
               disabled={updateStatusLoader}
                label="Yes"
                onClick={() => {   
                  setUpdateStatusLoader(true)
                  Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/Status`,{id:rowData?.id,status:!(rowData?.status)}, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(()=>{   
                  toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Campaign Status Updated Successfully</h1> });
           setRefresh(prev=>!prev)
              setUpdateStatusLoader(prev=>!prev) 
              setUpdateStatusLoader(false)
               setUpdateStatusDialog(prev=>!prev) 
                  }).catch(err=>{ 
                    toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Campaign Status Updation Failed</h1> });
         
               setUpdateStatusLoader(false)
                  }) 
                }}
                className=" text-white bg-main-color pl-2 pr-2 "
              />
              <Button
                label="No"
                onClick={() => {
                  setUpdateStatusDialog(false);
                }}
                className="text-white bg-main-color pl-3 pr-3 "
              />
            </div>
          </div>  
        </Dialog>  
        <h1 className='font-poppins text-main-color text-[18px]  mt-10 font-medium'>Approved</h1> 
        <Dropdown placeholder="Status" value={approveStatus} onChange={(e)=>{ 
     setApproveStatus(e.value)
                    }} options={[{label:"Approved",value:1},{label:"Pending",value:0},{label:"Rejected",value:2}]} optionLabel="label" optionValue="value" className="text-main-color border mt-4 border-[#C3C3C3] rounded-md"/>  
                    
         <div className='overflow-auto'>
        <div className="mt-4 w-[100%] min-w-[900px] overflow-auto">  
              <DataTable     paginator
          rows={4} 
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         
          emptyMessage={ approveLoading ? <div className="flex font-poppins flex-wrap mt-4 items-center justify-center "> 
        
        <Loader/>
    </div> : <p className='font-poppins font-poppins text-main-color'>Approved Campaigns Not Found</p>} rowClassName="border-b" value={approvedList} className="font-poppins text-main-color" tableStyle={{ width: '100%' }}>
    <Column field="restaurantName" header="Resturant Name" className="font-poppins text-main-color"  headerClassName="bg-main-color rounded-l-lg text-white border-rounded-r font-normal"></Column>
    <Column field="compaignType" header="Campaign Type"  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="amount" header="Spent"  className="font-poppins text-main-color" headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="status" header="Status" className="font-poppins text-main-color" body={(rowData)=>{ 
    return( 
        <div className={` flex items-center   justify-left`}>
        <InputSwitch
          checked={rowData?.status === 1 ? true :false} 
           onClick={()=>{ 
             //  setRowData(rowData)
              // setUpdateStatusDialog(prev=>!prev)
           }}
          className="" 
         
        /> 
      </div>
    )
    }}  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="startDate" header="Start Date" className="font-poppins text-main-color" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.startDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  headerClassName="bg-main-color text-white font-normal"></Column> 
    <Column field="endDate" header="End Date" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.endDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>  
      {/*
    <Column field="endDate" body={()=>{ 
        return( 
            <Button  label="Edit" className="border border-main-color font-poppins text-main-color p-1 pl-2 pr-2 "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>*/}  
     <Column field="endDate" body={(rowData)=>{ 
        
         
        return( 
            <Button icon="pi pi-eye"  onClick={()=>{ 
               setRowData(rowData);setDetailView(true);
            }} label="" className=" font-poppins text-main-color p-1  "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>
</DataTable>  
</div>  
 </div>
  <h1 className='font-poppins text-main-color text-[18px]  mt-10 font-medium'>Declined</h1> 
<Dropdown placeholder="Status" value={declineStatus} onChange={(e)=>{ 
     setDeclineStatus(e.value)
                    }} options={[{label:"Approved",value:1},{label:"Pending",value:0},{label:"Rejected",value:2}]}  optionLabel="label" optionValue="value" className="text-main-color mt-4 border border-[#C3C3C3] rounded-md"/>  
                   <div className='overflow-auto'>
        <div className="mt-4 w-[100%] min-w-[900px] ">  
              <DataTable     paginator
          rows={4}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         
         emptyMessage={ declineLoading ? <div className="flex font-poppins flex-wrap mt-4 items-center justify-center "> 
        
        <Loader/>
    </div> : <p className='font-poppins font-poppins text-main-color'>Decline Campaigns Not Found</p>} rowClassName="border-b" value={declineList} className="font-poppins text-main-color" tableStyle={{ width: '100%' }}>
    <Column field="restaurantName" header="Resturant Name" className="font-poppins text-main-color"  headerClassName="bg-main-color rounded-l-lg text-white border-rounded-r font-normal"></Column>
    <Column field="compaignType" header="Campaign Type"  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="amount" header="Spent"  className="font-poppins text-main-color" headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="status" header="Status" className="font-poppins text-main-color" body={(rowData)=>{ 
    return( 
        <div className={` flex items-center   justify-left`}>
        <InputSwitch
          checked={false} 
           onClick={()=>{ 
              // setRowData(rowData)
               //setUpdateStatusDialog(prev=>!prev)
           }}
          className="" 
         
        /> 
      </div>
    )
    }}  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="startDate" header="Start Date" className="font-poppins text-main-color" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.startDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  headerClassName="bg-main-color text-white font-normal"></Column> 
    <Column field="endDate" header="End Date" body={(rowData)=>{ 
        return( 
     <p>{format(rowData?.endDate, "d MMMM yyyy, 'at' hh:mm a")}</p>
        )
    }}  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>  
      {/*
    <Column field="endDate" body={()=>{ 
        return( 
            <Button  label="Edit" className="border border-main-color font-poppins text-main-color p-1 pl-2 pr-2 "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>*/}  
     <Column field="endDate" body={(rowData)=>{ 
        
         
        return( 
            <Button icon="pi pi-eye"  onClick={()=>{ 
               setRowData(rowData);setDetailView(true);
            }} label="" className=" font-poppins text-main-color p-1  "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>
</DataTable>   
</div>
</div>
         </div>          
          }
          </>
    )
}