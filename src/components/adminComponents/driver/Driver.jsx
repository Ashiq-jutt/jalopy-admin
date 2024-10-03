import DriverStats from "./components/stats/Driver_Stats";
import ListDrivers from "./components/Driver_Data/Driver_List";
import NavResturantDriverPartner from "../../ResubleComponents/nav_resturant_driver_partner/nav_resturant_driver_partner";
import { Dropdown } from "primereact/dropdown";
import { useScroll } from "framer-motion";
import { useState } from "react";
export default function Driver(){  
  const data = [
    {
      carData: {
        serialno: "1",
        name: "Musterman",
        lastname: "Max",
        model: "2022",
        year: "2024",
        color: "red",
        seats: "4",
        type: "Mercedes",
        registrationdate: "22 May 20222",
        registrationstatus: "yes",
        carno: "MKL2022",
        Ausweis: "submitted",
        Führschein: "submitted",
        Anmeldung: "submitted",
        PSchein: "submitted",
        status: "yes",
      },
      driverData: {
        driverimg: "",
        status: "yes",
        name: "Max",
        lastname: "Khan",
        handyno: "1234454545",
        idcard: "",
        license: "",
        registration: "",
        allowanceletter: "",
        days: "",
      },
    },
    {
      carData: {
        serialno: "1",
        name: "Musterman",
        lastname: "Max",
        model: "2022",
        year: "2024",
        color: "red",
        seats: "4",
        type: "Mercedes",
        registrationdate: "22 May 20222",
        registrationstatus: "yes",
        carno: "MKL2022",
        Ausweis: "submitted",
        Führschein: "submitted",
        Anmeldung: "submitted",
        PSchein: "submitted",
        status: "yes",
      },
      driverData: {
        driverimg: "",
        status: "yes",
        name: "Max",
        lastname: "Khan",
        handyno: "1234454545",
        idcard: "",
        license: "",
        registration: "",
        allowanceletter: "",
        days: "",
      },
    },
    {
      carData: {
        serialno: "1",
        name: "Musterman",
        lastname: "Max",
        model: "2022",
        year: "2024",
        color: "red",
        seats: "4",
        type: "Mercedes",
        registrationdate: "22 May 20222",
        registrationstatus: "yes",
        carno: "MKL2022",
        Ausweis: "submitted",
        Führschein: "submitted",
        Anmeldung: "submitted",
        PSchein: "submitted",
        status: "yes",
      },
      driverData: {
        driverimg: "",
        status: "yes",
        name: "Max",
        lastname: "Khan",
        handyno: "1234454545",
        idcard: "",
        license: "",
        registration: "",
        allowanceletter: "",
        days: "",
      },
    },
  ]; 
  const [sortBy,setSortBy]=useState(0)
  return (
    <div>
      <div className="p-2 mt-[70px]">
        <DriverStats />   
        <div className= "flex transform mt-0 md:mt-4 p-2 md:p-0 w-full w-full  flex-row  gap-2 flex-wrap justify-left md:justify-end items-center"> 
              
              <div className="mt-2 md:mt-0 w-[50%] md:w-[200px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">    
                      <p className="w-[70px] text-[#7E7E7E] ">Sort By:</p>
                 <Dropdown placeholder="Sort By " optionLabel="label" optionValue="value" options={[{label:"Oldest",value:1},{label:"Newest",value:0}]} onChange={(e)=>{ 
                   setSortBy(e.value)
                    
                  }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-70px)] rounded-md md:rounded-2xl   "/>
                </div>
         </div>
         <div className="flex flex-wrap justify-left items-center mt-4 flex row ">
        <NavResturantDriverPartner identifier={window.location.pathname === "/sidebar/Car" ? `car`:"driver"}/>  
        
        </div>
        <ListDrivers sortBy={sortBy} driversData={data}/>
      </div>
    </div>
  );
};

