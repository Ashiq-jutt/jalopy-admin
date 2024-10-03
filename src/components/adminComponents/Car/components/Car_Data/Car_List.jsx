import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import Axios from "axios";
import { Toast } from "primereact/toast";
import Loader from "../../../../Loaders/Components";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import CarDetails from "./components/details/car_details";
import { Dialog } from "primereact/dialog";
import EditCar from "./components/Edit_Car_Detail/Edit_Car_Details";
import { EditIcon } from "../../../restaurants/components/stats/assets/Svg";
import AssignVehicle from "./components/Driver_Data/Assign_Vehicle/Car/AssignVehicle";
export default function CarsList({ carsData, sortBy }) {
  const [loader, setLoader] = useState(true)
  const toast = useRef()
  const [cars, setCars] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [firstrender, setFirstRender] = useState(true)
  const [search, setSearch] = useState("")
  const [updateStatusDialog, setUpdateStatusDialog] = useState()

  const [updateStatusLoader, setUpdateStatusLoader] = useState()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(() => {

    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/List`,
      { headers: { Authorization: `Bearer ${token}` }, params: { IncludeAll: true, Search: search, SortBy: sortBy } }
    ).then(res => {
      setLoader(false)
      setCars(res?.data?.data)
      if (firstrender) {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Cars Data Successfully Fetched"}
            </p>
          ),

        });
        setFirstRender(false)
      }

    }).catch(error => {
      setLoader(false)
      if (firstrender) {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.Message
                ? error?.response?.data?.Message
                : "Cars Data Fetching Failed"}
            </p>
          ),
        });
        setFirstRender(false)

      }
    })

  }, [refresh, search, sortBy])
  const [rowData, setRowData] = useState()
  const [unAssignVehicle, setUnassignvehicle] = useState(false)
  const [UnAssignLoader, setUnassignLoader] = useState(false)
  const [showcarEdit, setShowCarEdit] = useState(false)
  const [showCarDetailView, setShowCarDetailView] = useState(false)
  const [carDetailViewData, setCarDetailViewData] = useState(null)
  const [showAssignVehicle, setShowAssignVehicle] = useState(false)
  const tableActions = (rowData) => {
    return (
      <div style={{ width: "380px" }} className="w-[430px]  flex flex-wrap flex-row items-center justify-evenly">
        {" "}
        <div
          onClick={() => {
            setRowData(rowData)
            setShowCarEdit(prev => !prev)
          }}

        >
          <EditIcon />
        </div>
        <Button
          onClick={() => {
            {/*   setCarDetailViewData(rowData) 
          setShowCarDetailView(prev=>!prev)   */}
            setRowData(rowData)
            setShowCarDetailView(prev => !prev)
          }}
          icon="pi pi-eye"
          className="w-[25px] h-[25px] border border-main-color  text-main-color "
        />
        <Button
          disabled={rowData?.driver !== null}
          label="Assign Driver"
          type="button"
          onClick={() => {
            //setShowCarEdit(prev=>!prev)    
            setRowData(rowData)
            setShowAssignVehicle(prev => !prev)
          }}
          className={`border border-main-color mt-1 p-1  text-white  bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          disabled={rowData?.driver === null}
          label="UnAssign Driver"
          type="button"
          onClick={() => {
            setRowData(rowData)
            setUnassignvehicle(true)
            //setShowCarEdit(prev=>!prev)    
            // setRowData(rowData)
            //setShowAssignVehicle(prev=>!prev)
          }}
          className={`border border-main-color mt-1 p-1  text-white  bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
    );
  }; function formatDate(dateString) {
    // Parse the date string into a Date object
    var dateObj = new Date(dateString);

    // Extract year, month, and day
    var year = dateObj.getFullYear().toString().substr(-2); // Get last two digits of the year
    var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    var day = dateObj.getDate().toString().padStart(2, '0');

    // Format the date
    var formattedDate = month + '-' + day + '-' + year;

    return formattedDate;
  }
  return (
    <>

      <DataTable
        value={cars}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        size="small"
        resizableColumns
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"

        emptyMessage={loader ? <div className="flex flex-wrap mt-4 items-center justify-center ">

          <Loader />
        </div> : "Cars Not Found"}

        style={{ backgroundColor: "white" }}

        rowClassName="cursor-pointer"
        className="  w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}

        <Column header="Driver" headerClassName="rounded-l-2xl font-normal text-white bg-main-color"
          className="text-main-color font-normal"
          body={(rowData) => {
            return (
              <>
                {
                  rowData?.driver !== null ?
                    <div className="flex flex-wrap justif5-left w-[215px] items-center flex-row">
                      <div className="w-[40px] rounded-full h-[40px] flex flex-wrap flex-row justify-center items-center overflow-hidden" >
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

                        }} src={`${rowData?.driver?.imagePath ? rowData?.driver?.imagePath : "https://cdn2.vectorstock.com/i/1000x1000/68/01/man-driver-car-avatar-character-vector-24216801.jpg"}`} />
                      </div>
                      <p className="ml-2">{rowData?.driver?.fullName}</p>
                    </div>
                    : ""}</>
            )
          }}
          field="driverData.name"></Column>
        <Column
          headerClassName="text-white font-normal bg-main-color"
          header="Vehicle Model"
          className="text-main-color font-normal"
          field="model"

        ></Column>
        <Column header="Made Year" headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="madeYear"></Column>


        <Column header="Car No"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="carNo"></Column>
        <Column header="Color"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="color"></Column>
        <Column header="Registration Date"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData) => {

            return (
              <p>{formatDate(rowData?.registerationDate)}</p>
            )
          }} field="registrationDate"></Column>



        <Column header="Status" body={(rowData) => {
          return (
            <div className={` flex items-center   justify-left`}>
              <InputSwitch
                checked={rowData?.status}
                onClick={() => {
                  setRowData(rowData)
                  setUpdateStatusDialog(prev => !prev)
                }}
                className=""

              />
            </div>
          )
        }} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
        <Column header="Register"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="register" body={(rowData) => {
            return (
              <p>{rowData?.registeration ? `Yes` : `No`}</p>
            )
          }}></Column>
        <Column header="No Of Seats"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="noOfSeats"></Column>


        <Column header="Actions" headerClassName="font-normal rounded-r-2xl  text-white w-[500px] bg-main-color" className="text-main-color w-[500px] font-normal" field="action" body={tableActions}></Column>
      </DataTable>

      <Dialog header="Car Details" headerClassName="text-main-color font-poppins" className="w-[95%] md:w-[90%]" visible={showCarDetailView} onHide={() => {
        setShowCarDetailView(prev => !prev)
      }}     >
        <CarDetails cardetails={rowData} setShowDetails={setShowCarDetailView} />
      </Dialog>
      <Dialog header="Update Car Details" headerClassName="text-main-color font-poppins" className="w-[95%] md:w-[90%]" visible={showcarEdit} onHide={() => {
        setShowCarEdit(prev => !prev)
      }}     >
        <EditCar carDetailView={rowData} setShowCarEdit={setShowCarEdit} setRefreshList={setRefresh} />
      </Dialog>
      <div>
        <Dialog
          headerClassName="font-poppins text-main-color font-medium"
          header="Confirmation"
          onHide={() => {
            setUpdateStatusDialog(false);
          }}
          visible={updateStatusDialog}
        >

          <div className="font-poppins text-medium text-[#AFAFAF]">

            <div className="flex flex-wrap flex-row justify-around">
              <h1 className="text-main-color">Are You Sure You Want To Update the Car Status? </h1>
            </div>
            <div className="flex flex-wrap mt-4  flex-row justify-around">
              <Button
                loading={updateStatusLoader}
                disabled={updateStatusLoader}
                label="Yes"
                onClick={() => {
                  setUpdateStatusLoader(true)
                  Axios.put(`${process.env.REACT_APP_BASE_URL}//api/v1/Vehicles/UpdateStatus`, { id: rowData?.id, status: !(rowData?.status) }, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(() => {
                    toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Vehicle Status Updated Successfully</h1> });
                    setRefresh(prev => !prev)
                    setUpdateStatusLoader(prev => !prev)
                    setUpdateStatusLoader(false)
                    setUpdateStatusDialog(prev => !prev)
                  }).catch(err => {
                    toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Vehicle Status Updation Failed</h1> });

                    setUpdateStatusLoader(false)
                  })
                }}
                className=" text-white bg-main-color pl-2 pr-2 "
              />
              <Button
                label="No"
                onClick={() => {
                  setUpdateStatusDialog(false);
                }}
                className="text-white bg-main-color pl-3 pr-3 "
              />
            </div>
          </div>
        </Dialog>
        <Dialog className="w-[95%] md:w-[90%]"
          headerClassName="text-main-color"
          visible={showAssignVehicle} onHide={() => {
            setRefresh(prev => !prev)
            setShowAssignVehicle(prev => !prev)
          }}>
          <AssignVehicle setShowAssignVehicle={setShowAssignVehicle} driverDetail={rowData} />

        </Dialog>
        <Dialog className="font-poppins" header="Driver UnAssigning Confirmation" headerClassName=" tracking-wide text-main-color" visible={unAssignVehicle} onHide={() => {
          setUnassignvehicle(prev => !prev)
        }} >
          <p className="text-main-color">Do You Want To UnAssign Driver</p>
          <div className="mt-4 flex flex-wrap flex-row justify-evenly">
            <Button onClick={() => {


              setUnassignLoader(true)
              Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/AssignDriver?version=1`, { vehicleId: rowData?.id, driverId: rowData?.driver?.id }, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Vehicle UnAssigned Successfully "}</p> });
                //setCarsData(res?.data?.data)      
                setTimeout(() => {
                  setUnassignLoader(false)
                  setUnassignvehicle(prev => !prev)
                  setRefresh(prev => !prev)
                }, 500)

              }).catch((error) => {

                toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Vehicle UnAssigning Failed"}</p> });
                setUnassignLoader(false)
              })
            }} loading={UnAssignLoader} disabled={UnAssignLoader} label="Yes" className="text-white bg-main-color p-1 pl-4 pr-4" />

            <Button label="No" onClick={() => {
              setUnassignvehicle(false)
            }} className="text-white bg-main-color p-1 pl-5 pr-5" />
          </div>
        </Dialog>
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
      </div>

    </>
  )
}

