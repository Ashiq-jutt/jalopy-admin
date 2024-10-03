";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
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
      size: "",
    },
  });
  return (
    <div className="md:pl-[15%] md:pr-[15%]">
      <h1 className="bg-[#FFDA08] text-main-color  mt-4 p-10 rounded ">
        please enter deposit as reusable or disposable (e.g. cola returnable)
      </h1>
      <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
        <div className="w-[90%] mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Product</label>
          <Dropdown
            name="product"
            placeholder="Product"
            onChange={formik.handleChange}
            value={formik.values.drinks}
            optionLabel="label"
            optionValue="value"
            options={[
              { label: "Burger", value: "burger" },
              { label: "Pizza", value: "Pizza" },
              { label: "Biryani", value: "biryani" },
            ]}
            className="text-black border w-full mt-2 p-2 font-poppins border-[#A767E0]"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Size</label>
          <InputTextarea
            name="size"
            placeholder="Size"
            onChange={formik.handleChange}
            value={formik.values.size}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>

        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Price</label>
          <InputText
            name="price"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Description</label>
          <InputText
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Allergian</label>
          <InputText
            name="allergian"
            placeholder="Allergian"
            onChange={formik.handleChange}
            value={formik.values.allergian}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>
        <div className="w-[90%]  mt-7 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <div className="  w-[150px]   rounded ml-5 mt-2  pl-3 pr-3 p-1 bg-main-color flex flex-wrap flex-row items-center text-white justify-left">
            <h1 className="  rounded font-normal  ">Add More </h1>
            <i className=" ml-2 pi pi-plus  "></i>
          </div>
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="">Item ID</label>
          <InputText
            name="itemid"
            placeholder="Item ID"
            onChange={formik.handleChange}
            value={formik.values.itemid}
            className="text-black border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>
        <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
          <label className="block">Item Img</label>
          <input className="mt-5" type="file" />
        </div>
      </div>
      <div className="flex flex-wrap flex-row  justify-evenly "> 
   
        <Button
          label="SAVE And Submit" 
         
          className={`border mt-2 ml-5 border-main-color font-normal text-main-color rounded-lg w-[200px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
            
     /> </div> 
    </div>
  );
}
