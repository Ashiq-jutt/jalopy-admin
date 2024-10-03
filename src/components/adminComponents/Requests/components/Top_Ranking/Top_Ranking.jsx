import { DataTable } from 'primereact/datatable'; 
import { Button } from "primereact/button";
import { Column } from 'primereact/column'; 
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import  Axios  from 'axios';
import { Toast } from 'primereact/toast';
import Loader from '../../../../Loaders/Components';
import TopRankingDetail from './components/Top_Ranking_Details';
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
export default function StartCampaignPage({sortBy}){ 
      const [loading,setLoading]=useState(true)             
      const [rowData,setRowData]=useState()
      const [isLoading,setIsLoading]=useState(true)   
      const [activeCapmaigns,setActiveCampaigns]=useState([])    
      const [showDetail,setDetailView]=useState(false)
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
        <> 
         
        {    
        showDetail ? <TopRankingDetail setDetailView={setDetailView} data={rowData} /> :
        <form className='w-full font-poppins'> 
        <div className='w-full'>   
             <div className={`flex w-full text-main-color ${sortBy ? "mt-0":"mt-4"} flex-wrap font-poppins flex-row items-center  justify-center`}> 
              
                   <div className={`w-full overflow-x-auto flex  ${sortBy ? "mt-0":"mt-4"} flex-wrap flex-row justify-center`}> 
                        <div className="w-full">   
                          { sortBy ?
                          <h1 className="w-full font-medium mb-4  text-[20px] text-left">Top Ranking</h1>:''} 
                          <DataTable  
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                  
                           emptyMessage={ loading ? <div className={`flex flex-wrap ${sortBy ? "":"mt-4"}  items-center justify-center `}> 
        
        <Loader/>
    </div> : <p className='font-poppins text-main-color'>Active Campaigns Not Found</p>} rowClassName="  border-b font-poppins font-medium border-main-color font-poppins" value={activeCapmaigns} className="text-main-color min-w-[600px]"  >
    <Column field="id" header="ID" className="text-main-color"  headerClassName='bg-main-color pb-2 pt-2  rounded-l-md   text-white'></Column>
    <Column field="restaurantName" header="Name"  className="text-main-color"  headerClassName=' pb-2 pt-2  bg-main-color  text-white '></Column>
    <Column field="amount" header="Category"  className="text-main-color" headerClassName='bg-main-color pb-2 pt-2   text-white '></Column>
    <Column field="status" header="Quantity" className="text-main-color"  headerClassName='bg-main-color pb-2 pt-2    text-white '></Column> 
     
    <Column field="status" header="Actions" className="text-main-color"  headerClassName='bg-main-color pb-2 pt-2    text-white rounded-r-md ' 
       body={(rowData)=>{ 
         return ( 
          <i  onClick={()=>{ 
             setRowData(rowData) 
               setDetailView(true)
          }} className='cursor-pointer pi pi-eye'></i>
         )
       }}
      ></Column>
</DataTable>
                        </div>
                   </div>
                    
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
}
          </>
    )
}