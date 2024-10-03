import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea"; 
import { useState } from "react";
import ChatWithAdmin from "../../components/sellerComponents/ChatWithAdmin/chatwithadmin/ChatWithAdmin";
import SupportTickets from "../../components/sellerComponents/Account/Support_Tickets/Support_Tickets";
import Chat_Support from "../../components/sellerComponents/Account/chat&support/Chat&Support";
export default function SellerChatWithAdmin({accountactive}){  
    const [chatActive,setChatActive]=useState(true) 
    const [supportActive,setSupportActive]=useState(false)

     return( 
        <div className={`flex p-4  flex-wrap ${accountactive ? "mt-[0px]":"mt-[31px]"} flex-row justify-center md:justify-between`}>  
     <div className={`flex w-full ${accountactive ? "mt-[0px]":"mt-[40px] " } flex-wrap flex-row justify-left items-center`}>   
     { 
     supportActive ? 
   <Button onClick={()=>{ 
       setSupportActive(false) 
       setChatActive(true)
   }} className="w-[320px] text-main-color text-left shadow-md p-2 rounded-md " iconPos="right" label="Chat" icon="pi pi-angle-right"  /> 
   :""  } { 
       chatActive ? 
    <Button onClick={()=>{ 
       setSupportActive(true) 
       setChatActive(false)
   }}   iconPos="right" icon="pi pi-angle-right" className="w-[320px] text-main-color text-left shadow-md p-2 rounded-md "  label="Support"></Button>
:""}
     </div> 
      { chatActive ? 
        <ChatWithAdmin accountactive={accountactive}/> : <Chat_Support accountactive={true}/>
      }
    </div>
     )
}