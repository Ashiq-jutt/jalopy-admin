import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import EditDrink from "./edit/EditDrink";
import ViewDrink from "./view/ViewDrink";
import AddDrink from "./add/AddDrink";
export default function EditViewAddDrinks({ VendorShopId, setShowAiDetailView, setRefresh, aiDrinkData, itemData }) {
   const [editActive, setEditActive] = useState(true)

   const [addActive, setAddActive] = useState(false)
   const [viewActive, setViewActive] = useState(false)
   useEffect(() => {
      return () => {
         setRefresh(prev => !prev)
      }
   }, [])
   return (
      <div>
         <div className="flex flex-wrap flex-row p-2 mt-4  gap-2 items-center justify-left md:justify-left">
            <div className="flex flex-wrap flex-row w-full   justify-left gap-2 ">
               <Button
                  label="Item Edit"
                  onClick={() => {
                     setAddActive(false)
                     setViewActive(false)
                     setEditActive(true)
                  }}
                  className={`border mt-2 border-main-color  text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${editActive ? "text-white bg-main-color " : "text-main-color"}`}
               />
               <Button
                  onClick={() => {
                     setAddActive(false)
                     setViewActive(true)
                     setEditActive(false)
                  }}
                  label="Item View"
                  className={`border  mt-2 border-main-color  text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${viewActive ? "text-white bg-main-color " : "text-main-color"}`}

               />
               <Button
                  label="Add Product"
                  onClick={() => {
                     setAddActive(true)
                     setViewActive(false)
                     setEditActive(false)
                  }}
                  className={`border mt-2  border-main-color  text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${addActive ? "text-white bg-main-color " : "text-main-color"}`}

               />


            </div>


         </div>
         {
            editActive ? <EditDrink VendorShopId={VendorShopId} itemData={itemData} /> : viewActive ? <ViewDrink VendorShopId={VendorShopId} setShowAiDetailView={setShowAiDetailView} itemData={itemData} /> : addActive ? <AddDrink VendorShopId={VendorShopId} setShowAiDetailView={setShowAiDetailView} aiDrinkData={aiDrinkData} /> : undefined
         }

      </div>
   )
}