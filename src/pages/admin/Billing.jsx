import React, { useEffect, useRef, useState } from "react"; 
import Axios  from "axios";
import CardBillingInfo from "../../components/adminComponents/billing/CardBillingInfo";
import CardTransectionHistory from "../../components/adminComponents/billing/CardTransectionHistory";
import CardPayment from "../../components/adminComponents/billing/CardPayment";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
const Billing = () => {    
  let toast=useRef()      
  const [payouts,setPayouts]=useState([]) 
  const [loader,setLoader]=useState(true)  
  const [refresh,setRefresh]=useState(false)
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{  
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/List`,
      { headers: { Authorization: `Bearer ${token}` },params:{status:0} }
    ).then(res=>{  
      setLoader(false)
    setPayouts(res?.data?.data) 
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Billing Data Successfully Fetched"}
        </p>
      ),
    });
    }).catch(error=>{ 
      setLoader(false)
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: (
          <p className="font-poppins">
            {error?.response?.data?.Message
              ? error?.response?.data?.Message
              : "Billing Data Fetching Failed"}
          </p>
        ),
      });
    })
   },[refresh]) 
   const Newesttransactions=[{   
    newest:[{
    increase:true, 
    amount:"€2500", 
    label:"Tasty Trials", 
    time:"27 March 2023,at 5:10 AM"
   },{ 
    increase:false, 
    amount:"€2500", 
    label:"Tasty Trials", 
    time:"27 March 2023,at 5:15 AM"
   } ] ,
   yesterday:[{
    increase:true, 
    amount:"€2500", 
    label:"Tasty Trials", 
    time:"27 March 2023,at 5:10 AM"
   },{ 
    increase:false, 
    amount:"€2500", 
    label:"Tasty Trials", 
    time:"27 March 2023,at 5:15 AM"
   } ]
  }] 
   const Yesterdaytransactions=[{ 

   },{}]
  return (
    <div className="md:p-10 font-poppins font-normal text-main-color "> 

      <p className="text-main-color  mt-[70px] p-2  text-[24px] font-medium">All Bills</p>
      <div className=" flex flex-wrap flex-row mt-4 justify-between align-items-start">
        <div className="w-[98%] md:w-[55%]  border shadow-custom rounded-2xl p-2  ">
        <p className="text-main-color text-[18px] mt-4   font-normal">
              Billing Information
              </p> 
          <CardBillingInfo  toast={toast} setRefresh={setRefresh} payouts={payouts} loader={loader} />
        </div>
        <div className=" w-[98%] md:w-[40%] "> 
        <div className="border  rounded-lg p-4">
          <CardPayment/> 
          </div>
        <div className="border mt-4 shadow-transactions rounded-lg p-4">
          <div className=" ">
              <p className="text-main-color   font-normal">
              Transactions
              </p> 
               
              <div className="flex flex-row flex-row  justify-between items-center mt-3 gap-3 ">
              <div className="flex flex-wrap w-[200px]  items-center flex-row justify-left">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 7.5H5.25V9H6.75V7.5ZM9.75 7.5H8.25V9H9.75V7.5ZM12.75 7.5H11.25V9H12.75V7.5ZM14.25 2.25H13.5V0.75H12V2.25H6V0.75H4.5V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25ZM14.25 14.25H3.75V6H14.25V14.25Z"
                    fill="#A767E0"
                  />
                </svg>
                  <Calendar className="text-main-color w-[calc(100%-30px)]" placeholder="" value={new Date()}/>
                  </div> 
                   <p className=" w-[30px]">To</p>
                 <div className="flex flex-wrap w-[200px]  items-center flex-row justify-left">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 7.5H5.25V9H6.75V7.5ZM9.75 7.5H8.25V9H9.75V7.5ZM12.75 7.5H11.25V9H12.75V7.5ZM14.25 2.25H13.5V0.75H12V2.25H6V0.75H4.5V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25ZM14.25 14.25H3.75V6H14.25V14.25Z"
                    fill="#A767E0"
                  />
                </svg>
                  <Calendar className="text-main-color w-[calc(100%-30px)]" placeholder="" value={new Date()}/>
                  </div>
              </div>   
              <CardTransectionHistory refresh={refresh} toast={toast} Newesttransactions={Newesttransactions}  />
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
  "  ref={toast} />
    </div>
  );
};

export default Billing;
