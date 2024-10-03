import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Toast } from "primereact/toast";
import AssignCarsList from "./components/Car_Data/Car_List";
import { Dialog } from "primereact/dialog";
import AddDriver from "../../../../../AddNewCar/components/Add_New_Car/Edit_Car_Detail/AddCar";
import { Button } from "primereact/button";
const AssignVehicle = ({ driverDetail, setShowAssignVehicle }) => {
  const toast = useRef()
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [CarsData, setCarsData] = useState([])
  const [showAddDriver, setShowAddDriver] = useState(false)
  const [refreshDrivers, setRefreshDrivers] = useState(false)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/List`,
      { headers: { Authorization: `Bearer ${token}` }, params: { IncludeAll: true } }
    ).then((res) => {
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Fetched Drivers List"}</p> });
      setCarsData(res?.data?.data)
      setLoader(false)
    }).catch((error) => {
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Drivers List Fetching Failed"}</p> });

    })
  }, [refreshDrivers])
  return (
    <div className="w-full font-poppins">
      <div className=" text-main-color  ">
        <div className="flex flex-wrap flex-row justify-center w-full  md:justify-end">

          <Button iconPos="left" onClick={() => {
            setShowAddDriver(prev => !prev)
          }} icon="pi pi-plus" label="Add Driver" className=" md:pl-[50px] rounded-2xl p-1 pl-[10px] pr-[5px]  md:pr-[50px]  w-[45%] md:w-[215px] border    border-main-color"></Button>

        </div>
      </div>
      <Dialog header="Add New Driver" headerClassName="font-poppins text-main-color" className="w-[99%] md:w-[90%]" visible={showAddDriver} onHide={() => {
        setShowAddDriver(prev => !prev)
        setRefreshDrivers(prev => !prev)
      }}>
        <AddDriver />
      </Dialog>
      <div className="w-full">
        {/* <DriverStats /> */}



        <AssignCarsList setRefreshDrivers={setRefreshDrivers} driverDetail={driverDetail} carsData={CarsData} loader={loader} />
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
    </div>
  );
};

export default AssignVehicle;
