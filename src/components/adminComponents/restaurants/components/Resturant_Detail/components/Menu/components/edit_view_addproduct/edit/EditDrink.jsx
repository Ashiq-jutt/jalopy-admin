import { useFormik } from "formik"  
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"   
import { InputTextarea } from "primereact/inputtextarea"
export default function EditDrink({aiDrinkData}){  
     const formik=useFormik({ 
        initialValues:{ 
           product:aiDrinkData?.title, 
          deliverycost:aiDrinkData?.deliverycost, 
          pickupcost:aiDrinkData?.pickupcost,  
          allergian:aiDrinkData?.allergian,    
        description:aiDrinkData?.description,    
        type:aiDrinkData?.type, 
        category:aiDrinkData?.category,
        }
     })
     return(  
        <div className="md:pl-[10%] md:pr-[10%]">
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Name</label>
          <InputText
            name="product"
            placeholder="Product"
            onChange={formik.handleChange}
            value={formik.values.product}
            className="text-black border w-full mt-2 p-2"
          />
        </div>    
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Category</label>
          <InputText
            name="category"
            placeholder="Category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="text-black border w-full mt-2 p-2"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Description</label>
          <InputTextarea
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="text-black border w-full mt-2 p-2"
          />
        </div>     
        
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Delivery Cost</label>
          <InputText
            name="deliverycost"
            placeholder="Delivery Cost"
            onChange={formik.handleChange}
            value={formik.values.deliverycost}
            className="text-black border w-full mt-2 p-2"
          />
        </div>             

        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">PickUp Cost</label>
          <InputText
            name="pickupcost"
            placeholder="PickUp Cost"
            onChange={formik.handleChange}
            value={formik.values.pickupcost}
            className="text-black border w-full mt-2 p-2"
          />
        </div>   
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Type</label>
          <InputText
            name="type"
            placeholder="Type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="text-black border w-full mt-2 p-2"
          />
        </div>     
       <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Allergian</label>
          <InputText
            name="allergian"
            placeholder="Allergian"
            onChange={formik.handleChange}
            value={formik.values.allergian}
            className="text-black border w-full mt-2 p-2"
          />                   
          
        </div>   
       
     
        
        </div>     
        <div className="flex flex-wrap flex-row  justify-evenly md:justify-between "> 
    <Button
          label="Inquiry"    
         
          className={`border mt-2 ml-5 border-main-color  font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button  
       
          label="Delete"
          className={`border  mt-2 ml-5 border-main-color font-normal   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
      
       /> 
        <Button
          label="Approve" 
         
          className={`border mt-2 ml-5 border-main-color font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
            
     /> </div>
        </div>
     )
}