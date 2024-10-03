import {useRef, useState} from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext"; 
import { Button } from "primereact/button";
import * as Yup from "yup";     
import { Toast } from "primereact/toast";
import Axios  from "axios";
import { Calendar } from "primereact/calendar"; 
//import AssignVehicle from "../../../Assign_Vehicle/Car/AssignVehicle";
export default function EditCar({ setRefreshList,carDetailView,setShowCarEdit,setEditDialog }) {    
  const toast=useRef() 
  
  let BASE_URL=`${process.env.REACT_APP_BASE_URL}`   
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken   
  const idRef=useRef()   
  const registerationRef=useRef()
  const [loaderShow,setLoaderShow]=useState(false) 
  const transportRef=useRef() 
  const [freezeDays,setFreezeDays]=useState(0)
  const licenseRef=useRef()   
   const [monthly,setMonthly]=useState(false)  
   
   const [weekly,setWeekly]=useState(false) 
   
   const [hourly,setHourly]=useState(false)   
   const [tripBase,setTripBase]=useState(false) 
   const [monthlyAmount,setMontlyAmount]=useState() 
   const [weeklyAmount,setWeeklyAmount]=useState()  
   const [hourlyAmount,setHourlyAmount]=useState() 
   const [tripPercentage,setTripPercentage]=useState()

  {/*   
    IdCard:Yup.string().required("ID Card Is Required"), 
     License:Yup.string().required("License Is Required"), 
     Registeration:Yup.string().required("Registeration File Is Required"),
   
  name: Yup.string().required("Car No Is Required"),  
    lastName:Yup.string().required("Last Name Is Required"),
    handyNo: Yup.string().required("handyNo Is Required"),
  name: Yup.string().required("Name Is Required"),
    seats: Yup.string().required("Seats Is Required"),
    lastName: Yup.string().required("Last Name Is Required"),
    registrationDate: Yup.string().required("Registration Date Is Required"),   
    handyNo:Yup.string().required("Handy No Is Required"),   
     licenseClass:Yup.string().required("License Class Is Required"),   
      dob:Yup.string().required("Made Year Is Required"),     
      email:Yup.string().required("Email Is Required"),       
      houseNo:Yup.string().required("House No Is Required"), 
      city:Yup.string().required("City Is Required"), 
      zipCode:Yup.string().required("Zip Code Is Required") ,
      state:Yup.string().required("State Is Required"), 
      country:Yup.string().required("Country Is Required"),
       street:Yup.string().required("Street Is Required"),    
       Ausweis:Yup.string().required("Ausweis Is Required"),   
       Führschein:Yup.string().required("Führschein Is Required") , 
       Anmeldung:Yup.string().required("Anmeldung Is Required"),
       pSchein:Yup.string().required("Anmeldung Is Required")
*/}
  const [showAssignVehicle,setShowAssignVehicle]=useState(false)       
  const validationSchema=Yup.object().shape({
 
    })
  const formik = useFormik({
    initialValues: {         
       Id:carDetailView?.id,    
      Name:carDetailView?.fullName?.slice(0,carDetailView?.fullName?.lastIndexOf(" ")), 
      LastName:carDetailView?.fullName?.slice(carDetailView?.fullName?.lastIndexOf(" ")+1), 
      City:carDetailView?.city, 
      Email: carDetailView?.email,
      IdCard:"",
      License: "",
      Password: carDetailView?.password,
      Registeration: "",   
      LicenseClass:carDetailView?.driverDocument?.licenseClass, 
      Dob:new Date(carDetailView?.dob) , 
      Street:carDetailView?.street, 
      HouseNo:carDetailView?.houseNo,      
      City:carDetailView?.city,  
      PhoneNumber:carDetailView?.phoneNumber,
      Country:carDetailView?.country, 
      ZipCode:carDetailView?.zipCode, 
      State:carDetailView?.state,
     TransportLicense:"",  
        
        RegisterationDate:new Date(carDetailView?.driverDocument?.registerationDate),  
      
    },  validationSchema, 
    onSubmit: (values, {resetForm}) => {        
        
       setLoaderShow(true)
      const formData=new FormData() 
      Object.keys(formik.values).map(item=>{     
         if((item === "RegisterationDate" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined  ) || (item === "Dob" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined )){ 
              
        formData.append(`${item}`,(formik.values[item]).toISOString()) 
         } 
         else{  
           if( item === "License" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined ){ 
            formData.append(`${item}`,licenseRef.current.files[0])  
         
           } 
           else if(item === "Registeration" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined ){ 
            formData.append(`${item}`,registerationRef.current.files[0])  
         
           }    
           else if(item === "IdCard" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined ){ 
            formData.append(`${item}`,idRef.current.files[0])  
         
           }     
           else if(item === "TransportLicense" && formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined ){ 
            formData.append(`${item}`,transportRef.current.files[0])  
         
           }    
           
           else{ 
         if(formik.values[item] !== "" && formik.values[item] !== null && formik.values[item] !== undefined && item !== "LastName" && item !== "Name" ){
            formData.append(`${item}`,formik.values[item])   
         }
            }
          }
    }  
   )     
   formData.append("FullName",`${formik.values["Name"]} ${formik.values["LastName"]}`)
    
   Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/Update`,formData,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
    toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message :"Driver Data Updated Sucessfully"}</p> });
   // resetForm()    
   setRefreshList(prev=>!prev)       
       setTimeout(()=>{ 
          setEditDialog(prev=>!prev)
       },1000)
    setLoaderShow(false) 

  }).catch((error)=>{           
    
    toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins">{error?.response?.data?.message ? error?.response?.data?.message :" Driver Data Updation Failed"}</p> });
    setLoaderShow(false)
  
})
    
   }    
      
   
  })
  return (
    <form onSubmit={formik.handleSubmit}>   
    
      <form>
      <div className="mt-4 text-main-color mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">First Name</label>
            <InputText
              name="Name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Name && formik.errors.Name ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.Name}
              </p>
            ) : undefined}
          </div> 
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Last Name</label>
            <InputText
              name="LastName"
              placeholder="LastName"
              onChange={formik.handleChange}
              value={formik.values.LastName}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.LastName && formik.errors.LastName ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.LastName}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">D.O.B</label>
            <Calendar
              name="Dob"
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.Dob}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Dob && formik.errors.Dob ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Dob}</p>
            ) : undefined}
          </div>   
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">License Class</label>
            <InputText
              name="LicenseClass"
              placeholder="License Class"
              onChange={formik.handleChange}
              value={formik.values.LicenseClass}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.LicenseClass && formik.errors.LicenseClass ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.LicenseClass}
              </p>
            ) : undefined}
          </div>
          
         
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Phone Number</label>
            <InputText
              name="PhoneNumber" 
              keyfilter="int"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              value={formik.values.PhoneNumber}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.PhoneNumber}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Email</label>
            <InputText
              name="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Email && formik.errors.Email ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Email}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Street</label>
            <InputText 
              name="Street"
              placeholder="Street"
              onChange={formik.handleChange}
              value={formik.values.Street}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Street && formik.errors.Street ? (
              <p className="text-red-500 text-[12px]">{formik.errors.Street}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">House No</label>
            <InputText
              name="HouseNo"
              placeholder="House No"
              onChange={formik.handleChange}
              value={formik.values.HouseNo}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.HouseNo && formik.errors.HouseNo ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.HouseNo}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Zip Code</label>
            <InputText
              name="ZipCode"
              placeholder="Zip Code"
              onChange={formik.handleChange}
              value={formik.values.ZipCode}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.ZipCode && formik.errors.ZipCode ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.ZipCode}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">City</label>
            <InputText
              name="City"
              placeholder="City"
              onChange={formik.handleChange}
              value={formik.values.City}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.City && formik.errors.City ? (
              <p className="text-red-500 text-[12px]">{formik.errors.City}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">State</label>
            <InputText
              name="State"
              placeholder="State"
              onChange={formik.handleChange}
              value={formik.values.State}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.State && formik.errors.State ? (
              <p className="text-red-500 text-[12px]">{formik.errors.State}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Country</label>
            <InputText
              name="Country"
              placeholder="Country"
              onChange={formik.handleChange}
              value={formik.values.Country}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Country && formik.errors.Country ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.Country}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Registration Date</label>
            <Calendar
              name="RegisterationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.RegisterationDate}
              className="text-main-color border rounded-sm border-main-color font-poppins w-full mt-2 p-1"
            />
            {formik.touched.RegisterationDate &&
            formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.RegisterationDate}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Driver Payment Managment</label>
            <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
          <i onClick={()=>{ 
            setMonthly(prev=>!prev) 
            setWeekly(false) 
            setHourly(false) 
            setTripBase(false)
          }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${monthly? "pi-check":""}`}></i>
           <p className="  text-main-color">Monthly</p>
      </div>   
       { 
         monthly ?   
         <div className="mt-2"> 
          <label className="w-full mt-1">Monthly Payment (€)</label>
         <InputText
         
         placeholder="Monthly Payment"
         onChange={(e)=>{ 
          setMontlyAmount(e.target.value)
         }}
         value={monthlyAmount}
         className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
       /> 
        </div>
        :undefined
       }
      <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
          <i onClick={()=>{ 
            setMonthly(false) 
            setWeekly(prev=>!prev) 
            setHourly(false) 
            setTripBase(false)
          }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${weekly? "pi-check":""}`}></i>
           <p className="  text-main-color">Weekly</p>
      </div>   
      { 
         weekly ?   
         <div className="mt-2"> 
          <label className="w-full mt-1">Weekly Payment (€)</label>
         <InputText
         
         placeholder="Weekly Payment"
         onChange={(e)=>{ 
          setWeeklyAmount(e.target.value)
         }}
         value={weeklyAmount}
         className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
       /> 
        </div>
        :undefined
       }
      <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
          <i onClick={()=>{ 
            setMonthly(false) 
            setWeekly(false) 
            setHourly(prev=>!prev) 
            setTripBase(false)
          }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${hourly? "pi-check":""}`}></i>
           <p className="  text-main-color">Hourly</p>
      </div>   
      { 
         hourly ?   
         <div className="mt-2"> 
          <label className="w-full mt-1">Hourly Payment (€)</label>
         <InputText
         
         placeholder="Hourly Payment"
         onChange={(e)=>{ 
          setHourlyAmount(e.target.value)
         }}
         value={hourlyAmount}
         className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
       /> 
        </div>
        :undefined
       }
      <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
          <i onClick={()=>{ 
            setMonthly(false) 
            setWeekly(false) 
            setHourly(false) 
            setTripBase(prev=>!prev)
          }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${tripBase? "pi-check":""}`}></i>
           <p className="  text-main-color">Trip Base</p>
      </div>            
      { 
         tripBase ?   
         <div className="mt-2"> 
          <label className="w-full mt-1">Trip Percentage (%)</label>
         <InputText
         
         placeholder="Trip Percentage"
         onChange={(e)=>{ 
          setTripPercentage(e.target.value)
         }}
         value={tripPercentage}
         className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
       /> 
        </div>
        :undefined
       }
            {formik.touched.RegisterationDate &&
            formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.RegisterationDate}
              </p>
            ) : undefined}
          </div>          
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Freeze (Days)</label>
            <InputText
            
              placeholder="Freeze For Days"
              onChange={(e)=>{ 
                setFreezeDays(e.target.value)
              }}
              value={freezeDays}
              className="text-main-color border border-main-color w-full mt-2 p-1"
            />
            {formik.touched.Country && formik.errors.Country ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.Country}
              </p>
            ) : undefined}
          </div>
          <h1 className="font-semibold  font-poppins w-full pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] mt-4 ">
            Drivers Documents
          </h1>

          <div className="flex flex-wrap flex-row justify-center w-full items-center ">
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>ID Card {carDetailView?.driverDocument?.idCard ?  <span onClick={()=>{ 
      
      fetch(carDetailView?.driverDocument?.idCard)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.driverDocument?.idCard?.split('/').pop();
  
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
              idRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.IdCard ? formik.values.IdCard.name :"No File Choosen" }</p>
                </div> 
              <input
                ref={idRef}
                className="text-main-color text-white hidden mt-4 md:w-auto w-full bg-main-color"
                name="IdCard"
                onChange={(e) => {
                  formik.setFieldValue("IdCard", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.IdCard && formik.errors.IdCard ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.IdCard}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>License{carDetailView?.driverDocument?.license ? <span onClick={()=>{ 
      
      fetch(carDetailView?.license?.idCard)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.driverDocument?.license?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]"> &nbsp; (Pending)</span>}</p>
              </div>
              <div onClick={()=>{ 
              licenseRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.License ? formik.values.License.name :"No File Choosen" }</p>
                </div> 
              <input
                ref={licenseRef}
                className="text-main-color hidden text-white mt-4 md:w-auto w-full bg-main-color"
                name="License"
                onChange={(e) => {
                  formik.setFieldValue("License", e.target.files[0]);
                }}
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
                <p>Registeration {carDetailView?.driverDocument?.registeration ? <span onClick={()=>{ 
      
      fetch(carDetailView?.driverDocument?.registeration)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.driverDocument?.registeration?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]"> &nbsp; (Pending)</span>}</p>
              </div>
              <div onClick={()=>{ 
              registerationRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.Registeration ? formik.values.Registeration.name :"No File Choosen" }</p>
                </div> 
              <input
                ref={registerationRef}
                className="text-main-color hidden text-white mt-4 md:w-auto w-full bg-main-color"
                name="Registeration"
                onChange={(e) => {
                  formik.setFieldValue("Registeration", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.Registeration && formik.errors.Registeration ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.Registeration}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>Public Transport License{carDetailView?.driverDocument?.transportLicense ? <span onClick={()=>{ 
      
      fetch(carDetailView?.driverDocument?.transportLicense)
      .then(response => {
        const filename = response.headers.get('Content-Disposition')
          ?.split('filename=')[1]
          ?.split(';')[0]
          ?.replace(/"/g, '') || carDetailView?.driverDocument?.transportLicense?.split('/').pop();
  
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
      
        
       }} className="cursor-pointer ml-2 pi pi-download"></span>:<span className="text-red-500 text-[14px]"> &nbsp; (Pending)</span>}</p>
              </div>
              <div onClick={()=>{ 
              transportRef.current.click()
              }}  className="  cursor-pointer text-main-color mt-4 md:w-[60%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-120px)] "> {formik.values.TransportLicense ? formik.values.TransportLicense.name :"No File Choosen" }</p>
                </div> 
              <input
                ref={transportRef}
                className="text-main-color hidden text-white mt-4 md:w-auto w-full bg-main-color"
                name="TransportLicense"
                onChange={(e) => {
                  formik.setFieldValue("TransportLicense", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.TransportLicense && formik.errors.TransportLicense ? (
                <p className="text-red-500 mt-4 text-[12px]">
                  {formik.errors.TransportLicense}
                </p>
              ) : undefined}
            </div>
            
          </div>
        </div>
               
      </form>   
     
      <div className="flex flex-wrap flex-row font-poppins  mt-8 w-full justify-center gap-4 ">
      <Button
          label="Delete Profile" 
           type="button"
          className={`border  mt-2 ml-5 border-main-color   text-main-color rounded-lg w-[150px] font-normal  bg-main-color text-white p-1 pl-2 pr-2 `}
        /> 
           <Button
          label="Freeze" 
           type="button"
          className={`border  mt-2 ml-5 border-main-color   text-main-color rounded-lg w-[150px] font-normal  bg-main-color text-white p-1 pl-2 pr-2 `}
        /> 
          <Button
          label="Unlock" 
           type="button"
          className={`border  mt-2 ml-5 border-main-color    text-main-color rounded-lg w-[150px] font-normal bg-main-color text-white p-1 pl-2 pr-2 `}
        />
        <Button
      
      label="Inquiry" 
      type="button"
          className={`border mt-2 ml-5 border-main-color  text-main-color rounded-lg w-[150px] font-normal  bg-main-color text-white p-1 pl-2 pr-2`}
        />
      
        <Button
          label="Save" 
          type="submit"  loading={loaderShow} disabled={loaderShow} 
          className={`border mt-2 ml-5 border-main-color font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
       
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
