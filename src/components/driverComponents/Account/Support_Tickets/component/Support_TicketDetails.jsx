import { Button } from "primereact/button"; 
import { Smiley,Forward } from "../../../../adminComponents/Requests/components/Support_Tickets/component/assets";
import EmojiPicker from 'emoji-picker-react';
import moment from "moment";       
import { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog"; 
import Axios from "axios"
import { Toast } from "primereact/toast";
export default function SupportTicketDetail({accountactive,setRefresh,token, data, setDetailView }) {   
  let toast=useRef()   
    
   const [isClose,setIsClose]=useState(data?.data?.isClosed)      
    let [firstRenderMessage,setFirstRenderMessage]=useState(false)
   const [supportTicketMessageLoader,setSupportTicketMessageLoader]=useState(true) 
  const [supportTickeMessages,setSupportTicketMessages]=useState([])
   const [inputValue, setInputValue] = useState('');
   const [showPicker, setShowPicker] = useState(false);  
    const [loading,setLoading]=useState(false)  
     const [messageLoader,setMessageLoader]=useState(false)
   const onEmojiClick = (emojiObject,event) => {   
    event.preventDefault()
     
     const emoji = emojiObject?.emoji || emojiObject?.native || '';  
    setInputValue(prevInput => prevInput + emojiObject?.emoji ); 

  };  
  let pickerRef=useRef()
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    } 

  }; 
  let messageRef=useRef()
const scrollToBottom = () => {
  const container = messageRef.current;
  container.scrollTop = container.scrollHeight;
  //container.scrollIntoView({ behavior: "smooth" }); 
};  
  const formatRelativeDate = (date) => {
    const inputDate = moment.utc(date).local(); // Parse the date as UTC and convert to the local timezone
    const today = moment().startOf('day'); // Start of today in local timezone
    const yesterday = moment().subtract(1, 'days').startOf('day'); // Start of yesterday in local timezone
  
    if (inputDate.isSame(today, 'day')) {
      return `Today at ${inputDate.format('HH:mm')} `;
    } else if (inputDate.isSame(yesterday, 'day')) {
      return `Yesterday at ${inputDate.format('HH:mm')} `;
    } else {
      return inputDate.format('DD MMMM YYYY [at] HH:mm ');
    }
  };
