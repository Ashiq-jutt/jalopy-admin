import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ReportDetails from "./components/Report_Details/Report_Details";
import { Toast } from "primereact/toast";
import Loader from "../../../../Loaders/Components";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PayoutHistory from "./components/Payouthistory/PayoutHistory";
function formatDate(dateString) {
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
export default function ListAllDriverReports() {
  const [payoutHistoryVisibility, setPayoutHistoryVisibility] = useState(false)
  const [resturantReportDetailView, setResturantReportDetailView] = useState(false)

  const [courierReportDetailView, setCourierReportDetailView] = useState(false)
  const [rowData, setRowData] = useState(null)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState(1)
  const toast = useRef()
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  const [loader, setLoader] = useState(true)
  const [reportsData, setReportsData] = useState([])
  const [payoutDialogVisibility, setPayoutDialogVisibility] = useState(false)
  const [payoutLoading, setPayoutLoading] = useState(false)
  let ridePartnerId = JSON.parse(localStorage.getItem("userData"))?.data?.ridePartnerId;
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/CustomerRide/RidePartnerRides`, { params: { Search: search, SortBy: sortBy }, headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins ">{res?.data?.message ? res?.data?.message : "Successfully Fetched Reports Data"}</p> });
      setReportsData(res?.data?.data)
      setLoader(false)
    }).catch((error) => {
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins text-main-color">{error?.response?.data?.message ? error?.response?.data?.message : "Fetching Reports Data Failed"}</p> });

    })
  }, [])
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/CustomerRide/RidePartnerRides`, { params: { Search: search, SortBy: sortBy }, headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      setReportsData(res?.data?.data)
    }).catch((error) => {

    })
  }, [search, sortBy])
  return (
    <div className="font-poppins font-normal text-main-color">
      {!resturantReportDetailView ? <div className="flex flex-wrap flex-row justify-between md:justify-end gp-1 md:gap-4">
        <Button iconPos="left" onClick={() => {
          setPayoutHistoryVisibility(prev => !prev)
        }} label="Payout History" className="mt-2 md:pl-[50px] rounded-2xl p-1 md:pr-[5px] pl-[4px] pr-[4px] text-[14px] md:text-[16px]     w-[40%] md:w-[215px] border    border-main-color"></Button>
        <Button iconPos="right" icon="pi pi-angle-right" onClick={() => {
          setPayoutDialogVisibility(prev => !prev)
        }} label="Request For Payout" className="mt-2 md:pl-[30px] rounded-2xl p-1 md:pr-[5px] pl-[2px] pr-[2px] text-[14px] md:text-[16px]   w-[58%] md:w-[215px] border    border-main-color"></Button>
      </div> : undefined
      }
      {resturantReportDetailView || courierReportDetailView ? <ReportDetails setResturantReportDetailView={setResturantReportDetailView} setCourierReportDetailView={setCourierReportDetailView} rowData={rowData} /> : <>
        <h1 className="mt-4 text-[20px] font-semibold tracking-wide">Reports</h1>
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
          value={reportsData}
          onSelectionChange={() => { } /*(e) => setSelectedRows(e.value)*/}
          size="small"
          resizableColumns
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          emptyMessage={loader ? <div className="flex flex-wrap flex-row justify-center items-center mt-4 mb-4"><Loader />  </div> : <h1 className="text-main-color flex flex-wrap flex-row justify-center items-center mt-4 mb-4">Reports Not Found</h1>}
          style={{ backgroundColor: "white" }}
          onRowClick={(rowData) => {
            /*setResturantDetailView(rowData.data) 
            setShowResturantDetail(prev=>!prev) */
            // setResturantReportDetailView(true) 
            // setRowData(rowData)
          }}
          rowClassName="cursor-pointer"
          className="  w-full  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="ID"
            headerClassName="rounded-l-2xl text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="id"

          ></Column>
          <Column
            header="Vehicle"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="vehicleName"
          ></Column>

          <Column
            header="Rider"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="resturant"
            body={(rowData) => {
              return (
                <div className="flex w-[200px] flex-wrap justify-left items-center flex-row">
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

                    }} src={`${rowData?.rider?.image ? rowData?.rider?.image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}`} />
                  </div>
                  <p className="ml-2">{rowData?.rider?.name}</p>
                </div>
              )
            }}
          ></Column>

          <Column
            header="From"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="fromLocation"
          ></Column>

          <Column
            header="To"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="toLocation"
          ></Column>
          <Column
            header="Date"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="date"
            body={(rowData) => {
              return (
                <p>{formatDate(rowData?.createdAt)}</p>
              )
            }}
          ></Column>
          <Column
            header="Travel"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="distance"
            body={(rowData) => {
              return <p>{rowData?.distance}Km</p>
            }}
          ></Column>
          <Column
            header="Fare"
            headerClassName="text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="grandTotal"
            body={(rowData) => {
              return <p>€{rowData?.grandTotal}</p>
            }}
          ></Column>

          <Column
            header="Tips"
            headerClassName="   font-normal text-white bg-main-color"
            className="text-main-color font-normal"
            field="tip"
            body={(rowData) => {
              return <p>€{rowData?.tip}</p>
            }}
          ></Column>
          <Column
            header="Actions"
            headerClassName=" rounded-r-2xl  font-normal text-white bg-main-color"
            className="text-main-color font-normal"
            field="tip"
            body={(rowData) => {
              return <i className="pi pi-eye"
                onClick={() => {
                  setRowData(rowData)
                  setResturantReportDetailView(true)
                }}
              />
            }}
          ></Column>

        </DataTable>


      </>
      }
      <Dialog className="font-poppins" header="Payout Confirmation" headerClassName="tracking-wide text-main-color" visible={payoutDialogVisibility} onHide={() => {
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

          <Button label="No"
            onClick={() => setPayoutDialogVisibility(prev => !prev)} className="text-white bg-main-color p-1 pl-5 pr-5" />
        </div>
      </Dialog>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />
      <Dialog className="w-[99.5%] md:w-[90%]" visible={payoutHistoryVisibility} onHide={() => {
        setPayoutHistoryVisibility(false)
      }}  >
        <PayoutHistory />
      </Dialog>

    </div>
  );
}
