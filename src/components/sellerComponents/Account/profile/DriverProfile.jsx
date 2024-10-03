import React, { useRef, useState } from "react";
import { Cart } from "./assets";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import Axios from "axios";
import { Button } from "primereact/button";
import { Email } from "@mui/icons-material";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";
export default function DriverProfile({ isNotificationOpen, setIsNotificationOpen }) {
  let navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgdata, setImgData] = useState();
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [loaderShow, setLoaderShow] = useState(false);
  let UserData = JSON.parse(localStorage.getItem("userData")).data;
  const toast = useRef();
  const formik = useFormik({
    initialValues: {
      Id: UserData?.id,
      FullName: UserData?.fullName,
      Email: UserData?.email,
      FirstName: UserData?.fullName?.slice(
        0,
        UserData?.fullName?.lastIndexOf(" ")
      ),
      LastName: UserData?.fullName?.slice(
        UserData?.fullName?.lastIndexOf(" ") + 1
      ),
      Phone: UserData?.phone,
      Street: UserData?.street,
      HouseNo: UserData?.houseNo,
      Password: UserData?.password,
      City: UserData?.city,
      Country: UserData?.country,
      ZipCode: UserData?.zipCode,
      State: UserData?.state,
      DateOfBirth: new Date(UserData?.dob),
      ProfilePicture: "",
    },
    onSubmit: (values, { resetForm }) => {
      ;
      setLoaderShow(true);
      const formData = new FormData();
      let fullName;
      Object.keys(formik.values).map((item) => {
        if (
          formik.values[item] !== "" &&
          formik.values[item] !== undefined &&
          formik.values[item] !== null
        ) {
          if (item === "DateOfBirth") {
            formData.append(`${item}`, formik.values[item]?.toISOString());
          } else {
            if (
              item === "FirstName" ||
              item === "LastName" ||
              item === "FullName"
            ) {
            } else {
              formData.append(`${item}`, formik.values[item]);
            }
          }
        }
      });
      if (selectedFile !== null) {
        formData.append("ProfilePicture", selectedFile);
      }
      if (
        formik.values["FirstName"] !== undefined &&
        formik.values["FirstName"] !== "" &&
        formik.values.LastName !== undefined &&
        formik.values["LastName"] !== ""
      ) {
        formData.append(
          "FullName",
          formik.values?.FirstName + " " + formik.values?.LastName
        );
      }
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/Account/update`,
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
                  : "Profile Updated Sucessfully"}
              </p>
            ),
          });
          // resetForm()  
          Object.keys(formik.values).map(item => {
            if (
              formik.values[item] !== "" &&
              formik.values[item] !== undefined &&
              formik.values[item] !== null
            ) {
              if (
                item === "FirstName" ||
                item === "LastName" ||
                item === "DateOfBirth" ||
                item === "FullName"
              ) {
              }
              else {

                UserData[item.charAt(0).toLowerCase() + item.slice(1)] = formik.values[item]
              }
            }
          })
          UserData["dob"] = formik.values.DateOfBirth
          if (selectedFile !== undefined) {
            UserData["image"] = res?.data?.data?.image
          }
          UserData["fullName"] = formik.values?.FirstName + " " + formik.values?.LastName
          let obj = JSON.parse(localStorage.getItem("userData"))
          obj.data = UserData
          localStorage.setItem("userData", JSON.stringify(obj))

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
                  : "Profile Updation Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    },
  });
  return (
    <div className="w-full mt-4">
      <div className="w-full flex flex-wrap flex-row justify-between">
        <div className="w-[100%] md:w-[30%]   rounded-lg">
          <div className="border border-[#EFEEEB] p-2 rounded-lg">
            <div className="flex flex-row  flex-wrap justify-center w-full ">
              <div
                onClick={() => {
                  let input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = () => {
                    setSelectedFile(input.files[0]);
                    let reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = () => {
                      setImgData(reader.result);
                    };
                  };
                  input.click();
                }}
                className="w-[100px] cursor-pointer rounded-full h-[100px] flex flex-wrap flex-row  border border-main-color justify-center items-center overflow-hidden"
              >
                <img
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.target;
                    if (naturalWidth > naturalHeight) {
                      event.target.style = "width:auto;height:100%";
                    } else {
                      event.target.style = "width:100%;height:auto";
                    }
                  }}
                  src={`${imgdata
                      ? imgdata
                      : UserData?.image ? UserData?.image : ""
                    }`}
                />
                <i className="pi absolute mt-[60px] ml-[90px] text-main-color pi-camera" />
              </div>
            </div>
            <h1 className="text-center">{UserData?.fullName}</h1>

            <h1 className="text-center mt-4">{UserData?.roles[0]}</h1>
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/Login");
              }}
              className="flex cursor-pointer flex-row flex-wrap justify-center pb-2"
            >
              <p className="text-white bg-main-color rounded-md mt-2 p-1 w-[100px] text-center pl-2 pr-2 ">
                Logout
              </p>
            </div>
          </div>
          <div className="border border-[#EFEEEB] p-4 mt-2 rounded-lg">
            <h1 onClick={() => {
              navigate("/sidebar/sellerchatwithadmin")
            }} className="cursor-pointer mt-2 flex flex-wrap flex-row justify-left items-center ">
              <i className="pi pi-envelope mt-[1px] absolute"></i>
              <span className="ml-6 w-[150px]">Messages</span>{" "}
              <div className="bg-main-color ml-4 w-[25px] h-[25px] flex flex-wrap flex-row justify-center items-center text-white rounded-full">
                <p>0</p>
              </div>
            </h1>
            <h1 onClick={(event) => {
              event.stopPropagation()
              setIsNotificationOpen(true)
            }} className="mt-2 cursor-pointer flex flex-wrap flex-row justify-left items-center">
              <i className="pi pi-bell   mt-[4px] "></i>{" "}
              <span className="ml-2 w-[150px]">Notifications</span>
              <span className="bg-main-color ml-4 w-[25px] flex flex-wrap flex-row justify-center items-center h-[25px]  text-white rounded-full">
                <p>0</p>
              </span>
            </h1>
            <h1 onClick={() => {

              navigate("/sidebar/seller-reports")

            }} className="mt-2 cursor-pointer  flex flex-wrap flex-row justify-left items-center">
              <i className="pi pi-cart-minus mt-[4px] text-main-color text-[16px] ">
                <Cart />
              </i>
              <span className="ml-1 w-[150px]">Orders</span>
              <span className="bg-main-color ml-4 w-[25px] flex flex-wrap flex-row justify-center items-center h-[25px]  text-white rounded-full">
                <p>0</p>
              </span>
            </h1>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-[100%] border md:p-2 pb-2 md:w-[69%] mt-2 md:mt-0 border-[#EFEEEB] rounded-lg "
        >
          <div className="flex flex-wrap flex-row  w-full justify-center md:justify-between">
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">First Name</label>
              <InputText
                value={formik.values.FirstName}
                onChange={formik.handleChange}
                name="FirstName"
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="First Name"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Second Name</label>
              <InputText
                name="LastName"
                onChange={formik.handleChange}
                value={formik.values.LastName}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="Second Name"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Email</label>
              <InputText
                disabled
                name="Email"
                value={formik.values.Email}
                onChange={formik.handleChange}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="Email"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Phone Number</label>
              <InputText
                name="Phone"
                value={formik.values.Phone}
                onChange={formik.handleChange}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="Number"
              />
            </div>

            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Country</label>
              <InputText
                name="Country"
                onChange={formik.handleChange}
                value={formik.values.Country}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="Country"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">City</label>
              <InputText
                name="City"
                onChange={formik.handleChange}
                value={formik.values.City}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="City"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">State</label>
              <InputText
                name="State"
                onChange={formik.handleChange}
                value={formik.values.State}
                className="border w-full border-[#C1C1C1]  p-2 mt-2"
                placeholder="State"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Birthday</label>
              <Calendar
                name="DateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.DateOfBirth}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="BirthDay"
              />
            </div>
            <div className="mt-2  w-[95%] md:w-[49%]">
              <label className="block">Zip Code</label>
              <InputText
                name="ZipCode"
                onChange={formik.handleChange}
                value={formik.values.ZipCode}
                className="border w-full border-[#C1C1C1] text-main-color p-2 mt-2"
                placeholder="Zip Code"
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap flex-row md:justify-left justify-center  mt-4">
            <Button
              loading={loaderShow}
              disabled={loaderShow}
              label="Update"
              className="p-1 pl-2 pr-2  text-white bg-main-color"
              type="Submit"
            />
          </div>
        </form>
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />

      <h1 className="w-full text-center mt-14 ">Delete Account</h1>
    </div>
  );
}
