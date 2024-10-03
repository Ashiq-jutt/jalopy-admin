import React, { useState } from "react" 
import DriverProfile from "../../components/driverComponents/Account/profile/DriverProfile"
import Security from "../../components/driverComponents/Account/security/Security"
import Notification from "../../components/driverComponents/Account/notification/Notification"
import Chat_Support from "../../components/driverComponents/Account/chat&support/Chat&Support"
import Reviews from "../../components/driverComponents/Account/reviews/Review"
import SocialMedia from "../../components/driverComponents/Account/socialMedia/SocialMedia"
import Status from "../../components/driverComponents/Account/status/Status"
import RadiusControl from "../../components/driverComponents/Account/radiusControl/RadiusControl"
import ChatWithAdmin from "./ChatWithAdmin"
export default function DriverAccountProfile({isNotificationOpen,setIsNotificationOpen}){   
         const [profileActive,setProfileActive]=useState(true)  
          
         const [securityActive,setSecurityActive]=useState(false) 
         
         const [notificationActive,setNotificationActive]=useState(false)  
         const [helpActive,setHelpActive]=useState(false)  
          
         const [reviewsActive,setReviewsActive]=useState(false) 
         
         
         const [socialMediaActive,setSocialMediaActive]=useState(false)  
         
         const [radioControlActive,setRadioControlActive]=useState(false)  
         const [statusActive,setStatusMediaActive]=useState(false) 
       return(  
              <div className="card font-poppins font-normal text-main-color mt-[90px] p-4">   
                <div className="flex flex-wrap flex-row justify-left">  
                  <p onClick={()=>{ 
                      setHelpActive(false) 
                      setProfileActive(true) 
                      setSocialMediaActive(false) 
                      setSecurityActive(false) 
                      setStatusMediaActive(false) 
                      setRadioControlActive(false) 
                      setReviewsActive(false) 
                      setNotificationActive(false)
                  }}  className={`${profileActive ? "border-b":""}  mt-2 ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} 
                  > My Profile
                   </p> 
                  <p   
                   onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(true) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(false) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(false)
                 }}  className={`mt-2 ${securityActive ? "border-b":""} ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} >  
              Security</p>
                  <p   onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(false) 
                     setReviewsActive(false) 
                     setNotificationActive(true) 
                     setHelpActive(false)
                 }}  className={`${notificationActive ? "border-b":""} mt-2  ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} >  
                       Notification
                    </p> 
                  <p   onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(false) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(true)
                 }}  className={`${helpActive ? "border-b":""}  mt-2 ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} > 
                 Help & Support
                   </p> 
                  <p onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(false) 
                     setReviewsActive(true) 
                     setNotificationActive(false) 
                     setHelpActive(false)
                 }}  className={`${reviewsActive ? "border-b":""} mt-2  ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`}> 
                     Reviews
                    </p> 
              
                  <p  onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(true) 
                     setSecurityActive(false) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(false) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(false)
                 }} className={`${socialMediaActive ? "border-b":""}  mt-2 ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color `} > 
                     Social Media Integration
                    </p> 
               {/*   <p  onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false) 
                     setStatusMediaActive(true) 
                     setRadioControlActive(false) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(false)
                 }} className={`mt-2 ${statusActive ? "border-b":""}  .new1 ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} >  
                  Status
                    </p> 
                  <p onClick={()=>{ 
                     setProfileActive(false) 
                     setSocialMediaActive(false) 
                     setSecurityActive(false) 
                     setStatusMediaActive(false) 
                     setRadioControlActive(true) 
                     setReviewsActive(false) 
                     setNotificationActive(false) 
                     setHelpActive(false)
                 }}  className={` ${radioControlActive ? "border-b":""} mt-2  ml-4 noround shadow-[!important] pb-[10px] text-center cursor-pointer border-main-color`} > 
                     Radius Control
                    </p> */}
      
                </div> 
                 { 
                   profileActive ? <DriverProfile isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen}/>:securityActive ? <Security/>: notificationActive ? <Notification/> :helpActive ? <ChatWithAdmin accountactive={true}/> : reviewsActive ? <Reviews/> :socialMediaActive ? <SocialMedia/>:statusActive ? <Status/>:radioControlActive ? <RadiusControl/>:""
                  }
               </div>
       )
}