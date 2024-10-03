import { Dialog } from "primereact/dialog"
import Axios  from "axios"
import { useEffect, useState } from "react"
import InitateChat from "./components/InitiateChat" 
import Loader from "../../../../Loaders/Components"

export default function PartnerList({setAllConnectionHide,partnerHide,setPartnerHide,accountactive,toast,token}){  
    const [connections,setConnections]=useState([] 
      )  
      const [currentUser,setCurrentUser]=useState() 
      const [loader,setLoader]=useState(true)
      const [initateDialog,setInitiateDialog]=useState(false)
       useEffect(()=>{ 
        Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/Users/Admins`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
          .then((res) => {  
             setLoader(false)
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
              setLoader(false)
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
    return(  
        <>
         { 
                partnerHide ? <i onClick={()=>{ 
                    setPartnerHide(false)
                }} className="pi pi-bars right-[8px] cursor-pointer text-main-color absolute mt-[3px] md:hidden" />:
             ""
             }
                 <div className={`${partnerHide ? "hidden":"w-[90%]"} md:w-[33%] md:block text-main-color absolute md:relative z-10 ${accountactive ? "h-[calc(100vh-100px)] md:h-[calc(100vh-270px)]":"h-[calc(100vh-175px)]"} overflow-y-auto  bg-[white] `}> 
                 <i onClick={()=>{  
                  setAllConnectionHide(false)
                    setPartnerHide(true)
                }} className={` ${!partnerHide ? "":""}   cursor-pointer ml-[calc(100%-50px)] md:hidden pi pi-arrow-right`} />
         <div className="w-full items-center flex flex-wrap flex-row justify-between">   
          <div  className=" flex flex-wrap flex-row justify-left">
            <h1 className="font-[600] text-main-color tracking-wide text-[14px] md:text-[20px]">Admins</h1> 
            </div>  
         </div>    
          {   loader ? <div className="flex flex-wrap w-full flex-row justify-center items-center mt-4 mb-4"><Loader/></div>:
                connections?.length === 0 ? <h1 className="text-main-color w-full text-center mt-4 mb-4"> 
                Admins Not Found
                </h1>:
             connections.map((item,index)=>{ 
                return(  
                    <div    onClick={()=>{          
                
                      setCurrentUser(item)
                     setInitiateDialog(prev=>!prev)
                   }} className="flex cursor-pointer mt-4 flex-wrap w-full flex-row justify-left ">  
                        <div  
                           
                         className="w-[60px] h-[60px] rounded-md overflow-hidden">
                                 <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={item?.image ? item?.image  :"https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"}  className="w-[inherit] h-[auto] transform ml-[50%]  translate-x-[-50%]"/> 
                                 </div>   
                                 <div>
                                  <h1   className="ml-2 w-full text-main-color text-[14px] font-[600]">{item.name}</h1> 
                                  <h1 className="ml-2 text-[12px] font-[600]">{item.resturant}</h1> 
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