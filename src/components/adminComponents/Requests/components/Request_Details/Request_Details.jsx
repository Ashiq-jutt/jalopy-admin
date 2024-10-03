
import { Button } from "primereact/button";
import { useState } from "react";
import moment from "moment/moment";
import CustomResponse from "./components/Custom_Response";
export default function RequestDetails({ vendor, rider, details, setHideStat, setViewDetail }) {

  const [customResponse, setCustomResponse] = useState(false)
  return (
    <div>


      <Button className="p-1 pl-3 pr-3 bg-main-color text-white  "
        onClick={() => {
          setViewDetail(false)
        }}
        label="Back" />
      <>


        <h1 className="font-poppins font-bold text-[21px] mt-4 ">
          {vendor ? "Resturant Details" : "Ride Partner Details"}
        </h1>
        {vendor ? <div className="flex w-full flex flex-wrap flex-row justify-between">
          <div className="flex flex-wrap justify-left items-center">
            <h1 className="font-normal font-poppins text-[21px]">
              {details?.name}
            </h1>
            <div className="ml-4 mt-[-2px]">
              <div className="flex flex-wrap flex-row justify-center items-center ">
                <div className="overflow-hidden w-[100px] border mt-4  border-main-color rounded-full h-[100px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >

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

                  }} src={details?.image} />
                </div>


              </div>
            </div>


          </div>

        </div>
          : undefined
        }
        <div className="flex flex-wrap flex-row justify-left">
          <h1 className="font-poppins font-bold text-[16px] mt-4 ">Name : </h1>
          <h1 className="font-normal font-poppins mt-4 ml-3 ">
            {details?.firstName} {details?.lastName}
          </h1>
          <h1 className="font-poppins font-bold text-[16px] ml-5  mt-4 ">DOB :</h1>
          <h1 className="font-normal font-poppins mt-4 ml-3">{moment().utc(details?.dob).format("DD MMMM YYYY ")}</h1>
        </div>
        {vendor ? <h1 className="font-poppins font-bold text-[16px] mt-4 ">
          Resturant Address :&nbsp;&nbsp;
        </h1> : undefined}


        <h1 className="font-normal font-poppins">
          {details?.street1Address} {details?.street2Address}
        </h1>
        {vendor ? <>  <h1 className="font-poppins font-bold text-[16px] mt-4 ">{"Name :"}</h1>
          <h1 className="font-normal font-poppins">
            {details?.name}
          </h1>   </> : undefined}
        {vendor ? <>
          <h1 className="font-poppins font-bold text-[16px] mt-4 ">Description</h1>
          <h1 className="font-normal font-poppins">
            {details?.description}
          </h1>
        </> : undefined}
        {vendor ? <>
          <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            Available Space :
          </h1>
          <h1 className="font-normal font-poppins">
            {details?.maxPersons}
          </h1>
        </> : undefined}
        {vendor ? <>
          <h1 className="font-poppins font-bold text-[16px] mt-4 ">Website :</h1>
          <h1 className="font-normal font-poppins">
            {details?.website}
          </h1>
        </>
          : undefined}

        {
          vendor ? <>
            <h1 className="font-poppins font-bold text-[16px] mt-4 ">
              PickUp And Delivery :&nbsp;&nbsp;
            </h1>
            <h1 className="font-normal font-poppins">
              {details?.isProvidingRide ? "Yes" : "No"}
            </h1>
          </> : undefined
        }


        <h1 className="font-poppins font-bold text-[16px] mt-4 ">Tax ID :&nbsp;&nbsp;</h1>
        <h1 className="font-normal font-poppins">{details?.taxId}</h1>
        {vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
          Additional Information :&nbsp;&nbsp;
        </h1>
          <h1 className="font-normal font-poppins">
            {details?.additionalInfo}
          </h1>
        </> : undefined}
        {
          !vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            Postal Code :&nbsp;&nbsp;
          </h1>
            <h1 className="font-normal font-poppins">
              {details?.postalCode}
            </h1>
          </> : undefined

        }
        {
          !vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            Country  :&nbsp;&nbsp;
          </h1>
            <h1 className="font-normal font-poppins">
              {details?.land}
            </h1>
          </> : undefined

        }
        {
          !vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            IBAN  :&nbsp;&nbsp;
          </h1>
            <h1 className="font-normal font-poppins">
              {details?.ibanNumber}
            </h1>
          </> : undefined

        }
        {
          !vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            Language  :&nbsp;&nbsp;
          </h1>
            <h1 className="font-normal font-poppins">
              {details?.language}
            </h1>
          </> : undefined

        }
        {
          !vendor ? <> <h1 className="font-poppins font-bold text-[16px] mt-4 ">
            Trade License :&nbsp;&nbsp;
          </h1>
            <h1 onClick={() => {

              fetch(details?.tradeLicense)
                .then(response => {
                  const filename = response.headers.get('Content-Disposition')
                    ?.split('filename=')[1]
                    ?.split(';')[0]
                    ?.replace(/"/g, '') || details?.tradeLicense?.split('/').pop();

                  return response.blob().then(blob => ({ blob, filename }));
                })
                .then(({ blob, filename }) => {
                  const url = window.URL.createObjectURL(blob);
                  const anchor = document.createElement('a');
                  anchor.href = url;
                  anchor.download = filename; // Use the filename from the server
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);
                  window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Download failed:', error));


            }} className="font-normal underline pb-1 font-poppins">

              Trade License
            </h1>
          </> : undefined

        }




      </>

    </div>
  )
}