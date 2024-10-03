import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputText } from "primereact/inputtext";
import signupImg from "../assets/signupImg.png"
import { Dropdown } from "primereact/dropdown"
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import GoogleAutoComplete from "../components/ResubleComponents/GoogleAutoComplete/GoogleAutoComplete";
import { Calendar } from "primereact/calendar";
export default function BecomeSeller({ resturantDetailView }) {

  let navigate = useNavigate()
  const [mainagree, setMainAgree] = useState(false)
  const [shopType, setShopType] = useState([])
  const shopPictureRef = useRef()
  const TradeLicenseRef = useRef()
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
      setTimeout(() => {

      }, 500)
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
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name Is Required'),
    LastName: Yup.string().required('Last Name Is Required'),
    Email: Yup.string().required('Email Is Required'),
    ShopPicture: Yup.string().required('Shop Picture Is Required'),
    TradeLicense: Yup.string().required('Trade License Is Required'),
    Dob: Yup.string().required('Dob Is Required'),
    Description: Yup.string().required('Description Is Required'),
    Name: Yup.string().required('Name Is Required'),
    Street1Address: Yup.string().required('Street Address1  Is Required'),
    City: Yup.string().required('City Is Required'),
    State: Yup.string().required('State Is Required'),
    Country: Yup.string().required('Country Is Required'),
    Website: Yup.string().required('Website Is Required'),
    Location: Yup.string().required('Location Is Required'),
    ZipCode: Yup.string().required('Zip Code Is Required'),
    Street2Address: Yup.string().required('Street Address2 Is Required'),
    TaxId: Yup.string().required('Tax ID Is Required'),
    IsActive: false,
    FreeDelivery: false,

    Latitude: Yup.string().required("Latitude Is Required"),
    Longitude: Yup.string().required("Longitude Is Required"),
    IsProvidingPickup: false,
    Language: Yup.string().required('Language Is Required'),
    IsProvidingRide: false,
    IsAgreedTermsConditions: Yup.boolean()
      .oneOf([true], 'Accept the terms and conditions.')
      .required('This field is required.'),
    overAllAgree: Yup.boolean()
      .oneOf([true], 'Accept the terms and conditions.')
      .required('This field is required.'),
    ShopTypeId: Yup.string().required('Shop Type Is Required')
  });
  const [loaderShow, setLoaderShow] = useState(false)
  const toast = useRef()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      ShopPicture: "",
      TradeLicense: "",
      Email: "",
      Dob: "",
      Language: "English",
      Description: "",
      Name: "",
      Street1Address: "",
      City: "",
      State: "",
      Country: "",
      Website: "",
      Latitude: "",
      Longitude: "",
      Location: "",
      ZipCode: "",
      Street2Address: "",
      TaxId: "",
      IsActive: false,
      FreeDelivery: false,
      IsProvidingPickup: false,
      IsProvidingRide: false,
      IsAgreedTermsConditions: false,
      VendorId: "",
      ShopTypeId: "",
      overAllAgree: false

    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      ;
      setLoaderShow(true);
      const formData = new FormData();
      let fullName;
      Object.keys(formik.values).map((item) => {
        if (item === "Dob") {
          formData.append("Dob", formik.values[item].toISOString())
        }
        else {
          if (formik.values[item] !== "") {
            formData.append(item, formik.values[item])
          }
        }
      });

      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/Create`,
        formData,
      )
        .then((res) => {

          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Profile Updated Sucessfully"}
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
                {error?.response?.data?.Message
                  ? error?.response?.data?.Message
                  : "Profile Updation Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    }
  });
  return (
    <div className="flex flex-row flex-wrap justify-between font-poppins font-normal">

      <div className="bg-main-color  sm:hidden md:flex lg:flex w-[35%] max-sm:hidden h-screen flex flex-row  flex-row h-screen justify-center items-center">
        <img onError={(e) => {
          e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
        }} src={signupImg} className="w-[60%] " />
      </div>
      <div className="w-[100%]  md:w-[65%] lg:w-[65%] ">
        <div className="h-screen overflow-x-hidden  w-[100%]  overflow-y-auto flex  flex-wrap justify-center items-center">
          <div className="p-1 w-full rounded-lg ">


            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap flex-row justify-left items-center">
                <Button type="button" onClick={() => {
                  navigate("/Login")
                }} icon="pi pi-arrow-left" className="p-1 bg-main-color text-white pl-2 pr-2 " label="Back To Login" />
              </div>
              <div className="mt-4 p-2 mb-10 flex text-main-color  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
                <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">First Name</label>
                  <InputText
                    name="FirstName"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.FirstName}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.FirstName && formik.errors.FirstName ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.FirstName}</p>
                  ) : null}
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
                  {formik.touched.LastName && formik.errors.LastName ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.LastName}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Email</label>
                  <InputText
                    name="Email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.Email && formik.errors.Email ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Email}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">DOB :</label>
                  <Calendar
                    name="Dob"
                    placeholder="DOB"
                    onChange={formik.handleChange}
                    value={formik.values.Dob}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.Dob && formik.errors.Dob ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Dob}</p>
                  ) : null}
                </div>
                {/*<div className="w-[90%] mt-2 sm:w-[90%]  font-normal md:w-[20%] lg:w-[20%] ">
            <label>Dob</label>
            <Calendar
              iconPos="right"
              showIcon
              onChange={formik.handleChange}
              value={formik.values.Dob}
              placeholder="Dob"
              className="w-full text-main-color border w-full font-normal  mt-2 p-2"
            />
          </div>  */}
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Resturant Description</label>
                  <InputText
                    name="Description"
                    placeholder="Description"
                    onChange={formik.handleChange}
                    value={formik.values.Description}
                    className="text-main-color border w-full mt-2 p-2"
                  />    {formik.touched.Description && formik.errors.Description ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Description}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Resturant Name</label>
                  <InputText
                    name="Name"
                    placeholder="Resturant Name"
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                    className="text-main-color border w-full mt-2 p-2"
                  />    {formik.touched.Name && formik.errors.Name ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Name}</p>
                  ) : null}
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
                    disabled
                    name="Latitude"
                    placeholder="Latitude"
                    onChange={formik.handleChange}
                    value={formik.values.Latitude}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.Latitude && formik.errors.Latitude ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Latitude}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Longitude :</label>
                  <InputText
                    disabled
                    name="Longitude"
                    placeholder="Longitude"
                    onChange={formik.handleChange}
                    value={formik.values.Longitude}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.Longitude && formik.errors.Longitude ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Longitude}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Shop Type</label>
                  <Dropdown
                    name="ShopTypeId"
                    placeholder="Shop Type"
                    onChange={formik.handleChange}
                    value={formik.values.ShopTypeId}
                    options={shopType}
                    optionLabel="title"
                    optionValue="id"
                    className="text-main-color border w-full mt-2 "
                  />    {formik.touched.ShopTypeId && formik.errors.ShopTypeId ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.ShopTypeId}</p>
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
                      placeholder="Street And Number"
                      onChange={formik.handleChange}
                      value={formik.values.Street1Address}
                      className="text-main-color border w-full mt-2 p-2"
                    />
                    {formik.touched.Street1Address && formik.errors.Street1Address ? (
                      <p className="mt-2 ml-1 text-red-500">{formik.errors.Street1Address}</p>
                    ) : null}
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
                    {formik.touched.Street2Address && formik.errors.Street2Address ? (
                      <p className="mt-2 ml-1 text-red-500">{formik.errors.Street2Address}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
                    <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                      <label className="">City :</label>
                      <InputText
                        name="City"
                        placeholder="City"
                        onChange={formik.handleChange}
                        value={formik.values.City}
                        className="text-main-color border w-full mt-2 p-2"
                      />
                      {formik.touched.City && formik.errors.City ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.City}</p>
                      ) : null}
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
                      {formik.touched.State && formik.errors.State ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.State}</p>
                      ) : null}
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
                      {formik.touched.ZipCode && formik.errors.ZipCode ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.ZipCode}</p>
                      ) : null}
                    </div>
                    <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                      <label className="">Country:</label>
                      <InputText
                        name="Country"
                        placeholder="Country"
                        onChange={formik.handleChange}
                        value={formik.values.Country}
                        className="text-main-color border w-full mt-2 p-2"
                      />
                      {formik.touched.Country && formik.errors.Country ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.Country}</p>
                      ) : null}
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
                  {formik.touched.Website && formik.errors.Website ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Website}</p>
                  ) : null}
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
                  {formik.touched.TaxId && formik.errors.TaxId ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.TaxId}</p>
                  ) : null}
                </div>

                <div className="w-[90%]  flex flex-row flex-wrap justify-between   mt-2 font-poppins font-normal   ">
                  <div className="w-[150px]">
                    <label className="mb-10">Pickup</label>
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
                  <div className="w-[150px]">
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
                  <div className="w-[150px]">
                    <label className="mb-10">Languages</label>
                    <div className="flex flex-wrap flex-row  items-center justify-between">
                      <p className="flex flex-wrap flex-row justify-left w-full  mt-2"><div className="inline ">
                        <i onClick={() => {
                          formik.setFieldValue("Language", "English")
                        }} className={`pi rounded-full ${formik.values.Language === "English" ? "pi-check" : ""}  w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]`} />
                      </div>
                        <p className="ml-2">English</p>
                      </p>
                      <p className="flex flex-wrap flex-row justify-left w-full  mt-2"> <div >
                        <i onClick={() => {
                          formik.setFieldValue("Language", "German")
                        }} className={`pi rounded-full ${formik.values.Language === "German" ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]`} />
                      </div>
                        <p>German</p>
                      </p>

                    </div>
                  </div>
                </div>

                <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Shop Logo</label>
                  <div onClick={() => {
                    shopPictureRef.current.click()
                  }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                    <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                    <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.ShopPicture ? formik.values.ShopPicture.name : "No File Choosen"}</p>
                  </div>
                  <input className="bg-main-color text-white mt-4 md:mt-0 hidden  w-full md:w-[49.8%] md:ml-2" ref={shopPictureRef} name="ShopPicture" type="file" onChange={(e) => {
                    formik.setFieldValue("ShopPicture", e.target.files[0])

                  }} />
                  {formik.touched.ShopPicture && formik.errors.ShopPicture ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.ShopPicture}</p>
                  ) : null}
                </div>

                <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="w-full md:w-[auto]">Trade License</label>
                  <div onClick={() => {
                    TradeLicenseRef.current.click()
                  }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                    <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                    <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.TradeLicense ? formik.values.TradeLicense.name : "No File Choosen"}</p>
                  </div>
                  <input className="bg-main-color mt-4 md:mt-0 hidden  w-full md:w-[49.8%] md:ml-2 text-white" ref={TradeLicenseRef} name="TradeLicense" type="file" onChange={(e) => {
                    formik.setFieldValue("TradeLicense", e.target.files[0])

                  }} />
                  {formik.touched.TradeLicense && formik.errors.TradeLicense ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.TradeLicense}</p>
                  ) : null}
                </div>
                <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
                  <h1 className="mt-4 ml-8 font-semibold font-poppins font-normal">Terms And Conditions</h1>
                  <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal">
                    <div className="flex flex-wrap flex-row justify-left ">
                      <i onClick={() => {
                        setMainAgree(prev => !prev)
                        formik.setFieldValue("overAllAgree", !formik.values.overAllAgree)
                      }} className={`pi rounded-full ${mainagree ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                    </div>
                    <p className="ml-3 w-[calc(100%-70px)]">
                      By submitting this form, you agree to our terms and conditions. <span className="underline cursor-pointer"></span></p>
                    {formik.touched.overAllAgree && formik.errors.overAllAgree ? (
                      <p className="mt-2 ml-8 text-red-500">{formik.errors.overAllAgree}</p>
                    ) : null}
                  </div>
                  <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal">
                    <div className="flex flex-wrap flex-row justify-left ">
                      <i onClick={() => {
                        formik.setFieldValue("IsAgreedTermsConditions", !formik.values.IsAgreedTermsConditions)
                      }} className={`pi rounded-full ${formik.values.IsAgreedTermsConditions ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                    </div>
                    <p className="ml-3 w-[calc(100%-70px)]">
                      I Agree <span className="underline cursor-pointer">terms and conditions</span></p>
                  </div>
                  {formik.touched.IsAgreedTermsConditions && formik.errors.IsAgreedTermsConditions ? (
                    <p className="mt-2 ml-8 text-red-500">{formik.errors.IsAgreedTermsConditions}</p>
                  ) : null}
                </div>

                <div className="flex flex-wrap w-full mt-4 flex-row justify-end">
                  <Button disabled={loaderShow} loading={loaderShow} className="bg-main-color p-1 pl-2 pr-2 text-white" label="Submit" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
