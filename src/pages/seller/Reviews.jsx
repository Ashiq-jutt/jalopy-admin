import { useState } from "react";   
import { useEffect } from "react";
import Axios  from "axios"; 
import moment from "moment"
import { ProgressSpinner } from "primereact/progressspinner"; 
import Loader from "../../components/Loaders/Components";
function formatDate(dateString) {
  // Parse the date string into a Date object
   return moment(dateString).utc()?.format("MMMM DD , yyyy")
} 
export default function SellerReviews(){     
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  const [reviewerData,setReviewerData]=useState([])    
  const [loading,setLoading]=useState(true)
     
     useEffect(()=>{ 
      Axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/Rating/List`,
        
        {params:{ShopId:1}, headers: { Authorization: `Bearer ${token}` } }
      ).then(res=>{ 
              setReviewerData(res?.data?.data)   
              setLoading(false)
              
            }).catch(err=>{
    
      })
     },[])
       return(      
        <>  
        {  
           loading ? <div className="flex flex-wrap w-full mt-[20%] flex-row justify-center items-center h-[100vh-200px]">    
             <Loader/>      
           </div>:
        <div className=" text-main-color p-2 md:p-10 mt-[70px]">
        <h1 className="text-[16px]">   
            Customer Reviews
        </h1>   
         <div className="flex flex-wrap flex-row justify-center"> 
       {  
         reviewerData.map(item=>{ 
            return( 
                 <div className="w-full p-4 rounded-md bg-[#F1E9FE] mt-4">   
                     <div className="flex w-full flex-wrap flex-row justify-center md:justify-between items-center"> 
                          <div className="flex flex-wrap items-center flex-row justify-left">  
                            
             
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={item?.customer?.image ? item?.customer?.image :"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} className="w-12  border border-main-color p-[2px]  h-12 rounded-full  object-cover" />
            
              
   
      <div className="ml-4">  
          <h1>{item.customer.name ? item?.customer?.name :"Not populated cust name " }</h1> 
           <p className="text-[12px]">{item?.createdAt ? formatDate(item?.createdAt):"Not Populated createdAt"}</p>
         </div> 
           <div className="ml-4">  
              <h1 >{item?.product}</h1>
            </div>
                            </div>  
                                
                           <div className="flex flex-wrap flex-row justify-left   w-[100px]"> 

                            { 
                              [1,2,3,4,5].map(item2=>{ 
                                return(   
                                    <>
                                     {  
                                      item2 <=  item?.rating ?
                                     <i className="pi ml-1 pi-star-fill text-[#FEEF06]" />: <i className="pi ml-1 pi-star text-[grey]" />
                                     } 
                                     </>
                                    )
                              })
                             } 
                             </div>  
                        </div>       
                         <h1 className="mt-10 pl-[40px]">{item?.description}</h1>
                        
                    </div>
            )
         })
        }
              
            </div>
         </div>  
}  
          </> 

       )
}