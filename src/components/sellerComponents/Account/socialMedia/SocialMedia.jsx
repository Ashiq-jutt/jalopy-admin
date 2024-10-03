import Axios from "axios";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react"; 
export default function SocialMedia(){       
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [loaderShow, setLoaderShow] = useState(false);
  const toast = useRef();  
  useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/SocialAccounts/Get`,
      
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res=>{ 
            formik.setFieldValue("facebook",res?.data?.data?.facebook)
            formik.setFieldValue("instagram",res?.data?.data?.instagram)
            formik.setFieldValue("twitter",res?.data?.data?.twitter)
    
          }).catch(err=>{

    })
   },[]) 
   const formik = useFormik({
    initialValues: {
       facebook:"",     
       instagram:"", 
       twitter:"", 
    },  onSubmit: (values, { resetForm }) => { 
      setLoaderShow(prev=>!prev)          
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/SocialAccounts/CreateOrUpdate`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res=>{    
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Social Accounts Updated Successfully "}</p> });
              
         setLoaderShow(prev=>!prev)     
      }).catch(err=>{   
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{err?.data?.Message ? err?.data?.Message :"Social Account Updation Failed "}</p> });
              
        setLoaderShow(prev=>!prev)  
      })
    },})
     return( 
         <form onSubmit={formik.handleSubmit} className=" flex flex-row flex-wrap w-full justify-center md:justify-between"> 
                <div className="pb-4 w-[310px] md:w-[331px] relative border mt-20  border-[#EEEEEE] rounded-lg">   
                 <div className="flex flex-row flex-wrap justify-center">  
                   <div className="mt-[-50px] z-[2] w-[60px] flex flex-wrap flex-row justify-center items-center  h-[60px] bg-[#F2F2F2] rotate-[40deg]"> 

                     <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}className="w-[35px] rotate-[-40deg]" src="/facebook.png"/>  
                      </div>
                      </div> 
                      <div className="h-[100px] w-[100px] ml-[50%] mt-[-70px] transform translate-x-[-50%]  bg-white z-[1] absolute border-b border-[#EEEEEE] rounded-full"></div> 
                       
                    <p className="text-center mt-8">Faceook</p> 
                      <div className="w-full border-b border-main-color mt-4">  
                         
                        </div>  
                          <div className="flex flex-wrap flex-row justify-center w-full">  
                           <InputText name="facebook" className="border mt-4 p-1 text-[rgba(0,0,0,.7)] w-[90%] border-[#EEEEEE] rounded-md" value={formik.values.facebook} onChange={formik.handleChange}  placeholder="Facebook Link"/>
                          </div>
                </div>
                <div className="w-[310px] md:w-[331px] mt-20 border   relative border-[#EEEEEE] rounded-lg">   
                 <div className="flex flex-row flex-wrap relative justify-center">  
                 <div className="mt-[-50px] z-[2] w-[60px] flex flex-wrap flex-row justify-center items-center  h-[60px] bg-[#F2F2F2] rotate-[40deg]"> 

<img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}className="w-[35px] rotate-[-40deg]" src="/instagram.png"/>  
 </div>
 </div> 
 <div className="h-[100px] w-[100px] ml-[50%] mt-[-70px] transform translate-x-[-50%]  bg-white z-[1] absolute border-b border-[#EEEEEE] rounded-full"></div> 
  
<p className="text-center mt-8">instagram</p> 
                      <div className="w-full border-b border-main-color mt-4">  
                         
                        </div>   
                        <div className="flex flex-wrap flex-row justify-center w-full">  
                           <InputText name="instagram" className="border mt-4 p-1 text-[rgba(0,0,0,.7)] w-[90%] border-[#EEEEEE] mb-4 rounded-md" value={formik.values.instagram} onChange={formik.handleChange}  placeholder="Instagram Link"/>
                          </div>
                 </div> 
                <div className="w-[310px] md:w-[331px] border mt-20 relative border-[#EEEEEE] rounded-lg">   
                 <div className="flex flex-row flex-wrap justify-center">  
                 <div className="mt-[-50px] z-[2] w-[60px] flex flex-wrap flex-row justify-center items-center  h-[60px] bg-[#F2F2F2] rotate-[40deg]"> 

<img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}className="w-[35px] rotate-[-40deg]" src="/twitter.png"/>  
 </div>
 </div> 
 <div className="h-[100px] w-[100px] ml-[50%] mt-[-70px] transform translate-x-[-50%]  bg-white z-[1] absolute border-b border-[#EEEEEE] rounded-full"></div> 
  
<p className="text-center mt-8">Twitter</p>  
                      <div className="w-full border-b border-main-color mt-4">  
                         
                        </div>  
                        <div className="flex flex-wrap flex-row justify-center w-full">  
                           <InputText name="twitter" className="border mt-4 p-1 text-[rgba(0,0,0,.7)] w-[90%] border-[#EEEEEE] mb-4 rounded-md" value={formik.values.twitter} onChange={formik.handleChange}  placeholder="Twiiter Link"/>
                          </div>
                 </div>    
                     <div className="flex w-full flex-wrap flex-row mt-4 justify-end "> 
              <Button loading={loaderShow} disabled={loaderShow} label="Submit" type="submit" className="bg-main-color text-white p-1 pl-2 pr-2 "/>
                     </div>   
                     <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
         </form>
     )
}