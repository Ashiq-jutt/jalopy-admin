import { useFormik } from "formik";
import { InputText } from "primereact/inputtext"; 
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown"; 
import * as Yup from "yup";  
import { Calendar } from "primereact/calendar";
export default function EditCar({ carDetailView,setShowCarEdit }) {       
  const validationSchema=Yup.object().shape({
    carNo: Yup.string().required("Car No Is Required"),  
    company:Yup.string().required("Company Is Required"),
    model: Yup.string().required("Model Is Required"),
  name: Yup.string().required("Name Is Required"),
    seats: Yup.string().required("Seats Is Required"),
    lastName: Yup.string().required("Last Name Is Required"),
    registrationDate: Yup.string().required("Registration Date Is Required"),   
    handyNo:Yup.string().required("Handy No Is Required"),   
     color:Yup.string().required("Color Is Required"),   
      madeYear:Yup.string().required("Made Year Is Required"),     
      noOfSeats:Yup.string().required("No Of Seats Is Required"),  
      tuvfile:Yup.string().required("Tuv File  Is Required"),  
      
      licensefile:Yup.string().required("License File  Is Required"),    
      
      carregno:Yup.string().required("Registration File  Is Required"),   
       
  })
  const formik = useFormik({
    initialValues: {
      carNo: carDetailView?.carNo,
      model: carDetailView?.model, 
      company:carDetailView?.company,
      madeYear: carDetailView?.madeYear, 
       tuv:carDetailView?.tuv,
        noOfSeats: carDetailView?.noOfSeats, 
        color:carDetailView?.color,  
        name:carDetailView?.carData?.name,     
        handyNo:carDetailView?.handyNo,
        lastName:carDetailView?.lastname,  
        latName:carDetailView?.handyno,   
         registerationStatus:carDetailView?.status,
        registerationDate:new Date(carDetailView?.registerationDate),       
         tuvfile:"", 
          licensefile:"", 
          carregno:""
    },  validationSchema,
    onSubmit: (values, actions) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit}>  
    <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-left flex-row">
         
         <Button
         label="Back" 
           onClick={()=>{ 
            setShowCarEdit(prev=>!prev)
           }}
         className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
       />
     </div>
      <form>
        <div className="mt-4 text-main-color mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Car No</label>
            <InputText
              name="carNo"
              placeholder="Car No"
              onChange={formik.handleChange}
              value={formik.values.carNo}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />       
                {formik.touched.carNo && formik.errors.carNo ? (
              <p className="text-red-500 text-[12px]">{formik.errors.carNo}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Manufacturer</label>
            <InputText
              name="company"
              placeholder="Company"
              onChange={formik.handleChange}
              value={formik.values.company}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />      
                {formik.touched.company && formik.errors.company ? (
              <p className="text-red-500 text-[12px]">{formik.errors.company}</p>
            ) : undefined}
            </div>      
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Model</label>
            <InputText
              name="model"
              placeholder="Model"
              onChange={formik.handleChange}
              value={formik.values.model}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.model && formik.errors.model ? (
              <p className="text-red-500 text-[12px]">{formik.errors.model}</p>
            ) : undefined}
            </div>  
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Made Year</label>
            <InputText
              name="madeYear"
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.madeYear}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.madeYear && formik.errors.madeYear ? (
              <p className="text-red-500 text-[12px]">{formik.errors.madeYear}</p>
            ) : undefined}
            </div>    
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">color</label>
            <InputText
              name="color"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.color}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.color && formik.errors.color ? (
              <p className="text-red-500 text-[12px]">{formik.errors.color}</p>
            ) : undefined}
            </div> 
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">No Of Seats</label>
            <InputText
              name="noOfSeats"
              placeholder="Seats"
              onChange={formik.handleChange}
              value={formik.values.noOfSeats}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />    
               {formik.touched.noOfSeats && formik.errors.noOfSeats ? (
              <p className="text-red-500 text-[12px]">{formik.errors.noOfSeats}</p>
            ) : undefined}
            </div>      
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Status</label>
           <Dropdown  
              className="text-[rgba(0,0,0,.5)] font-poppins border w-full mt-2 " style={{fontFamily:"poppins"}} placeholder="Registration Status" value={formik.values.registerationStatus} options={[{label:"Yes",value:true},{label:"No",value:false}]} onChange={formik.handleChange} name="registerationStatus"/>  
             
            
            </div>  
            
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Registration Date</label>
            <Calendar
              name="registerationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.registerationDate}
              className="text-[rgba(0,0,0,.5)] border font-poppins w-full mt-2 p-2"   

            />    
              {formik.touched.registerationDate && formik.errors.registerationDate ? (
              <p className="text-red-500 text-[12px]">{formik.errors.registerationDate}</p>
            ) : undefined}
            </div>     
            <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">TUV</label>
            <Calendar
              name="tuv"
              placeholder="TUV"
              onChange={formik.handleChange}
              value={formik.values.tuv}
              className="text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />     
              {formik.touched.tuv && formik.errors.tuv ? (
              <p className="text-red-500 text-[12px]">{formik.errors.tuv}</p>
            ) : undefined}
            </div>  
                <div className="flex flex-wrap flex-row justify-center w-full items-center ">
                 <div className="w-full   flex flex-wrap flex-row  items-center  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%]  ">
                 <div className=" w-[90%] md:w-[170px] flex flex-wrap mt-4 flex-row ">
               <p >TUV</p>       
             
                           </div>      
                           
                  <input name="tuvfile" onChange={formik.handleChange} value={formik.values.tuvfile} className="text-main-color text-white bg-main-color mt-4" type="file"/>
                  {formik.touched.tuvfile && formik.errors.tuvfile ? (
              <p className="text-red-500 mt-4 text-[12px]">{formik.errors.tuvfile}</p>
            ) : undefined}
             </div> 
             <div className="w-full flex flex-wrap  flex-row pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
                 <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center   justify-left">
               <p >Car License</p>   
             </div>      
                
                           
             <input name="licensefile" onChange={formik.handleChange} value={formik.values.licensefile} className="text-main-color mt-4 md:w-auto w-full text-white bg-main-color" type="file"/>   
             {formik.touched.licensefile && formik.errors.licensefile ? (
              <p className="text-red-500 mt-4 text-[12px]">{formik.errors.licensefile}</p>
            ) : undefined}
             </div> 
             <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
                 <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
               <p >Car Reg No.</p>
             </div>      
                
                           
             <input value={formik.values.carregno} className="text-main-color text-white mt-4 md:w-auto w-full bg-main-color" name="carregno" onChange={formik.handleChange} type="file"/>
             {formik.touched.carregno && formik.errors.carregno ? (
              <p className="text-red-500 mt-4 text-[12px]">{formik.errors.carregno}</p>
            ) : undefined}
             </div>   
              </div>
            
             
              </div> 
               
      </form>   
      <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
         
          <Button
          label="Update" 
            type="submit"
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
    </form>
  );
}
