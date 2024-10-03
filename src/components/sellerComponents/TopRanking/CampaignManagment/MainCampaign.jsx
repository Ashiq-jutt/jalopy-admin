import React,{useRef, useState} from "react";  
import PersonalInfo from "./PersonalDetails/PersonalDetails";
import Payment from "./Payment/Payment";
import StartCampaignPage from "./StartCampaign/StartCampaign";
import Review from "./Review/Review";  
import * as Yup from "yup";
import  Axios  from "axios"; 

import { useFormik } from "formik"; 
import { Toast } from "primereact/toast";
export default function CampaignManagment(){    
        const toast=useRef()
    const [personalDetail,setPersonalDetail]=useState(true)  
    const [isLoading,setLoading]=useState(false)   
      const personalInfoValidation = Yup.object().shape({
            restaurantName: Yup.string().required("Resturant Name Is Required"),
            iban: Yup.string().required("IBAN Is Required"),
            holderFirstName: Yup.string().required("Holder First Name Is Required"),
            holderLastName: Yup.string().required("Holder Last Name Is Required"), 
          })  
          let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken 
          const [showStartCampaignComponent,setStartCampaignComponent]=useState(false)
   
      const formik = useFormik({
            initialValues: {
              restaurantName: "", 
              bankName:"",
              iban: "", 
              holderFirstName:"", 
              holderLastName:"", 
              bic:"", 
              paymentMethod:"Bank", 
              isPaid:true, 
              amount:"" 
            }, 
             validationSchema:personalDetail ? personalInfoValidation:"",
             onSubmit:(values,{resetForm})=>{  
                  if(showPersonalInfoComponent){
                  setSelectPayment(true)
                  setShowPersonalInfoComponent(false); setShowSelectPaymentInfoComponent(true)  
                  }
                  else if(showStartCampaignComponent){ 
                        setLoading(true)
                        Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/Compaigns/Create`,values, {
                              headers: { Authorization: `Bearer ${token}` },
                            }).then(()=>{   
                              setLoading(false) 
                            toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Campaign Created Successfully</h1> });
                            setStartCampaignComponent(false)     
                        //setStartCampaign(false)     
                        setReview(true)
                        setShowSelectReviewComponent(true)    
                        resetForm()      
                        }).catch(err=>{  
                              
                              setLoading(false) 
                              toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Campaign Creation Failed</h1> });
                               
                            })
                             
                        
                      
                  }
                  
            }})     
    const [selectPayment,setSelectPayment]=useState(false) 
    const [startCampaign,setStartCampaign]=useState(false)     
    const [review,setReview]=useState(false)     
    const [showPersonalInfo,setShowPersonalInfo]=useState(true)   
    const [showPersonalInfoComponent,setShowPersonalInfoComponent]=useState(true)   
    const [showSelectPaymentComponent,setShowSelectPaymentInfoComponent]=useState(false)           
    const [showReviewComponent,setShowSelectReviewComponent]=useState(false)    
    return( 
         <div className="w-full">
          <div className="flex flex-wrap flex-row items-center justify-left mt-10 ">  
           <div className={`w-full md:w-[15%] ${personalDetail ? "":"opacity-[0.1]"}`}>
               <div className="w-[30px]  ml-[50%] translate-x-[-50%] transform rotate-[222deg] h-[30px] bg-main-color rounded-md"> 
                      <p className="text-white  rotate-[-222deg] p-1 pl-[10px]">1</p>
                </div>        
                   <p className="text-center mt-2">Personal Details</p>
                 </div>  
                 <div className="h-[2px]  md:border-b w-[10%]"> 
                
                </div>
                  <div className={`w-full mt-2 md:mt-0 md:w-[15%] ${selectPayment ? "":"opacity-[0.1]"}`}>
                <div className="w-[30px] ml-[50%] translate-x-[-50%]  transform rotate-[222deg] h-[30px] bg-main-color rounded-md"> 
                      <p className="text-white  rotate-[-222deg] p-1 pl-[10px]">2</p>
                </div>        
                
                <p className="text-center">Select Payment</p>
                </div>    
                 <div className="h-[2px] md:border-b w-[10%]"> 
                
                 </div>
                 <div className={`w-full mt-2 md:mt-0 md:w-[15%] ${startCampaign ? "":"opacity-[0.1]"}`}>
                <div className="w-[30px] ml-[50%] translate-x-[-50%]  transform rotate-[222deg] h-[30px] bg-main-color rounded-md"> 
                      <p className="text-white   rotate-[-222deg] p-1 pl-[10px]">3</p>
                </div>   
                
                <p className="mt-2 text-center ">Start Campaign</p>
                 </div>    
                    
                     
                 
          </div>  
           { showPersonalInfoComponent ? <PersonalInfo  formik={formik} setShowPersonalInfoComponent={setShowPersonalInfoComponent} setSelectPayment={setSelectPayment} setShowSelectPaymentInfoComponent={setShowSelectPaymentInfoComponent}/>: showSelectPaymentComponent ?     
           <Payment formik={formik} setShowPersonalInfoComponent={setShowPersonalInfoComponent} setSelectPayment={setSelectPayment} setShowSelectPaymentInfoComponent={setShowSelectPaymentInfoComponent} setShowPersonalInfo={setShowPersonalInfo} setStartCampaign={setStartCampaign}  setStartCampaignComponent={setStartCampaignComponent}/> : showStartCampaignComponent ? <StartCampaignPage isLoading={isLoading} formik={formik} setShowSelectReviewComponent={setShowSelectReviewComponent} setReview={setReview} setStartCampaign={setStartCampaign} setSelectPayment={setSelectPayment} setShowSelectPaymentInfoComponent={setShowSelectPaymentInfoComponent}    setStartCampaignComponent={setStartCampaignComponent} /> : showReviewComponent ? <Review  setShowSelectReviewComponent={setShowSelectReviewComponent} setReview={setReview} setStartCampaign={setStartCampaign} setSelectPayment={setSelectPayment} setShowSelectPaymentInfoComponent={setShowSelectPaymentInfoComponent}    setStartCampaignComponent={setStartCampaignComponent}/>:undefined
    }    
    <Toast ref={toast} />
         </div>
    )
}