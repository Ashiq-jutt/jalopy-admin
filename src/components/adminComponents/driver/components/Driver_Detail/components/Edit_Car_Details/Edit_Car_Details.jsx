import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
export default function EditCarDetail({ carDetailView }) {
  const formik = useFormik({
    initialValues: {
      carNo: carDetailView?.carData?.carno,
      model: carDetailView?.carData?.model,
      type: carDetailView?.carData?.type,
      madeYear: carDetailView?.carData?.year,
      seats: carDetailView?.carData?.seats,
      color: carDetailView?.carData?.color,
      name: carDetailView?.carData?.name,
      handyNo: carDetailView?.carData?.handyno,
      lastName: carDetailView?.carData?.lastname,
      registrationDate: carDetailView?.carData?.registrationdate,
    },
    
    validationSchema: Yup.object().shape({
      carNo: Yup.string().required("Car No Is Required"),
      model: Yup.string().required("Model Is Required"),
    name: Yup.string().required("Name Is Required"),
      seats: Yup.string().required("Seats Is Required"),
      lastName: Yup.string().required("Last Name Is Required"),
      registrationDate: Yup.string().required("Registration Date Is Required"),   
      handyNo:Yup.string().required("Handy No Is Required"),   
       color:Yup.string().required("Color Is Required"),   
        madeYear:Yup.string().required("Made Year Is Required"),     
        type:Yup.string().required("Company Is Required"), 
    }),
    onSubmit: (values, actions) => {},
  });
  return (
    <div>
      <form >
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] flex flex-wrap  mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Car No</label>
            <InputText
              name="carNo"
              placeholder="Car No"
              onChange={formik.handleChange}
              value={formik.values.carNo}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Company</label>
            <InputText
              name="type"
              placeholder="Company"
              onChange={formik.handleChange}
              value={formik.values.type}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Model</label>
            <InputText
              name="model"
              placeholder="Model"
              onChange={formik.handleChange}
              value={formik.values.model}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Made Year</label>
            <InputText
              name="madeYear"
              placeholder="Made Year"
              onChange={formik.handleChange}
              value={formik.values.madeYear}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">color</label>
            <InputText
              name="color"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.color}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">No Of Seats</label>
            <InputText
              name="seats"
              placeholder="Seats"
              onChange={formik.handleChange}
              value={formik.values.seats}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Name</label>
            <InputText
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Last Name</label>
            <InputText
              name="lastName"
              placeholder="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Handy No</label>
            <InputText
              name="handyNo"
              placeholder="Handy No"
              onChange={formik.handleChange}
              value={formik.values.handyNo}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[30%] lg:w-[30%]  ">
            <label className="">Registration Date</label>
            <InputText
              name="registrationDate"
              placeholder="Registration Date"
              onChange={formik.handleChange}
              value={formik.values.registrationDate}
              className="text-black border w-full mt-2 p-2"
            />
          </div>

          <h1 className="w-full w-[90%] md:w-[100%] font-poppins mt-8 text-main-color font-normal text-[21px]">
            Driver Documents
          </h1>
          <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
            <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
              <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
              <p className="ml-5">Ausweisp</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
            <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
              <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
              <p className="ml-5">Führschein</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
            <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
              <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
              <p className="ml-5">Anmeldung</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap mt-8 flex-row justify-left ">
            <div className="w-[170px] flex flex-wrap flex-row items-center justify-left">
              <i className="w-[16px]   rounded-full border border-main-color h-[16px]"></i>
              <p className="ml-5">P schein</p>
            </div>
          </div>
        </div>
      </form>
      <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete Profile"
          className="border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button
          label="Freeze"
          className="border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2"
        />
        <Button
          label="Unlock"
          className={`border border-main-color mt-1 text-white bg-main-color  rounded-lg w-[150px] font-normal  p-1 pl-2 pr-2`}
        />
        <Button
          label="Inquiry"
          className={`border border-main-color mt-1  text-white bg-main-color rounded-lg w-[150px]  font-normal  p-1 pl-2 pr-2`}
        />
        <Button
          label="Save"
          className={`border border-main-color mt-1 text-white bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
    </div>
  );
}
