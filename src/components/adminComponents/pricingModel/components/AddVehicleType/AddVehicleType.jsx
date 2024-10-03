import  { useRef, useState } from "react"; 
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Axios  from "axios";
export default function AddNewVehicleType({setAddNewDialog,setRefresh}){      
    
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken; 
    const toast=useRef()  
    const [loader,setLoader]=useState(false)
    const validationSchema=Yup.object().shape({
        type:Yup.string().required("Type Is Required"), 
        baseRate:Yup.string().required("Base Rate Is Required"), 
        perKmRate:Yup.string().required("Per KM Rate Required"),
        perMinRate:Yup.string().required("Per Min Rate Is Required"),
        minPrice: Yup.string().required("Minimum Price Is Required"),
 waitingTimeRate: Yup.string().required("Waiting Time Rate Is Required"),
 cancelCharges: Yup.string().required("Cencellation Charges Is Required"),
 noOfSeats: Yup.string().required("No Of Seats Is Required")   
           
      })
      const formik = useFormik({
        initialValues: {
         type:"", 
         baseRate:"", 
         perKmRate:"",
         perMinRate:"",
         minPrice: "",
  waitingTimeRate: "",
  cancelCharges: "",
  promo: "",
  noOfSeats: ""

        },  validationSchema,
        onSubmit: (values, actions) => {    
            setLoader(true) 
            Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/VehicleType/Create`,formik.values,
                { headers: { Authorization: `Bearer ${token}` } }
              ).then(res=>{  
                setLoader(false)   
                setTimeout(()=>{ 
                    setRefresh(prev=>!prev)
                setAddNewDialog(prev=>!prev)  
             
            },1000)
              toast.current.show({
                severity: "success",
                summary: "Info",
                detail: (
                  <p className="font-poppins">
                    {res?.data?.Message
                      ? res?.data?.Message
                      : "Vehicle Type Successfully Added"}
                  </p>
                ),
              });
              }).catch(error=>{ 
                setLoader(false)
                toast.current.show({
                  severity: "error",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {error?.response?.data?.Message
                        ? error?.response?.data?.Message
                        : "Vehicle Types Addition Failed"}
                    </p>
                  ),
                });
              })

        },
      });
    return( 
          <form onSubmit={formik.handleSubmit} className="flex flex-wrap flex-row justify-between "> 
                        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="text-main-color">Type</label>
          <InputText
            name="type"
            placeholder="Vehicle Type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />
            {formik.touched.type && formik.errors.type ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.type}
            </p>
          ) : undefined}
        </div>    
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="text-main-color">Base Rate</label>
          <InputText
            name="baseRate" 
            keyfilter="num"
            placeholder="Base Rate"
            onChange={formik.handleChange}
            value={formik.values.baseRate}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.baseRate && formik.errors.baseRate ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.baseRate}
            </p>
          ) : undefined}
        </div>   
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="text-main-color">Per Km Rate</label>
          <InputText
            name="perKmRate" 
            
            keyfilter="num"
            placeholder="Per KM Rate"
            onChange={formik.handleChange}
            value={formik.values.perKmRate}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.perKmRate && formik.errors.perKmRate ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.perKmRate}
            </p>
          ) : undefined}
        </div>  
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="text-main-color">Per Min Rate</label>
          <InputText
            name="perMinRate" 
            keyfilter="num"
            placeholder="Per Min Rate"
            onChange={formik.handleChange}
            value={formik.values.perMinRate}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.perMinRate && formik.errors.perMinRate ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.perMinRate}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="text-main-color">Minimum Price</label>
          <InputText
            name="minPrice"
            placeholder="Minimum Price"
            onChange={formik.handleChange} 
            keyfilter="num"
            value={formik.values.minPrice}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.minPrice && formik.errors.minPrice ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.minPrice}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label  className="text-main-color">Waiting Time Rate</label>
          <InputText
            name="waitingTimeRate"
            placeholder="Waiting Time Rate" 
            keyfilter="num"
            onChange={formik.handleChange}
            value={formik.values.waitingTimeRate}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.waitingTimeRate && formik.errors.waitingTimeRate ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.waitingTimeRate}
            </p>
          ) : undefined}
        </div>  
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label  className="text-main-color">Cancellation Charges</label>
          <InputText
            name="cancelCharges" 
            keyfilter="num"
            placeholder="Cancellation Charges"
            onChange={formik.handleChange}
            value={formik.values.cancelCharges}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.cancelCharges && formik.errors.cancelCharges ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.cancelCharges}
            </p>
          ) : undefined}
        </div> 
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label  className="text-main-color">Promo</label>
          <InputText
            name="promo"
            placeholder="Promo"
            keyfilter="num"
            onChange={formik.handleChange}
            value={formik.values.promo}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.promo && formik.errors.promo ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.promo}
            </p>
          ) : undefined}
        </div> 
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label  className="text-main-color">No Of Seats</label>
          <InputText
            name="noOfSeats" 
            
            keyfilter="num"
            placeholder="No Of Seats"
            onChange={formik.handleChange}
            value={formik.values.noOfSeats}
            className="text-main-color border-[#E5E7EB] border w-full mt-2 p-2"
          />  
            {formik.touched.noOfSeats && formik.errors.noOfSeats ? (
            <p className="text-red-500 w-full text-[14px] mt-1">
              {formik.errors.noOfSeats}
            </p>
          ) : undefined} 
        </div>   
                 <div className="w-full mt-4 flex flex-wrap flex-row justify-center items-center">
        <Button loading={loader} disabled={loader} label="Add Vehicle Type" className=" bg-main-color text-white font-poppins p-1 pl-2 pr-2"/> 
         </div>   
         <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}  />
          </form>
    )
}