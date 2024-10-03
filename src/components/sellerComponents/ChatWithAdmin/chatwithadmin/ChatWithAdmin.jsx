import { useRef, useState } from "react"
import AllConnections from "./ChatComponents/All_Connections/All_Connections" 
import ConnectionMessage from "./ChatComponents/Connection_Messages/Connection_Messages" 
import PartnerList from "./ChatComponents/Partner_List/Partner_List"
import { Toast } from "primereact/toast"
export default function ChatWithParnter({accountactive}){  
      let toast=useRef() 
      let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;   
       const  [conversationUser,setConversationUser]=useState() 
       return(  
 <div className="flex p-4  flex-wrap  flex-row justify-center md:justify-between">
       <AllConnections  accountactive={accountactive} setConversationUser={setConversationUser} toast={toast} token={token}/>  
       <ConnectionMessage toast={toast} accountactive={accountactive} conversationUser={conversationUser} token={token}/> 
       <PartnerList  toast={toast} accountactive={accountactive} token={token}/> 
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