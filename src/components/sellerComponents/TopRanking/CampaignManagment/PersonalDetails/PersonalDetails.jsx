import { InputText } from "primereact/inputtext"; 
import { Button } from "primereact/button";  
export default function PersonalInfo({formik,setSelectPayment,setShowPersonalInfoComponent, setShowSelectPaymentInfoComponent}){ 
    
  return(  
         <form onSubmit={formik.handleSubmit}>
        <div className="text-main-color">
        <div className="w-full  items-center mt-10 flex flex-wrap flex-row justify-center">   
           <p className="mr-4 w-full md:w-[200px] md:text-right">Resturant Name</p>
               <div className="w-full mt-2 md:mt-0 md:w-[50%]">  
                    
                    <InputText name="restaurantName" value={formik.values.restaurantName} onChange={formik.handleChange} className="border p-2 w-full" placeholder="Resturant Name" />
                      <p className="mt-2 ">Give your registered business name</p> 
                      {formik.touched.restaurantName && formik.errors.restaurantName ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.restaurantName}
              </p>
            ) : undefined}
                    </div>
        </div>  
        <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
           <p className="mr-4 w-full md:w-[200px] md:text-right">Account holder</p>
               <div className="w-full md:w-[50%]">  
                      
                      <div className="w-full flex flex-wrap flex-row justify-between"> 
                         <div className="w-[49%]">
                    <InputText  name="holderFirstName" className="border p-2 w-full" onChange={formik.handleChange} value={formik.values.holderFirstName} placeholder="First Name" />   
                    {formik.touched.holderFirstName && formik.errors.holderFirstName ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.holderFirstName}
              </p>
            ) : undefined}
                     </div>
                        <div className="w-[49%]">
                    <InputText className="border p-2 w-full" name="holderLastName" value={formik.values.holderLastName} onChange={formik.handleChange} placeholder="Last Name" /> 
                    {formik.touched.holderLastName && formik.errors.holderLastName ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.holderLastName}
              </p>
            ) : undefined} 
                     </div>
                        </div> 
                      <p className="mt-2">Give your name on the bank card</p>
                    </div>
        </div>    
        <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
           <p className="mr-4 w-full md:w-[200px] md:text-right">IBAN</p>
               <div className="w-full md:w-[50%]">  
                    
                    <InputText name="iban" value={formik.values.iban} onChange={formik.handleChange}  className="border mt-2 md:mt-0 p-2 w-full" placeholder="IBAN" />
                      <p className="mt-2">Give your business account detail</p> 
                      {formik.touched.iban && formik.errors.iban ? (
              <p className="text-red-500 w-full text-[14px]">
                {formik.errors.iban}
              </p>
            ) : undefined}
                    </div>
        </div>  
        <div className="w-full  items-center mt-4 flex flex-wrap flex-row justify-center">   
           <p className="mr-4 w-full md:w-[200px] md:text-right">BIC</p>
               <div className="w-full md:w-[50%]">  
                    
                    <InputText name="bic" value={formik.values.bic} onChange={formik.handleChange} className="border mt-2 md:mt-0 p-2 w-full" placeholder="BIC (Optional)" />
                      <p className="mt-2">Give only if living outside germany</p> 
                      {formik.touched.bic && formik.errors.bic ? (
              <p className="text-red-500  w-full text-[14px]">
                {formik.errors.bic}
              </p>
            ) : undefined}
                    </div>
        </div>   
        <div className=" w-full  mt-10 flex flex-wrap flex-row justify-center">   
          <Button  label="Next And Submit" type="submit"  className="bg-main-color text-white p-1 pr-3 pl-3 "/>

        </div>
         </div> 
         </form>
     )
}