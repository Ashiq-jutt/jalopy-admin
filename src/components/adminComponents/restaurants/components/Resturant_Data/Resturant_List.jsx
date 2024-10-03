import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import ResturantDetails from "../Resturant_Detail/Resturant_Details";
import Loader from "../../../../Loaders/Components";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { render } from "react-dom";
import { Dropdown } from "primereact/dropdown";
import { EditIcon } from "../stats/assets/Svg";
import { InputText } from "primereact/inputtext";
export default function ListResturants({ resturantData ,sortBy}) {
  const [loader, setLoader] = useState(true) 
  const toast = useRef()
  const [showResturantDetail, setShowResturantDetail] = useState(false)
  const [resturantDetailView, setResturantDetailView] = useState(null)
  const [resturantdata, setResturantData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [renderFirst, setRenderFirst] = useState(true)
  const [deleteInvoiceLoader, setDeleteInvoiceLoader] = useState(false)
  const [deleteInvoiceDialog, setDeleteInvoiceDialog] = useState(false)
  const [currentselected, setCurrentSelected] = useState()
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  useEffect(() => {

    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/ApprovedList`,
      { params:{ 
          SortBy:sortBy
      },headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      setLoader(false)
      setResturantData(res?.data?.data)
      if (renderFirst) {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Seller Data Successfully Fetched"}
            </p>
          ),
        });
        setRenderFirst(false)
      }
    }).catch(error => {
      if (renderFirst) {
        setLoader(false)
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {error?.response?.data?.Message
                ? error?.response?.data?.Message
                : "Seller Data Fetching Failed"}
            </p>
        
        });
        setRenderFirst(false)
      }
    })
  }, [refresh,sortBy])
  const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-left">
        {" "}
         <EditIcon/>  

      </div>
    );
  }; 
  const [search,setSearch]=useState() 
  return (
    <>     
      
      
      <DataTable
        value={resturantdata}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        size="small"
        resizableColumns
        paginator
        rows={10}   
         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowsPerPageOptions={[25, 50]}
        emptyMessage={loader ? <div className="flex flex-wrap mt-4 items-center justify-center ">

          <Loader />
        </div> : "Sellers Not Found"}
        style={{ backgroundColor: "white" }}
        onRowClick={(rowData) => {
          setResturantDetailView(rowData.data)
          setShowResturantDetail(prev => !prev)
        }}
        rowClassName="cursor-pointer"
        className="  w-full mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
      >
        {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
        <Column
          header="Customer Name"
          headerClassName="rounded-l-2xl  font-normal text-white bg-main-color"
          className="text-main-color font-normal"
          field="Name"
          body={(rowData) => {
            return (
              <p>{rowData?.firstName} {rowData?.lastName}</p>
            )
          }}

        ></Column>
        <Column header="Resturant"
          headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="name"></Column>
     
        <Column header="Email" headerClassName="font-normal text-white bg-main-color" className="text-main-color font-normal" field="email"></Column>

        <Column header="Reviews" body={(rowData) => {

          return (
            <div>
              {[1, 2, 3, 4, 5].map((item2) => {
                return (
                  <span
                    className={`inline w-[16px] ml-1 pi pi-star-fill  h-[16px] ${item2 <= rowData.avgRating ? "text-[#FEEF06]" : "text-[#D6D7DB]"
                      }`}
                  />
                );
              })}
            </div>
          )
        }} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="reviews"></Column>
        <Column header="Status" body={(rowData) => {
          return (
            <div className={` flex items-center   justify-left`}>
              <InputSwitch
                checked={rowData?.status}
                onClick={() => {
                  setCurrentSelected(rowData)
                  setDeleteInvoiceDialog(true)
                }}
                className=""

              />
            </div>
          )
        }} headerClassName="  font-normal text-white bg-main-color" className="text-main-color font-normal" field="status"></Column>
        <Column header="Actions" headerClassName=" rounded-r-2xl  font-normal  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
      </DataTable>


      <div>

      </div>
      {
        showResturantDetail ? <ResturantDetails showResturantDetail={showResturantDetail} resturantDetailView={resturantDetailView} setShowResturantDetail={setShowResturantDetail} /> : undefined
      }
      <Dialog className="font-poppins" header="Status Updation Cofirmation" headerClassName="text-main-color" visible={deleteInvoiceDialog} onHide={() => {
        setDeleteInvoiceDialog(prev => !prev)
      }}>
        <p className="font-poppins text-main-color">Are You Sure You Want To {currentselected?.status ? "DeActivate" : "Active"}  the Seller</p>
        <div className="mt-4 flex flex-wrap flex-row justify-center gap-4">
          <Button
            onClick={() => {
              setDeleteInvoiceLoader(true)
              Axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/v1/VendorShop/UpdateStatus`,{ 
                  vendorId: currentselected?.id, status: !currentselected?.status
                },
                { headers: { Authorization: `Bearer ${token}` } }
              ).then(res => {
                setDeleteInvoiceLoader(false)
                setRefresh(prev => !prev)
                setDeleteInvoiceDialog(false)
                toast.current.show({
                  severity: "success",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {res?.data?.Message
                        ? res?.data?.Message
                        : "Seller Status Updated Successfully"}
                    </p>
                  ),

                });


              }).catch(error => {
                setDeleteInvoiceLoader(false)
                toast.current.show({
                  severity: "error",
                  summary: "Info",
                  detail: (
                    <p className="font-poppins">
                      {error?.response?.data?.Message
                        ? error?.response?.data?.Message
                        : "Seller Status Updation Failed"}
                    </p>
                  )
                });
              })


            }}
            loading={deleteInvoiceLoader} disabled={deleteInvoiceLoader} className="text-white bg-main-color p-1 pl-2 pr-2 " label="Yes" />
          <Button className="text-white bg-main-color p-1 pl-2 pr-2 " onClick={() => {
            setDeleteInvoiceDialog(false)
          }} label="No" />
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
  )
}

