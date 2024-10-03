import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
const ContactEmails = () => {
  return (
    <div className="p-4">
     <h1>Conatct Email</h1> 
      <div className="w-full mt-4 items-center shadow-lg border-b border-[#022859] rounded-2xl p-4 flex flex-wrap flex-row justify-between"> 
       <div> 
        <h1 className="text-main-color">Send to my account email</h1>    
        <p className="text-[#CFCFCF]">robertjohn1@gmail.com</p> 
        </div> 
        <div> 
   <RadioButton className="text-main-color" checked={true}/>
        </div>  
       
      </div> 
      <div className="w-full mt-4 items-center  p-4 flex flex-wrap flex-row justify-between"> 
       <div> 
        <h1 className="text-main-color">Send to an alternative email</h1>    
       
        </div> 
        <div> 
   <RadioButton className="text-main-color" checked={true}/>
        </div>   
        <div className="w-full "> 
     <InputText className="w-full p-4 mt-4 shadow-lg border-b border-[#022859] rounded-2xl" placeholder="Enter alternative email"/>
        </div>
        </div>
    </div>
  );
};

export default ContactEmails;
