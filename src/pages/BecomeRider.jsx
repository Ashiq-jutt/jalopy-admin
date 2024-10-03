import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputText } from "primereact/inputtext";
import signupImg from "../assets/signupImg.png"
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Description, Language } from "@mui/icons-material";
import { Calendar } from "primereact/calendar";
export default function BecomeRider({ isGerman, resturantDetailView }) {
  let navigate = useNavigate()
  const [imgsrc, setImgsrc] = useState()
  const TradeLicenseRef = useRef()
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name Is Required'),
    LastName: Yup.string().required('Last Name Is Required'),
    TradeLicense: Yup.string().required('Trade License Is Required'),

    Description: Yup.string().required('Trade License Is Required'),
    Email: Yup.string().required('Email Is Required'),
    Contact: Yup.string().required('Phone Is Required'),
    TaxId: Yup.string().required('Tax ID Is Required'),
    IbanNumber: Yup.string().required('IBAN Is Required'),
    Dob: Yup.string().required('Dob Is Required'),
    Land: Yup.string().required('Country Is Required'),
    Street: Yup.string().required("Street Is Required"),
    HouseNo: Yup.string().required("House No Is Required"),
    PostalCode: Yup.string().required("Postal Code Is Required"),
    IsAgree: Yup.boolean()
      .oneOf([true], 'Accept the terms and conditions.')
      .required('This field is required.'),
    OverAllAgree: Yup.boolean()
      .oneOf([true], 'Accept the terms and conditions.')
      .required('This field is required.'),
    Image: Yup.string().required("Postal Code Is Required"),

  });
  const [loaderShow, setLoaderShow] = useState(false)
  const toast = useRef()
  const imageRef = useRef()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [mainagree, setMainAgree] = useState(false)
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      IsAgree: false,
      PostalCode: "",
      HouseNo: "",
      Street: "",
      LastName: "",
      TradeLicense: "",
      Description: "",
      Email: "",
      Contact: "",
      Dob: "",
      Land: "",
      TaxId: "",
      Language: "English",
      IbanNumber: "",
      Image: "",
      OverAllAgree: false
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      ;
      setLoaderShow(true);
      const formData = new FormData();
      let fullName;
      Object.keys(formik.values).map((item) => {
        if (item === "TradeLicense") {
          formData.append(item, formik.values[item])


        }
        else {
          if (item === "Dob") {
            formData.append(item, (formik.values.Dob).toISOString())
          }
          else {
            formData.append(item, formik.values[item])
          }
        }
      });

      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/Register`,
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
                  : "Sign Up Sucessfully"}
              </p>
            ),
          });
          // resetForm()

          setLoaderShow(false);
          setTimeout(() => {
            navigate("/Login")
          }, 500)
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
                  : "Sign Up Failed"}
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
              <div className="flex flex-wrap flex-row justify-left">
                <Button type="button" onClick={() => {
                  navigate("/Login")
                }} icon="pi pi-arrow-left" className="p-1 bg-main-color text-white pl-2 pr-2 " label={`${isGerman ? "Zurück zur Anmeldung" : "Back To Login"}`} />
              </div>
              <div className="mt-4 p-2 mb-10 flex text-main-color  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
                <div className="flex flex-wrap flex-row items-center justify-center md:justify-between  w-full">
                  <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[50%] lg:w-[50%]  ">
                    <label className="">Image</label>
                    <div onClick={() => {
                      imageRef.current.click()
                    }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                      <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.imageRef ? formik.values.imageRef.name : "No File Choosen"}</p>
                    </div>
                    <InputText
                      type="file"
                      ref={imageRef}
                      name="Image"
                      placeholder="Image"
                      onChange={(e) => {
                        formik.setFieldValue("Image", e.target.files[0])
                        let reader = new FileReader()
                        reader.readAsDataURL(e.target.files[0])
                        reader.onload = () => {
                          setImgsrc(reader.result)
                        }
                      }}
                      className="text-main-color hidden font-poppins border w-full mt-2 p-2"
                    />
                    {formik.touched.Image && formik.errors.Image ? (
                      <p className="mt-2 ml-1 text-red-500">{formik.errors.Image}</p>
                    ) : null}
                  </div >
                  <div className="w-[90%]     flex flex-wrap flex-row justify-center items-center  font-poppins font-normal md:w-[50%] lg:w-[50%] ">
                    <div className="w-[100px] border border-main-color rounded-full  overflow-hidden h-[100px]  ">
                      <img onError={(e) => {
                        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
                      }} src={imgsrc} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">{isGerman ? "Zurück zur Anmeldung" : "First Name"}</label>
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
                  <label className="">{isGerman ? "NachName" : "Last Name"}</label>
                  <InputText
                    name="LastName"
                    placeholder={`${isGerman ? "Nachname" : "Last Name"}`}
                    onChange={formik.handleChange}
                    value={formik.values.LastName}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.LastName && formik.errors.LastName ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.LastName}</p>
                  ) : null}
                </div>
                {/*<div className="w-[90%] mt-2 sm:w-[90%]  font-normal md:w-[20%] lg:w-[20%] ">
            <label>DOB</label>
            <Calendar
              iconPos="right"
              showIcon
              onChange={formik.handleChange}
              value={formik.values.dob}
              placeholder="DOB"
              className="w-full text-main-color border w-full font-normal  mt-2 p-2"
            />
          </div>  */}
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[50%] lg:w-[50%]  ">
                  <label className="">Date Of Birth</label>
                  <Calendar
                    name="Dob"
                    placeholder="DOB"
                    onChange={formik.handleChange}
                    value={formik.values.Dob}
                    className="text-main-color font-poppins border w-full mt-2 p-2"
                  />
                  {formik.touched.Dob && formik.errors.Dob ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Dob}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Street</label>
                  <InputText
                    name="Street"
                    placeholder="Street"
                    onChange={formik.handleChange}
                    value={formik.values.Street}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.Street && formik.errors.Street ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.Street}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">House No</label>
                  <InputText
                    name="HouseNo"
                    placeholder="House No"
                    onChange={formik.handleChange}
                    value={formik.values.HouseNo}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.HouseNo && formik.errors.HouseNo ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.HouseNo}</p>
                  ) : null}
                </div>
                <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">Postal Code</label>
                  <InputText
                    name="PostalCode"
                    placeholder="Postal Code"
                    onChange={formik.handleChange}
                    value={formik.values.PostalCode}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.PostalCode && formik.errors.PostalCode ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.PostalCode}</p>
                  ) : null}
                </div>
                <div className="w-full flex flex-row flex-wrap justify-center sm:justify-center md:justify-between lg:justify-between">
                  <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                    <label className="">Email :</label>
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

                  <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                    <label className="">Phone :</label>
                    <InputText
                      name="Contact"
                      placeholder="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.Contact}
                      className="text-main-color border w-full mt-2 p-2"
                    />
                    {formik.touched.Contact && formik.errors.Contact ? (
                      <p className="mt-2 ml-1 text-red-500">{formik.errors.Contact}</p>
                    ) : null}
                  </div>
                  <div className="w-full flex flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">




                    <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                      <label className="">Country:</label>
                      <InputText
                        name="Land"
                        placeholder="Country"
                        onChange={formik.handleChange}
                        value={formik.values.Land}
                        className="text-main-color border w-full mt-2 p-2"
                      />
                      {formik.touched.Land && formik.errors.Land ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.Land}</p>
                      ) : null}
                    </div>
                    <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                      <label className="">Description :</label>
                      <InputText
                        name="Description"
                        placeholder="Description"
                        onChange={formik.handleChange}
                        value={formik.values.Description}
                        className="text-main-color border w-full mt-2 p-2"
                      />
                      {formik.touched.Description && formik.errors.Description ? (
                        <p className="mt-2 ml-1 text-red-500">{formik.errors.Description}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49.8%] lg:w-[49.8%]  ">
                  <label className="">IBAN :</label>
                  <InputText
                    name="IbanNumber"
                    placeholder="IBAN Number"
                    onChange={formik.handleChange}
                    keyfilter="int"
                    value={formik.values.IbanNumber}
                    className="text-main-color border w-full mt-2 p-2"
                  />
                  {formik.touched.IbanNumber && formik.errors.IbanNumber ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.IbanNumber}</p>
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
                    <label className="mb-10">Language</label>
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
                  <label className="">Trade License</label>
                  <div onClick={() => {
                    TradeLicenseRef.current.click()
                  }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                    <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                    <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.TradeLicense ? formik.values.TradeLicense.name : "No File Choosen"}</p>
                  </div>

                  <input className="bg-main-color w-full md:w-[49.8%] mt-4 hidden md:mt-0 md:ml-2 text-white" ref={TradeLicenseRef} name="TradeLicense" type="file" onChange={(e) => {
                    formik.setFieldValue("TradeLicense", e.target.files[0])

                  }} />
                  {formik.touched.TradeLicense && formik.errors.TradeLicense ? (
                    <p className="mt-2 ml-1 text-red-500">{formik.errors.TradeLicense}</p>
                  ) : null}
                </div>
                <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
                  <h1 className="mt-4 font-poppins ml-8 font-semibold font-normal">Terms And Conditions</h1>
                  <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal">
                    <div className="flex flex-wrap flex-row justify-left ">
                      <i onClick={() => {
                        setMainAgree(prev => !prev)
                        formik.setFieldValue("OverAllAgree", !formik.values.OverAllAgree)
                      }} className={`pi rounded-full ${mainagree ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                    </div>
                    <p className="ml-3 w-[calc(100%-70px)]">
                      By submitting this form, you agree to our terms and conditions. <span className="underline cursor-pointer"></span></p>
                    {formik.touched.OverAllAgree && formik.errors.OverAllAgree ? (
                      <p className="mt-2 ml-8 text-red-500">{formik.errors.OverAllAgree}</p>
                    ) : null}
                  </div>
                  <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal">
                    <div className="flex flex-wrap flex-row justify-left ">
                      <i onClick={() => {
                        formik.setFieldValue("IsAgree", !formik.values.IsAgree)
                      }} className={`pi rounded-full ${formik.values.IsAgree ? "pi-check" : ""} w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px] `} />
                    </div>
                    <p className="ml-3 w-[calc(100%-70px)]">
                      I Agree to <span className="underline cursor-pointer">terms and conditions</span></p>
                  </div>
                  {formik.touched.IsAgree && formik.errors.IsAgree ? (
                    <p className="mt-2 ml-8 text-red-500">{formik.errors.IsAgree}</p>
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
