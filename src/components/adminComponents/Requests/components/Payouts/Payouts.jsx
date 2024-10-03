import { useState } from "react";  
import { DataTable } from "primereact/datatable"; 
import { Column } from "primereact/column"; 
import TopRankingDetail from "./components/Payout_Details";
import InvoicesData from "./components/components/InvoiceData/InvoiceData";
export default function Payouts(){  
    
     const PayoutData=[{ 
        id:"1", 
        requester:"Robert Jack", 
         subject:"Lorem ipsum dolor sit amet, consectetur adipiscing",  
     
        name:"Ketherine Hales",
        requestDate:"20-08-2024", 
        
        amount:"€2500",
        status:"open", 
        
        bic:"belade21332323", 
        bankdetails:"DE223233232323233", 
         taxIdNumber:"123-123-123", 
         bankdetail:"debited",
        img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        

     }] 
      const [data,setData]=useState(null)      
      const [detailView,setDetailView]=useState(false)
     return( 
         <div>   
           <InvoicesData/>
           </div>
     )
}