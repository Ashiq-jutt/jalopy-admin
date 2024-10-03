import  { useState,useRef, useEffect } from "react";
import { useFormik } from "formik"; 
import * as Yup from "yup";  
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import  Axios from "axios";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
export default function EditCar({ carDetailView,setRefreshList, setShowCarEdit }) {   

  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken 
        const [vehicleTypes,setVehicleType]=useState([])         
        const imagRef=useRef()
  const registerationRef=useRef()    
 const LicenseRef=useRef()      
 const tuvRef=useRef()
 useEffect(()=>{ 
  Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/VehicleType/List`,{headers:{'Authorization':`Bearer ${token}`}}).then(res=>{ 
      setVehicleType(res?.data?.data)   
      
  }).catch(err=>{ 

  })
},[])
  const toast=useRef() 
  const [loaderShow,setLoaderShow]=useState(false)
  const validationSchema = Yup.object().shape({
   /* CarNo: Yup.string().required("Car No Is Required"),
    Company: Yup.string().required("Company Is Required"),
    Model: Yup.string().required("Model Is Required"),
    FirstName: Yup.string().required("Name Is Required"),
    NoOfSeats: Yup.string().required("Seats Is Required"),
    LastName: Yup.string().required("Last Name Is Required"),
    RegisterationDate: Yup.string().required("Registration Date Is Required"),
    HandyNo: Yup.string().required("Handy No Is Required"),
    Color: Yup.string().required("Color Is Required"),
    MadeYear: Yup.string().required("Made Year Is Required"),     
    Type:Yup.string().required("Made Year Is Required"), 
    */
    
  });
  const formik = useFormik({
    initialValues: {
      CarNo: carDetailView?.carNo, 
      Id:carDetailView?.id, 
      FirstName:"dummy  ", 
      LastName:" dummy ",
      Model: carDetailView?.model,
      Company: carDetailView?.company,
      MadeYear: carDetailView?.madeYear,
      TuvDate: carDetailView?.TuvDate ? new Date(carDetailView?.TuvDate):"" ,
      NoOfSeats: carDetailView?.noOfSeats,
      Color: carDetailView?.color,
      RegisterationDate:carDetailView?.registerationDate ? new Date(carDetailView?.registerationDate):"",
      Tuv: "",
      Type:carDetailView?.type,
      License: "",
      Registeration: "",    
       Image:"",
      HandyNo:"1"
    },
    validationSchema, 
    onSubmit: (values, {resetForm}) => {        
        
       setLoaderShow(true)
      const formData=new FormData() 
      Object.keys(formik.values).map(item=>{     
         if((item === "RegisterationDate" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined) || (item === "TuvDate" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined) ){ 
              
        formData.append(`${item}`,(formik.values[item])?.toISOString()) 
         } 
         else{  
          
            if(formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined ){
            formData.append(`${item}`,formik.values[item])   
            }
            
         }  

      })       
        
      Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/Update`,formData,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message :"Car Data Updated Sucessfully"}</p> });
       // resetForm()     
       setRefreshList(prev=>!prev)       
        setLoaderShow(false)    
        setTimeout(()=>{ 
   setShowCarEdit(prev=>!prev)
        },1000)

      }).catch((error)=>{           
        
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{error?.response?.data?.message ? error?.response?.data?.message :"Car List Data Updating Failed"}</p> });
        setLoaderShow(false)
      
    })}
  });
  return (
    <form onSubmit={formik.handleSubmit}>
    
      <form>
        <div className="mt-4 text-main-color mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
         
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Car No</label>
            <InputText
              name="CarNo"
              placeholder="Car No"
              onChange={formik.handleChange}
              value={formik.values.CarNo}
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.CarNo && formik.errors.CarNo ? (
              <p className="text-red-500 text-[12px]">{formik.errors.CarNo}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Manufacturer</label>
            <InputText
              name="Company"
              placeholder="Company"
              onChange={formik.handleChange}
              value={formik.values.Company}
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.Company && formik.errors.Company ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.Company}
              </p>
            ) : undefined}
          </div>  
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Vehicle Type</label>
            <Dropdown
              name="Type"
              placeholder="Vehicle Type"  
              onChange={formik.handleChange} 
              value={formik.values.Type}
               options={vehicleTypes}  
         optionLabel="type" 
         optionValue="id"
              className="text-main-color border-main-color h-[34px] border w-full mt-2 "
            />
            {formik.touched.Model && formik.errors.Model ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Model}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Model</label>
            <InputText
              name="Model"
              placeholder="Model"  
              onChange={formik.handleChange}
              value={formik.values.Model}
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.Model && formik.errors.Model ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Model}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Made Year</label>
            <InputText
              name="MadeYear"
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.MadeYear} 
               keyfilter="int"
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.MadeYear && formik.errors.MadeYear ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.MadeYear}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Color</label>
            <InputText
              name="Color"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.Color}
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.Color && formik.errors.Color ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Color}</p>
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
              className="text-main-color border-main-color border w-full mt-2 p-1"
            />
            {formik.touched.NoOfSeats && formik.errors.NoOfSeats ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.NoOfSeats}
              </p>
            ) : undefined}
          </div>
          {/* <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Status</label>
           <Dropdown  
              className="text-main-color font-poppins border-main-color border w-full mt-2 " style={{fontFamily:"poppins"}} placeholder="Registration Status" value={formik.values.registerationStatus} options={[{label:"Yes",value:true},{label:"No",value:false}]} onChange={formik.handleChange} name="registerationStatus"/>  
             
            
            </div>          */}

          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Registration Date</label>
            <Calendar
              name="RegisterationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.RegisterationDate}
              className="text-main-color border-main-color border font-poppins w-full mt-2 p-1"
            />
            {formik.touched.RegisterationDate &&
            formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.RegisterationDate}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Tuv Date</label>
            <Calendar
              name="TuvDate"
              placeholder="TuvDate"
              onChange={formik.handleChange}
              value={formik.values.TuvDate}
              className="text-main-color border-main-color border font-poppins w-full mt-2 p-1"
            />
            {formik.touched.TuvDate && formik.errors.TuvDate ? (
              <p className="text-red-500 text-[12px]">{formik.errors.TuvDate}</p>
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
            <div className="w-full   flex flex-wrap flex-row  items-center  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%]  ">
              <div className=" w-[90%] md:w-[170px] flex flex-wrap mt-4 flex-row ">
              <p>Tuv {carDetailView?.tuv ?  <span onClick={()=>{ 
      
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
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.Tuv ? formik.values.Tuv.name :"No File Choosen" }</p>
                </div> 
              <input
                name="Tuv" 
                ref={tuvRef}
                onChange={(e)=>{ 
                   formik.setFieldValue("Tuv",e.target.files[0])
                }}  
                className="hidden text-main-color text-white bg-main-color mt-4"
                type="file"
              />
              {formik.touched.Tuv && formik.errors.Tuv ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.Tuv}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap  flex-row pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center   justify-left">
              <p>License {carDetailView?.license ?  <span onClick={()=>{ 
      
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
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.License ? formik.values.License.name :"No File Choosen" }</p>
                </div> 

              <input
                name="License"
                onChange={(e)=>{ 
                  formik.setFieldValue("License",e.target.files[0])
              
                }}
                 ref={LicenseRef}
                className="hidden text-main-color mt-4 text-white bg-main-color"
                type="file"
              />
              {formik.touched.License && formik.errors.License ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.License}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
              <p>Registeration {carDetailView?.registeration ?  <span onClick={()=>{ 
      
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
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.Registeration ? formik.values.Registeration.name :"No File Choosen" }</p>
                </div> 

              <input
                className="text-main-color  hidden text-white mt-4 md:w-auto w-full bg-main-color"
                name="Registeration" 
                onChange={(e)=>{ 
                  formik.setFieldValue("Registeration",e.target.files[0])
              
                }}
                ref={registerationRef}  
                 
                type="file"
              />
              {formik.touched.Registeration && formik.errors.Registeration ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.Registeration}
                </p>
              ) : undefined}
            </div>
          </div>
        </div>
      </form>
       
      <div className="flex flex-wrap flex-row  justify-center gap-4 font-poppins "> 
      <Button
          label="Delete"      
          type="button" 
          className={`border mt-2 ml-5 border-main-color  font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
    <Button
          label="Inquiry"      
          type="button" 
          className={`border mt-2 ml-5 border-main-color  font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button  
       
          label="Edit" 
          type="button" 
          className={`border  mt-2 ml-5 border-main-color font-normal   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
      
       /> 
        <Button
          label="Approve" 
          type="submit" 
          disabled={loaderShow} 
          loading={loaderShow}
          className={`border mt-2 ml-5 border-main-color font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
            
     /> </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
    </form>
  );
}
