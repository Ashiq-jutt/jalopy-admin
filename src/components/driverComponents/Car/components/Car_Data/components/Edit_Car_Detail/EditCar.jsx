import  { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext"; 
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";  
import { Toast } from "primereact/toast";
import * as Yup from "yup";  
import Axios  from "axios";
import { Calendar } from "primereact/calendar";
export default function EditCar({carDetailView ,  
  setRefreshList ,setShowCarEdit}) {     
   
    const [vehicleTypes,setVehicleType]=useState([]) 
    const tuvformatDate = (date) => {
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString(); // Months are zero-indexed
      let day = date.getDate().toString();
  
      // Add leading zero to month and day if necessary
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return `${year}-${month}-${day}`;
    }; 
 const registerationRef=useRef() 
 const LicenseRef=useRef()   
 const imagRef=useRef()
  useEffect(()=>{ 
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/VehicleType/List`,{headers:{'Authorization':`Bearer ${token}`}}).then(res=>{ 
          setVehicleType(res?.data?.data)   
          
      }).catch(err=>{ 

      })
  },[])
  const toast=useRef()      
  const tuvRef=useRef()
  const [loaderShow,setLoaderShow]=useState(false)
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  const validationSchema=Yup.object().shape({
   
       
  })
  const formik = useFormik({
    initialValues: { 
      Id:carDetailView?.id,
      CarNo:carDetailView?.carNo,
      Model:carDetailView?.model, 
      Company:carDetailView?.company, 
      TuvDate:carDetailView?.tuvDate ? new Date(carDetailView?.tuvDate):"", 
      MadeYear:carDetailView?.madeYear, 
        NoOfSeats:carDetailView?.noOfSeats, 
        Color:carDetailView?.color, 
        RegisterationDate:carDetailView?.registerationDate ? new Date(carDetailView?.registerationDate):"",       
         Tuv:"", 
          License:"", 
          Registeration:"" , 
          FirstName:null, 
          LastName:null, 
          HandyNo:carDetailView?.handyNo, 
          Type:carDetailView?.type,  
          Image:"",
    },  validationSchema,
    onSubmit: (values, {resetForm}) => {        
        
       setLoaderShow(true)
      const formData=new FormData() 
      let json=formik.values
      Object.keys(formik.values).map(item=>{     
         if(item === "RegisterationDate" || item === "TuvDate"){ 
           
                formData.append(`${item}`,tuvformatDate(values[item]))   
         
               // json[item]=tuvformatDate(values[item])

         } 
         else{  
          if( item === "License" && formik.values[item] !== ""){ 
            formData.append(`${item}`,LicenseRef.current.files[0])  
         
           } 
           else if(item === "Registeration" && formik.values[item] !== ""){ 
            formData.append(`${item}`,registerationRef.current.files[0])  
         
           }   
           else if(item === "Tuv" && formik.values[item] !== ""){ 
            formData.append(`${item}`,registerationRef.current.files[0])  
         
           }  
           else if(item === "Image" && formik.values[item] !== ""){ 
            formData.append(`${item}`,imagRef.current.files[0])  
         
           }
           
           else{ 
 
            formData.append(`${item}`,formik.values[item])  
            }
         }
      })     
   
      Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/Update`,formData,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message :"Vehicle Updated Sucessfully"}</p> });
       // resetForm()           
        setLoaderShow(false)

      }).catch((error)=>{           
        
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{error?.response?.data?.message ? error?.response?.data?.message :"Vehicle Updation Failed"}</p> });
        setLoaderShow(false)
      
    })}
  }); 
  return (
    <form onSubmit={formik.handleSubmit} className="p-2 add-car-comp">  
             <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-left flex-row">
         
         <Button
         label="Back" 
           onClick={()=>{  
            setRefreshList(prev=>!prev)
            setShowCarEdit(false) 
            
           }}
         className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
       />
     </div> 
        <div className="mt-4 text-main-color mb-10 flex add-car-comp font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
       
             
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Handy No</label>
            <InputText
              name="HandyNo"
              placeholder="Handy No"
              onChange={formik.handleChange}
              value={formik.values.HandyNo}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />       
                {formik.touched.HandyNo && formik.errors.HandyNo ? (
              <p className="text-red-500 text-[14px]">{formik.errors.HandyNo}</p>
            ) : undefined}
          </div>
          < div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Car No</label>
            <InputText
              name="CarNo"
              placeholder="Car No"
              onChange={formik.handleChange}
              value={formik.values.CarNo}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />       
                {formik.touched.CarNo && formik.errors.CarNo ? (
              <p className="text-red-500 text-[14px]">{formik.errors.CarNo}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Manufacturer</label>
            <InputText
              name="Company"
              placeholder="Company"
              onChange={formik.handleChange}
              value={formik.values.Company}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />      
                {formik.touched.Company && formik.errors.Company ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Company}</p>
            ) : undefined}
            </div>      
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Model</label>
            <InputText
              name="Model" 
              placeholder="Model"
              onChange={formik.handleChange}
              value={formik.values.Model}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.Model && formik.errors.Model ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Model}</p>
            ) : undefined}
            </div>  
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Made Year</label>
            <InputText
              name="MadeYear" 
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.MadeYear}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.MadeYear && formik.errors.MadeYear ? (
              <p className="text-red-500 text-[14px]">{formik.errors.MadeYear}</p>
            ) : undefined}
            </div>     
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Type</label>
            <Dropdown
              name="Type"
              placeholder="Type"
              onChange={formik.handleChange}
              value={formik.values.Type} 
               options={vehicleTypes}  
               optionLabel="type" 
               optionValue="type" 
               style={{fontFamily:"Poppins"}}
              className="text-[rgba(0,0,0,.5)] dropdownhere  rounded-md border h-[42px] w-full mt-2  pt-0"
            />     
              {formik.touched.Type && formik.errors.Type ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Type}</p>
            ) : undefined}
            </div>  
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Color</label>
            <InputText
              name="Color"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.Color}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.Color && formik.errors.Color ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Color}</p>
            ) : undefined}
            </div> 
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">No Of Seats</label>
            <InputText
              name="NoOfSeats"  
              keyfilter="int"
              placeholder="Seats"
              onChange={formik.handleChange}
              value={formik.values.NoOfSeats}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />    
               {formik.touched.NoOfSeats && formik.errors.NoOfSeats ? (
              <p className="text-red-500 text-[14px]">{formik.errors.NoOfSeats}</p>
            ) : undefined}
            </div>      
       
            
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Registration Date</label>
            <Calendar
              name="RegisterationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.RegisterationDate}
              className="text-[rgba(0,0,0,.5)] border rounded-md font-poppins w-full mt-2 p-2"   

            />    
              {formik.touched.RegisterationDate && formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[14px]">{formik.errors.RegisterationDate}</p>
            ) : undefined}
            </div>     
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">TUV Date</label>
            <Calendar
              name="TuvDate"
              placeholder="TUV Date"
              onChange={formik.handleChange}
              value={formik.values.TuvDate}
              className="text-[rgba(0,0,0,.5)] border rounded-md w-full font-poppins mt-2 p-2"
            />     
              {formik.touched.TuvDate && formik.errors.TuvDate ? (
              <p className="text-red-500 text-[14px]">{formik.errors.TuvDate}</p>
            ) : undefined}
            </div>  
                <div className="flex flex-wrap flex-row justify-center w-full items-center ">   
                <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>Image{carDetailView?.image ?  <span onClick={()=>{ 
      
      fetch(carDetailView?.image)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.image?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</p>
              </div>
              <div onClick={()=>{ 
                imagRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color"> {formik.values.Image ? formik.values.Image.name :"No File Choosen" }</p>
                </div>           
              <input
                ref={imagRef}
                className="hidden text-main-color text-white mt-4  md:w-auto w-full bg-main-color"
                name="TransportLicense"
                onChange={(e) => {
                  formik.setFieldValue("Image", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.Image && formik.errors.Image ? (
                <p className="text-red-500 w-full md:w-auto md:ml-4 mt-4 text-[14px]">
                  {formik.errors.Image}
                </p>
              ) : undefined}
            </div>
                <div className="w-full flex flex-wrap  flex-row pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
                 <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center   justify-left">
               <p >Tuv {carDetailView?.tuv ?  <span onClick={()=>{ 
      
      fetch(carDetailView?.tuv)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.tuv?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</p>   
             </div>      
                
             <div onClick={()=>{ 
               tuvRef.current.click()
              }}  className="  text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color"> {formik.values.Tuv ? formik.values.Tuv.name :"No File Choosen" }</p>
                </div>                     
             <input   name="Tuv" ref={tuvRef}  onChange={(e)=>{ 
              
              formik.setFieldValue("Tuv",e.target.files[0])
             }}
               
                 className="hidden text-main-color mt-4 md:w-auto w-full text-white bg-main-color" type="file"/>   
             {formik.touched.Tuv && formik.errors.Tuv ? (
              <p className="text-red-500 mt-4 text-[14px]">{formik.errors.Tuv}</p>
            ) : undefined}
             </div> 
             <div className="w-full flex flex-wrap  flex-row pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
                 <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center   justify-left">
               <p >Car License {carDetailView?.license ?  <span onClick={()=>{ 
      
      fetch(carDetailView?.license)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.license?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</p>   
             </div>      
                
              <div onClick={()=>{ 
                LicenseRef.current.click()
              }}  className="  text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color"> {formik.values.License ? formik.values.License.name :"No File Choosen" }</p>
                </div>             
             <input  name="License" ref={LicenseRef}  onChange={(e)=>{ 
              
              formik.setFieldValue("License",e.target.files[0])
             }}
               
                 className=" hidden text-main-color mt-4 md:w-auto w-full text-white bg-main-color" type="file"/>   
             {formik.touched.License && formik.errors.License ? (
              <p className="text-red-500 mt-4 text-[14px]">{formik.errors.License}</p>
            ) : undefined}
             </div> 
             <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
                 <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
               <p >Car Registration {carDetailView?.registeration ?  <span onClick={()=>{ 
      
      fetch(carDetailView?.registeration)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.registeration?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</p>
             </div>      
                
             <div onClick={()=>{ 
                registerationRef.current.click()
              }}  className="  text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color"> {formik.values.Registeration ? formik.values.Registeration.name :"No File Choosen" }</p>
                </div>                  
             <input name="Registeration" ref={registerationRef} className="hidden text-main-color md:w-auto w-full  text-white mt-4 bg-main-color" onChange={(e)=>{ 
              
              formik.setFieldValue("Registeration",e.target.files[0])
             }} type="file"/>
             {formik.touched.Registeration && formik.errors.Registeration ? (
              <p className=" text-red-500 mt-4 text-[14px]">{formik.errors.Registeration}</p>
            ) : undefined}
             </div>   
              </div>
            
             
              </div> 
               
     
      <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
         
          <Button       
      
      loading={loaderShow}   
      disabled={loaderShow}
          label="Save And Submit" 
            type="submit"  
          className={`border border-main-Color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>  
            <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "   ref={toast}/>
    </form>
  );
}
