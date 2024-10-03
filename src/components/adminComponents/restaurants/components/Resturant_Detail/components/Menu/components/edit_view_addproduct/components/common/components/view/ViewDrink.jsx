import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import Axios from "axios";
import { Toast } from "primereact/toast";
export default function ViewDrink({ VendorShopId, setShowAiDetailView, itemData }) {
  const [loaderShow, setLoaderShow] = useState(false)
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const toast = useRef()
  const [detailData, setDetailData] = useState()
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Product/${itemData?.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Fetched Menu Item Detail"}</p> });
      setDetailData(res?.data?.data)


    }).catch((error) => {
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Menu Item Details Fetching Failed"}</p> });

    })
  }, [])
  return (
    <div className="mt-4  md:pl-[10%] md:pr-[10%]">
      <div className="flex flex-wrap flex-row justify-center items-center ">
        <div className="w-[100%] border mt-4  border-main-color bg-[#F1E9FE] rounded-md h-[400px] flex flex-wrap flex-row justify-center items-center overflow-hidden" >

          <img onError={(e) => {
            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
          }} onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.target;
            if (naturalWidth > naturalHeight) {
              event.target.style = "width:100%;height:auto"

            }
            else {
              event.target.style = "width:auto;height:100%"

            }

          }} src={detailData?.imagePath} placeholder="Product" />
        </div>

      </div>
      <div className="mt-10 w-[100%] flex flex-wrap flex-row justify-center">

        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Product Name:</p>
          <p className="inline w-[40%]">
            {detailData?.name}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Description:</p>
          <p className="inline w-[40%]">
            {detailData?.description}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Pickup Cost :</p>
          <p className="inline w-[40%]">
            € {detailData?.pickupPrice}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Delivery Charges :</p>
          <p className="inline w-[40%]">
            € {detailData?.vendorShop?.deliverCharges}
          </p>
        </div>
        <div className=" mt-4 w-full flex flex-wrap flex-row justify-between">
          <p className="w-[40%]">Allergian:</p>
          <p className="inline w-[40%]">
            {detailData?.allergians}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap mt-8 flex-row justify-center gap-4 w-full">

        <Button label="Inquiry" type="button" className="border w-[100px] border-main-color pl-4 pr-4 p-1" />
        <Button label="Edit" type="button" className="border w-[100px] border-main-color pl-4 pr-4 p-1" />
        <Button label="Delete" loading={loaderShow} disabled={loaderShow} onClick={() => {
          setLoaderShow(prev => !prev)
          Axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/Product/${itemData?.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Removed Menu Item"}</p> });

            setLoaderShow(prev => !prev)
            setTimeout(() => {

              setShowAiDetailView(prev => !prev)
            }, 1000)
          }).catch((error) => {
            toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Menu Item Removal Failed"}</p> });

            setLoaderShow(prev => !prev)
          })
        }} type="button" className="border w-[100px] border-main-color pl-4 pr-4 p-1" />

        <Button label="Approve" type="button" className="border w-[100px] bg-main-color text-white border-main-color pl-4 pr-4 p-1" />
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px]  
    mt-[80px]
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
}
