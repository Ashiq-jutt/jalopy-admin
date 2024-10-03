import { useFormik } from "formik";
import { InputText } from "primereact/inputtext"; 
export default function EditDriverDetail({ driverDetailView }) {
  const formik = useFormik({
    initialValues: {
      name: driverDetailView?.ridepartner,
      lastname: driverDetailView?.lastname,
      resturantName: driverDetailView?.resturantName,
      street:driverDetailView?.street, 
      houseno:driverDetailView?.houseno,
      countryland: driverDetailView?.countryland,
      zipcode: driverDetailView?.zipcode,
      taxid: driverDetailView?.taxid,   
      email:driverDetailView?.email,
      iban:driverDetailView?.iban,  
      phoneNo:driverDetailView?.phoneNumber,
      languages:driverDetailView?.languages,   
    },
  });
  return (
    <div>
      <form>
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Name</label>
            <InputText
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Last Name</label>
            <InputText
              name="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              className="text-black border w-full mt-2 p-2"
            />   
            </div>
              <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Email</label>
            <InputText
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="text-black border w-full mt-2 p-2"
            />    
             </div> 
             <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Contact</label>
            <InputText
              name="phoneNo"
              placeholder="Contact"
              onChange={formik.handleChange}
              value={formik.values.phoneNo}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div> 
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Street</label>
            <InputText
              name="street"
              placeholder="Street"
              onChange={formik.handleChange}
              value={formik.values.street}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div> 
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">House No</label>
            <InputText
              name="houseno"
              placeholder="House No"
              onChange={formik.handleChange}
              value={formik.values.houseno}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div> 
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Land</label>
            <InputText
              name="countryland"
              placeholder="Land"
              onChange={formik.handleChange}
              value={formik.values.countryland}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div> 
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Post Code</label>
            <InputText
              name="postcode"
              placeholder="Post Code"
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div> 
          <div className="w-[90%]   mt-10 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">GEWERBESCHEIN</label>
              <i className="border border-[#4150D9]  text-[#4150D9] rounded-full  p-[1px] ml-1 pl-[1px] w-[16px] h-[16px] transform rotate-[180deg] text-[12px] pi pi-info"></i>
               <p className="inline ml-5 text-[#109B2F]">Upload</p>
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
              <i className="border border-main-color p-1  text-main-color rounded-full     pi pi-check"></i>
               <p className="inline ml-5 text-main-color">I Agree <span className="underline cursor-pointer">Terms And Conditions</span></p>
          </div> 
          <div className="w-[90%]   mt-10 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          
         <h1 className="font-normal  text-[20px]">Bank Account No</h1> 
        
       </div>           
       <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">IBAN</label>
            <InputText
              name="iban"
              placeholder="IBAN"
              onChange={formik.handleChange}
              value={formik.values.iban}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div>      
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Tax ID</label>
            <InputText
              name="taxid"
              placeholder="Tax ID"
              onChange={formik.handleChange}
              value={formik.values.taxid}
              className="text-black border w-full mt-2 p-2"
            />    
             
          </div>        
          <div className="w-[90%] mt-6 self-left"> 
                    <label className=" mt-4">Prefered Languages</label> 
                     <div className="flex flex-wrap flex-row w-full justify-left"> 
                         <p className="mt-4"><div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div> English</p> 
                         <p className="mt-4 ml-4"> <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]"/>
                </div>Urdu</p>
                     </div> 
                     
                  </div>  
                  <h1 className="w-[90%] mt-4  font-poppins font-normal">Terms And Conditions</h1>
            <div className="mt-4 flex w-[90%]  flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
             
                <p >
By submitting this form, you agree to our terms and conditions.</p>
              </div>   
              <div className="mt-4 flex  flex-wrap flex-row w-[90%] justify-left items-center font-poppins font-normal"> 
            <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div>   
                <p className="ml-3">
                i agree <span className="underline cursor-pointer">terms and conditions</span></p> 
 </div> 
        </div>
      </form>
    </div>
  );
}
