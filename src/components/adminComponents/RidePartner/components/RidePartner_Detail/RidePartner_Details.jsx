import { Button } from "primereact/button";
import { useState } from "react";
//import EditResturantDetail from "./components/Edit_Resturents_Detail/Edit_RidePartner_Details"; 
import EditResturantDetail from "./components/Edit_RidePartner_Detail/Edit_RidePartner_Details"
export default function ResturantDetails({
  resturantDetailView,
  setShowResturantDetail,
}) {
  const [showEditComponent, setShowEditComponent] = useState(false)
  return (
    <div className="text-main-color mt-[60px] overflow-y-auto fixed w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[calc(100vw-320px)]  h-[calc(100vh-70px)]  z-20 bg-white p-4  fixed top-[0px]">

      <div className={`flex flex-wrap ${showEditComponent ? "hidden" : ""} flex-row justify-left`}>

        <Button label="Back" className="bg-main-color text-white p-1 pr-3 pl-3" onClick={() => {
          setShowResturantDetail(prev => !prev)
        }}></Button>
      </div>
      {!showEditComponent ? <>
        <div className="flex flex-wrap flex-row justify-left mt-4">
          <h1 className="font-poppins font-normal text-[16px] mt-4 ">Name :</h1>
          <h1 className="font-normal font-poppins mt-4 ml-3 ">
            {resturantDetailView.firstName}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins font-normal inline text-[16px]  ">
            Last Name : &nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView.lastName}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">Email:&nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView.email}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins inline font-normal text-[16px] mt-4 ">
            Contact :&nbsp;&nbsp;
          </h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView?.contact}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins font-normal text-[16px] mt-4 inline ">Street No :&nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView?.street}
          </h1>
        </div>
        <div className="mt-4" >
          <h1 className="font-poppins font-normal text-[16px] mt-4 inline ">Postcode :&nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView?.postalCode}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins font-normal text-[16px] mt-4 inline ">Land : &nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView?.land}
          </h1>
        </div>
      {/*  <div className="flex w-full mt-10 flex flex-wrap flex-row justify-between">
          <div className="flex flex-wrap justify-left items-center">
            <h1 className="font-normal font-poppins text-[21px]">
              {resturantDetailView.resturantName}
            </h1>
            <div className="ml-4 mt-[-2px]">
              <Info />
            </div>

          </div>  
          <div>
            <Button className="font-poppins font-normal text-[#109B2F] " label="See" />
            <Button className="bg-main-color text-white font-poppins font-normal pr-5 pl-5 ml-5 " label="Delete" />
          </div>  
           
        </div>   */}
        <div className="mt-4">
          <h1 className="font-poppins font-normal text-[16px] mt-4 inline ">IBAN :&nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView.ibanNumber}
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="font-poppins font-normal text-[16px] mt-4 inline ">Tax ID:&nbsp;&nbsp;</h1>
          <h1 className="font-normal inline font-poppins">
            {resturantDetailView.taxId}
          </h1>
        </div>     
        <div className="flex flex-wrap flex-row   mt-8 w-full justify-center gap-4 ">
           <Button
          label="Edit" 
                type="button"
          className={`border    border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        /> 
          <Button
          label="Delete" 
                type="button"
          className={`border    border-main-color font-medium   text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 `}
        />
        <Button
      
      label="Inquiry" 
      type="button"
          className={`border  border-main-color  font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      
        <Button
         
          label="Approve" 
       type="button"
          className={`border  border-main-color font-medium text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2 bg-main-color text-white`}
        />{" "}
      </div>
      </> : <EditResturantDetail resturantDetailView={resturantDetailView} setShowEditComponent={setShowEditComponent} setShowResturantDetail={setShowResturantDetail} />
      }

    </div>
  );
}
