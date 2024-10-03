import { useRef, useState } from "react"
import AllConnections from "./ChatComponents/All_Connections/All_Connections" 
import ConnectionMessage from "./ChatComponents/Connection_Messages/Connection_Messages" 
import PartnerList from "./ChatComponents/Partner_List/Partner_List"
import { Toast } from "primereact/toast"
export default function ChatWithAdmin2({accountactive}){  
      let toast=useRef() 
      let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
      const [allConnectionHide,setAllConnectionHide]=useState(false)   
      const [partnerHide,setPartnerHide]=useState(false)
       const  [conversationUser,setConversationUser]=useState() 
       return(  
 <div className="flex p-4  flex-wrap  flex-row  justify-center md:justify-between">
       <AllConnections allConnectionHide={allConnectionHide} setPartnerHide={setPartnerHide} setAllConnectionHide={setAllConnectionHide} accountactive={accountactive} setConversationUser={setConversationUser} toast={toast} token={token}/>  
       <ConnectionMessage toast={toast} accountactive={accountactive} conversationUser={conversationUser} token={token}/> 
       <PartnerList partnerHide={partnerHide} setAllConnectionHide={setAllConnectionHide} setPartnerHide={setPartnerHide}  accountactive={accountactive} toast={toast} token={token}/> 
       <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
       )
}