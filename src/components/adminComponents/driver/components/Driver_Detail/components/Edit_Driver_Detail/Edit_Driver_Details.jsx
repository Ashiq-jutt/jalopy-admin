import { useFormik } from "formik";
import { InputText } from "primereact/inputtext"; 
import { Button } from "primereact/button";
export default function EditDriverDetail({ driverDetailView }) {
  const formik = useFormik({
    initialValues: {
      name: driverDetailView?.driverData?.name,
      lastname: driverDetailView?.driverData?.lastname, 
      handyno:driverDetailView?.driverData?.handyno,
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
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[45%] lg:w-[32%]  ">
            <label className="">Name</label>
            <InputText
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[32%]  ">
            <label className="">Last Name</label>
            <InputText
              name="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              className="text-black border w-full mt-2 p-2"
            />   
            </div>
              <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[32%]  ">
            <label className="">Handy No</label>
            <InputText
              name="handyno"
              placeholder="Handy No"
              onChange={formik.handleChange}
              value={formik.values.handyno}
              className="text-black border w-full mt-2 p-2"
            />    
            </div>   
            
             <h1 className="w-full w-[90%] md:w-[100%] font-poppins mt-8 text-main-color font-normal text-[21px]">Documents</h1>
                 <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
                 <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
               <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
               <p className="ml-5">ID-Card</p>
             </div>      
             <div className="flex flex-wrap flex-row md:ml-40 items-center justify-left"> 
                    <p className="text-green-500 text-[14px]"><span className="mr-2">.</span>See more</p>
                   <Button label="Delete " className="text-[14px] ml-5 text-center p-1 pr-3 text-white bg-main-color pl-3 "/>
               </div>
             </div> 
             <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
                 <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
               <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
               <p className="ml-5">License</p>
             </div>      
               <div className="flex flex-wrap flex-row md:ml-40 items-center justify-left"> 
                    <p className="text-green-500 text-[14px]"><span className="mr-2">.</span>See more</p>
                   <Button label="Delete " className="text-[14px] ml-5 text-center p-1 pr-3 text-white bg-main-color pl-3 "/>
               </div>
             </div> 
             <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
                 <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
               <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
               <p className="ml-5">Registration</p>
             </div>      
             <div className="flex flex-wrap flex-row md:ml-40 items-center justify-left"> 
                    <p className="text-green-500 text-[14px]"><span className="mr-2">.</span>See more</p>
                   <Button label="Delete " className="text-[14px] ml-5 text-center p-1 pr-3 text-white bg-main-color pl-3 "/>
               </div>
             </div> 
             <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
                 <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
               <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
               <p className="ml-5">Allowance Letter</p>
             </div>      
             <div className="flex flex-wrap flex-row md:ml-40 items-center justify-left"> 
                    <p className="text-green-500 text-[14px]"><span className="mr-2">.</span>See more</p>
                   <Button label="Delete " className="text-[14px] ml-5 text-center p-1 pr-3 text-white bg-main-color pl-3 "/>
               </div>
             </div> 
              <div className="flex  flex-wrap w-full mt-8  flex-row justify-left" >
                    <div className=" items-center flex  flex-wrap  w-[400px]  flex-row justify-left ml-[40%] md:ml-[60%] " >
                   <p className="w-[40px]">Day</p> 
                    <div className=" ml-2 w-[100px] flex flex-wrap items-center  justify-left flex-row t border border-main-color p-1 pl-3 pr-3 rounded "> 
                         <i className="pi pi-minus"/> 
                            <p className="ml-4">1</p> 
                             < i className=" ml-4 pi pi-plus"/>
                    </div> 
                  </div>
              </div>
              </div> 
               
      </form>   
      <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete Profile"
          className="border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button
          label="Freeze"
          className="border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button  
         label="Unlock"
          className={`border border-main-color mt-1 text-white bg-main-color  rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2`}
        />
        <Button
          label="Inquiry" 
          
          className={`border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px]  font-normal  p-1 pl-2 pr-2`}
        />  
          <Button
          label="Save" 
          
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
    </div>
  );
}
