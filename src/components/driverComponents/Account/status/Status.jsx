import { InputSwitch } from "primereact/inputswitch";
export default function Status(){ 
     return( 
         <div className="mt-12"> 
               <div className="flex mt-4 flex-wrap items-center flex-row justify-left"> 
                    <p>Online Status</p> 
                     <i className="ml-3 pi pi-circle-fill text-[green]"></i> 
                </div>  
                <div className="flex mt-12  items-center flex-wrap flex-row justify-left"> 
                    <p>profile Status</p> 
                     <InputSwitch className="ml-3 " checked /> 
                </div> 
         </div>
     )
}