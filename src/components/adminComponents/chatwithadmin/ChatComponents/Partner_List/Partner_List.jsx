import { Dialog } from "primereact/dialog"
import Axios  from "axios"
import { useEffect, useState } from "react"
import InitateChat from "./components/InitiateChat"

export default function PartnerList({toast,token}){  
    const [connections,setConnections]=useState([] 
      )  
      const [currentUser,setCurrentUser]=useState()
      const [initateDialog,setInitiateDialog]=useState(false)
       useEffect(()=>{ 
        Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/Users/Admins`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {  
          
             if(res?.data?.length > 0){ 
              setConnections(res?.data)
             } 
             else{ 
              
             }
            toast.current.show({
              severity: "success",
              summary: "Info",
              detail: (
                <p className="font-poppins ">
                  {res?.data?.message
                    ? res?.data?.message
                    : "Admin List Fetched Successfully"}
                </p>
              ),
            })}).catch(error=>{ 
              toast.current.show({
                severity: "error",
                summary: "Info",
                detail: (
                  <p className="font-poppins">
                    {error?.response?.data?.message
                      ? error?.response?.data?.message
                      : "Admin List Fetching Failed"}
                  </p>
                ),
              });
            })       
      },[])  
       const [hide,setHide]=useState(true)
    return(  
        <>
         { 
                hide ? <i onClick={()=>{ 
                    setHide(false)
                }} className="pi pi-bars right-[8px] absolute mt-[3px] md:hidden" />:
             ""
             }
                 <div className={`${hide ? "hidden":"w-[90%]"} md:w-[33%] md:block absolute md:relative z-10 h-[calc(100vh-200px)] overflow-y-auto  bg-[white] `}> 
                 <i onClick={()=>{ 
                    setHide(true)
                }} className={` ${!hide ? "":""}  ml-[calc(100%-50px)] md:hidden pi pi-arrow-right`} />
         <div className="w-full items-center flex flex-wrap flex-row justify-between">   
          <div  className=" flex flex-wrap flex-row justify-left">
            <h1>Admins</h1> 
            <h1 className=" ml-5 bg-[#F2F2F2] flex flex-wrap justify-center items-center w-[24px] h-[24px] rounded-full "><p className="mt-[1px]">{connections?.length}</p></h1>
              </div>  
         </div>    
          { 
             connections.map((item,index)=>{ 
                return(  
                    <div    onClick={()=>{          
                    
                      setCurrentUser(item)
                     setInitiateDialog(prev=>!prev)
                   }} className="flex cursor-pointer mt-4 flex-wrap w-full flex-row justify-left ">  
                        <div  
                           
                         className="w-[60px] h-[60px] rounded-full border border-main-color overflow-hidden">
                                 <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={item.image}  className="w-[inherit] h-[auto] transform ml-[50%]  translate-x-[-50%]"/> 
                                 </div>   
                                 <div>
                                  <h1   className="ml-2 w-full">{item.name}</h1> 
                                  <h1 className="ml-2">{item.resturant}</h1> 
                                   </div>
                         </div>
                )
             })
           }
         </div>  
          <Dialog header="Chat Initiation" headerClassName="text-main-color" visible={initateDialog} onHide={()=>{ 
            setInitiateDialog(false)
          }}>  
<InitateChat user={currentUser} toast={toast} token={token}/>
          </Dialog>
          </>
    )
}