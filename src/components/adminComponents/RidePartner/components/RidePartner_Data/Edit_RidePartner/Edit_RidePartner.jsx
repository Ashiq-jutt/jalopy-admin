import { useRef, useState } from "react";
import { useFormik } from "formik"; 
import * as Yup from 'yup';  
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import Axios  from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
export default function Edit_Ride_Partner({ showEditComponent,setRefresh,resturantDetailView,setShowResturantDetail}) {         

    let navigate=useNavigate()  
     const TradeLicenseRef=useRef()     
    const validationSchema = Yup.object().shape({}); 
    const [loaderShow,setLoaderShow]=useState(false)  
     const toast=useRef()
    let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
   const [mainAgree,setMainAgree]=useState(false)
  const formik = useFormik({
    initialValues: {
      FirstName: resturantDetailView?.firstName, 
      IsAgree:false, 
      PostalCode:resturantDetailView?.postalCode, 
      HouseNo:resturantDetailView?.houseNo, 
      Street:resturantDetailView?.street,
      LastName: resturantDetailView?.lastName, 
      TradeLicense:"", 
      Email:resturantDetailView?.email, 
      Contact:resturantDetailView?.contact, 
      Dob: resturantDetailView?.dob ? new Date(resturantDetailView?.dob):"",
      Land: resturantDetailView?.land,
      TaxId:resturantDetailView?.taxId,   
      Language:resturantDetailView?.language,
      IbanNumber:resturantDetailView?.ibanNumber,
      Id:resturantDetailView?.id
    }, 
    validationSchema, 
    onSubmit:(values,{resetForm})=>{ 
      ;
      setLoaderShow(true);
      const formData = new FormData();
      let fullName;
      Object.keys(formik.values).map((item) => {
          if(item === "TradeLicense"){   
          
            formData.append(item,formik.values[item]) 
             
            
           
          }   
          else{   
            if(item === "Dob"){   
               if(formik.values.Dob){
                formData.append(item,(formik.values.Dob)?.toISOString() )  
               }  
            }
            else{  
            formData.append(item,formik.values[item]) 
            }
          }
      });
     
      Axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/Update`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Ride Partner Successfully Updated"}
              </p>
            ),
          });
          // resetForm()

          setLoaderShow(false); 
           
        })
        .catch((error) => {
          ;
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.Message
                  ? error?.response?.data?.Message
                  : "Ride Partner Updation Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    }
  });
  return (  
    <div className="text-main-color mt-[60px] overflow-y-auto fixed  w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]  h-[calc(100vh-70px)]  z-20 bg-white p-4  fixed top-[0px]">

    <div className="w-[100%]">  
      <div className="h-screen overflow-x-hidden  w-[100%]  overflow-y-auto flex  flex-wrap justify-center items-center">
        <div className="p-1 w-full rounded-lg ">
       
    
      <form onSubmit={formik.handleSubmit}>    
      <div className="flex flex-wrap flex-row justify-left"> 
           <Button type="button" onClick={()=>{ 
             setShowResturantDetail(false)  
             setRefresh(prev=>!prev)
           }} icon="pi pi-arrow-left" className="p-1 bg-main-color text-white pl-2 pr-2 " label="Back"/>
      </div>
        <div className="mt-4  mb-10 flex text-main-color  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-full mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">First Name</label>
            <InputText
              name="FirstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.FirstName}
              className="text-main-color border w-full mt-2 p-2"
            />   
              {formik.touched.FirstName && formik.errors.FirstName ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.FirstName}</p>
            ) : null}
          </div>
          <div className="w-full   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Last Name</label>
            <InputText
              name="LastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.LastName}
              className="text-main-color border w-full mt-2 p-2"
            />  
              {formik.touched.LastName && formik.errors.LastName ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.LastName}</p>
            ) : null}
          </div>
          {/*<div className="w-full mt-2 sm:w-full  font-normal md:w-[20%] lg:w-[20%] ">
            <label>DOB</label>
            <Calendar
              iconPos="right"
              showIcon
              onChange={formik.handleChange}
              value={formik.values.dob}
              placeholder="DOB"
              className="w-full text-main-color border w-full font-normal  mt-2 p-2"
            />
          </div>  */}
          <div className="w-full   mt-2 font-poppins font-normal md:w-[50%] lg:w-[50%]  ">
            <label className="">Date Of Birth</label>
            <Calendar
              name="Dob"
              placeholder="DOB"
              onChange={formik.handleChange}
              value={formik.values.Dob}
              className="text-main-color font-poppins border w-full mt-2 p-2"
            /> 
               {formik.touched.Dob && formik.errors.Dob ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Dob}</p>
            ) : null}
          </div>         
          <div className="w-full   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Street</label>
            <InputText
              name="Street"
              placeholder="Street"
              onChange={formik.handleChange}
              value={formik.values.Street}
              className="text-main-color border w-full mt-2 p-2"
            />  
              {formik.touched.Street && formik.errors.Street ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Street}</p>
            ) : null}
          </div>  
          <div className="w-full   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">House No</label>
            <InputText
              name="HouseNo"
              placeholder="House No"
              onChange={formik.handleChange}
              value={formik.values.HouseNo}
              className="text-main-color border w-full mt-2 p-2"
            />  
              {formik.touched.HouseNo && formik.errors.HouseNo ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.HouseNo}</p>
            ) : null}
          </div>    
          <div className="w-full   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Postal Code</label>
            <InputText
              name="PostalCode"
              placeholder="Postal Code"
              onChange={formik.handleChange}
              value={formik.values.PostalCode}
              className="text-main-color border w-full mt-2 p-2"
            />  
              {formik.touched.PostalCode && formik.errors.PostalCode ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.PostalCode}</p>
            ) : null}
          </div>
          <div className="w-full flex flex-row flex-wrap justify-center sm:justify-center md:justify-between lg:justify-between">
            <div className="w-full    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
              <label className="">Email :</label>
              <InputText
                name="Email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.Email}
                className="text-main-color border w-full mt-2 p-2"
              /> 
                 {formik.touched.Email && formik.errors.Email ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Email}</p>
            ) : null}
            </div>    
            
            <div className="w-full    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
              <label className="">Phone :</label>
              <InputText
                name="Contact"
                placeholder="Phone"
                onChange={formik.handleChange}
                value={formik.values.Contact}
                className="text-main-color border w-full mt-2 p-2"
              /> 
                 {formik.touched.Contact && formik.errors.Contact ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Contact}</p>
            ) : null}
            </div>
            <div className="w-full flex flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
             
             
              
              
              <div className="w-full    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
                <label className="">Country:</label>
                <InputText
                  name="Land"
                  placeholder="Country"
                  onChange={formik.handleChange}
                  value={formik.values.Land}
                  className="text-main-color border w-full mt-2 p-2"
                />  
                   {formik.touched.Land && formik.errors.Land ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Land}</p>
            ) : null}
              </div>
            </div>
          </div>
          <div className="w-full    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">IBAN :</label>
            <InputText
              name="IbanNumber"
              placeholder="IBAN Number"
              onChange={formik.handleChange} 
             
              value={formik.values.IbanNumber}
              className="text-main-color border w-full mt-2 p-2"
            /> 
               {formik.touched.IbanNumber && formik.errors.IbanNumber ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.IbanNumber}</p>
            ) : null}
          </div>
          <div className="w-full    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Tax ID</label>
            <InputText
              name="TaxId"
              placeholder="Tax ID"
              onChange={formik.handleChange}
              value={formik.values.TaxId}
              className="text-main-color border w-full mt-2 p-2"
            />    

{formik.touched.TaxId && formik.errors.TaxId ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.TaxId}</p>
            ) : null}
          </div>  
           
                <div className="w-full  flex flex-row flex-wrap justify-between   mt-2 font-poppins font-normal   ">
           
                  <div className="w-[150px]"> 
                    <label className="mb-10">Language</label> 
                     <div className="flex flex-wrap flex-row  items-center justify-between"> 
                         <p className="flex flex-wrap flex-row justify-left w-full  mt-2"><div className="inline "> 
                    <i onClick={()=>{     
                       formik.setFieldValue("Language","English")
                    }} className={`pi rounded-full ${formik.values.Language === "English" ? "pi-check":""}  w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`}/>
                </div>  
                   <p className="ml-2">English</p>
                  </p> 
                         <p className="flex flex-wrap flex-row justify-left w-full  mt-2"> <div > 
                    <i onClick={()=>{ 
                          formik.setFieldValue("Language","German")
                    }} className={`pi rounded-full ${formik.values.Language === "German" ? "pi-check":""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]`}/>
                </div> 
                  <p>German</p>
                </p> 
                   
                     </div>
                  </div>
          </div> 
         
          <div className="w-full    mt-2 font-poppins font-normal   ">
            <label className="">Trade License <span onClick={()=>{ 
      
      fetch(resturantDetailView?.tradeLicense)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || resturantDetailView?.tradeLicense?.split('/').pop();
  
        return response.blob().then(blob => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename; // Use the filename from the server
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Download failed:', error));
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span></label> 
        <div onClick={()=>{ 
              TradeLicenseRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[40%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.TradeLicense ? formik.values.TradeLicense.name :"No File Choosen" }</p>
                </div> 
            <input className="bg-main-color text-white md:ml-2 mt-2  hidden md:mt-0" ref={TradeLicenseRef} name="TradeLicense" type="file" onChange={(e)=>{ 
                 formik.setFieldValue("TradeLicense",e.target.files[0]) 

            }}    />
               {formik.touched.TradeLicense && formik.errors.TradeLicense ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.TradeLicense}</p>
            ) : null}
          </div>
          <h1 className="w-full mt-4  font-poppins font-normal">Terms And Conditions</h1>
            <div className="mt-4 flex w-full gap-2 flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
            <div className="inline "> 
                    <i onClick={()=>{ 
                      
                       setMainAgree(prev=>!prev)
                    }} className={`pi rounded-full ${mainAgree ? "pi-check":""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`}/>
                </div> 
                <p  className="w-[calc(100%-35px)] mt-[-8px]">
By submitting this form, you agree to our terms and conditions.</p>
              </div>   
              <div className="mt-4 flex  flex-wrap gap-2 flex-row w-full justify-left items-center font-poppins font-normal"> 
            <div className="inline "> 
                    <i onClick={()=>{ 
                      
                      formik.setFieldValue("IsAgree",!formik.values.IsAgree)
                    }} className={`pi rounded-full ${formik.values.IsAgree ? "pi-check":""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`}/>
                </div>   
                <p className="w-[calc(100%-35px)] mt-[-8px]">
                i agree <span className="underline cursor-pointer">terms and conditions</span></p> 
 </div> 
        
               
           <div className="flex flex-wrap flex-row   mt-8 w-full justify-center gap-4 ">
           <Button
          label="Edit" 
                type="button"
          className={`border    border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        /> 
          <Button
          label="Delete" 
                type="button"
          className={`border    border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        />
        <Button
      
      label="Inquiry" 
      type="button"
          className={`border  border-main-color  font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      
        <Button
          disabled={loaderShow} loading={loaderShow} 
          label="Approve" 
          type="submit"
          className={`border  border-main-color font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
        </div>
      </form>
    </div> 
    </div> 
    </div>  
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto  
    mt-[70px]
    md:transform-none
  "   ref={toast}/>
    </div>
  );
}
