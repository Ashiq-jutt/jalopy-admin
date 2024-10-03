import CardPayment from "./CardPayment";
import { Button } from "primereact/button";
export default function Payment({formik,setSelectPayment,setStartCampaign,setStartCampaignComponent,setShowPersonalInfo,setShowPersonalInfoComponent, setShowSelectPaymentInfoComponent}){ 
     return( 
         <div className="mt-4">   
            
             <div className="flex flex-wrap items-center flex-row  justify-center md:justify-between border rounded-md p-4 "> 
             <div className="w-full flex flex-wrap flex-row justify-between">       
                 <h1>Payment Methods</h1>    
                    {/*<Button icon="pi   pi-plus text-[14px]" className="border border-main-color" label="Add New"/>  
                     */}
                     </div>  
                  <CardPayment formik={formik}/>
             </div>           
                    
 <div className=" w-full  mt-10 flex flex-wrap flex-row justify-center">  
         <Button  label="Back"     
             onClick={()=>{ 
                 setShowPersonalInfo(true) 
                 setSelectPayment(false) 
                  setShowSelectPaymentInfoComponent(false) 
                  setShowPersonalInfoComponent(true)
             }}
           className="mr-4 p-1 pr-3 pl-3"/>  
          <Button  label="Next And Submit"   
              onClick={()=>{     
                 setShowSelectPaymentInfoComponent(false)
                setStartCampaignComponent(true)
                setStartCampaign(true)
              }}
            className="bg-main-color text-white p-1 pr-3 pl-3 "/>

        </div>
         </div> 
          
     )
}