useEffect(()=>{ 
  //  let interval=setInterval(()=>{ 
RenderTickets()
    //},1000)
   // return ()=>{ 
     // clearInterval(interval)
    //} 
    let interval=setInterval(()=>{ 
       HiddenReload()
    },2000) 
    return ()=>{ 
      clearInterval(interval)
    }
},[])    
 function RenderTickets(){ 
  Axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/v1/Message/List`, 
     
    { headers: { Authorization: `Bearer ${token}` },params:{ 
      SupportTicketId:data?.data?.id, 
    }}  
      
  ).then(res=>{      
    setSupportTicketMessages(res?.data?.data)  
  
     if(!firstRenderMessage){  
      setTimeout(()=>{ 
        scrollToBottom()
      },500)
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {res?.data?.Message
            ? res?.data?.Message
            : "Support Ticket Messages Fetched Successfully"}
        </p>
      )} )    
       setFirstRenderMessage(true)
    } 
    else{  
      setTimeout(()=>{ 
        scrollToBottom()
      },500)
    }
    setSupportTicketMessageLoader(false)
  } ).catch(err=>{   
     if(!firstRenderMessage){
    toast.current.show({
      severity: "error",
      summary: "Info",
      detail: (
        <p className="font-poppins">
          {err?.response?.data?.Message
            ? err?.response?.data?.Message
            : "Support Ticket Messages Fetching Failed"}
        </p>
      )} )  
     setFirstRenderMessage(true)
    }
   setSupportTicketMessageLoader(false)
  }) 
 } 
 const HiddenReload=()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Message/List`, 
       
      { headers: { Authorization: `Bearer ${token}` },params:{ 
        SupportTicketId:data?.data?.id, 
      }}  
        
    ).then(res=>{      
      setSupportTicketMessages(res?.data?.data)  
    
     
    } ).catch(err=>{   
   
    })  
  }
   
 
      const [closeWitoutReply,setCloseWithoutReply]=useState(false) 
      const [loggedUserId,setLoggedUserId]=useState(JSON.parse(localStorage.getItem("userData"))?.data?.id) 
   
       let prevSenderId = null;    
  return (
    <div className={`p-2 flex z-99999 flex-wrap flex-row justify-between overflow-y-auto font-poppins fixed bg-white    ${accountactive ? "  ml-[-50px] w-full md:w-[calc(100%-320px)]":""} h-[100vh] md:h-[calc(100%-70px)] top-[70px]  text-main-color`}>
        <div className="w-[100%]  md:w-[70%]">
       <Button
        label="Back"
        className="bg-main-color text-white p-1 pr-3 pl-3 "
        onClick={() => {
          setRefresh(prev=>!prev)
            setDetailView(false);
        }}
      />
      <div className="flex flex-wrap   flex-row justify-between items-center ">
        <h1 className="font-semibold  text-[18px] mt-4 ">Ticket Subject</h1>
        <Button   
         disabled={isClose}
        onClick={()=>{
          setCloseWithoutReply(true)
        }}
          className="bg-main-color text-white p-1 pr-3 pl-3"
          label="Close Ticket"
        />
      </div>

      <p className="mt-4">{data?.data?.subject}</p>
      <p>
        {data?.data?.user?.name}{" "}
        <span className="ml-1"> {"<"} {data?.data?.user.email} {">"}</span>{" "}
        <span className="ml-2">{moment(data?.data?.created).format('DD MMMM YYYY')}</span>
      </p>
      <div className="flex  w-full flex-row flex-wrap mt-4  gap-4 justify-left"> 
      <div className="w-[40px] h-[40px] rounded-full   overflow-hidden"> 
                            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={data?.data?.user?.image} className="transform  ml-[50%] mt-[50%] translate-x-[-50%] translate-y-[-50%]"/>
                         </div>  
                      
        <p >{data?.data?.user?.name} </p>    
        <div className="w-full">
        <div ref={messageRef} className="h-[calc(100%)] md:h-[calc(100vh-420px)] w-full  overflow-y-auto">
                             {supportTickeMessages?.map((item, index) => {
                const isSender = !!item?.senderId;
                const showImage = isSender ? item?.senderId !== prevSenderId : item?.img !== prevSenderId;
                prevSenderId = isSender ? item?.senderId : item?.img;

                return (
                    <div key={index} className={`w-full  mt-4 flex-wrap flex-row ${item?.senderId === loggedUserId ? "justify-end": "justify-left"}`}>
                        {isSender ? (
                            <div className={`flex flex-wrap w-full flex-row ${item?.senderId === loggedUserId ? "justify-end": "justify-left"}`}>
                              
                                <div className={`${showImage &&  loggedUserId === item?.senderId ? '' : showImage &&  loggedUserId !== item?.senderId ?  "" : loggedUserId === item?.senderId ? 'mt-[-15px] ':"mt-[-15px] "}  max-w-[80%]`}>
                                    <h1 className={`pl-3 pr-3 rounded-md ${ loggedUserId === item?.senderId ? "text-[white] bg-main-color":"text-main-color  bg-[#F2F2F2]"} mt-2  p-2`}>
                                        {item?.message} 
                                        
                                    </h1>   
                                    <h1 className={`text-[12px]  w-full ${loggedUserId === item?.senderId ? "text-right":""}`}>{formatRelativeDate(item?.created)}</h1>
                                </div> 
                              
                            </div>
                        ) : (
                         <></>
                        )}
                    </div>
                );
            })}  
             </div>
          </div>
      </div>
    
     
       {!isClose ? <div className="mt-10 w-full flex flex-row flex-wrap items-center justify-between">    
        <div className="flex w-[calc(100%-30px)] p-2  rounded-md border border-[#EEEEEE] flex-wrap flex-row justify-between items-center" > 
          <InputText onKeyDown={(event) => {
    if (event.key === 'Enter') { 
      if(!messageLoader){
        let token2 = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;  
          setMessageLoader(true)
          Axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/Message/Send`, 
             { 
               supportTicketId:data?.data?.id, 
              message:inputValue   
             },
            { headers: { Authorization: `Bearer ${token2}` }}  
              
          ).then(res=>{     
             setInputValue("") 
             RenderTickets()
            
            setMessageLoader(false)
          } ).catch(err=>{  
            toast.current.show({
              severity: "error",
              summary: "Info",
              detail: (
                <p className="font-poppins">
                  {err?.response?.data?.Message
                    ? err?.response?.data?.Message
                    : "Support Ticket Reply Sending Failed"}
                </p>
              )} )
           setMessageLoader(false)
          }) 
           
        } 
    }}} disabled={isClose}  type="text" value={inputValue} onChange={(e)=>{ 
            setInputValue(e.target.value)
           }}  placeholder="Reply" className="h-[40px] w-[calc(100%-30px)]"/>     
             <div onClick={() => setShowPicker(val => !val)}
            className="w-[30px]">
            <Smiley/>   
            {showPicker && (
          <div  ref={pickerRef} style={{ position: 'absolute', bottom: '40px', right: 0 }}>
            <EmojiPicker  onEmojiClick={onEmojiClick}  />
          </div>
        )}
            </div>
        </div>  
          <div onClick={()=>{  
              
                 if(!messageLoader){
            let token2 = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;  
              setMessageLoader(true)
              Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/Message/Send`, 
                 { 
                   supportTicketId:data?.data?.id, 
                  message:inputValue   
                 },
                { headers: { Authorization: `Bearer ${token2}` }}  
                  
              ).then(res=>{     
                 setInputValue("") 
                 RenderTickets()
                
                setMessageLoader(false)
              } ).catch(err=>{  
                toast.current.show({
                  severity: "error",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {err?.response?.data?.Message
                        ? err?.response?.data?.Message
                        : "Support Ticket Reply Sending Failed"}
                    </p>
                  )} )
               setMessageLoader(false)
              }) 
               
            }
          }} className="w-[24px]"> 
            <Forward/>
          </div>
         <div> 

         </div>
       </div>  :""
}
       </div> 
        <div className="bg-[#F1E9FE] overflow-y-auto md:h-[calc(100vh-70px)] rounded-l w-full md:w-[28%] mt-4 md:mt-0 pt-4 md:pt-10"> 
          <h1 className="text-left p-4 md:p-0 md:text-center text-[20px]">Details</h1> 
           <div className="flex mt-8 flex-row flex-wrap justify-evenly ">   

           {/* <div> 
            <Chat/>  
            <h1>Chat</h1>
             </div> 
             <div> 
            <Call/>  
            <h1>Call</h1>
             </div>    
             */}
              <h1 className="w-full  p-4 pb-0">Email</h1> 
              <h1 className="w-full p-4 pt-0 ">{data?.data?.user?.email}</h1> 
              
              <h1 className="w-full  p-4 pb-0">Phone Number</h1> 
              <h1 className="w-full p-4 pt-0 ">{data?.data?.user?.phone}</h1> 
              <h1 className="w-full  p-4 pb-0">Location</h1> 
              <h1 className="w-full p-4 pt-0 ">{data?.data?.user?.address}</h1> 
               
           </div>     
             <div className=" mt-20 border-b border-main-color"></div> 
              <h1 className="p-4 pb-0">Assigne</h1> 
              <h1 className="p-4 pb-0">{data?.data?.admin?.name}</h1>
        </div> 
      
     <Dialog visible={closeWitoutReply}  
      headerClassName="text-main-color" 
      className="font-poppins text-main-color"
       onHide={()=>{ 
      setCloseWithoutReply(false)       
     }}> 
           <h1 className="text-main-color">Do You Want to Close The Ticket Without Reply ? </h1>  
              <div className="flex flex-wrap flex-row mt-4 justify-left gap-2 ">   

                  <Button  
                       onClick={()=>{   
                        setLoading(true)
                        Axios.post(
                         `${process.env.REACT_APP_BASE_URL}/api/v1/SupportTickets/Close`, 
                          {id:data?.data?.id},
                         { headers: { Authorization: `Bearer ${token}` }}
                       ).then(res=>{  
                         setIsClose(true)
                       toast.current.show({
                         severity: "success",
                         summary: "Info",
                         detail: (
                           <p className="font-poppins">
                             {res?.data?.Message
                               ? res?.data?.Message
                               : "Support Ticket Close Successfully"}
                           </p>
                         ),
                       });   
                        setTimeout(()=>{ 
                         setLoading(false)   
                        setCloseWithoutReply(false)
                        },500)
                       }).catch(error=>{ 
                         setLoading(false)
                         toast.current.show({
                           severity: "error",
                           summary: "Info",
                           detail: (
                             <p className="font-poppins">
                               {error?.response?.data?.message
                                 ? error?.response?.data?.message
                                 : "Support Ticket Closing Failed"}
                             </p>
                           ),
                         });
                       })
                     }} 
                   label="Yes"   loading={loading} disabled={loading}      className="bg-main-color text-white p-1 pl-2 pr-3"/> 
                  <Button  label="No"  onClick={()=>{ 
                        setCloseWithoutReply(false)  }}   className="bg-main-color text-white p-1 pl-2 pr-3"/> 
              </div>
     </Dialog> 
     <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px]   
     mt-[70px]
    md:left-auto 
    md:transform-none
  " ref={toast}     /> 
    </div>
  );
}
