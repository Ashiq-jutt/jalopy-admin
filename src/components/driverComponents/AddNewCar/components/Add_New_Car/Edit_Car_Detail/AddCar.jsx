import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import Axios from "axios";
import { Calendar } from "primereact/calendar";
import { Email, Password } from "@mui/icons-material";

export default function AddCar({ setShowCarEdit }) {
  const toast = useRef();
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const idRef = useRef();
  const [loaderShow, setLoaderShow] = useState(false);
  const licenseRef = useRef();
  const transportRef = useRef()
  const imagRef = useRef()
  const [freezeDays, setFreezeDays] = useState(0)
  const [monthly, setMonthly] = useState(false)
  const [weekly, setWeekly] = useState(false)
  const [hourly, setHourly] = useState(false)
  const [tripBase, setTripBase] = useState(false)
  const [monthlyAmount, setMontlyAmount] = useState()
  const [weeklyAmount, setWeeklyAmount] = useState()
  const [hourlyAmount, setHourlyAmount] = useState()
  const [tripPercentage, setTripPercentage] = useState()
  {
    /*  lastName:Yup.string().required("Last Name Is Required"),
    handyNo: Yup.string().required("handyNo Is Required"),
  name: Yup.string().required("Name Is Required"),
    seats: Yup.string().required("Seats Is Required"),
    lastName: Yup.string().required("Last Name Is Required"),
    registrationDate: Yup.string().required("Registration Date Is Required"),   
    handyNo:Yup.string().required("Handy No Is Required"),   
     licenseClass:Yup.string().required("License Class Is Required"),   
      dob:Yup.string().required("Made Year Is Required"),     
      email:Yup.string().required("Email Is Required"),       
      houseNo:Yup.string().required("House No Is Required"), 
      city:Yup.string().required("City Is Required"), 
      zipCode:Yup.string().required("Zip Code Is Required") ,
      state:Yup.string().required("State Is Required"), 
      country:Yup.string().required("Country Is Required"),
       street:Yup.string().required("Street Is Required"),    
       Ausweis:Yup.string().required("Ausweis Is Required"),   
       Führschein:Yup.string().required("Führschein Is Required") , 
       Anmeldung:Yup.string().required("Anmeldung Is Required"),
  pSchein:Yup.string().required("Anmeldung Is Required")   */
  }

  const registerationRef = useRef();
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name Is Required"),
    Dob: Yup.string().required("Dob Is Required"),
    Street: Yup.string().required("Street Is Required"),
    HouseNo: Yup.string().required("House No Is Required"),
    LastName: Yup.string().required("Last Name Is Required"),
    City: Yup.string().required("City Is Required"),
    Country: Yup.string().required("Country Is Required"),
    ZipCode: Yup.string().required("ZipCode Is Required"),
    State: Yup.string().required("State Is Required"),
    Email: Yup.string().required("Email Is Required"),
    IdCard: Yup.string().required("ID Card Is Required"),
    License: Yup.string().required("License Is Required"),
    Password: Yup.string().required("Password Is Required"),
    PhoneNumber: Yup.string().required("Phone Number Is Required"),
    TransportLicense: Yup.string().required("Transport License Is Required"),
    Registeration: Yup.string().required("Registeration File Is Required"),
    RegisterationDate: Yup.string().required("Registeration Date  Is Required"),
    LicenseClass: Yup.string().required("License Class Is Required"),
    Image: Yup.string().required("Image Is Required")
  });
  const formik = useFormik({
    initialValues: {
      FullName: "",
      Name: "",
      LastName: "",
      City: "",
      Email: "",
      IdCard: "",
      License: "",
      Password: "",
      Registeration: "",
      RegisterationDate: "",
      LicenseClass: "",
      Dob: "",
      Street: "",
      HouseNo: "",
      City: "",
      Password: "",
      PhoneNumber: "",
      Country: "",
      ZipCode: "",
      State: "",
      TransportLicense: "",
      Image: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      ;
      setLoaderShow(true);
      const formData = new FormData();
      formik.values.FullName = formik.values.Name + " " + formik.values.LastName
      Object.keys(formik.values).map((item) => {
        if (item === "RegisterationDate" || item === "Dob") {
          formData.append(`${item}`, formik.values[item].toISOString());
        } else {
          if (item === "License" && formik.values[item] !== "") {
            formData.append(`${item}`, licenseRef.current.files[0]);
          } else if (item === "Registeration" && formik.values[item] !== "") {
            formData.append(`${item}`, registerationRef.current.files[0]);
          } else if (item === "IdCard" && formik.values[item] !== "") {
            formData.append(`${item}`, idRef.current.files[0]);
          }
          else if (item === "TransportLicense" && formik.values[item] !== "") {
            formData.append(`${item}`, transportRef.current.files[0])
          }
          else if (item === "Image" && formik.values[item] !== "") {
            formData.append(`${item}`, imagRef.current.files[0])
          }
          else {
            formData.append(`${item}`, formik.values[item]);
          }
        }
      });
      Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/Create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Driver Created Sucessfully"}
              </p>
            ),
          });
          resetForm();
          setLoaderShow(false);

          licenseRef.current.value = "";
          registerationRef.current.value = "";
          idRef.current.value = "";
          transportRef.current.value = ""
          imagRef.current.value = ""
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
                  : "Driver Creation Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <form>
        <div className="mt-4 text-main-color mb-10 flex  font-poppins font-normal items-left flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">First Name</label>
            <InputText
              name="Name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Name && formik.errors.Name ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.Name}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Last Name</label>
            <InputText
              name="LastName"
              placeholder="LastName"
              onChange={formik.handleChange}
              value={formik.values.LastName}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.LastName && formik.errors.LastName ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.LastName}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">D.O.B</label>
            <Calendar
              name="Dob"
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.Dob}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Dob && formik.errors.Dob ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Dob}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">License Class</label>
            <InputText
              name="LicenseClass"
              placeholder="License Class"
              onChange={formik.handleChange}
              value={formik.values.LicenseClass}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.LicenseClass && formik.errors.LicenseClass ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.LicenseClass}
              </p>
            ) : undefined}
          </div>

          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Password</label>
            <InputText
              name="Password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.Password}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Password && formik.errors.Password ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.Password}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Phone Number</label>
            <InputText
              name="PhoneNumber"
              keyfilter="int"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              value={formik.values.PhoneNumber}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.PhoneNumber}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Email</label>
            <InputText
              name="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Email && formik.errors.Email ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Email}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Street</label>
            <InputText
              name="Street"
              placeholder="Street"
              onChange={formik.handleChange}
              value={formik.values.Street}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Street && formik.errors.Street ? (
              <p className="text-red-500 text-[14px]">{formik.errors.Street}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">House No</label>
            <InputText
              name="HouseNo"
              placeholder="House No"
              onChange={formik.handleChange}
              value={formik.values.HouseNo}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.HouseNo && formik.errors.HouseNo ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.HouseNo}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Zip Code</label>
            <InputText
              name="ZipCode"
              placeholder="Zip Code"
              onChange={formik.handleChange}
              value={formik.values.ZipCode}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.ZipCode && formik.errors.ZipCode ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.ZipCode}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">City</label>
            <InputText
              name="City"
              placeholder="City"
              onChange={formik.handleChange}
              value={formik.values.City}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.City && formik.errors.City ? (
              <p className="text-red-500 text-[14px]">{formik.errors.City}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">State</label>
            <InputText
              name="State"
              placeholder="State"
              onChange={formik.handleChange}
              value={formik.values.State}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.State && formik.errors.State ? (
              <p className="text-red-500 text-[14px]">{formik.errors.State}</p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Country</label>
            <InputText
              name="Country"
              placeholder="Country"
              onChange={formik.handleChange}
              value={formik.values.Country}
              className="rounded-md text-[rgba(0,0,0,.5)] border w-full mt-2 p-2"
            />
            {formik.touched.Country && formik.errors.Country ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.Country}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Registration Date</label>
            <Calendar
              name="RegisterationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.RegisterationDate}
              className="text-[rgba(0,0,0,.5)] border rounded-md font-poppins w-full mt-2 p-2"
            />
            {formik.touched.RegisterationDate &&
              formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[14px]">
                {formik.errors.RegisterationDate}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Freeze (Days)</label>
            <InputText

              placeholder="Freeze For Days"
              onChange={(e) => {
                setFreezeDays(e.target.value)
              }}
              value={freezeDays}
              className="text-main-color border rounded-md w-full mt-2 p-2"
            />
            {formik.touched.Country && formik.errors.Country ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.Country}
              </p>
            ) : undefined}
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[33%] lg:w-[33%]  ">
            <label className="">Driver Payment Managment</label>
            <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">

              <i onClick={() => {
                setMonthly(prev => !prev)
                setWeekly(false)
                setHourly(false)
                setTripBase(false)
              }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${monthly ? "pi-check" : ""}`}></i>
              <p className="  text-main-color">Monthly</p>
            </div>
            {
              monthly ?
                <div className="mt-2">
                  <label className="w-full mt-1">Monthly Payment (€)</label>
                  <InputText

                    placeholder="Monthly Payment"
                    onChange={(e) => {
                      setMontlyAmount(e.target.value)
                    }}
                    value={monthlyAmount}
                    className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
                  />
                </div>
                : undefined
            }
            <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">

              <i onClick={() => {
                setMonthly(false)
                setWeekly(prev => !prev)
                setHourly(false)
                setTripBase(false)
              }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${weekly ? "pi-check" : ""}`}></i>
              <p className="  text-main-color">Weekly</p>
            </div>
            {
              weekly ?
                <div className="mt-2">
                  <label className="w-full mt-1">Weekly Payment (€)</label>
                  <InputText

                    placeholder="Weekly Payment"
                    onChange={(e) => {
                      setWeeklyAmount(e.target.value)
                    }}
                    value={weeklyAmount}
                    className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
                  />
                </div>
                : undefined
            }
            <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">

              <i onClick={() => {
                setMonthly(false)
                setWeekly(false)
                setHourly(prev => !prev)
                setTripBase(false)
              }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${hourly ? "pi-check" : ""}`}></i>
              <p className="  text-main-color">Hourly</p>
            </div>
            {
              hourly ?
                <div className="mt-2">
                  <label className="w-full mt-1">Hourly Payment (€)</label>
                  <InputText

                    placeholder="Hourly Payment"
                    onChange={(e) => {
                      setHourlyAmount(e.target.value)
                    }}
                    value={hourlyAmount}
                    className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
                  />
                </div>
                : undefined
            }
            <div className="w-[90%]  flex flex-wrap flex-row justify-left items-center gap-2 mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">

              <i onClick={() => {
                setMonthly(false)
                setWeekly(false)
                setHourly(false)
                setTripBase(prev => !prev)
              }} className={`border cursor-pointer pl-[3px] pt-[3px] border-main-color w-[25px] h-[25px]  text-main-color rounded-full     pi ${tripBase ? "pi-check" : ""}`}></i>
              <p className="  text-main-color">Trip Base</p>
            </div>
            {
              tripBase ?
                <div className="mt-2">
                  <label className="w-full mt-1">Trip Percentage (%)</label>
                  <InputText

                    placeholder="Trip Percentage"
                    onChange={(e) => {
                      setTripPercentage(e.target.value)
                    }}
                    value={tripPercentage}
                    className="text-main-color border block border-main-color w-[200px] mt-1 p-1"
                  />
                </div>
                : undefined
            }
            {formik.touched.RegisterationDate &&
              formik.errors.RegisterationDate ? (
              <p className="text-red-500 text-[12px]">
                {formik.errors.RegisterationDate}
              </p>
            ) : undefined}
          </div>


          <h1 className="font-semibold tracking-wide  font-poppins w-full pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] mt-4 ">
            Drivers Documents
          </h1>

          <div className="flex flex-wrap flex-row justify-center w-full items-center ">
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>Image</p>
              </div>
              <div onClick={() => {
                imagRef.current.click()
              }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                <p className="text-main-color"> {formik.values.Image ? formik.values.Image.name : "No File Choosen"}</p>
              </div>
              <input
                ref={imagRef}
                className="hidden text-main-color text-white mt-4  md:w-auto w-full bg-main-color"
                name="TransportLicense"
                onChange={(e) => {
                  formik.setFieldValue("Image", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.Image && formik.errors.Image ? (
                <p className="text-red-500 w-full md:w-auto md:ml-4 mt-4 text-[14px]">
                  {formik.errors.Image}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>ID Card </p>
              </div>
              <div onClick={() => {
                idRef.current.click()
              }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                <p className="text-main-color"> {formik.values.IdCard ? formik.values.IdCard.name : "No File Choosen"}</p>
              </div>
              <input
                ref={idRef}
                className="hidden text-main-color text-white mt-4 md:w-auto w-full bg-main-color"
                name="IdCard"
                onChange={(e) => {
                  formik.setFieldValue("IdCard", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.IdCard && formik.errors.IdCard ? (
                <p className="text-red-500 w-full md:w-auto md:ml-4 mt-4 text-[14px]">
                  {formik.errors.IdCard}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>License</p>
              </div>
              <div onClick={() => {
                licenseRef.current.click()
              }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                <p className="text-main-color"> {formik.values.License ? formik.values.License.name : "No File Choosen"}</p>
              </div>
              <input
                ref={licenseRef}
                className=" hidden text-main-color text-white mt-4 md:w-auto w-full bg-main-color"
                name="License"
                onChange={(e) => {
                  formik.setFieldValue("License", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.License && formik.errors.License ? (
                <p className="text-red-500 w-full md:w-auto md:ml-4 mt-4 text-[14px]">
                  {formik.errors.License}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>Registeration</p>
              </div>
              <div onClick={() => {
                registerationRef.current.click()
              }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                <p className="text-main-color"> {formik.values.Registeration ? formik.values.Registeration.name : "No File Choosen"}</p>
              </div>
              <input
                ref={registerationRef}
                className="hidden text-main-color text-white mt-4 md:w-auto w-full bg-main-color"
                name="Registeration"
                onChange={(e) => {
                  formik.setFieldValue("Registeration", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.Registeration && formik.errors.Registeration ? (
                <p className="text-red-500 mt-4 w-full md:w-auto md:ml-4 text-[14px]">
                  {formik.errors.Registeration}
                </p>
              ) : undefined}
            </div>
            <div className="w-full flex flex-wrap flex-row  pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] items-center ">
              <div className=" w-[90%] md:w-[170px] mt-4 flex flex-wrap flex-row items-center  justify-left">
                <p>Public Transport License</p>
              </div>
              <div onClick={() => {
                transportRef.current.click()
              }} className="  cursor-pointer text-main-color mt-4 md:w-auto w-full text-white flex flex-wrap flex-row justify-left gap-2 items-center">
                <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
                <p className="text-main-color"> {formik.values.TransportLicense ? formik.values.TransportLicense.name : "No File Choosen"}</p>
              </div>
              <input
                ref={transportRef}
                className="hidden text-main-color text-white mt-4  md:w-auto w-full bg-main-color"
                name="TransportLicense"
                onChange={(e) => {
                  formik.setFieldValue("TransportLicense", e.target.files[0]);
                }}
                type="file"
              />
              {formik.touched.TransportLicense && formik.errors.TransportLicense ? (
                <p className="text-red-500 w-full md:w-auto md:ml-4 mt-4 text-[14px]">
                  {formik.errors.TransportLicense}
                </p>
              ) : undefined}
            </div>

          </div>
        </div>
      </form>
      <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Save And Submit"
          loading={loaderShow}
          disabled={loaderShow}
          type="submit"
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </form>
  );
}
