import { useRef, useState, useEffect } from "react"
import { useFormik } from "formik"
import { InputText } from "primereact/inputtext"
import Axios from "axios"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import * as Yup from "yup";
import { Toast } from "primereact/toast"
import { Dropdown } from "primereact/dropdown"
import { Dialog } from "primereact/dialog"
export default function EditDrink({ vendorId, itemData }) {

  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const toast = useRef()
  const productPicRef = useRef()
  const [loaderShow, setLoaderShow] = useState(false)
  const [detailData, setDetailData] = useState()
  const [addItemValue, setAddItemValue] = useState()
  const [nameCategory, setNameCategory] = useState([])
  const [addItem, setAddItem] = useState(false)
  const [Allergians, setAllergians] = useState([])
  useEffect(() => {

    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ProductCategory`,
      {
        params: { VendorShopId: vendorId },
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins ">
              {res?.data?.message
                ? res?.data?.message
                : "Successfully Fetched MenuItems"}
            </p>
          ),
        });
        setNameCategory(res?.data?.data);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins text-main-color">
              {error?.response?.data?.message
                ? error?.response?.data?.message
                : "Menu Items Fetching Failed"}
            </p>
          ),
        });
      });

  }, []);
  const [productimg, setproductimg] = useState()
  const formik = useFormik({
    initialValues: {
      Name: "",
      Id: "",
      Description: "",
      Tax: 19,
      PickupPrice: "",
      Price: "",
      CategoryId: "",
      Allergians: '',
      ProductPicture: "",
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name Is Required"),
      Description: Yup.string().required("Description Is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let allergstring = ""
      for (let i = 0; i < Allergians?.length; i++) {
        if (i === 0) {
          allergstring = Allergians[i]
        }
        else {

          allergstring = `${allergstring},${Allergians[i]}`
        }
      }

      formik.values.Allergians = allergstring
      setLoaderShow(prev => !prev)

      let formData = new FormData()
      Object.keys(formik.values).map(item => {
        if (item === "ProductPicture") {
          if (formik.values[item] !== "") {

            formData.append(item, formik.values[item])
          }
        }
        else {
          formData.append(item, formik.values[item])
        }
      })
      Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Product`, formData, { headers: { 'Authorization': `Bearer ${token}` }, 'Content-Type': 'multipart/form-data' }).then((res) => {
        setLoaderShow(prev => !prev)

        toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Updated Menu Item"}</p> });

      }).catch((error) => {
        setLoaderShow(prev => !prev)

        toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Menu Item Updation Failed"}</p> });

      })
    }
  })
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Product/${itemData?.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Fetched Menu Item Detail"}</p> });
      setDetailData(res?.data?.data)
      setproductimg(res?.data?.data?.imagePath)
      formik.setFieldValue("Name", res?.data?.data?.name)
      formik.setFieldValue("Id", res?.data?.data?.id)
      formik.setFieldValue("Tax", res?.data?.data?.Tax)
      formik.setFieldValue("Allergians", res?.data?.data?.allergians)
      formik.setFieldValue("PickupPrice", res?.data?.data?.pickupPrice)
      formik.setFieldValue("Description", res?.data?.data?.description)
      formik.setFieldValue("Tax", res?.data?.data?.tax)

      formik.setFieldValue("Price", res?.data?.data?.price)

      formik.setFieldValue("CategoryId", res?.data?.data?.categoryId)

      const allergiansArray = res?.data?.data?.allergians?.split(',').map(item => item.trim());
      setAllergians(allergiansArray)
    }).catch((error) => {
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Menu Item Details Fetching Failed"}</p> });

    })
  }, [])

  return (
    <form onSubmit={formik.handleSubmit} className="p-2">
      <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
        <div className="flex w-full flex-wrap items-center flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] mt-2 font-poppins flex flex-wrap flex-row justify-left font-normal md:w-[49%] lg:w-[49%]  ">
            <label>Item Id</label>
            <InputText disabled name="Id" value={formik.values.Id} placeholder="0028" className=" p-1 ml-4 w-[60%] border border-[#A767E0] " />
          </div>
        </div>
        <div className="mt-4 flex w-full flex-wrap items-center flex-row justify-center gap-4  md:justify-start">
          <label className="text-left md:text-center md:w-auto w-[90%]">Item Image<span onClick={() => {

            fetch(detailData?.imagePath)
              .then(response => {
                const filename = response.headers.get('Content-Disposition')
                  ?.split('filename=')[1]
                  ?.split(';')[0]
                  ?.replace(/"/g, '') || detailData?.imagePath?.split('/').pop();

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


          }} className="cursor-pointer ml-2 pi pi-download"></span></label>
          <div onClick={() => {
            productPicRef.current.click()
          }} className="  cursor-pointer text-main-color mt-4 md:w-[40%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-center">
            <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>
            <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.ProductPicture ? formik.values.ProductPicture.name : "No File Choosen"}</p>
          </div>
          <InputText ref={productPicRef} name="ProductPicture" onChange={(e) => {
            formik.setFieldValue("ProductPicture", e.target.files[0])
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
              setproductimg(reader.result)
            }
          }} type="file" accept="Image/*" placeholder="0028" className=" hidden p-1 ml-4  " />
          <div className="flex flex-wrap flex-row justify-center items-center ">
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

              }} src={productimg} />
            </div>

          </div>
        </div>

        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Product Name</label>
          <InputText
            name="Name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.Name}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
          />
          {formik.touched.Name && formik.errors.Name ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.Name}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Product Category</label>
          <Dropdown
            name="CategoryId"
            placeholder="Product Category"
            onChange={formik.handleChange}
            value={formik.values.CategoryId}
            className="text-main-color border w-full mt-2 p-0 border-[#A767E0]"
            options={nameCategory}
            optionLabel="title"
            optionValue="id"
          />
          {formik.touched.CategoryId && formik.errors.CategoryId ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.CategoryId}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
          <label className="">Description</label>
          <InputTextarea
            name="Description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.Description}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
          />
          {formik.touched.Description && formik.errors.Description ? (
            <p className="text-red-500 w-full text-[12px]">
              {formik.errors.Description}
            </p>
          ) : undefined}
        </div>


        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[32.3%] ">
          <label className="">Delivery Cost (€)</label>
          <InputText
            name="Price"
            placeholder="Delivery Cost"
            onChange={formik.handleChange}
            value={formik.values.Price}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"

          />
          {formik.touched.Price && formik.errors.Price ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.Price}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[32.3%]  ">
          <label className="">Pickup Cost (€)</label>
          <InputText
            name="PickupPrice"
            placeholder="Pickup Price"
            onChange={formik.handleChange}
            value={formik.values.PickupPrice}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"

          />
          {formik.touched.PickupPrice && formik.errors.PickupPrice ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.PickupPrice}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[32.3%] ">
          <label className="">Tax</label>
          <Dropdown
            name="Tax"
            placeholder="Tax"
            onChange={formik.handleChange}
            value={formik.values.Tax}
            className="text-main-color border w-full mt-2 p-0 border-[#A767E0]"
            options={[{ title: "Tax 19%", id: 19 }, { title: "Tax 7%", id: 7 }]}
            optionLabel="title"
            optionValue="id"
          />
          {formik.touched.Tax && formik.errors.Tax ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.Tax}
            </p>
          ) : undefined}
        </div>
        <div className="w-[90%]  justify-center sm:justify-center md:justify-between lg:justify-between mt-4">
          <label className="w-full">Allergians</label>
          <div className="flex flex-wrap flex-row w-full justify-left">
            <div className="w-[calc(100%-200px)] text-main-color border rounded-sm flex flex-wrap flex-row justify-left border-main-color p-2 h-auto">
              {Allergians?.map(item => {
                return (
                  <div className="ml-2 flex flex-wrap flex-row justif-left items-center">
                    <h1 className="ml-1">{item}</h1>
                    <i onClick={() => {
                      let UpdatedArray = []
                      for (let i = 0; i < Allergians?.length; i++) {

                        if (Allergians[i] === item) {

                        }
                        else {
                          UpdatedArray.push(Allergians[i])
                        }
                      }
                      setAllergians(UpdatedArray)
                    }} className="ml-1 cursor-pointer pi pi-times text-[12px]" />
                  </div>
                )
              })
              }

            </div>
            <Button type="button" onClick={() => {
              setAddItem(prev => !prev)
            }} icon="pi pi-plus" className="ml-2 w-[150px] h-[35px] bg-main-color p-1 text-white pl-2 pr-2" label="Add New" />
          </div>
        </div>


      </div>


      <div className="flex flex-wrap mt-8 flex-row justify-center gap-4 w-full">

        <Button label="Inquiry" type="button" className="border w-[100px] border-main-color pl-4 pr-4 p-1" />
        <Button label="Delete" type="button" className="border w-[100px] border-main-color pl-4 pr-4 p-1" />

        <Button label="Approve" disabled={loaderShow} loading={loaderShow} type="submit" className="border w-[100px] bg-main-color text-white border-main-color pl-4 pr-4 p-1" />
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px]  
    mt-[80px]
    md:left-auto 
    md:transform-none
  "  ref={toast} />
      <Dialog header="Add Allergian" className="font-poppins" headerClassName="text-main-color" visible={addItem} onHide={() => {
        setAddItem(prev => !prev)
        setAddItemValue("")
      }} >
        <div className="flex flex-wrap  text-main-color flex-row justify-center">
          <InputText className="w-[90%] border p-1 border-main-color" value={addItemValue} onChange={(e) => {
            setAddItemValue(e.target.value)
          }} />
          <div className="w-full  flex flex-wrap flex-row justify-center">
            <Button type="button" className="bg-main-color mt-4  pl-1 pr-2 text-white" onClick={() => {
              const items = Allergians ? Allergians : [];
              items.push(addItemValue)
              setAllergians(items)
              setAddItemValue("")
            }}

              label="Add" />
          </div>
        </div>
      </Dialog>
    </form>
  )
}