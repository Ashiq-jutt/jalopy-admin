import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import React, { useEffect, useRef, useState } from "react"  
import { Toast } from "primereact/toast" 
import * as Yup from "yup";
import { useFormik } from "formik";
import  Axios  from "axios"
export default function BankDetails(){    
  const toast=useRef()     
  const [loader,setLoaderShow]=useState(false)
  const formik = useFormik({
    initialValues: {
      businessName: "",
      iban: "",
      bankName: "", 
      holderFirstName:"", 
      holderLastName:"", 
      bic:"",  
    },  
    validationSchema: Yup.object().shape({
      businessName: Yup.string().required("Business Name Is Required"),
      iban: Yup.string().required("IBAN Is Required"),
    bankName: Yup.string().required("Bank Name Is Required"),  
    
    holderFirstName: Yup.string().required("Holder FIrst Name Is Required"), 
    
    holderLastName: Yup.string().required("Holder Last Name Is Required"), 
    
    bic: Yup.string().required("BIC Is Required"),      
   }),
    onSubmit:(values,{resetForm})=>{    
      setLoaderShow(prev=>!prev) 
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/BankInfo/AddOrRemove`, 
         values,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {  
          
      setLoaderShow(prev=>!prev) 
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins text-main-color">
                {res?.data?.message
                  ? res?.data?.message
                  : "Bank Info Updated Successfully"}
              </p>
            ),
          })}).catch(error=>{   
            
      setLoaderShow(prev=>!prev) 
            toast.current.show({
              severity: "error",
              summary: "Info",
              detail: (
                <p className="font-poppins">
                  {error?.response?.data?.message
                    ? error?.response?.data?.message
                    : "Bank Details Updation Failed"}
                </p>
              ),
            });
          })
    }   })
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/BankInfo/Get`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => { 
        formik.setValues(prev=>res?.data?.data)
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins text-main-color">
              {res?.data?.message
                ? res?.data?.message
                : "Bank Details Fetched Successfully"}
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
                  : "Bank Details Fetching Failed"}
              </p>
            ),
          });
        })
  },[])
     return(   
         <form onSubmit={formik.handleSubmit} className="text-main-color">
         <div className="w-full items-center mt-4 md:mt-20 flex flex-wrap flex-row justify-center">   
            <p className="mr-0 md:mr-4 w-full md:w-[200px]  text-left md:text-right">Resturant Name</p>
                <div className="w-full md:w-[50%]">  
                     
                     <InputText name="businessName" value={formik.values.businessName} onChange={formik.handleChange} className="border p-2 text-[rgba(0,0,0,0.7)] w-full" placeholder="Resturant Name" />
                     {formik.touched.businessName && formik.errors.businessName ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.businessName}
            </p>
          ) : undefined}
                       <p className="mt-2">Give your registered business name</p>
                     </div>
         </div>  
         <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
            <p className="mr-0 md:mr-4 w-full md:w-[200px] md:text-right">Account holder:</p>
                <div className="w-full md:w-[50%]">  
                       
                       <div className="w-full flex flex-wrap flex-row justify-between">
                     <InputText name="holderFirstName" value={formik.values.holderFirstName}  onChange={formik.handleChange} className="border p-2 text-[rgba(0,0,0,0.7)] w-[49%]" placeholder="First Name" /> 
                     {formik.touched.holderFirstName && formik.errors.holderFirstName ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.holderFirstName}
            </p>
          ) : undefined}
                     <InputText name="holderLastName" value={formik.values.holderLastName} onChange={formik.handleChange} className="border p-2 text-[rgba(0,0,0,0.7)] w-[49%]" placeholder="Last Name" />
                     {formik.touched.holderLastName && formik.errors.holderLastName ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.holderLastName}
            </p>
          ) : undefined}
                         </div>   
                       <p className="mt-2">Give your name on the bank card</p>
                     </div>
         </div>    
         <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
             
             <p className="mr-0 md:mr-4 w-full md:w-[200px] md:text-right">Bank Name</p>
                 <div className="w-full md:w-[50%]">  
                      
                      <InputText name="bankName" value={formik.values.bankName} onChange={formik.handleChange} className="border p-2 text-[rgba(0,0,0,0.7)] w-full" placeholder="Bank Name" />
                      {formik.touched.bankName && formik.errors.bankName ? (
             <p className="text-red-500 w-full text-[12px]">
               {formik.errors.bankName}
             </p>
           ) : undefined}
                        <p className="mt-2">Give your business account detail</p>
                      </div>
          </div>    
         <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
             
            <p className="mr-0 md:mr-4 w-full md:w-[200px] text-left md:text-right">IBAN</p>
                <div className="w-full md:w-[50%]">  
                     
                     <InputText name="iban" value={formik.values.iban} onChange={formik.handleChange} className="border p-2 text-[rgba(0,0,0,0.7)] w-full" placeholder="IBAN" />
                     {formik.touched.iban && formik.errors.iban ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.iban}
            </p>
          ) : undefined}
                       <p className="mt-2">Give your business account detail</p>
                     </div>
         </div>  
         <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
            <p className="mr-0 md:mr-4 w-full md:w-[200px] text-left md:text-right">BIC</p>
                <div className="w-full md:w-[50%]">  
                     
                     <InputText className="border p-2 text-[rgba(0,0,0,0.7)] w-full" name="bic" value={formik.values.bic} onChange={formik.handleChange} placeholder="BIC (Optional)" />
                     {formik.touched.bic && formik.errors.bic ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.bic}
            </p>
          ) : undefined}
                       <p className="mt-2">Give only if living outside germany</p>
                     </div>
         </div>   
         <div className=" w-full  mt-10 flex flex-wrap flex-row justify-center">  
          
           <Button   
             loading={loader} 
             disabled={loader}
            type="submit" label="Update" className="bg-main-color text-white p-1 pr-3 pl-3 "/>

         </div> 
          <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
          </form>
     )
}