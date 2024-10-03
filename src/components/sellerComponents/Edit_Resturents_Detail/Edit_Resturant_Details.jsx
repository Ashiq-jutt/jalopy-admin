import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Axios from "axios";
import * as Yup from "yup"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import GoogleAutoComplete from "../../ResubleComponents/GoogleAutoComplete/GoogleAutoComplete";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { ApplePay, Bank, Cash, Paypal, Card } from "../../adminComponents/restaurants/components/Resturant_Detail/components/Edit_Resturents_Detail/assets";
export default function PartnerForum({ resturantDetailView }) {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [shopType, setShopType] = useState([]) 
  const [showMainAgreeError,setShowMainAgreeError]=useState(false) 
  const [showAgreedError,setShowAgreedError]=useState(false)
  const [menuSrc, setMenuSrc] = useState()
  const [mainAgree, setMainAgree] = useState(false)
  const shopPictureRef = useRef()
  const tradeLicenseRef = useRef()
  const menuCardRef = useRef()
  const [logoSrc, setLogoSrc] = useState()
  const [tradeLicenseSrc, setTradeLicenseSrc] = useState()
  const [loaderShow, setLoaderShow] = useState(false)
  let toast = useRef()
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ShopType`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      setShopType(res?.data?.data)
      toast.current.show({
        severity: "success",
        summary: "Info",
        detail: (
          <p className="font-poppins">
            {res?.data?.message
              ? res?.data?.message
              : "Shop Types Successfully Fetched"}
          </p>
        ),
      });
    }).catch(error => {
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: (
          <p className="font-poppins">
            {error?.response?.data?.message
              ? error?.response?.data?.message
              : "Shop Types Fetching Failed"}
          </p>
        ),
      });
    })
  }, [])
  let vendorId = JSON.parse(localStorage.getItem("userData")).data.vendorId;
  const daylight = [{ label: "AM", value: "AM" }, { label: "PM", value: "PM" }]
  const [timeTable, setTimeTable] = useState()
  const defaulttimetable = [{
    day: "Sunday",
    startTime: "09:00 AM",
    id: 1,
    status: true,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }, {
    day: "Monday",
    startTime: "09:00 AM",
    status: true,
    id: 2,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }, {
    day: "Tuesday",
    startTime: "09:00 AM",
    status: false,
    id: 3,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }, {
    day: "Wednesday",
    startTime: "09:00 AM",
    id: 4,
    status: true,
    endTime: "09:00 PM",
  }, {
    day: "Thursday",
    startTime: "09:00 AM",
    status: false,
    id: 5,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }, {
    day: "Friday",
    startTime: "09:00 AM",
    status: true,
    id: 6,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }, {
    day: "Saturday",
    startTime: "09:00 AM",
    status: true,
    id: 7,
    endTime: "09:00 PM",
    vendorShopId: vendorId
  }]

  const formik = useFormik({
    initialValues: {
      FirstName: resturantDetailView?.customerName,
      LastName: resturantDetailView?.lastName,
      Name: resturantDetailView?.name,
      ShopTypeId: resturantDetailView?.ShopTypeId,
      Description: resturantDetailView?.Description,
      Street2Address: resturantDetailView?.Street2Address,
      City: resturantDetailView?.City,
      Language: resturantDetailView?.Language,
      State: resturantDetailView?.State,
      Country: resturantDetailView?.Country,
      Location: resturantDetailView?.Location,
      Latitude: resturantDetailView?.Latitude,
      Longitude: resturantDetailView?.Longitude,
      Website: resturantDetailView?.Website,
      ZipCode: resturantDetailView?.ZipCode,
      Street1Address: resturantDetailView?.Street1Address,
      TaxId: resturantDetailView?.TaxId,
      ShopPicture: resturantDetailView?.ShopPicture,
      MaxPersons: 0,
      Id: vendorId,
      Location: "",
      IsProvidingPickup: resturantDetailView?.IsProvidingPickup,
      IsProvidingRide: resturantDetailView?.IsProvidingRide,
      AdditionalInfo: resturantDetailView?.AdditionalInfo,
      TradeLicense: resturantDetailView?.TradeLicense,
      IsAgreedTermsConditions: false,
      AboutUs: resturantDetailView?.AboutUs,
    },
    validationSchema: Yup.object().shape({

     
    }),
    onSubmit: (values, { resetForm }) => {
      ;
      setLoaderShow(true);
      const formData = new FormData();
      let fullName;
      Object.keys(formik.values).map((item) => {
        if (item === "Dob") {
          formData.append("Dob", formik.values[item].toISOString())
        }
        else if (item === "FirstName" || item === "LastName") {

        }
        else {
          if (formik.values[item] !== undefined && formik.values[item] !== null)
            formData.append(item, formik.values[item])
        }
      });
      if ((formik.values["FirstName"] !== null && formik.values.FirstName !== undefined) || (formik.values["LastName"] !== null && formik.values.LastName !== undefined)) {

        formData.append("Name", `${formik.values["FirstName"] ? formik.values["FirstName"] : ""} ${formik.values["LastName"] ? formik.values["LastName"] : ""}`)
      }
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/TimeTable/CreateOrUpdate`, timeTable,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {

          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Seller TimeTable Updated Fetched"}
              </p>
            ),
          })
        }).catch(error => {
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Seller TimeTable Updation Failed"}
              </p>
            ),
          });
        })
      Axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/Update`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {

          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Seller Details Updated Sucessfully"}
              </p>
            ),
          });
          // resetForm()

          setLoaderShow(false);
        })
        .catch((error) => {
          ;
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Seller Details Updation Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    }
  });
  const [sellerDetails, setSellerDetails] = useState()
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/${vendorId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setSellerDetails(res?.data?.data)
        let seller = res?.data?.data
        let lastName = seller?.name?.substring(seller?.name.lastIndexOf(" ") + 1)
        let firstName = seller?.name?.substring(0, seller?.name.lastIndexOf(" "))

        formik.setFieldValue("FirstName", firstName)
        setLogoSrc(seller?.image)
        setTradeLicenseSrc(seller?.tradeLicense)
        formik.setFieldValue("Location", seller?.location)
        formik.setFieldValue("LastName", lastName)
        formik.setFieldValue("Latitude", seller?.latitude)
        formik.setFieldValue("Longitude", seller?.longitude)
        formik.setFieldValue("Description", seller?.description)

        formik.setFieldValue("ShopTypeId", seller?.shopTypeId)

        formik.setFieldValue("Street1Address", seller?.street1Address)

        formik.setFieldValue("City", seller?.city)

        formik.setFieldValue("State", seller?.state)

        formik.setFieldValue("Country", seller?.country)

        formik.setFieldValue("ZipCode", seller?.zipCode)

        formik.setFieldValue("Website", seller?.website)

        formik.setFieldValue("TaxId", seller?.taxId)

        formik.setFieldValue("Street2Address", seller?.street2Address)

        formik.setFieldValue("IsProvidingPickup", seller?.isProvidingPickup)
        formik.setFieldValue("IsProvidingRide", seller?.isProvidingRide)

        formik.setFieldValue("MaxPersons", seller?.maxPersons)

        formik.setFieldValue("AdditionalInfo", seller?.additionalInfo)

        formik.setFieldValue("AboutUs", seller?.aboutUs)

        formik.setFieldValue("IsAgreedTermsConditions", seller?.IsAgreedTermsConditions)
        setMenuSrc(seller?.menu)
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Seller Details Fetched Sucessfully"}
            </p>
          ),
        });
        // resetForm()

      })
      .catch((error) => {
        ;
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.message
                ? error?.response?.data?.message
                : "Seller Details Fetching Failed"}
            </p>
          ),
        });
      });
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/TimeTable/Get`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        if (res?.data?.data?.length > 0) {

          setTimeTable(res?.data?.data)
        }
        else {
          setTimeTable(defaulttimetable)
        }
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Seller TimeTable Successfully Fetched"}
            </p>
          ),
        })
      }).catch(error => {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.message
                ? error?.response?.data?.message
                : "Seller TimeTable Fetching Failed"}
            </p>
          ),
        });
      })
  }, [])
  let hoursarray = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ]
  let minutesarray = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" },
    { label: "32", value: "32" },
    { label: "33", value: "33" },
    { label: "34", value: "34" },
    { label: "35", value: "35" },
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
    { label: "45", value: "45" },
    { label: "46", value: "46" },
    { label: "47", value: "47" },
    { label: "48", value: "48" },
    { label: "49", value: "49" },
    { label: "49.5", value: "49.5" },
    { label: "51", value: "51" },
    { label: "52", value: "52" },
    { label: "53", value: "53" },
    { label: "54", value: "54" },
    { label: "55", value: "55" },
    { label: "56", value: "56" },
    { label: "57", value: "57" },
    { label: "58", value: "58" },
    { label: "59", value: "59" }
  ]

  return (
    <div className="p-2 pt-20 text-main-color">
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">First Name</label>
            <InputText
              name="FirstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.FirstName}
              className="text-main-color border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Last Name</label>
            <InputText
              name="LastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.LastName}
              className="text-main-color border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Business Description</label>
            <InputTextarea
              name="Description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.Description}
              className="text-main-color border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Business Category</label>
            <Dropdown
              name="ShopTypeId"
              placeholder="Shop Type"
              onChange={formik.handleChange}
              value={formik.values.ShopTypeId}
              options={shopType}
              optionLabel="title"
              optionValue="id"
              className="text-main-color border w-full mt-2 "
            />
          </div>
          <div className="w-[90%] relative  mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Location</label>
            <GoogleAutoComplete formik={formik} />
            {formik.touched.Location && formik.errors.Location ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Location}</p>
            ) : null}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Latitude :</label>
            <InputText

              name="Latitude"
              placeholder="Latitude"
              onChange={formik.handleChange}
              value={formik.values.Latitude}
              className="text-main-color border w-full mt-2 p-2"
              disabled
            />
            {formik.touched.Latitude && formik.errors.Latitude ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Latitude}</p>
            ) : null}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Longitude :</label>
            <InputText

              name="Longitude"
              placeholder="Longitude"
              onChange={formik.handleChange}
              value={formik.values.Longitude}
              className="text-main-color border w-full mt-2 p-2"
              disabled


            />
            {formik.touched.Longitude && formik.errors.Longitude ? (
              <p className="mt-2 ml-1 text-red-500">{formik.errors.Longitude}</p>
            ) : null}
          </div>
          <div className="mt-2 w-full  ">
            <label className="ml-[5%] md:ml-[0%]">Address :</label>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-center sm:justify-center md:justify-between lg:justify-between">
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
              <label className="">Street Address :</label>
              <InputText
                name="Street1Address"
                placeholder="Street Address"
                onChange={formik.handleChange}
                value={formik.values.Street1Address}
                className="text-main-color border w-full mt-2 p-2"
              />
            </div>
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
              <label className="">Street Address Line 2 :</label>
              <InputText
                name="Street2Address"
                placeholder="Street Address Line 2"
                onChange={formik.handleChange}
                value={formik.values.Street2Address}
                className="text-main-color border w-full mt-2 p-2"
              />
            </div>
            <div className="flex flex-wrap flex-row justify-center w-full sm:justify-center md:justify-between lg:justify-between">
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                <label className="">City :</label>
                <InputText
                  name="City"
                  placeholder="City"
                  onChange={formik.handleChange}
                  value={formik.values.City}
                  className="text-main-color border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                <label className="">Zip/Postal Code :</label>
                <InputText
                  name="ZipCode"
                  placeholder="ZipCode"
                  onChange={formik.handleChange}
                  value={formik.values.ZipCode}
                  className="text-main-color border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                <label className="">State/Province :</label>
                <InputText
                  name="State"
                  placeholder="State"
                  onChange={formik.handleChange}
                  value={formik.values.State}
                  className="text-main-color border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                <label className="">Country :</label>
                <InputText
                  name="Country"
                  placeholder="Country Land"
                  onChange={formik.handleChange}
                  value={formik.values.Country}
                  className="text-main-color border w-full mt-2 p-2"
                />
              </div>
            </div>
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Website :</label>
            <InputText
              name="Website"
              placeholder="Website"
              onChange={formik.handleChange}
              value={formik.values.Website}
              className="text-main-color border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Tax ID</label>
            <InputText
              name="TaxId"
              placeholder="Tax ID"
              onChange={formik.handleChange}
              value={formik.values.TaxId}
              className="text-main-color border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="w-full">Business Logo{sellerDetails?.image ? <span onClick={() => {

              fetch(sellerDetails?.image)
                .then(response => {
                  const filename = response.headers.get('Content-Disposition')
                    ?.split('filename=')[1]
                    ?.split(';')[0]
                    ?.replace(/"/g, '') || sellerDetails?.image?.split('/').pop();

                  return response.blob().then(blob => ({ blob, filename }));
                })
                .then(({ blob, filename }) => {
                  const url = window.URL.createObjectURL(blob);
                  const anchor = document.createElement('a');
                  anchor.href = url;
                  anchor.download = filename; // Use the filename from the server
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);
                  window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Download failed:', error));


            }} className="cursor-pointer ml-2 pi pi-download"></span> : <span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</label>
            <div onClick={() => {
              shopPictureRef.current.click()
            }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
              <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
              <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.ShopPicture ? formik.values.ShopPicture.name : "No File Choosen"}</p>
            </div>
            <InputText ref={shopPictureRef} type="file" className="w-full hidden mt-2 bg-main-color text-white" onChange={(e) => {
              formik.setFieldValue("ShopPicture", e.target.files[0])
              let reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setLogoSrc(reader.result);
              };
            }} />
            <div className="flex flex-wrap flex-row justify-center items-center ">
              <div className="overflow-hidden w-[200px] border mt-4  border-main-color rounded-md h-[200px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >

                <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.target;
                  if (naturalWidth > naturalHeight) {
                    event.target.style = "width:auto;height:100%"

                  }
                  else {
                    event.target.style = "width:100%;height:auto"

                  }

                }} src={logoSrc} />
              </div>

            </div>
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
            <label className="">Trade License {sellerDetails?.tradeLicense ? <span onClick={() => {

              fetch(sellerDetails?.tradeLicense)
                .then(response => {
                  const filename = response.headers.get('Content-Disposition')
                    ?.split('filename=')[1]
                    ?.split(';')[0]
                    ?.replace(/"/g, '') || sellerDetails?.tradeLicense?.split('/').pop();

                  return response.blob().then(blob => ({ blob, filename }));
                })
                .then(({ blob, filename }) => {
                  const url = window.URL.createObjectURL(blob);
                  const anchor = document.createElement('a');
                  anchor.href = url;
                  anchor.download = filename; // Use the filename from the server
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);
                  window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Download failed:', error));


            }} className="cursor-pointer ml-2 pi pi-download"></span> : <span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</label>
            <div onClick={() => {
              tradeLicenseRef.current.click()
            }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
              <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
              <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.TradeLicense ? formik.values.TradeLicense.name : "No File Choosen"}</p>
            </div>
            <InputText ref={tradeLicenseRef} type="file" className="hidden w-full mt-2 bg-main-color text-white" onChange={(e) => {
              formik.setFieldValue("TradeLicense", e.target.files[0])
              let reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setTradeLicenseSrc(reader.result);
              };
            }} />
            <div className="flex flex-wrap flex-row justify-center items-center ">
              <div className="overflow-hidden w-[200px] border mt-4  border-main-color rounded-md h-[200px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >

                <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.target;
                  if (naturalWidth > naturalHeight) {
                    event.target.style = "width:auto;height:100%"

                  }
                  else {
                    event.target.style = "width:100%;height:auto"

                  }

                }} src={tradeLicenseSrc} />
              </div>

            </div>
          </div> 
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
            <div className="mt-4">
              <label>Available Space</label>
              <div className="border border-main-color flex flex-wrap flex-row justify-between items-center rounded p-2 mt-2 w-[200.5px]">
                <p className=" flex flex-wrap  bg-main-color w-full flex-row justify-between items-center text-white  p-2">
                  <i className="text-white cursor-pointer pi pi-plus "
                    onClick={() => {
                      formik.setFieldValue("MaxPersons", formik.values.MaxPersons + 1)
                    }}
                  ></i><h1>{formik.values.MaxPersons}</h1>
                  <i onClick={() => {
                    formik.setFieldValue("MaxPersons", formik.values.MaxPersons > 0 ? formik.values.MaxPersons - 1 : 0)

                  }} className="pi pi-minus  cursor-pointer text-white   "></i>
                </p>
              </div>
            </div>
            <div className="mt-4  text-main-color">
              <label>About Us</label>
              <div className="w-full">
                <InputTextarea
                  value={formik.values.AboutUs}
                  onChange={formik.handleChange}
                  name="AboutUs"
                  className="border p-2 mt-4  border-main-color rounded-md w-full md:w-[410px]"
                />

              </div>

            </div>
            <div className="flex flex-wrap flex-row w-full items-center justify-left">
              <div className="md:p-4 pl">
                <h1 className="text-left">Menu Card {sellerDetails?.menu ? <span onClick={() => {

                  fetch(sellerDetails?.menu)
                    .then(response => {
                      const filename = response.headers.get('Content-Disposition')
                        ?.split('filename=')[1]
                        ?.split(';')[0]
                        ?.replace(/"/g, '') || sellerDetails?.menu?.split('/').pop();

                      return response.blob().then(blob => ({ blob, filename }));
                    })
                    .then(({ blob, filename }) => {
                      const url = window.URL.createObjectURL(blob);
                      const anchor = document.createElement('a');
                      anchor.href = url;
                      anchor.download = filename; // Use the filename from the server
                      document.body.appendChild(anchor);
                      anchor.click();
                      document.body.removeChild(anchor);
                      window.URL.revokeObjectURL(url);
                    })
                    .catch(error => console.error('Download failed:', error));


                }} className="cursor-pointer ml-2 pi pi-download"></span> : <span className="text-red-500 text-[14px]">&nbsp;(Pending)</span>}</h1>
              </div>
              <div className="md:w-auto w-full">
                <div onClick={() => {
                  menuCardRef.current.click()
                }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                  <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                  <p className="text-main-color w-auto"> {formik.values.Menu ? formik.values.Menu.name : "No File Choosen"}</p>
                </div>
                <InputText type="file" ref={menuCardRef} className=" ml-4 hidden w-full mt-2 bg-main-color text-white" onChange={(e) => {
                  formik.setFieldValue("Menu", e.target.files[0])
                  let reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = () => {
                    setMenuSrc(reader.result);
                  };
                }} /></div>
              <div className="flex flex-wrap  w-full md:w-auto flex-row justify-center items-center md:ml-20 ">
                <div className="overflow-hidden w-[200px] border mt-4  border-main-color rounded-sm h-[200px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >

                  <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.target;
                    if (naturalWidth > naturalHeight) {
                      event.target.style = "width:auto;height:100%"

                    }
                    else {
                      event.target.style = "width:100%;height:auto"

                    }

                  }} src={menuSrc} />
                </div>

              </div>
            </div>
            <div className="mt-4 text-main-color ">
              <label >Set Standard Hours for delivery, pickup</label>
              <p className="font-normal">Configure the Standard Hours For Your Resturant</p>

              <div className="w-[100%] overflow-auto">
                <DataTable
                  value={timeTable}
                  size="small"
                  resizableColumns
                  emptyMessage="No customers found."
                  style={{ backgroundColor: "white", }}

                  rowClassName="cursor-pointer"
                  className="  min-w-[900px]    mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
                >
                  {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
                  <Column
                    className="text-main-color font-normal"
                    field="day"
                    headerClassName="hidden"
                  ></Column>
                  <Column headerClassName="hidden" body={(rowData) => {
                    return (
                      <div className={` flex items-center   justify-center`}>
                        <InputSwitch
                          checked={rowData.status === true ? true : false}
                          onChange={() => {

                            const updatedItems = timeTable.map(items =>
                              rowData.id === items.id ? { ...items, status: !rowData.status } : items
                            );
                            setTimeTable(updatedItems)
                          }}
                          className=""

                        />
                      </div>
                    )
                  }} className="text-main-color font-normal" field="status"></Column>
                  <Column headerClassName="hidden" className="text-main-color font-normal" body={(rowData) => {
                    let timeString = rowData?.startTime;

                    // Split the time string by space to separate time and period
                    let [time, period] = timeString.split(' ');

                    // Split the time part by colon to get hours and minutes
                    let [hours, minutes] = time.split(':');
                    return (
                      <div className="flex flex-wrap flex-row items-center w-[300px] md:w-auto justify-center">
                        <Dropdown className="text-main-color border border-main-color" value={hours} options={hoursarray} optionLabel="label" optionValue="value"
                          onChange={(e) => {
                            let startTime = `${e.value}:${minutes} ${period}`

                            const updatedItems = timeTable.map(items =>
                              rowData.id === items.id ? { ...items, startTime: startTime } : items
                            );
                            setTimeTable(updatedItems)
                          }}
                        />

                        <Dropdown onChange={(e) => {
                          let startTime = `${hours}:${e.value} ${period}`

                          const updatedItems = timeTable.map(items =>
                            rowData.id === items.id ? { ...items, startTime: startTime } : items
                          );
                          setTimeTable(updatedItems)
                        }} className="text-main-color border border-main-color ml-1" value={minutes} options={minutesarray} optionLabel="label" optionValue="value" />
                        <Dropdown onChange={(e) => {
                          let startTime = `${hours}:${minutes} ${e.value}`

                          const updatedItems = timeTable.map(items =>
                            rowData.id === items.id ? { ...items, startTime: startTime } : items
                          );
                          setTimeTable(updatedItems)
                        }} className="text-main-color border border-main-color ml-1" value={period} options={daylight} optionLabel="label" optionValue="value" />

                      </div>
                    )
                  }}></Column>
                  <Column headerClassName="hidden" className="text-main-color font-normal" body={() => {
                    return (
                      <p>To </p>
                    )
                  }}></Column>

                  <Column headerClassName="hidden" field="to" body={(rowData) => {
                    let timeString = rowData?.endTime;

                    // Split the time string by space to separate time and period
                    let [time, period] = timeString.split(' ');

                    // Split the time part by colon to get hours and minutes
                    let [hours, minutes] = time.split(':');
                    return (
                      <div className="flex flex-wrap flex-row w-[300px] md:w-auto items-center justify-center">
                        <Dropdown onChange={(e) => {
                          let startTime = `${e.value}:${minutes} ${period}`

                          const updatedItems = timeTable.map(items =>
                            rowData.id === items.id ? { ...items, endTime: startTime } : items
                          );
                          setTimeTable(updatedItems)
                        }} className="text-main-color border border-main-color " value={hours} options={hoursarray} optionLabel="label" optionValue="value" />

                        <Dropdown onChange={(e) => {
                          let startTime = `${hours}:${e.value} ${period}`

                          const updatedItems = timeTable.map(items =>
                            rowData.id === items.id ? { ...items, endTime: startTime } : items
                          );
                          setTimeTable(updatedItems)
                        }} className="text-main-color border border-main-color ml-1" value={minutes} options={minutesarray} optionLabel="label" optionValue="value" />
                        <Dropdown onChange={(e) => {
                          let startTime = `${hours}:${minutes} ${e.value}`

                          const updatedItems = timeTable.map(items =>
                            rowData.id === items.id ? { ...items, endTime: startTime } : items
                          );
                          setTimeTable(updatedItems)
                        }} className="text-main-color border border-main-color ml-1" value={period} options={daylight} optionLabel="label" optionValue="value" />

                      </div>
                    )
                  }} className="text-main-color font-normal" ></Column>



                </DataTable>
              </div>

            </div>
            <div className="mt-4 text-main-color">
              <label>Additional Information</label>
              <div className="w-full">
                <InputTextarea className="border p-2 mt-4  border-main-color rounded-md w-full md:w-[310px]" name="AdditionalInfo" value={formik.values.AdditionalInfo} onChange={formik.handleChange} />


              </div>
              <p className="mt-2 font-normal">{resturantDetailView?.additionalinfo}</p>
            </div>

            <label className="mt-4">Shop Status</label>
            <div className="w-[90%] mt-4  flex flex-row flex-wrap justify-left   mt-2 font-poppins font-normal   ">
              <div className="w-[149.5px]">
                <label className="mb-10">Delivery/Pickup</label>
                <div className="flex flex-wrap flex-row  items-center justify-between">
                  <p className="flex flex-wrap flex-row justify-left w-full  mt-2"><div className="inline ">
                    <i onClick={() => {
                      formik.setFieldValue("IsProvidingPickup", true)
                    }} className={`pi rounded-full ${formik.values.IsProvidingPickup === true ? "pi-check" : ""}  w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`} />
                  </div>
                    <p className="ml-2">Yes</p>
                  </p>
                  <p className="flex flex-wrap flex-row justify-left w-full  mt-2"> <div >
                    <i onClick={() => {
                      formik.setFieldValue("IsProvidingPickup", false)
                    }} className={`pi rounded-full ${formik.values.IsProvidingPickup === false ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]`} />
                  </div>
                    <p>No</p>
                  </p>

                </div>
              </div>
              <div className="w-[149.5px] ">
                <label className="mb-10">Free Ride</label>
                <div className="flex flex-wrap flex-row  items-center justify-between">
                  <p className="flex flex-wrap flex-row justify-left w-full  mt-2"><div className="inline ">
                    <i onClick={() => {
                      formik.setFieldValue("IsProvidingRide", true)
                    }} className={`pi rounded-full ${formik.values.IsProvidingRide === true ? "pi-check" : ""}  w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`} />
                  </div>
                    <p className="ml-2">Yes</p>
                  </p>
                  <p className="flex flex-wrap flex-row justify-left w-full  mt-2"> <div >
                    <i onClick={() => {
                      formik.setFieldValue("IsProvidingRide", false)
                    }} className={`pi rounded-full ${formik.values.IsProvidingRide === false ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]`} />
                  </div>
                    <p>No</p>
                  </p>

                </div>
              </div>



            </div>
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
              <h1 className="mt-4 font-poppins ml-[40px] font-semibold">Terms And Conditions</h1>
              <div className="mt-4 flex  flex-wrap gap-4 flex-row justify-left items-center font-poppins font-normal">
                <div className="flex flex-wrap flex-row justify-left ">
                  <i onClick={() => { 
                     if(mainAgree){ 
                      setShowMainAgreeError(true)
                     }  
                     else{ 
                      setShowMainAgreeError(false)
                     }
                    // formik.setFieldValue("IsAgreedTermsConditions",!formik.values.IsAgreedTermsConditions) 
                    setMainAgree(prev => !prev)
                   
                   
                  }} className={`pi rounded-full ${mainAgree ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                </div>
                <p className="w-[80%]">
                  By submitting this form, you agree to our <span className="underline cursor-pointer">terms and conditions</span></p>
              </div>
              {showMainAgreeError ? (
                <p className="mt-2 ml-10 text-red-500">Accept The Terms And Conditions</p>
              ) : null}
            </div>
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">

              <div className="mt-4 flex  flex-wrap gap-4 flex-row justify-left items-center font-poppins font-normal">
                <div name="IsAgreedTermsConditions" className="flex flex-wrap flex-row justify-left ">
                  <i onClick={() => {
                    formik.setFieldValue("IsAgreedTermsConditions", !formik.values.IsAgreedTermsConditions)    
                     if(formik.values.IsAgreedTermsConditions){ 
                      setShowAgreedError(true)
                     }  
                     else{ 
                      setShowAgreedError(false)
                     }
                  }} className={`pi rounded-full ${formik.values.IsAgreedTermsConditions ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                </div>
                <p className="w-[80%]">
                  I Agree <span className="underline cursor-pointer">terms and conditions</span></p>
              </div>
              {showAgreedError ? (
                <p className="mt-2 ml-10 text-red-500">Accept The Terms And Conditions</p>
              ) : null}
            </div>
          </div>

          <div className="w-full mt-10 flex flex-wrap justify-center items-center flex-row">
            <Button type="button" 
             onClick={()=>{ 
              if(formik.values.IsAgreedTermsConditions){ 
                if(mainAgree){ 
                  formik.handleSubmit()
                } 
                else{ 
                  setShowMainAgreeError(true)
                }
              } 
              else{ 
                setShowAgreedError(true) 
                if(!mainAgree){ 
                  setShowMainAgreeError(true)
                } 
              }
             }}
             label="Save And Submit" loading={loaderShow} disabled={loaderShow} className="p-2 pl-3 pr-3 bg-main-color text-white " />
          </div>
        </div>

      </form>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
}
