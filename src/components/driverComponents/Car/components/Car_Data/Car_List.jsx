import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useState, useRef } from "react";
import CarDetails from "./components/details/car_details"
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import EditCar from "./components/Edit_Car_Detail/EditCar";
import Loader from "../../../../Loaders/Components";
import { formattedDate } from "../../../../Utils";
import { Dialog } from "primereact/dialog";
import AddCar from "../Add_Car/Edit_Car_Detail/AddCar";
import AddDriver from "../../../AddNewCar/components/Add_New_Car/Edit_Car_Detail/AddCar";
import { Toast } from "primereact/toast";
import { EditIcon } from "../Add_Car/Edit_Car_Detail/assets";
import AssignVehicle from "./components/Car/AssignVehicle";
export default function CarsList({ search, setSearch, sortBy, setSortBy, carsData, loader, setRefreshList }) {

  const [showCarEdit, setShowCarEdit] = useState(false)
  const [UnAssignLoader, setUnassignLoader] = useState()
  const [unAssignVehicle, setUnassignvehicle] = useState(false)
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [selectedRow, setSelectedRow] = useState()
  const toast = useRef()
  const [updateStatusDialog, setUpdateStatusDialog] = useState()

  const [updateStatusLoader, setUpdateStatusLoader] = useState()
  const [rowData, setRowData] = useState(null)
  const [showAddCar, setShowAddCar] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [payoutDialogVisibility, setPayoutDialogVisibility] = useState(false)
  const [payoutLoading, setPayoutLoading] = useState(false)
  let ridePartnerId = JSON.parse(localStorage.getItem("userData"))?.data?.ridePartnerId;
  const [showAddDriver, setShowAddDriver] = useState(false)

  const [showAssignVehicle, setShowAssignVehicle] = useState(false)
  const tableActions = (rowData) => {
    return (
      <div className="w-[360px]  flex flex-wrap items-center flex-row justify-between">
        {" "}

        <Button
          onClick={() => {
            {/*   setCarDetailViewData(rowData) 
          setShowCarDetailView(prev=>!prev)   */}
            setRowData(rowData)
            setShowDetails(prev => !prev)

          }}
          icon="pi pi-eye"
          className="w-[24px] border border-main-color h-[24px]  text-main-color "
        />
        <div onClick={() => {
          setRowData(rowData)
          setShowCarEdit(true)
        }}>
          <EditIcon />
        </div>
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
            //setRowData(rowData)
            //setShowAssignVehicle(prev=>!prev)
          }}
          className={`border border-main-color mt-1 p-1  text-white  bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />

      </div>
    );
  };
  return (
    <>
      {!showCarEdit && !showDetails ?
        <>
          <Dialog header="Add New Car" headerClassName="font-poppins text-main-color" className="w-[99%] md:w-[90%]" visible={showAddCar} onHide={() => {
            setShowAddCar(prev => !prev)
            setRefreshList(prev => !prev)
          }}>
            <AddCar />
          </Dialog>
          <Dialog header="Add New Driver" headerClassName="font-poppins text-main-color" className="w-[99%] md:w-[90%]" visible={showAddDriver} onHide={() => {
            setShowAddDriver(prev => !prev)
            setRefreshList(prev => !prev)
          }}>
            <AddDriver />
          </Dialog>
          <div className="p-2 text-main-color  ">
            <div className="flex flex-wrap flex-row justify-center w-full  md:justify-end gap-4">
              <div className="flex  md:hidden w-full flex flex-wrap flex-row justify-center items-center">
                <Button iconPos="right" onClick={() => {
                  setPayoutDialogVisibility(prev => !prev)
                }} icon="pi pi-angle-right" label="Request For Payout" className="w-[215px] rounded-2xl pl-[20px] p-1 mt-2 border border-main-color"></Button>
              </div>
              <Button iconPos="left" onClick={() => {
                setShowAddDriver(prev => !prev)
              }} icon="pi pi-plus" label="Add Driver" className="mt-2 md:pl-[50px] rounded-2xl p-1 pl-[10px] pr-[5px]  md:pr-[50px]  w-[45%] md:w-[215px] border    border-main-color"></Button>
              <Button iconPos="left" onClick={() => {
                setShowAddCar(prev => !prev)
              }} icon="pi pi-plus" label="Add Car" className="mt-2 md:pl-[50px] rounded-2xl p-1 md:pr-[5px] pl-[15px] pr-[10px]    w-[45%] md:w-[215px] border    border-main-color"></Button>
              <Button iconPos="right" onClick={() => {
                setPayoutDialogVisibility(prev => !prev)
              }} icon="pi pi-angle-right" label="Request For Payout" className=" hidden md:flex  w-[215px] rounded-2xl pl-[20px] p-1 mt-2 border border-main-color"></Button>

            </div>
          </div>
          <div className="flex transform mt-0 md:mt-4 p-2 md:p-0 w-full md:w-[85%]  flex-row  gap-2 flex-wrap justify-left md:justify-end items-center">
            <div className="flex  p-2 w-[45%]  md:5-0 md:w-[348px] rounded-2xl  md:pl-4 bg-[#F9FBFF] flex-wrap flex-row items-center justify-between">

              <InputText className="bg-[#F9FBFF]  text-main-color  w-[calc(100%-35px)]" value={search} onChange={(e) => {
                setSearch(e.target.value)
              }} placeholder="Search" />
              <i className="pi pi-search w-[25px]"></i>
            </div>
            <div className="mt-2 md:mt-0 w-[50%] md:w-[166px] bg-[#F9FBFF] flex rounded-2xl pl-1  h-[40px] flex-wrap flex-row jusitfy-between items-center">
              <p className="w-[50px] text-[#7E7E7E] text-[12.97px]">Sort By:</p>
              <Dropdown placeholder="Sort By " options={[{ label: "Oldest", value: 1 }, { label: "Newest", value: 0 }]} onChange={(e) => {
                setSortBy(e.value)

              }} value={sortBy} className=" bg-[#F9FBFF] font-poppins font-normal text-main-color w-[calc(100%-50px)] rounded-md md:rounded-2xl   " />
            </div>
          </div>
          <Dialog className="w-[95%] md:w-[90%]" headerClassName="text-main-color" visible={showAssignVehicle} onHide={() => {
            setRefreshList(prev => !prev)
            setShowAssignVehicle(prev => !prev)
          }}>
            <AssignVehicle setShowAssignVehicle={setShowAssignVehicle} driverDetail={rowData} />

          </Dialog>
          <DataTable
            value={carsData}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            size="small"

            resizableColumns
            paginator


            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            rows={10}
            emptyMessage={loader ? <div className="flex flex-wrap flex-row justify-center items-center mt-4 mb-4"> <Loader /> </div> : "Car Not Found"}
            style={{ backgroundColor: "white" }}

            rowClassName="cursor-pointer"
            className="  w-[99%] p-1 md:p-0 md:ml-2  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
          >
            {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
            <Column
              header="Car"
              headerClassName="rounded-l-2xl font-normal text-white bg-main-color"
              className="text-main-color font-normal"
              field="id"

              body={(rowData) => {
                return (
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

                      }} src={`${rowData?.image ? rowData?.image : "https://cdn2.vectorstock.com/i/1000x1000/68/01/man-driver-car-avatar-character-vector-24216801.jpg"}`} />
                    </div>
                    <p className="ml-2">{rowData?.company}</p>
                  </div>
                )
              }}

            ></Column>
            <Column header="Vehicle Model"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="model"></Column>

            <Column header="Made Year" headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="madeYear"></Column>

            <Column header="Driver" headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData) => {
              return (
                <p>{rowData?.driver ? "1" : "0"}</p>
              )
            }}></Column>



            <Column header="Registration No"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="carNo"></Column>


            <Column header="Color"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="color"></Column>


            <Column header="Registration Date"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="registerationDate"
              body={(rowData) => {
                return (
                  <p>{formattedDate(rowData?.registerationDate)}</p>
                )
              }}
            ></Column>
            <Column header="Status/Assign" body={(rowData) => {
              return (
                <div onClick={() => {
                  setSelectedRow(rowData)
                  setUpdateStatusDialog(prev => !prev)
                }} className={` flex items-center   justify-left`}>
                  <InputSwitch
                    checked={rowData?.status ? true : false}
                    className=""

                  />
                </div>
              )
            }} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
            <Column header="Register"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData) => {
                return (
                  <p>{rowData?.registeration ? "Yes" : "No"}</p>
                )
              }}></Column>

            <Column header="Seats"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="noOfSeats"></Column>



            <Column header="Actions" headerClassName=" rounded-r-2xl font-normal text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
          </DataTable>
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
                    Axios.put(`${process.env.REACT_APP_BASE_URL}//api/v1/Vehicles/UpdateStatus`, { id: selectedRow?.id, status: !(selectedRow?.status) }, {
                      headers: { Authorization: `Bearer ${token}` },
                    }).then(() => {
                      toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Vehicle Status Updated Successfully</h1> });
                      setRefreshList(prev => !prev)
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
          <Dialog className="font-poppins" header="Driver UnAssigning Confirmation" headerClassName=" tracking-wide text-main-color" visible={unAssignVehicle} onHide={() => {
            setUnassignvehicle(prev => !prev)
          }} >
            <p className="text-main-color">Do You Want To UnAssign Driver</p>
            <div className="mt-4 flex flex-wrap flex-row justify-evenly">
              <Button onClick={() => {


                setUnassignLoader(true)
                Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Vehicles/AssignDriver?version=1`, { vehicleId: rowData?.id, driverId: rowData?.driver?.id }, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                  toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">Vehicle UnAssigned Successfully</p> });
                  //setCarsData(res?.data?.data)      
                  setTimeout(() => {
                    setUnassignLoader(false)
                    setUnassignvehicle(prev => !prev)
                    setRefreshList(prev => !prev)
                  }, 500)

                }).catch((error) => {

                  toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">Vehicle Assigning Failed</p> });
                  setUnassignLoader(false)
                })
              }} loading={UnAssignLoader} disabled={UnAssignLoader} label="Yes" className="text-white bg-main-color p-1 pl-4 pr-4" />

              <Button label="No" onClick={() => {
                setUnassignvehicle(false)
              }} className="text-white bg-main-color p-1 pl-5 pr-5" />
            </div>
          </Dialog>
          <Dialog className="font-poppins" header="Payout Confirmation" headerClassName=" tracking-wide text-main-color" visible={payoutDialogVisibility} onHide={() => {
            setPayoutDialogVisibility(prev => !prev)
          }} >
            <p className="text-main-color">Do You Want To Request For Payout</p>
            <div className="mt-4 flex flex-wrap flex-row justify-evenly">
              <Button onClick={() => {
                setPayoutLoading(prev => !prev)
                Axios.post(
                  `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/Create`,
                  { ridePartnerId: ridePartnerId },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                  .then((res) => {

                    setPayoutLoading(prev => !prev)
                    setPayoutDialogVisibility(prev => !prev)
                    toast.current.show({
                      severity: "success",
                      summary: "Info",
                      detail: (
                        <p className="font-poppins">
                          {res?.data?.message
                            ? res?.data?.message
                            : "Payout Request Submited Successfully"}
                        </p>
                      ),
                    })
                  }).catch(err => {

                    setPayoutLoading(prev => !prev)
                    toast.current.show({
                      severity: "error",
                      summary: "Info",
                      detail: (
                        <p className="font-poppins">
                          {err?.data?.message
                            ? err?.data?.message
                            : "Payout Request Submission Failed"}
                        </p>
                      ),
                    })
                  })
              }} loading={payoutLoading} disabled={payoutLoading} label="Yes" className="text-white bg-main-color p-1 pl-4 pr-4" />

              <Button label="No" className="text-white bg-main-color p-1 pl-5 pr-5" />
            </div>
          </Dialog>
          <Dialog className="font-poppins" header="Payout Confirmation" headerClassName=" tracking-wide text-main-color" visible={payoutDialogVisibility} onHide={() => {
            setPayoutDialogVisibility(prev => !prev)
          }} >
            <p className="text-main-color">Do You Want To Request For Payout</p>
            <div className="mt-4 flex flex-wrap flex-row justify-evenly">
              <Button onClick={() => {
                setPayoutLoading(prev => !prev)
                Axios.post(
                  `${process.env.REACT_APP_BASE_URL}/api/v1/Payouts/Create`,
                  { ridePartnerId: ridePartnerId },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                  .then((res) => {

                    setPayoutLoading(prev => !prev)
                    setPayoutDialogVisibility(prev => !prev)
                    toast.current.show({
                      severity: "success",
                      summary: "Info",
                      detail: (
                        <p className="font-poppins">
                          {res?.data?.message
                            ? res?.data?.message
                            : "Payout Request Submited Successfully"}
                        </p>
                      ),
                    })
                  }).catch(err => {

                    setPayoutLoading(prev => !prev)
                    toast.current.show({
                      severity: "error",
                      summary: "Info",
                      detail: (
                        <p className="font-poppins">
                          {err?.data?.message
                            ? err?.data?.message
                            : "Payout Request Submission Failed"}
                        </p>
                      ),
                    })
                  })
              }} loading={payoutLoading} disabled={payoutLoading} label="Yes" className="text-white bg-main-color p-1 pl-4 pr-4" />

              <Button label="No" className="text-white bg-main-color p-1 pl-5 pr-5" />
            </div>
          </Dialog>
          <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
        </>
        :
        showCarEdit ?
          <EditCar carDetailView={rowData}
            setRefreshList={setRefreshList} setShowCarEdit={setShowCarEdit} /> : <CarDetails cardetails={rowData} setShowDetails={setShowDetails} />}

    </>
  )
}
/*  <Dialog visible={showCarEdit} onHide={()=>{setShowCarEdit(false)}} style={{width:"80vw"}}>
     </Dialog> */
