import { Button } from "primereact/button";
import {useRef,useEffect, useState} from "react";
import Axios  from "axios"; 
import { format } from 'date-fns';
import { Toast } from "primereact/toast";
import Loader from "../../Loaders/Components";
const CardTransectionHistory = ({refresh,toast,Newesttransactions}) => { 
  const [ridePartner,setRidePartner]=useState(false) 
  const [seller,setSeller]=useState(true)   
   const [loader,setLoader]=useState(true) 
    const [showLoader,setShowLoader]=useState(false)

   let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
   const [currentTransaction,setCurrentTransaction]=useState([])
   const [transactions,setTransactions]=useState([])   
   const [firstTimeRender,setFirstTimeRender]=useState(false)
   useEffect(()=>{  
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/List`,
      { headers: { Authorization: `Bearer ${token}` },params:{status:1} }
    ).then(res=>{    
       if(!firstTimeRender){
      setLoader(false)
    setTransactions(res?.data?.data) 
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: 
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Transactions Data Successfully Fetched"}
        </p>    
    
      
    });   
   
   setFirstTimeRender(true)
  } 
  setTransactions(res?.data?.data) 
    }).catch(error=>{ 
      setLoader(false)
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: 
          <p className="font-poppins">
            {error?.response?.data?.Message
              ? error?.response?.data?.Message
              : "Transactions Data  Fetching Failed"}
          </p>
        ,
      });
    })
   },[refresh])   
    useEffect(()=>{ 
     if(transactions.length !== 0){    
      if(seller){      
        if(!firstTimeRender){
        setShowLoader(true) 
        }
        const filteredItems = transactions.filter(item => item.ridePartner === null);
            setCurrentTransaction(filteredItems)  
            setTimeout(()=>{ 
              setShowLoader(false)
            },500)
        } 
        else{   
          if(!firstTimeRender){
          setShowLoader(true) 
          }
          const filteredItems = transactions.filter(item => item.vendorShop === null);
          setCurrentTransaction(filteredItems) 
          setTimeout(()=>{ 
            setShowLoader(false)
          },500) 
        }
     }
    },[seller,ridePartner,transactions]) 
     
   return (
    <div >      
         <div className="flex mt-4 flex-wrap flex-row justify-left gap-4"> 
      <Button onClick={()=>{ 
        setRidePartner(true) 
        setSeller(false)
      }} label="Ride Partner" className={`p-1 pl-2 pr-2 ${ridePartner ? "bg-main-color text-white":""}`}> 

      </Button> 
      <Button onClick={()=>{ 
        setRidePartner(false) 
        setSeller(true)
      }}  label="Seller" className={`p-1 pl-2 pr-2 ${seller ? "bg-main-color text-white":""}`}> 

</Button>
     </div>       
     { loader || showLoader ?  
       <div className="flex flex-wrap flex-row justify-center mt-20">
      <Loader/> 
       </div> : <>
       {currentTransaction.map((item,index)=>{ 
           return ( 
            <div className="flex items-center flex-row flex-wrap justify-between mt-5">
                    
                   { 
                     !item.isPaid ? <i className="border rounded-full p-2 border-red-500 text-red-500 pi pi-angle-down"></i>:<i className="rounded-full p-2 border border-green-500 pi pi-angle-up text-green-500"></i>
                   }     
                    
                    <div className="w-[50%]">
                 <h1 className="text-main-color">{item?.invoice?.companyName }</h1>  
                    <h1 className="text-main-color">{format(item.invoice.issueDate, "d MMMM yyyy, 'at' hh:mm a")}</h1>
                  </div>  
                  <div className="text-green-500 w-[35%] flex flex-wrap flex-row items-center justify-end">  
                       <i className={`${item.isPaid ? "pi pi-plus text-green-500":"pi pi-minus text-red-500"}`}></i> 
                       <h1 className={`${item.isPaid ? "text-green-500":"text-red-500"} ml-2`}>$ {item.invoice.totalAmount.toFixed(2)}</h1>
                      </div>
                 
            </div> 
           )
       })
      
}   
   

      </>   } 
    
    </div>
  );
};

export default CardTransectionHistory;
