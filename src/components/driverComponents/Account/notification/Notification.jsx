import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import {useState,useRef, useEffect} from "react"; 
import { Toast } from "primereact/toast";
import  Axios  from "axios";
import { useFormik } from "formik";
export default function Notification() {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [loaderShow, setLoaderShow] = useState(false);
  const toast = useRef();
   useEffect(()=>{ 
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/NotificationSettings/Get`,
      
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res=>{ 
            formik.setFieldValue("securityAlerts",res?.data?.data?.securityAlerts)
            formik.setFieldValue("emailNotifications",res?.data?.data?.emailNotifications)
            formik.setFieldValue("changePhoneNumber",res?.data?.data?.changePhoneNumber)
            formik.setFieldValue("smsNotifications",res?.data?.data?.smsNotifications)
    
          }).catch(err=>{

    })
   },[])
  const formik = useFormik({
    initialValues: {
       securityAlerts:false,     
       emailNotifications:false, 
       smsNotifications:false, 
       changePhoneNumber:false, 
    },  onSubmit: (values, { resetForm }) => { 
      setLoaderShow(prev=>!prev)          
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/NotificationSettings/CreateOrUpdate`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res=>{    
        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message :"Notification Setting Updated Successfully "}</p> });
              
         setLoaderShow(prev=>!prev)     
      }).catch(err=>{   
        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{err?.data?.Message ? err?.data?.Message :"Notification Setting Updation Failed "}</p> });
              
        setLoaderShow(prev=>!prev)  
      })
    },})
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex mt-10 flex-wrap flex-row items-center justify-between ">
        <p>Security Alerts</p>
        <InputSwitch name="securityAlerts" checked={formik.values.securityAlerts} onChange={formik.handleChange} className="" />
      </div>
      <div
       
        className="flex mt-10 cursor-pointer flex-wrap flex-row items-center justify-between "
      >
        <p>Email Notifications</p>
   
        <InputSwitch name="emailNotifications" checked={formik.values.emailNotifications}  onChange={formik.handleChange} className="" />
      </div>
      <div
       
        className="flex mt-10 flex-wrap  cursor-pointer flex-row items-center  justify-between "
      >
        <p>SMS Notifications</p>
  
        <InputSwitch name="smsNotifications" checked={formik.values.smsNotifications} onChange={formik.handleChange} className="" />
      </div>
      <div
       
        className="flex mt-10 flex-wrap cursor-pointer flex-row items-center justify-between "
      >
        <p>Change Number</p> 
        
        <InputSwitch name="changePhoneNumber" checked={formik.values.changePhoneNumber} onChange={formik.handleChange}  className="" />
      </div>
      <div className="flex flex-wrap mt-10 flex-row justify-end">
      
        <Button      
          type="submit"       
               disabled={loaderShow}     
                loading={loaderShow}
           className="ml-2 text-white bg-main-color rounded-md p-1 pl-2 pr-2"
          label="Update"
        />
      </div>
         <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}  />
    </form>
  );
}
