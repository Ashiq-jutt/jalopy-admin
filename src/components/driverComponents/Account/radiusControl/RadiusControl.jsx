import { InputSwitch } from "primereact/inputswitch";
export default function RadiusControl(){ 
     return( 
         <div className="flex mt-8  flex-wrap flex-row justify-left"> 
            <div className="ml-12 mt-4"> 
                <h1 className="font-bold">Route Type</h1> 
                  
                  <p className="mt-4">Snaps To Road</p>
            </div> 
            <div className="ml-12 mt-4"> 
                <h1 className="font-bold">Travel Mode</h1> 
                  
                  <p className="mt-4">Driving</p>
            </div> 
            <div className="ml-12 mt-4 flex flex-row flex-wrap justify-left items-center"> 
                 <div>
                <h1 className="font-bold">Auto Location</h1> 
                  
                  <p className="mt-4 bg-main-color text-white p-1 rounded-sm pl-2 pr-2 ">Active</p> 
                  </div> 
                   <InputSwitch className="ml-4" checked/> 
                   <p className="w-full bg-main-color text-red-500 p-4 mt-4 rounded-lg">Hinweis: Automatische GPS autorität</p>
            </div>
         </div>
     )
}