import { useFormik } from "formik"  
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
export default function EditDrink({aiDrinkData}){  
     const formik=useFormik({ 
        initialValues:{ 
           product:aiDrinkData?.title, 
          deliverycost:aiDrinkData?.deliverycost, 
          pickupcost:aiDrinkData?.pickupcost,  
          allergian:aiDrinkData?.allergian,
        }
     })
     return(  
        <div className="md:pl-[10%] md:pr-[10%]">
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
        <div className="flex w-full flex-wrap items-center flex-row justify-left">  
         <label>Item ID</label>
         <InputText placeholder="0028" className=" p-1 ml-4 border border-[#A767E0] "/>
        </div> 
        <div className="mt-4 flex w-full flex-wrap items-center flex-row justify-left">  
         <label>Item Image</label>
         <input type="file" placeholder="0028" className=" p-1 ml-4  "/>     
         <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={aiDrinkData?.img}  className="w-[30px]" />
        </div>     
         <div className="w-full mt-4 border-b border-[#A767E0]"> 

         </div>
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Product Name</label>
          <InputText
            name="product"
            placeholder="Product"
            onChange={formik.handleChange}
            value={formik.values.product}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>
       
        
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Delivery Cost</label>
          <InputText
            name="deliverycost"
            placeholder="Delivery Cost"
            onChange={formik.handleChange}
            value={formik.values.deliverycost}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>    
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">PickUp Cost</label>
          <InputText
            name="pickupcost"
            placeholder="PickUp Cost"
            onChange={formik.handleChange}
            value={formik.values.pickupcost}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>    
         <div className="flex w-full flex-wrap flex-row justify-between">
        <div className="w-[70%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Allergian</label>
          <InputText
            name="allergian"
            placeholder="Allergian"
            onChange={formik.handleChange}
            value={formik.values.allergian}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />                   
          
        </div>   
        <div className="w-[20%]  mt-7 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
        <div className="  w-[150px]   rounded ml-5 mt-2  pl-3 pr-3 p-1 bg-main-color flex flex-wrap flex-row items-center text-white justify-left"> 
             <h1 className="  rounded font-normal  ">Add More  </h1> 
             <i className=" ml-2 pi pi-plus  "></i>
          </div>
        </div>     
        </div> 
     
        
        </div>     
        <div className="flex flex-wrap flex-row  justify-evenly "> 

        
<Button
  label="SAVE And Submit" 
 
  className={`border mt-2 ml-5 border-main-color font-normal text-main-color rounded-lg w-[200px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
    
/> </div>
        </div>
     )
}