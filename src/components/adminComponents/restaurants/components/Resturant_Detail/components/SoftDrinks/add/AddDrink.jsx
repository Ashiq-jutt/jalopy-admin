import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";  
 /* "dev": "react-scripts",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview" 
     */

import { Dropdown } from "primereact/dropdown";
export default function AddDrink({ aiDrinkData }) {
  const formik = useFormik({
    initialValues: {
      description: "",

      allergian: "",
      product: "",
      price: "",
      itemid: "",
      img: "", 
      type:"",
      size: "",
    },
  });
  return (
    <div className="md:pl-[15%] md:pr-[15%]">
     
      <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Name</label>
          <InputText
            name="product"
            placeholder="Product"
            onChange={formik.handleChange}
            value={formik.values.product}
            className="text-black border w-full mt-2 p-2 font-poppins"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Category</label>
          <InputText
            name="category"
            placeholder="Category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="text-black border w-full mt-2 p-2"
          />
        </div>

       
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Description</label>
          <InputText
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="text-black border w-full mt-2 p-2"
          />
        </div>   
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Price</label>
          <InputText
            name="price"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="text-black border w-full mt-2 p-2"
          />
        </div>       
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Type</label>
          <InputText
            name="type"
            placeholder="Type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="text-black border w-full mt-2 p-2"
          />
        </div>  
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Allergian</label>
          <InputText
            name="allergian"
            placeholder="Allergian"
            onChange={formik.handleChange}
            value={formik.values.allergian}
            className="text-black border w-full mt-2 p-2"
          />
        </div>
       
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Item ID</label>
          <InputText
            name="itemid"
            placeholder="Item ID"
            onChange={formik.handleChange}
            value={formik.values.itemid}
            className="text-black border w-full mt-2 p-2"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="block">Item Img</label>
          <input className="mt-5" type="file" />
        </div>
      </div>
      <div className="flex flex-wrap flex-row  justify-evenly md:justify-between ">
        <Button
          label="Edit"
          className={`border mt-2 ml-5 border-main-color  font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          label="ADD MORE"
          className={`border  mt-2 ml-5 border-main-color font-normal   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        />
        <Button
          label="SAVE And Submit"
          className={`border mt-2 ml-5 border-main-color font-normal text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
    </div>
  );
}
