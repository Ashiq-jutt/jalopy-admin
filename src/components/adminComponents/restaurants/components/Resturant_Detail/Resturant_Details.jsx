import { Button } from "primereact/button";
import { useState } from "react";
import ResturantDetailsPage from "./components/Resturant_Detail/Resturant_Details";
import EditResturantDetail from "./components/Edit_Resturents_Detail/Edit_Resturant_Details";
import FreeRide from "./components/Free_Ride/Free_Ride";
import DeliveryPickup from "./components/Delivery_Pickup/Delivery_Pickup";
import Menu from "./components/Menu/components/edit_view_addproduct/Menu";
import Edit_Resturant from "./components/Edit_Resturant/Edit_Resturant";
import ALDrinks from "./components/AlDrinks/AlDrinks";
import SoftDrinks from "./components/SoftDrinks/SoftDrinks";
import Extras from "./components/Exras/Extras";
export default function ResturantDetails({
  resturantDetailView,
  setShowResturantDetail,
  showResturantDetail
}) {
  const [menuActive, setMenuActive] = useState(false)
  const [freeRide, setFreeRide] = useState(false)
  const [deliveryPickup, setDeliveryPickup] = useState(false)
  const [showEditComponent, setShowEditComponent] = useState(false)
  const [detailPage, setDetailPage] = useState(true)
  const [updateResturant, setUpdateResturant] = useState(false)
  const [extras, setExtras] = useState(false)
  const [softdrinks, setSoftDrinks] = useState(false)
  const [alDrinks, setAlDrinks] = useState(false)
  return (
    <div className="text-main-color overflow-y-auto fixed  pr-6 md:pr-0 w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]  h-[calc(100vh)]  z-20 bg-white p-2  fixed top-[0px]">
      <div className="flex flex-wrap  mt-[70px] z-50 flex-row justify-left">
        <Button label="Back" className="p-1 pr-15 pl-15 w-full md:w-[150px] bg-main-color text-[16px] text-white" onClick={() => {
          setDetailPage(false)
          setShowResturantDetail(false)


        }}></Button>
      </div>
      <div className="mt-4">
        <div className="flex  flex-wrap font-poppins font-normal w-[100%] justify-left gap-2 flex-row">
          <Button
            label="Details"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(true)
              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(false)
              setMenuActive(false)
              setExtras(false)
              setAlDrinks(false)
              setSoftDrinks(false)
            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${detailPage ? "text-white bg-main-color " : "text-main-color"}`}
          />
          <Button
            label="Menu"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)

              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(false)
              setMenuActive(true)
              setExtras(false)
              setAlDrinks(false)
              setSoftDrinks(false)

            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg ${menuActive ? "text-white bg-main-color " : "text-main-color"} w-full md:w-[150px] font-normal p-1 pl-2 pr-2`}

          />
          <Button
            label="Extras"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)

              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(false)
              setMenuActive(false)
              setExtras(true)
              setAlDrinks(false)
              setSoftDrinks(false)
            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg ${extras ? "text-white bg-main-color " : "text-main-color"} w-full md:w-[150px] font-normal p-1 pl-2 pr-2`}

          />
          <Button
            label="Soft Drinks"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)

              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(false)
              setMenuActive(false)
              setExtras(false)
              setAlDrinks(false)
              setSoftDrinks(true)
            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg ${softdrinks ? "text-white bg-main-color " : "text-main-color"} w-full md:w-[150px] font-normal p-1 pl-2 pr-2`}

          />
          <Button
            label="AL Drinks"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)

              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(false)
              setMenuActive(false)
              setExtras(false)
              setAlDrinks(true)
              setSoftDrinks(false)
            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg ${alDrinks ? "text-white bg-main-color " : "text-main-color"} w-full md:w-[150px] font-normal p-1 pl-2 pr-2`}

          />



          <Button
            label="Free Ride"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)

              setUpdateResturant(false)
              setDeliveryPickup(false)
              setFreeRide(true)
              setMenuActive(false)
              setExtras(false)
              setAlDrinks(false)
              setSoftDrinks(false)
            }}
            className={`border border-main-color  mt-1 text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${freeRide ? "text-white bg-main-color " : "text-main-color"}`}
          />
          <Button
            label="Delivery/Pickup"
            onClick={() => {
              setShowEditComponent(false);
              setDetailPage(false)
              setDeliveryPickup(true)

              setUpdateResturant(false)
              setFreeRide(false)
              setMenuActive(false)
              setExtras(false)
              setAlDrinks(false)
              setSoftDrinks(false)

            }}
            className={`border border-main-color mt-1  text-main-color rounded-lg w-full md:w-[150px] font-normal p-1 pl-2 pr-2 ${deliveryPickup ? "text-white bg-main-color " : "text-main-color"}`}
          />

        </div>
      </div>

      {showEditComponent ? <EditResturantDetail resturantDetailView={resturantDetailView} /> :
        detailPage ? <ResturantDetailsPage setUpdateResturant={setUpdateResturant} setDetailPage={setDetailPage} setShowEditComponent={setShowEditComponent} resturantDetailView={resturantDetailView} /> : freeRide ? <FreeRide resturantDetailView={resturantDetailView} vendorId={resturantDetailView?.id} /> : deliveryPickup ? <DeliveryPickup vendorId={resturantDetailView?.id} /> : menuActive ? <Menu resturantDetailView={resturantDetailView} /> : updateResturant ? <Edit_Resturant resturantDetailView={resturantDetailView} /> : alDrinks ? <ALDrinks resturantDetailView={resturantDetailView} /> : softdrinks ? <SoftDrinks resturantDetailView={resturantDetailView} /> : extras ? <Extras resturantDetailView={resturantDetailView} /> : undefined
      }

    </div>
  );
}
