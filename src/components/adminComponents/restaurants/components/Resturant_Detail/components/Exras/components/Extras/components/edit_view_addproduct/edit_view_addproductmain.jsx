import { useState } from "react"; 
import { Button } from "primereact/button";
import EditDrink from "./edit/EditDrink";
import ViewDrink from "./view/ViewDrink";
import AddDrink from "./add/AddDrink";
export default function EditViewAddDrinks({aiDrinkData}){   
    const [editActive,setEditActive]=useState(true) 
     
    const [addActive,setAddActive]=useState(false) 
     const [viewActive,setViewActive]=useState(false) 
  return(  
    <div>
    <div className="flex flex-wrap flex-row mt-4 items-center justify-evenly md:justify-between">  
    <div className="flex flex-wrap flex-row  justify-evenly md:justify-between "> 
    <Button
          label="Item Edit"    
          onClick={()=>{ 
             setAddActive(false) 
             setViewActive(false) 
             setEditActive(true)
          }}
          className={`border mt-2 ml-5 border-main-color  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 ${editActive ?"text-white bg-main-color ":"text-main-color"}`}
        />
        <Button  
         onClick={()=>{ 
            setAddActive(false) 
            setViewActive(true) 
            setEditActive(false)
         }}
          label="Item View"
          className={`border  mt-2 ml-5 border-main-color  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 ${viewActive ?"text-white bg-main-color ":"text-main-color"}`}
      
       /> 
        <Button
          label="Add Product" 
          onClick={()=>{ 
            setAddActive(true) 
            setViewActive(false) 
            setEditActive(false)
         }}
          className={`border mt-2 ml-5 border-main-color  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 ${addActive ?"text-white bg-main-color ":"text-main-color"}`}
            
     />           
    
                  
     </div>       
     
     
    </div>  
      {  
        editActive ? <EditDrink aiDrinkData={aiDrinkData}/> :viewActive ? <ViewDrink aiDrinkData={aiDrinkData}/> :addActive ? <AddDrink aiDrinkData={aiDrinkData}/> :undefined
         }  
          
     </div> 
  )
}