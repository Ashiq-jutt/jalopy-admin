import { useRef, useState } from "react"; 
import * as Yup from "yup";     
 import { Button } from "primereact/button";
import { useFormik } from "formik";  
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
export default function ChangeNumber({setChangeNumberVisibility}){    
  
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  const [loaderShow,setLoaderShow]=useState(false)     
  const toast=useRef()
    const validationSchema = Yup.object().shape({ 
        email:Yup.string().required("Email Is Required"),    
        currentPhone:Yup.string().required("Current Phone Number Is Required"), 
        newPhone:Yup.string().required("New Phone Number Is Required"), 
        password:Yup.string().required("Password Is Required"),    
      })
      const formik = useFormik({
        initialValues: {
          email: "",  
           currentPhone:"", 
          newPhone:"", 
          password:"" 
        } ,validationSchema,onSubmit:(values,{resetForm})=>{        

            setLoaderShow(prev=>!prev)
            Axios.post(`${process.env.REACT_APP_BASE_URL}/api/Account/update-phone`,formik.values,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
              toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Password Changed Successfully "}</p> });
                    resetForm()  
                     setLoaderShow(prev=>!prev)
               setChangeNumberVisibility(prev=>!prev)
                    }).catch((error)=>{    
              setLoaderShow(prev=>!prev)
              toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.Message ? error?.response?.data?.Message :"Password Changing Failed"}</p> });
              
            }) 
          }   
         
      })
     return ( 
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap flex-row font-poppins text-main-color justify-center">
        <div className="w-[90%]">
          <label>Current Email</label>
          <InputText   
             name="email" 
             value={formik.values.email} 

            placeholder="Enter Current Email"   
            
            onChange={formik.handleChange}
            className="mt-2 border w-full border-[#C1C1C1] p-1 text-[rgba(0,0,0,.7)]"
          />    
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.email}
            </p>
          ) : undefined}
        </div>
        <div className="mt-4 w-[90%]">
          <label>Current Phone Number</label>
          <InputText 
          name="currentPhone"   
          value={formik?.currentPhone}
            placeholder="Enter Current Phone Number " 
            onChange={formik.handleChange}
            className="mt-2 border w-full border-[#C1C1C1] p-1 text-[rgba(0,0,0,.7)]"
          />           
           {formik.touched.currentPhone && formik.errors.currentPhone ? (
            <p className="text-red-500 text-[12px]">
              {formik.errors.currentPhone}
            </p>
          ) : undefined}
        </div>
        <div className="mt-4 w-[90%]">
          <label>New Phone Number</label>
          <InputText   
              name="newPhone" 
               onChange={formik.handleChange}
                  value={formik.values.newPhone}
                             placeholder="New Phone"
            className="mt-2 border w-full border-[#C1C1C1] p-1 text-[rgba(0,0,0,.7)]"
          />            
           {formik.touched.newPhone && formik.errors.newPhone ? (
            <p className="text-red-500 text-[12px]">
              {formik.errors.newPhone}
            </p>
          ) : undefined}
        </div>  
        <div className="mt-4 w-[90%]">
          <label>Current Password</label>
          <InputText   
              name="password" 
               onChange={formik.handleChange}
                  value={formik.values.password}
                             placeholder="Current Password"
            className="mt-2 border w-full border-[#C1C1C1] p-1 text-[rgba(0,0,0,.7)]"
          />            
           {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-[12px]">
              {formik.errors.password}
            </p>
          ) : undefined}
        </div>
        <Button
          label="Change Phone Number"  
          loading={loaderShow} 
          disabled={loaderShow}
               type="submit"    
          className="mt-4 bg-main-color p-1 rounded-md text-white pl-2 pr-2"
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