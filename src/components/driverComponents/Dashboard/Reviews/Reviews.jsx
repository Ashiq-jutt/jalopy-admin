import { useEffect, useState } from "react" 
import { Star } from "../../../sellerComponents/dashbord/customerreviews/assets";
import Axios  from "axios" 
import moment from "moment";
import CommonLoaderBlue from "../../../Common/Components/Loader/LoaderBlue";
export default function Reviews({toast}){    
   
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken; 
  const [loader,setLoader]=useState(true)
     const [data,setData]=useState([])     
      useEffect(()=>{ 
       Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Rating/List`,{params:{ 
         RiderId:JSON.parse(localStorage.getItem("userData"))?.riderPartnerId
       },headers: { Authorization: `Bearer ${token}` }} 

       ).then(res=>{   

         toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Customers Reviews Fetched Successfully"}</p> }); 
         setData(res?.data?.data) 
         setLoader(false)
       }).catch(error=>{ 
         toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins ">{error?.response?.data?.message ? error?.response?.data?.message : "Fetching Customer Reviews Failed"}</p> });  
         setLoader(false)
       })
      },[]) 
        {/* figma design   data.map((item,index)=>{ 
                     return( 
                        <div className="flex flex-row text-main-color mt-2 flex-wrap justify-between"> 
                              <h1>{item.label}</h1> 
                               <h1><i className="pi pi-star-fill mr-4 text-[#FCC419]"></i>{item.review}</h1>  
                            </div>
                     )
                  })  
                  */} 
     return( 
         <div className="p-4 w-full overflow-y-auto h-[320px] text-main-color pr-[40px] bg-[#F9F5FF] rounded-lg mt-4">  
          { 
          loader ? <div className="w-full h-full md:mt-[30px] flex flex flex-wrap flex-row justify-center items-center"><CommonLoaderBlue/></div> :   
          <>
                 {
              
                  data.map(item=>{ 
                     return( 
                         <div className="flex flex-wrap border-b border-[#A767E0] md:ml-[20px] p-2 flex-row justify-between">  
                                 <p className="text-main-color">{item?.customer?.name} <span className="text-[12px] text-[#868E96]">{moment(item?.createdAt).utc().format('DD-MM-YY [at] HH:mm')}</span></p>   
                                   <div className="flex w-full md:w-auto mt-2 md:mt-0 flex-wrap flex-row justify-left"><Star/> <p className="ml-2">{item?.rating}/5</p></div>
                                 <p className="w-full text-[#024873] mt-2">{item?.description}</p>
                             </div>
                     )
                    })
                  }    
                {/*  <div>
                   <h1 className="text-right mt-4"><span className="mr-2">See All Reviews</span> <i className="pi absolute mt-[6px] pi-angle-right"></i></h1>
             </div>  */}
             <div>  
                <h1 className="text-[#FE3D4A] text-center mt-10">  
                If there are too many negative reviews, orders may be restricted!
               </h1>
             </div>    
             </>
              }
         </div>
     )
}