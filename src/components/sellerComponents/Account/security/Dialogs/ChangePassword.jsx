import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Axios from "axios"
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
export default function ChangePassword({ setChangeEmailVisibility }) {
  let navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [loaderShow, setLoaderShow] = useState(false);
  const toast = useRef();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email Is Required"),
    oldPassword: Yup.string().required("Old Password Is Required"),
    password: Yup.string().required("Password Is Required"),
    confirmPassword: Yup.string().required("Confirm Password Is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoaderShow((prev) => !prev);
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/Account/reset-password`,
        formik.values,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins text-main-color">
                {res?.data?.Message
                  ? res?.data?.Message
                  : "Password Changed Successfully "}
              </p>
            ),
          });
          resetForm();
          localStorage.clear();
          navigate("/Login");
          //setLoaderShow((prev) => !prev);
          //setChangeEmailVisibility((prev) => !prev);
        })
        .catch((error) => {
          setLoaderShow((prev) => !prev);
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins text-main-color">
                {error?.response?.data?.Message
                  ? error?.response?.data?.Message
                  : "Password Changing Failed"}
              </p>
            ),
          });
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-wrap flex-row font-poppins text-main-color justify-center"
    >
      <div className="w-[98%]">
        <label>Enter Current Email</label>
        <InputText
          name="email"
          value={formik?.values.email}
          placeholder="Enter Current Email"
          onChange={formik.handleChange}
          className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 w-full text-[14px]">
            {formik.errors.email}
          </p>
        ) : undefined}
      </div>
      <div className="mt-4 w-[98%]">
        <label>Old Password</label>
        <InputText
          name="oldPassword"
          value={formik?.oldPassword}
          placeholder="Enter Old Password"
          onChange={formik.handleChange}
          className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
        />
        {formik.touched.oldPassword && formik.errors.oldPassword ? (
          <p className="text-red-500 text-[14px]">
            {formik.errors.oldPassword}
          </p>
        ) : undefined}
      </div>
      <div className="mt-4 w-[98%]">
        <label>New Password</label>
        <InputText
          name="password"
          value={formik?.password}
          placeholder="Enter New Password"
          onChange={formik.handleChange}
          className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-[14px]">{formik.errors.password}</p>
        ) : undefined}
      </div>

      <div className="mt-4 w-[98%]">
        <label>Confirm New Password</label>
        <InputText
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder="Confirm New Password"
          className="rounded-md mt-2 border w-full border-[#C1C1C1] text-main-color p-2"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-red-500 text-[14px]">
            {formik.errors.confirmPassword}
          </p>
        ) : undefined}
      </div>
      <Button
        label="Change Password"
        loading={loaderShow}
        disabled={loaderShow}
        type="submit"
        className="mt-4 bg-main-color p-1 font-medium tracking-wide rounded-md text-white pl-4 pr-4"
      />
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
