import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import EditCar from "./components/Edit_Car_Detail/EditCar";
import Loader from "../../../../Loaders/Components";
import { formattedDate } from "../../../../Utils";
import DriverDetails from "../Car_Details/components/details/Car_Details";
import { Dialog } from "primereact/dialog";
import AddCar from "../Add_New_Car/Edit_Car_Detail/AddCar";
import AssignVehicle from "../Assign_Vehicle/Car/AssignVehicle";
import { Toast } from "primereact/toast";
import { EditIcon } from "../../../Car/components/Add_Car/Edit_Car_Detail/assets";
import EditDriver from "./components/Edit_Car_Detail/EditCar";

export default function CarsList({ carsData, setRefreshList, loader, search, setSearch, sortBy, setSortBy }) {
  const [showCarEdit, setShowCarEdit] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [showAssignVehicle, setShowAssignVehicle] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const toast = useRef()
  const [updateStatusDialog, setUpdateStatusDialog] = useState()
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [updateStatusLoader, setUpdateStatusLoader] = useState()
  const [rowData, setRowData] = useState(null)
  const [showAddCar, setShowAddCar] = useState(false)

  const tableActions = (rowData) => {
    return (
      <div className=" w-[60px] items-center  flex flex-wrap flex-row  gap-2 justify-left">
        {" "}

        <div className="w-[25px] h-[25px] rounded-md font-poppins  border border-main-color flex flex-wrap flex-row justify-center items-center  text-main-color  ">
          <Button

            onClick={() => {
              {/*   setCarDetailViewData(rowData) 
          setShowCarDetailView(prev=>!prev)   */}
              setRowData(rowData)
              setShowDetails(true)
            }}
            icon="pi pi-eye"
            className=""
          />
        </div>
        <div onClick={() => {
          setRowData(rowData)
          setShowCarEdit(true)
        }} className="w-[25px] h-[25px] rounded-md font-poppins   flex flex-wrap flex-row justify-center items-center  text-main-color  ">
          <EditIcon />
        </div>
        {/*  <Button 
             disabled={rowData?.vehicle !== null}
         label="Assign Vehicle "   
         type="button"
           onClick={()=>{ 
            //setShowCarEdit(prev=>!prev)    
             setRowData(rowData)
            setShowAssignVehicle(prev=>!prev)
           }}  
         className={`border border-main-color mt-1 text-white h-[30px] bg-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
       />*/}

      </div>
    );
  };
  useEffect(() => {

  }, [search, sortBy])
  const [payoutDialogVisibility, setPayoutDialogVisibility] = useState(false)
  const [payoutLoading, setPayoutLoading] = useState(false)
  let ridePartnerId = JSON.parse(localStorage.getItem("userData"))?.data?.ridePartnerId;

  return (
    <>

      {!showCarEdit && !showDetails ?
        <>
          <Dialog className="w-[99%]" visible={showAddCar} onHide={() => {
            setRefreshList(prev => !prev)
            setShowAddCar(prev => !prev)
          }}   >

            <AddCar />
          </Dialog>


          <div className="p-2 text-main-color">
            <div className="flex flex-wrap flex-row justify-between md:justify-end gp-1 md:gap-4">
              <Button iconPos="left" onClick={() => {
                setShowAddCar(prev => !prev)
              }} icon="pi pi-plus" label="Add Driver" className="mt-2 md:pl-[50px] rounded-2xl p-1 md:pr-[5px] pl-[4px] pr-[4px] text-[14px] md:text-[16px]     w-[40%] md:w-[215px] border    border-main-color"></Button>
              <Button iconPos="right" icon="pi pi-angle-right" onClick={() => {
                setPayoutDialogVisibility(prev => !prev)
              }} label="Request For Payout" className="mt-2 md:pl-[30px] rounded-2xl p-1 md:pr-[5px] pl-[2px] pr-[2px] text-[14px] md:text-[16px]   w-[58%] md:w-[215px] border    border-main-color"></Button>

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
          <DataTable
            value={carsData}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            size="small"

            resizableColumns
            paginator
            rows={10}

            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"

            emptyMessage={loader ? <div className="flex flex-wrap flex-row justify-center items-center mt-4 mb-4"><Loader /></div> : "Car Not Found"}
            style={{ backgroundColor: "white" }}

            rowClassName="cursor-pointer"
            className="  w-full    mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
          >
            {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
            <Column
              header="Driver"
              headerClassName="rounded-l-2xl font-normal text-white bg-main-color"
              className="text-main-color font-normal"
              field="id"

              body={(rowData) => {
                return (
                  <div className="flex flex-wrap justify-left w-[280px] items-center flex-row">
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

                      }} src={`${rowData?.imagePath ? rowData?.imagePath : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}`} />
                    </div>
                    <p className="ml-2">{rowData?.fullName}</p>
                  </div>
                )
              }}

            ></Column>
            <Column header="Assign Vehicle"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.company"></Column>

            <Column header="Made Year" headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.madeYear"></Column>

            <Column header="City" headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" body={(rowData) => {
              return (
                <p>{rowData?.city}</p>
              )
            }}></Column>



            <Column header="Registration No"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.carNo"></Column>


            <Column header="Color"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="vehicle.color"></Column>


            <Column header="Registration Date"
              headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="registerationDate"
              body={(rowData) => {
                return (
                  <p>{rowData?.driverDocument?.registerationDate ? formattedDate(rowData?.driverDocument?.registerationDate) : ""}</p>
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



            <Column header="Actions" headerClassName=" rounded-r-2xl font-normal text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
          </DataTable>
          <Dialog className="w-[99%]" header="Assign Vehicle" headerClassName="text-main-color" visible={showAssignVehicle} onHide={() => {
            setRefreshList(prev => !prev)
            setShowAssignVehicle(prev => !prev)
          }}>
            <AssignVehicle driverDetail={rowData} />

          </Dialog>
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
                <h1 className="text-main-color">Are You Sure You Want To Update the Driver Status? </h1>
              </div>
              <div className="flex flex-wrap mt-4  flex-row justify-around">
                <Button
                  loading={updateStatusLoader}
                  disabled={updateStatusLoader}
                  label="Yes"
                  onClick={() => {
                    setUpdateStatusLoader(true)
                    Axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/Drivers/UpdateStatus`, { id: selectedRow?.id, status: !(selectedRow?.status) }, {
                      headers: { Authorization: `Bearer ${token}` },
                    }).then(() => {
                      toast.current.show({ severity: "success", summary: "Info", detail: <h1 className="font-poppins ">Driver Status Updated Successfully</h1> });
                      setRefreshList(prev => !prev)
                      setUpdateStatusLoader(prev => !prev)
                      setUpdateStatusLoader(false)
                      setUpdateStatusDialog(prev => !prev)
                    }).catch(err => {
                      toast.current.show({ severity: "error", summary: "Info", detail: <h1 className="font-poppins ">Driver Status Updation Failed</h1> });

                      setUpdateStatusLoader(false)
                    })
                  }}
                  className="text-white bg-main-color pl-2 pr-2 "
                />
                <Button
                  label="No"
                  onClick={() => {
                    setUpdateStatusDialog(false);
                  }}
                  className=" text-white bg-main-color   pl-3 pr-3 "
                />
              </div>
            </div>
          </Dialog>
          <Dialog className="font-poppins" header="Payout Confirmation" headerClassName="text-main-color" visible={payoutDialogVisibility} onHide={() => {
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
              }} loading={payoutLoading} disabled={payoutLoading} label="Yes" className="text-white bg-main-color p-1 pl-2 pr-2" />

              <Button label="No" onClick={() => {

                setPayoutLoading(prev => !prev)
              }} className="text-white bg-main-color p-1 pl-2 pr-2" />
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
          <EditDriver setRefreshList={setRefreshList} driverDetailView={rowData} setShowCarEdit={setShowCarEdit} /> : <DriverDetails cardetails={rowData} setShowDetails={setShowDetails} />}

    </>
  )
}
/*  <Dialog visible={showCarEdit} onHide={()=>{setShowCarEdit(false)}} style={{width:"80vw"}}>
     </Dialog> */
