import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useState } from "react";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import ViewTable from "./components/common/TableView";
import * as Yup from "yup";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import Loader from "../../../../../../../../Loaders/Components";
import { Category } from "@mui/icons-material";
import { Dialog } from "primereact/dialog";
import AddDrink from "./components/common/components/add/AddDrink";
import MainAddProduct from "./components/common/components/MainProduct/MainAddProduct";
export default function Menu({
  resturantDetailView
}) {
  const [addProductDialog, setAddProductDialog] = useState(false)
  const [refreshProduct, setRefreshProduct] = useState(false)
  const [dialogLoader, setDialogLoader] = useState(false)
  const categoryPicRef = useRef()
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const toast = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [renderFirstTime, setRenderFirstTime] = useState(true)
  const validationSchema = Yup.object().shape({

    Title: Yup.string().required("Title Is Required"),
    CategoryPicture: Yup.string().required("Category Picture Is Required"),
  });
  const formik1 = useFormik({
    initialValues: {
      Title: "",
      CategoryPicture: "",
      MainCategory: 0,
      VendorShopId: resturantDetailView?.id,
      ImagePath: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      let formData = new FormData()
      for (const key in values) {
        formData.append(key, values[key])
      }
      setDialogLoader((prev) => !prev);
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ProductCategory`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          setDialogLoader((prev) => !prev);
          setDialogVisibility(prev => !prev)
          setRefreshMenuItem(prev => !prev)
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.response?.data?.Message
                  ? res?.response?.data?.Message
                  : `${"Product Category Added Successfully"
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
                  : `${"Product Category Addition Failed"
                  }`}
              </p>
            ),
          });
        });
    },
  });
  const [loading, setLoading] = useState(true)
  const [menuItem, setMenuItems] = useState()
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [itemId, setItemId] = useState()
  const [loader, setLoader] = useState(false)
  const [refreshMenuItem, setRefreshMenuItem] = useState(false)
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/ProductCategory`, { params: { VendorShopId: resturantDetailView?.id }, headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Fetched MenuItems"}</p> });
      let items = res?.data?.data;

      if (renderFirstTime) {
        items.some(item2 => {
          if (!item2?.isDefault) {
            item2.active = true
            setItemId(item2.id)
            return true
          }

        })
        setRenderFirstTime(false)
      }

      setMenuItems(items)
      setLoader(false)
      setLoading(false)
    }).catch((error) => {
      setLoader(false)
      setLoading(false)
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Menu Items Fetching Failed"}</p> });

    })
  }, [refreshMenuItem])
  const [productImgsrc, setProductImgsrc] = useState()
  return (
    <div className="text-main-color overflow-y-auto  ml-[-20px] w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]    z-20 bg-white p-3   top-[150px]">
      {
        loading ? <div className="flex flex-wrap w-full mt-[20%] flex-row justify-center items-center h-[100vh-200px]">
          <Loader />
        </div> : <>
          <div className="flex flex-wrap flex-row justify-left pl-2  gap-2 mt-[0px] w-full">

            <Button label="Add New Category" onClick={() => {
              setDialogVisibility(prev => !prev)
            }} icon="pi pi-plus" className="bg-main-color  w-full md:w-auto text-white   p-1 pl-2 pr-2 " />
            <Button label="Add New Product" onClick={() => {
              setAddProductDialog(prev => !prev)
            }} icon="pi pi-plus" className="w-full md:w-auto bg-main-color text-white  p-1 pl-2 pr-2 " />
          </div>
          <div className="flex flex-wrap flex-row mt-[4px] justify-left">
            {
              menuItem?.map(item => {
                return (
                  <>
                    {
                      menuItem?.length > 3 && !item?.isDefault ?
                        <Button
                          onClick={() => {
                            // Create a new array with updated items
                            const updatedItems = menuItem.map((menuItem, index) => {
                              if (menuItem.title === item.title) {
                                setCurrentIndex(index)
                                return { ...menuItem, active: true };
                              } else {
                                return { ...menuItem, active: false };
                              }
                            });
                            // Update the state with the new array
                            setMenuItems(updatedItems);
                            setItemId(item.id)
                          }}
                          className={`mt-2  border border-main-color w-[150px] p-1 pr-2 pl-2   ml-2 ${item.active === true ? "bg-main-color text-white " : "bg-white text-main-color "}`} label={`${item.title}`} />
                        : undefined}</>)
              })


            }
          </div>
          <ViewTable refreshProduct={refreshProduct} VendorShopId={resturantDetailView?.id} itemId={itemId} />
        </>}

      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none 
    z-50 mt-[60px]
  "   ref={toast} />
      <Dialog
        className="font-poppins md:w-[60%] w-[95%]"
        header="Add Product Category"
        headerClassName="text-main-color"
        visible={dialogVisibility}
        onHide={() => {
          formik1.values.CategoryPicture = "";
          formik1.values.Title = "";
          setProductImgsrc()
          setDialogVisibility((prev) => !prev);
        }}
      >
        <form onSubmit={formik1.handleSubmit}>
          <div className="w-full flex flex-wrap flex-row justify-between">
            {productImgsrc ? <div className="flex w-full  flex-wrap flex-row justify-center items-center ">
              <div className="overflow-hidden w-[200px]  mt-4  rounded-sm h-[200px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >

                <img onError={(e) => {
                  e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
                }} onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.target;
                  if (naturalWidth > naturalHeight) {
                    event.target.style = "width:auto;height:100%"

                  }
                  else {
                    event.target.style = "width:100%;height:auto"

                  }

                }} src={productImgsrc} />
              </div>

            </div> : ""
            }
            <div className="w-[49%]">
              <label className="text-main-color ">Title</label>
              <InputText
                className="mt-2 w-full text-main-color border border-main-color p-1 "
                placeholder="Title"
                value={formik1.values.Title}
                onChange={formik1.handleChange}
                name="Title"
              />
              {formik1.touched.Title && formik1.errors.Title ? (
                <p className="text-red-500 w-full mt-1 text-[14px]">
                  {formik1.errors.Title}
                </p>
              ) : undefined}
            </div>
            <div className="w-[49%]">
              <label className="text-main-color ">Category Picture </label>
              <div onClick={() => {
                categoryPicRef.current.click()
              }} className="  cursor-pointer text-main-color mt-2 md:w-[100%]  w-full text-white flex flex-wrap flex-row justify-left gap-2 ">
                <p className="bg-main-color text-white rounded-lg font-poppins h-[35px] tracking-wide p-1"> Choose File</p>
                <p className="text-main-color w-[calc(100%-150px)]"> {formik1.values.CategoryPicture ? formik1.values.CategoryPicture.name : "No File Choosen"}</p>
              </div>
              <InputText
                ref={categoryPicRef}
                className="mt-2  text-main-color hidden border border-[#AFAFAF] w-full p-1"

                onChange={(e) => {
                  formik1.setFieldValue("CategoryPicture", e.target.files[0])
                  let reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onload = () => {
                    setProductImgsrc(reader.result)
                  }
                }}
                name="CategoryPicture"
                type="file"
              />
              {formik1.touched.CategoryPicture &&
                formik1.errors.CategoryPicture ? (
                <p className="text-red-500 w-full mt-1 text-[14px]">
                  {formik1.errors.CategoryPicture}
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
              className="text-white bg-main-color p-1 pl-2 pr-2"
            />

            <Button
              label="No"
              type="button"
              onClick={() => {
                formik1.values.CategoryPicture = "";
                formik1.values.Title = "";
                setProductImgsrc()
                setDialogVisibility(prev => !prev)
              }}
              className="text-white bg-main-color p-1 pl-2 pr-2"
            />
          </div>
        </form>
      </Dialog>
      <Dialog header="Add New Product" headerClassName="text-main-color" className=" w-[98%] md:w-[90%]" visible={addProductDialog} onHide={() => { setAddProductDialog(prev => !prev) }}>
        <MainAddProduct setRefreshProduct={setRefreshProduct} setAddProductDialog={setAddProductDialog} vendorId={resturantDetailView?.id} />
      </Dialog>
    </div>
  );
}
