import React, { useRef, useState } from "react"; 
import * as Yup from "yup";     
 import { Button } from "primereact/button";
import { useFormik } from "formik";  
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
export default function ChangeEmail({setChangePasswordVisibility}){    
  
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  const [loaderShow,setLoaderShow]=useState(false)     
  const toast=useRef()
    const validationSchema = Yup.object().shape({ 
        email:Yup.string().required("Email Is Required"),    
        newEmail: Yup.string().required("New Email Is Required"),
        password:Yup.string().required("Password Is Required"),    
      })
      const formik = useFormik({
        initialValues: {
          email: "",  
          password:"", 
          newEmail:"", 
        } ,validationSchema,onSubmit:(values,{resetForm})=>{        

            /*setLoaderShow(prev=>!prev)
            Axios.post(`${process.env.REACT_APP_BASE_URL}/api/Account/new-password`,formik.values,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
              toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Password Changed Successfully "}</p> });
                    resetForm()  

                     setLoaderShow(prev=>!prev)
               setChangeEmailVisibility(prev=>!prev)
                    }).catch((error)=>{    
              setLoaderShow(prev=>!prev)
              toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.Message ? error?.response?.data?.Message :"Password Changing Failed"}</p> });
              
            })  
            */ 
          }   
         
      })
     return ( 
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap flex-row font-poppins text-main-color justify-center">
        <div className="w-[98%]">
          <label>Enter Current Email</label>
          <InputText   
             name="email" 
             value={formik?.values.email} 

            placeholder="Enter Current Email"   
            
            onChange={formik.handleChange}
            className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
          />    
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.email}
            </p>
          ) : undefined}
        </div>
        <div className="mt-4 w-[98%]">
          <label>New Email</label>
          <InputText 
          name="newEmail"   
          value={formik?.password}
            placeholder="Enter New Email" 
            onChange={formik.handleChange}
            className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
          />           
           {formik.touched.newEmail && formik.errors.newEmail ? (
            <p className="text-red-500 text-[12px]">
              {formik.errors.newEmail}
            </p>
          ) : undefined}
        </div>
        <div className="mt-4 w-[98%]">
          <label>Enter Current Password</label>
          <InputText   
              name="confirmPassword" 
               onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                             placeholder="Confirm New Password"
            className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
          />            
           {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="text-red-500 text-[12px]">
              {formik.errors.confirmPassword}
            </p>
          ) : undefined}
        </div>
        <Button
          label="Change Email"  
          loading={loaderShow} 
          disabled={loaderShow}
               type="submit"    
          className="mt-4 font-medium bg-main-color p-1 rounded-md text-white pl-4 pr-4"
        />   
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