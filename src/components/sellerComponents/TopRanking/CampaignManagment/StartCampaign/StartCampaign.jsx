 import { DataTable } from 'primereact/datatable'; 
import { Button } from "primereact/button";
import { Column } from 'primereact/column'; 
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import { Toast } from 'primereact/toast';
import Loader from '../../../../Loaders/Components';
import { data } from 'autoprefixer';
const resturantrank=[{  
    index:1, 
    resturant:"Divine Dive", 
    amount:"€12", 
    status:"active"
},{  
    index:1, 
    resturant:"Divine Dive", 
    amount:"€12", 
    status:"active"
},{  
    index:1, 
    resturant:"Divine Dive", 
    amount:"€12", 
    status:"active" 
}
]
export default function StartCampaignPage({isLoading,formik,setReview,setShowSelectReviewComponent,setSelectPayment,setShowPersonalInfo,setShowPersonalInfoComponent, setShowSelectPaymentInfoComponent,setStartCampaign,setStartCampaignComponent}){ 
      const [loading,setLoading]=useState(true)  
      const [activeCapmaigns,setActiveCampaigns]=useState([])
      const toast=useRef()
    let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
    useEffect(()=> { 
        Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/ActiveList` ,{
            headers: { Authorization: `Bearer ${token}` },
          }).then((res)=>{ 
            setActiveCampaigns(res?.data?.data)   
            setLoading(false) 
          toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Active Campaigns Fetched Successfully</h1> });
            
          }).catch(err=>{ 
            toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Active Campaigs Fetching Failed</h1> });
          
          })  
        

    },[])
    return( 
        <form onSubmit={formik.handleSubmit}>
        <div>   
             <div className="flex text-main-color mt-4 flex-wrap font-poppins flex-row items-center md:p-3 justify-center"> 
                 <p>Amount : </p> 
                  <InputText keyfilter="num" value={formik.values.amount} onChange={formik.handleChange} name="amount" className="border ml-2 border-main-color p-1 rounded-md flex flex-wrap flex-row justify-between items-center"> 
                     
                  </InputText> 
                   <div className="w-full flex  mt-10 flex-wrap flex-row justify-center"> 
                        <div className="w-full md:w-[50%]">  
                          <h1 className="w-full">Top Ranking</h1> 
                          <DataTable   emptyMessage={ loading ? <div className="flex flex-wrap mt-4 items-center justify-center "> 
        
        <Loader/>
    </div> : <p className='font-poppins text-main-color'>Active Campaigns Not Found</p>} rowClassName="border-b border-main-color font-poppins" value={activeCapmaigns} className="text-main-color" tableStyle={{ width: '100%' }}>
    <Column field="id" header="ID" className="text-main-color"  headerClassName="opacity-0"></Column>
    <Column field="restaurantName" header="Name"  className="text-main-color"  headerClassName="opacity-0"></Column>
    <Column field="amount" body={(rowData)=>{ 
   return <p>€{rowData?.amount}</p>
    }} header="Category"  className="text-main-color" headerClassName="opacity-0"></Column>
    <Column field="status" header="Quantity" className="text-main-color"  headerClassName="opacity-0"></Column>
</DataTable>
                        </div>
                   </div>
                    
             </div>   
             <div className=" w-full  mt-10 flex flex-wrap flex-row justify-center">  
         <Button  label="Back"     
             onClick={()=>{   

                 setStartCampaignComponent(false) 
                 setStartCampaign(false)
                  setShowSelectPaymentInfoComponent(true) 
             }}
           className="mr-4 p-1 pr-3 pl-3"/>  
          <Button type="submit" disabled={isLoading} loading={isLoading}  label="Next And Submit"   
              onClick={()=>{     
                
                
                 
              }}
            className="bg-main-color text-white p-1 pr-3 pl-3 "/>

        </div>
         

        </div> 
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "
ref={toast}/> 
        </form>
    )
}