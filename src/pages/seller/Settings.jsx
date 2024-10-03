import  { useState } from "react" 
import DriverProfile from "../../components/sellerComponents/Account/profile/DriverProfile"
import Security from "../../components/sellerComponents/Account/security/Security"
import Notification from "../../components/sellerComponents/Account/notification/Notification"
import Chat_Support from "../../components/sellerComponents/Account/chat&support/Chat&Support"
import Reviews from "../../components/sellerComponents/Account/reviews/Review"
import SocialMedia from "../../components/sellerComponents/Account/socialMedia/SocialMedia"
import BankDetails  from "../../components/sellerComponents/Account/bankDetails/BankDetails"
import SellerChatWithAdmin from "./SellerChatWithAdmin"
export default function SellerAccount({isNotificationOpen,setIsNotificationOpen}){   
         const [profileActive,setProfileActive]=useState(true)  
         const [securityActive,setSecurityActive]=useState(false) 
         
         const [notificationActive,setNotificationActive]=useState(false)  
         const [helpActive,setHelpActive]=useState(false)  
          
         const [reviewsActive,setReviewsActive]=useState(false) 
         
         const [bankActive,setBankActive]=useState(false)
         const [socialMediaActive,setSocialMediaActive]=useState(false)  
         
       return(  
              <div className="card font-poppins bg-white font-normal text-main-color mt-[60px] md:mt-[70px] p-4">   
                <div className="flex flex-wrap flex-row  gap-2 md:gap-4 justify-left">  
                  <p onClick={()=>{ 
                     // setCarDetailsActive(false) 
                      setProfileActive(true) 
                      setSocialMediaActive(false) 
                      setSecurityActive(false) 
                      setReviewsActive(false)  
                      setBankActive(false)
                      setNotificationActive(false) 
                      setHelpActive(false)
                     
                  }}  className={`${profileActive ? "border-b":""}  mt-0 md:mt-2  noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color`} 
                  > My Profile
                   </p> 
                  <p   
                   onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false)  
                     
                     setBankActive(false)
                     setSecurityActive(true) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(false) 
                     
                     
                 }}  className={`mt-0 md:mt-2 ${securityActive ? "border-b":""}  noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color`} >  
              Security</p>
                  <p   onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false)   
                     setReviewsActive(false) 
                     setNotificationActive(true)  
                     
                     setBankActive(false)
                     setHelpActive(false) 
                     
                     
                 }}  className={`${notificationActive ? "border-b":""} mt-0 md:mt-2   noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color`} >  
                       Notification
                    </p> 
                  <p   onClick={()=>{  
                    
                    setBankActive(false)
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false)  
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(true) 
                     
                     
                 }}  className={`${helpActive ? "border-b":""}  mt-0 md:mt-2  noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color`} > 
                 Help & Support
                   </p> 
                  <p onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false)  
                     
                     setBankActive(false)
                     setReviewsActive(true) 
                     setNotificationActive(false) 
                     setHelpActive(false) 
                     
                     
                 }}  className={`${reviewsActive ? "border-b":""} mt-0 md:mt-2   noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color`}> 
                     Biling & Invoicing
                    </p> 
              
                  <p  onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(true) 
                     setSecurityActive(false)  
                     setReviewsActive(false)  
                     
                     setBankActive(false)
                     setNotificationActive(false) 
                     setHelpActive(false) 
                     
                     
                 }} className={`${socialMediaActive ? "border-b":""}  mt-0 md:mt-2  noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color `} > 
                     Social Media Integration
                    </p> 
                    <p  onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false)  
                     setReviewsActive(false)  
                     
                     setBankActive(true)
                     setNotificationActive(false) 
                     setHelpActive(false) 
                     
                     
                 }} className={`${bankActive ? "border-b":""}  mt-0 md:mt-2  noround shadow-[!important] pb-2 text-[14px] md:text-[16px] md:pb-[10px] text-center cursor-pointer border-main-color `} > 
                     Bank Details
                    </p> 
      
                </div> 
                 { 
                   profileActive ? <DriverProfile isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen}/>:securityActive ? <Security/>: notificationActive ? <Notification/> :helpActive ? <SellerChatWithAdmin accountactive={true}/> : reviewsActive ? <Reviews/> :socialMediaActive ? <SocialMedia/>:bankActive ? <BankDetails/>:""
                  }
               </div>
       )
}