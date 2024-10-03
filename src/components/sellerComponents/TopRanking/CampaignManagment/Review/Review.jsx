import { DataTable } from 'primereact/datatable'; 
import { Button } from "primereact/button";
import { Column } from 'primereact/column';   
import {format} from "date-fns" 
import moment from 'moment';
import { InputSwitch } from 'primereact/inputswitch';
import { Campaign } from "@mui/icons-material"; 
import Axios from "axios"
import Loader from '../../../../Loaders/Components';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast'; 
import { Dialog } from 'primereact/dialog';
export default function Review({searchCampaign,currentStatus}){ 
    const [loading,setLoading]=useState(true)    
    const [updateStatusDialog,setUpdateStatusDialog]=useState(false) 
    const [rowData,setRowData]=useState()  
    const [firstRender,setFirstRender]=useState(true)
    const [updateStatusLoader,setUpdateStatusLoader]=useState(false) 
    const [allCapmaigns,setAllCampaigns]=useState([])  
    const [refresh,setRefresh]=useState(false)
    const toast=useRef()
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  useEffect(()=> { 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/List` ,{
          headers: { Authorization: `Bearer ${token}` },params:{ 
            Status:currentStatus
          }
        }).then((res)=>{   
          setLoading(false)  
          setAllCampaigns(res?.data?.data) 
           if(firstRender){
        toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Campaigns Fetched Successfully</h1> });
        setFirstRender(false)     
      }
        }).catch(err=>{ 
           if(firstRender){ 
          toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Campaigns Fetching Failed</h1> });
          setFirstRender(false)   
        }
        })  
      

  },[currentStatus,refresh])
    return(   
    <div className='w-[100%] overflow-auto'>
        <div className="mt-10 w-[100%] min-w-[900px] ">  
              <DataTable emptyMessage={ loading ? <div className="flex font-poppins flex-wrap mt-4 items-center justify-center "> 
        
        <Loader/>
    </div> : <p className='font-poppins font-poppins text-main-color'> Campaigns Not Found</p>} rowClassName="border-b" value={allCapmaigns} className="font-poppins text-main-color min-w-[1200px]" >
    <Column field="restaurantName" header="Resturant Name" className="font-poppins text-main-color"  headerClassName="bg-main-color rounded-l-lg text-white border-rounded-r font-normal"></Column>
    <Column field="compaignType" header="Campaign Type"  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="amount" header="Spent"  className="font-poppins text-main-color" headerClassName="bg-main-color text-white font-normal"></Column>
    <Column field="status" header="Status" className="font-poppins text-main-color" body={(rowData)=>{ 
    return( 
        <div className={` flex items-center   justify-left`}>
        <InputSwitch
          checked={rowData?.status === 1 ? true :false} 
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
     <p>{moment(rowData?.startDate)
      .utc()
      .format('DD MMMM YYYY [at] HH:mm:ss')}</p>
        )
    }}  headerClassName="bg-main-color text-white font-normal"></Column> 
    <Column field="endDate" header="End Date" body={(rowData)=>{ 
        return( 
     <p> {moment(rowData?.endDate)
     .utc()
     .format('DD MMMM YYYY [at] HH:mm:ss')}</p>
        )
    }}  className="font-poppins text-main-color"  headerClassName="bg-main-color text-white font-normal"></Column>  
      {/*
    <Column field="endDate" body={()=>{ 
        return( 
            <Button  label="Edit" className="border border-main-color font-poppins text-main-color p-1 pl-2 pr-2 "/>
        )
    }} header="Actions" className="font-poppins text-main-color"  headerClassName="bg-main-color  font-normal  rounded-r-lg text-white"></Column>*/}
</DataTable> 
<Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "
ref={toast}/> 
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
                  Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/Status`,{id:rowData?.id,status:rowData?.status === 1 ? 2 :rowData?.status === 0 || rowData?.status === 2 ? 1 :""}, {
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
         </div>
    )
}