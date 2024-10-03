import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import Axios from "axios";
import RequestDetails from "../Request_Details/Request_Details";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../../../Loaders/Components";
import { Toast } from "primereact/toast";
import moment from "moment/moment";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
export default function RequestCard({ setHideStat }) {
  const [rowData, setRowData] = useState()
  const [vendor, setVendor] = useState(true);
  const [rider, setRider] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  let toast = useRef();
  let [requestData, setRequestData] = useState([]);
  const [approveDialog, setApproveDialog] = useState(false);
  const [refreshRequest, setRefreshRequest] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const validationSchema = Yup.object().shape({
    confirmPassword: Yup.string().required("Confirm Password Is Required"),
    password: Yup.string().required("Password Is Required"),
  });
  const formik1 = useFormik({
    initialValues: {
      id: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setDialogLoader((prev) => !prev);
      Axios.put(
        `${vendor
          ? `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/Approve`
          : `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/Approve`
        }`,
        formik1.values,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          setDialogLoader((prev) => !prev);
          setApproveDialog((prev) => !prev);
          setRefreshRequest((prev) => !prev);
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.response?.data?.Message
                  ? res?.response?.data?.Message
                  : `${vendor
                    ? "Vendor Request Approved Successfully"
                    : "Rider Request Approved Successfully"
                  }`}
              </p>
            ),
          });
        })
        .catch((err) => {
          setDialogLoader((prev) => !prev);
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {err?.response?.data?.Message
                  ? err?.response?.data?.Message
                  : `${vendor
                    ? "Vendor Request Approval Failed"
                    : "Rider Request Approval Failed"
                  }`}
              </p>
            ),
          });
        });
    },
  });
  let validationSchema2 = Yup.object().shape({
    reason: Yup.string().required("Reason Is Required"),
  });
  const formik2 = useFormik({
    initialValues: {
      id: "",
      reason: "",
    },
    validationSchema2,
    onSubmit: (values, { resetForm }) => {
      setDialogLoader((prev) => !prev);
      Axios.post(
        `${vendor
          ? `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/Reject`
          : `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/Reject`
        }`,
        formik2.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }
      )
        .then((res) => {
          setDialogLoader((prev) => !prev);
          setRejectDialog((prev) => !prev);

          setRefreshRequest((prev) => !prev);
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.response?.data?.Message
                  ? res?.response?.data?.Message
                  : `${vendor
                    ? "Vendor Request Rejected Successfully"
                    : "Rider Request Rejected Successfully"
                  }`}
              </p>
            ),
          });
        })
        .catch((err) => {
          setDialogLoader((prev) => !prev);
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {err?.response?.data?.Message
                  ? err?.response?.data?.Message
                  : `${vendor
                    ? "Vendor Request Rejection Failed"
                    : "Rider Request Rejection Failed"
                  }`}
              </p>
            ),
          });
        });
    },
  });

  let steps = [
    { label: "Step1", value: true },
    { label: "Step2", value: true },
    { label: "Step3", value: true },
    { label: "Step4", value: true },
  ];
  let [firstRender, setFirstRender] = useState(false)
  useEffect(() => {


    if (vendor) {
      Axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/Requests`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          setLoader(false);
          setRequestData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    } else {
      Axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartners/Requests`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          setLoader(false);
          setRequestData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    }
  }, [vendor, rider, refreshRequest]);

  return (
    <div className="w-full text-main-color ">
      {!viewDetail ? (
        <>
          <div className="flex flex-wrap mb-4 flex-row justify-left gap-2">
            <Button
              onClick={() => {
                setRider(false);
                setVendor(true);
              }}
              className={`${vendor
                ? "bg-main-color text-white"
                : "border border-main-color text-main-color"
                } w-full md:w-auto p-1 pl-2 pr-2`}
              label="Vendor Requests"
            />

            <Button
              onClick={() => {
                setVendor(false);
                setRider(true);
              }}
              className={`${rider
                ? "bg-main-color text-white"
                : "border border-main-color text-main-color"
                } p-1 w-full md:w-auto pl-2 pr-2`}
              label="Ride Partner Requests"
            />
          </div>
          <div className="flex flex-row  flex-wrap justify-between">
            {loader ? (
              <div className="flex w-full flex-wrap flex-row mt-10 justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {requestData.map((item) => {
                  return (
                    <div className="w-full md:w-[49%]  mt-4 shadow-sm mt-2 bg-[#F2F2F2] rounded-2xl p-4 ">
                      <div className="flex  mt-2 flex-row items-center flex-wrap justify-between">
                        <div className="w-[40px] flex flex-wrap justify-center flex-row overflow-hidden items-center h-[40px] rounded-full">
                          <img
                            onLoad={(event) => {
                              const { naturalWidth, naturalHeight } =
                                event.target;
                              if (naturalWidth > naturalHeight) {
                                event.target.style = "width:auto;height:100%";
                              } else {
                                event.target.style = "width:100%;height:auto";
                              }
                            }}
                            onError={(e) => {
                              e.target.onerror = null; // Prevents infinite loop if fallback image is also not found
                              e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFJAS6pR2iFBvsBnG97MZh7Emdjx1FFYXdA&s";
                            }}
                            src={item?.image ? item?.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFJAS6pR2iFBvsBnG97MZh7Emdjx1FFYXdA&s"}
                          />
                        </div>
                        <h1>
                          {vendor
                            ? item.name
                            : `${item.firstName} ${item.lastName}`}
                        </h1>
                        <h1>{item.about}</h1>


                        <div className="flex p-2 rounded-md mt-4 flex-wrap bg-[#F1E9FE] w-full flex-row justify-between">
                          <h1 className="w-full text-center font-poppins">{moment(item?.created).format('DD MMMM YYYY')}</h1>
                          {vendor ? (
                            <>
                              {" "}
                              <div className="w-[100px] items-center flex flex-wrap flex-row justify-left gap-2">
                                <i className={`pi  ${item?.isProvidingRide ? "pi-check" : ""} border border-main-color w-[20px] h-[20px] pb-[4px] pt-[4px]  pl-[2px] pr-[2px] text-[12px] rounded-full`}></i>
                                <h1>Delivery</h1>
                              </div>
                              <div className="w-[120px] items-center flex flex-wrap flex-row justify-left gap-2">
                                <i className={`pi ${item?.isProvidingRide ? "pi-check" : ""} border border-main-color w-[20px] h-[20px] pb-[4px] pt-[4px]  pl-[2px] pr-[2px] text-[12px] rounded-full`}></i>
                                <h1>Free Ride</h1>
                              </div>
                            </>
                          ) : (
                            <div className="  items-center flex flex-wrap flex-row justify-left">
                              <i
                                className={`pi mr-2 ${item?.tradeLicense ? "pi-check" : ""
                                  } border border-main-color w-[20px] h-[20px] pb-[4px] pt-[4px]  pl-[2px] pr-[2px] text-[12px] rounded-full`}
                              ></i>
                              <h1>Trade License</h1>
                            </div>
                          )}
                        </div>
                        <div className="p-1 flex bg-[#F1E9FE] w-full flex-row flex-wrap justify-between">
                          {steps.map((item) => {
                            return (
                              <div className="flex mt-2 flex-row   flex-wrap items-center justify-evenly">
                                <Button
                                  className="text-white bg-main-color text-[14px] pl-1 pr-1"
                                  label={`${item.label}`}
                                />
                                {item.label !== "Step4" ? (
                                  <i className="pi pi-arrow-right ml-4 mr-4 "></i>
                                ) : undefined}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-4 w-[full]">
                        <h1>
                          {item.description}
                          <span
                            onClick={() => {
                              setRowData(item)
                              setViewDetail((prev) => !prev);
                              setHideStat(true);
                            }}
                            className="ml-2 cursor-pointer underline font-normal"
                          >
                            Details
                          </span>
                        </h1>
                      </div>
                      <div className="flex flex-row flex-wrap justify-between items-center mt-4 ">
                        <div className="w-[40px] flex flex-wrap justify-center flex-row overflow-hidden items-center h-[40px] rounded-full">
                          <img
                            onLoad={(event) => {
                              const { naturalWidth, naturalHeight } =
                                event.target;
                              if (naturalWidth > naturalHeight) {
                                event.target.style = "width:auto;height:100%";
                              } else {
                                event.target.style = "width:100%;height:auto";
                              }
                            }}
                            onError={(e) => {
                              e.target.onerror = null; // Prevents infinite loop if fallback image is also not found
                              e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFJAS6pR2iFBvsBnG97MZh7Emdjx1FFYXdA&s";
                            }}
                            src={item?.image ? item?.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFJAS6pR2iFBvsBnG97MZh7Emdjx1FFYXdA&s"}
                          />
                        </div>
                        <Button
                          onClick={() => {
                            formik1.values.id = item?.id;
                            setApproveDialog((prev) => !prev);
                          }}
                          className="bg-main-color text-white p-1 pl-2 pr-2"
                          label="Approve"
                        ></Button>
                        <Button
                          onClick={() => {
                            formik2.values.id = item?.id;
                            setRejectDialog((prev) => !prev);
                          }}
                          className=" text-white border bg-main-color p-1 pl-2 pr-2"
                          label="Reject"
                        ></Button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
            <Dialog
              className="font-poppins"
              header="Approve Request"
              headerClassName="text-main-color"
              visible={approveDialog}
              onHide={() => {
                formik1.values.password = "";
                formik1.values.confirmPassword = "";
                formik1.values.id = "";
                setApproveDialog((prev) => !prev);
              }}
            >
              <form onSubmit={formik1.handleSubmit}>
                <div className="w-full flex flex-wrap flex-row justify-between">
                  <div className="w-full mt-2 md:mt-0 md:w-[49%]">
                    <label className="text-main-color font-poppins font-medium  ">Password</label>
                    <InputText
                      className="mt-2 w-full text-[#AFAFAF] border rounded-md p-1 "
                      placeholder="Password"
                      value={formik1.values.password}
                      onChange={formik1.handleChange}
                      name="password"
                    />
                    {formik1.touched.password && formik1.errors.password ? (
                      <p className="text-red-500 w-full mt-1 text-[14px]">
                        {formik1.errors.password}
                      </p>
                    ) : undefined}
                  </div>
                  <div className="w-full mt-2 md:mt-0 md:w-[49%]">
                    <label className="text-main-color  ">Confirm Password</label>
                    <InputText
                      className="mt-2  text-[#AFAFAF] border  w-full p-1"
                      placeholder="Confirm Password"
                      value={formik1.values.confirmPassword}
                      onChange={formik1.handleChange}
                      name="confirmPassword"
                    />
                    {formik1.touched.confirmPassword &&
                      formik1.errors.confirmPassword ? (
                      <p className="text-red-500 w-full mt-1 text-[14px]">
                        {formik1.errors.confirmPassword}
                      </p>
                    ) : undefined}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap flex-row justify-center gap-4">
                  <Button
                    type="submit"
                    loading={dialogLoader}
                    disabled={dialogLoader}
                    label="Yes"
                    className="text-white bg-main-color p-1 pl-4 pr-4"
                  />

                  <Button
                    label="No" type="button"
                    onClick={() => {
                      setApproveDialog(false)
                    }}
                    className="text-white bg-main-color p-1 pl-5 pr-5"
                  />
                </div>
              </form>
            </Dialog>
            <Dialog
              className="font-poppins"
              header="Rejection Confirmation"
              headerClassName="text-main-color"
              visible={rejectDialog}
              onHide={() => {
                formik2.values.reason = "";
                formik2.setFieldValue("reason", "");
                setRejectDialog((prev) => !prev);
              }}
            >
              <form onSubmit={formik2.handleSubmit}>
                <div className="w-full">
                  <label className="text-main-color  ">Rejection Reason</label>
                  <InputText
                    className="mt-2 w-full text-[#AFAFAF] border  p-1 "
                    placeholder="Rejection Reason"
                    value={formik2.values.reason}
                    onChange={(e) => {
                      formik2.setFieldValue("reason", e.target.value)
                    }}
                    name="reason"
                  />
                  {formik2.touched.reason && formik2.errors.reason ? (
                    <p className="text-red-500 w-full mt-1 text-[14px]">
                      {formik2.errors.reason}
                    </p>
                  ) : undefined}
                </div>
                <div className="mt-4 flex flex-wrap flex-row justify-center gap-4">
                  <Button
                    type="submit"
                    loading={dialogLoader}
                    disabled={dialogLoader}
                    label="Yes"
                    className="text-white bg-main-color p-1 w-[70px] pl-2 pr-2"
                  />

                  <Button
                    label="No"
                    type="button"
                    onClick={() => {
                      setRejectDialog(false)
                    }}
                    className="text-white bg-main-color w-[70px]  p-1 pl-2 pr-2"
                  />
                </div>
              </form>
            </Dialog>
          </div>
        </>
      ) : (
        <RequestDetails
          vendor={vendor}
          rider={rider}
          details={rowData}
          setViewDetail={setViewDetail}

          setHideStat={setHideStat}
        />
      )}
    </div>
  );
}
