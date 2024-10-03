import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { DataTable } from "primereact/datatable"; 
import { Column } from "primereact/column"; 
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Bank, Card, Paypal, Cash, ApplePay } from "./assets";
export default function EditResturantDetail({ resturantDetailView }) {
  const formik = useFormik({
    initialValues: {
      name: resturantDetailView?.customerName,
      lastName: resturantDetailView?.lastName,
      dob: resturantDetailView?.dob,
      description: resturantDetailView?.description,
      resturantName: resturantDetailView?.resturantName,
      streetaddressline2: resturantDetailView?.streetaddressline2,    
      
      city: resturantDetailView?.city,
      state: resturantDetailView?.state,
      countryland: resturantDetailView?.countryland,
      website: resturantDetailView?.website,
      zipcode: resturantDetailView?.zipcode,
      website: resturantDetailView?.website,
      streetandnumber: resturantDetailView?.streetandnumber,
      taxid: resturantDetailView?.taxid,
      businesslogo: resturantDetailView?.businesslogo,
      paymentmethodaccepted: resturantDetailView?.paymentmethodaccepted,
      availablespace: resturantDetailView?.availablespace, 
      returantDeliveryPickup:resturantDetailView?.returantDeliveryPickup, 
      additionalinfo:resturantDetailView?.additionalinfo, 
      pickup:resturantDetailView?.pickup, 
      freeride:resturantDetailView?.freeride, 
      languages:resturantDetailView?.languages,   
    },
  });
  return (
    <div>
      <form>
        <div className="mt-4 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
          <div className="w-[90%] mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Name</label>
            <InputText
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[45%] lg:w-[45%]  ">
            <label className="">Last Name</label>
            <InputText
              name="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%] mt-2 sm:w-[90%]  font-normal md:w-[20%] lg:w-[20%] ">
            <label>DOB</label>
            <Calendar
              iconPos="right"
              showIcon
              onChange={formik.handleChange}
              value={formik.values.dob}
              placeholder="DOB"
              className="w-full text-black border w-full font-normal  mt-2 p-2"
            />
          </div>
          <div className="w-[90%]   mt-2 font-poppins font-normal md:w-[50%] lg:w-[50%]  ">
            <label className="">Description</label>
            <InputText
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[25%] lg:w-[25%]  ">
            <label className="">Resturant Name</label>
            <InputText
              name="resturantName"
              placeholder="Resturant Name"
              onChange={formik.handleChange}
              value={formik.values.resturantName}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="mt-2 w-full  ">
            <label className="ml-[5%] md:ml-[0%]">Address :</label>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-center sm:justify-center md:justify-between lg:justify-between">
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
              <label className="">Street And Number :</label>
              <InputText
                name="streetandnumber"
                placeholder="Street And Number"
                onChange={formik.handleChange}
                value={formik.values.streetandnumber}
                className="text-black border w-full mt-2 p-2"
              />
            </div>
            <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
              <label className="">Street Address Line 2 :</label>
              <InputText
                name="streetaddressline2"
                placeholder="Street Address Line 2"
                onChange={formik.handleChange}
                value={formik.values.streetaddressline2}
                className="text-black border w-full mt-2 p-2"
              />
            </div>
            <div className="flex flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
                <label className="">City :</label>
                <InputText
                  name="city"
                  placeholder="City"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className="text-black border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
                <label className="">Zip/Postal Code :</label>
                <InputText
                  name="zipcode"
                  placeholder="Zipcode"
                  onChange={formik.handleChange}
                  value={formik.values.zipcode}
                  className="text-black border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
                <label className="">State/Province :</label>
                <InputText
                  name="state"
                  placeholder="State"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  className="text-black border w-full mt-2 p-2"
                />
              </div>
              <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
                <label className="">Country Land:</label>
                <InputText
                  name="countryland"
                  placeholder="Country Land"
                  onChange={formik.handleChange}
                  value={formik.values.countryland}
                  className="text-black border w-full mt-2 p-2"
                />
              </div>
            </div>
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Website :</label>
            <InputText
              name="website"
              placeholder="Website"
              onChange={formik.handleChange}
              value={formik.values.website}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Tax ID</label>
            <InputText
              name="taxid"
              placeholder="Tax ID"
              onChange={formik.handleChange}
              value={formik.values.taxid}
              className="text-black border w-full mt-2 p-2"
            />
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">Business Logo</label>
            <p className="mt-2 font-normal">No File Choosen</p>
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[49%] lg:w-[49%]  ">
            <label className="">GEWERBESCHEIN</label>
            <p className="mt-2 font-normal ">No File Choosen</p>
          </div>
          <div className="w-[90%]    mt-2 font-poppins font-normal md:w-[100%] lg:w-[100%]  ">
            <label className="">Payment Method Accepted</label>
            <div className="flex flex-wrap flex-row pt-10 justify-around">
              <div className="w-[100px]  flex flex-row flex-wrap justify-between items-center ">
                <div>
                  <i
                    onClick={() => {}}
                    className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px]  text-main-color p-[4px] text-[14px]"
                  />
                </div>
                <div className="w-[40px] h-[40px]">
                  <Paypal />
                </div>
              </div>
              <div className="w-[100px]  flex flex-row flex-wrap justify-between items-center ">
                <div>
                  <i
                    onClick={() => {}}
                    className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px]  text-main-color p-[4px] text-[14px]"
                  />
                </div>
                <div className="w-[40px] h-[40px]">
                  <Card />
                </div>
              </div>
              <div className="w-[100px]  flex flex-row flex-wrap justify-between items-center ">
                <div>
                  <i
                    onClick={() => {}}
                    className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px]  text-main-color p-[4px] text-[14px]"
                  />
                </div>
                <div className="w-[40px] h-[40px]">
                  <Bank />
                </div>
              </div>
              <div className="w-[100px]  flex flex-row flex-wrap justify-between items-center ">
                <div>
                  <i
                    onClick={() => {}}
                    className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px]  text-main-color p-[4px] text-[14px]"
                  />
                </div>
                <div className="w-[40px] h-[40px]">
                  <Cash />
                </div>
              </div>
              <div className="w-[100px]  flex flex-row flex-wrap justify-between items-center">
                <div>
                  <i
                    onClick={() => {}}
                    className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px]  text-main-color p-[4px] text-[14px]"
                  />
                </div>
                <div className="w-[40px] h-[40px]">
                  <ApplePay />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label>Available Space</label>
              <div className="border border-main-color rounded p-2 mt-2 w-[150px]">
                <p className="bg-main-color text-white  p-2">
                  <i className="text-white cursor-pointer pi pi-plus mr-8"></i>8
                  <i className="pi pi-minus  cursor-pointer text-white ml-8  "></i>
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              <label>Impressum / About Us</label>
              <div className="border border-main-color p-4 mt-2 rounded ">
                <p>
                  Divine Dine <br />
                  Vertreten durch: Max Mustermann
                  <br />
                  Adresse: Musterstraße 123, 12345 Musterstadt
                  <br />
                  Fax: +49 123 456 7890
                  <br />
                  E-Mail: info@jalopy.pro
                  <br />
                  USt-IdNr gemäß §27a UStG: DE123456789
                  <br />
                  Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV: Max
                  Mustermann
                </p>
              </div>   
               
            </div> 
             <div className="mt-4 "> 
              <label >Set Standard Hours for delivery, pickup</label>  
              <p className="font-normal">Configure the Standard Hours For Your Resturant</p>
         
        <DataTable
          value={resturantDetailView.returantDeliveryPickup}
          size="small"
          resizableColumns
          emptyMessage="No customers found."
          style={{ backgroundColor: "white",  }} 
         
        rowClassName="cursor-pointer"   
          className="  w-[99%] p-4 ml-2  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            className="text-main-color font-normal"
            field="day"
              headerClassName="hidden"
          ></Column> 
           <Column    headerClassName="hidden" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-center`}>
               <InputSwitch
                 checked={rowData.status === "active" ? true:false}
                 className="" 
                
               /> 
             </div>
          )}}  className="text-main-color font-normal" field="status"></Column>
          <Column   headerClassName="hidden"   className="text-main-color font-normal" body={(rowData)=>{
            return (  
              <div className="flex flex-wrap flex-row items-center justify-center"><p>{rowData.from}:00 {rowData.fromdaynight} </p> 
              <div className="ml-2">  
              <i className="pi pi-angle-up text-main-color block"></i>
              <i className="pi pi-angle-down text-main-color block"></i>
              
              </div>
            </div>
            )
          }}></Column> 
          <Column   headerClassName="hidden"   className="text-main-color font-normal" body={()=>{ return( 
            <p>To </p>
          )}}></Column> 
           
          <Column   headerClassName="hidden" field="to"  body={(rowData)=>{
            return ( 
              <div className="flex flex-wrap flex-row items-center justify-center"><p>{rowData.to}:00 {rowData.todaynight} </p> 
                 <div className="ml-2">  
                 <i className="pi pi-angle-up text-main-color block"></i>
                 <i className="pi pi-angle-down text-main-color block"></i>
                 
                 </div>
               </div>
            )
          }} className="text-main-color font-normal" ></Column>  
           
        
        
       </DataTable>  
          
        
             </div>       
              <div className="mt-4 ">   
                <label>Additional Information</label> 
                <p className="mt-2 font-normal">{resturantDetailView?.additionalinfo}</p>
                </div>   
                <div className="w-[90%]  flex flex-row flex-wrap justify-between   mt-2 font-poppins font-normal   ">
                  <div className="w-[150px]"> 
                    <label className="mb-10">LiefeRung/Pickup</label> 
                     <div className="flex flex-wrap flex-row justify-between"> 
                         <p className="mt-2"><div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div> Yes</p> 
                         <p className="mt-2"> <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]"/>
                </div>No</p>
                     </div>
                  </div> 
                  <div className="w-[150px]"> 
                    <label className="mb-10">Free Ride</label> 
                     <div className="flex flex-wrap flex-row justify-between"> 
                         <p className="mt-2"><div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div> Yes</p> 
                         <p className="mt-2"> <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]"/>
                </div>No</p>
                     </div>  
                  </div> 
                  <div className="w-[150px]"> 
                    <label className="mb-10">Languages</label> 
                     <div className="flex flex-wrap flex-row justify-between"> 
                         <p className="mt-2"><div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div> English</p> 
                         <p className="mt-2"> <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color  mr-2 bg-white p-[4px] text-[14px]"/>
                </div>Urdu</p>
                     </div>
                  </div>
          </div>    
            <h1 className="mt-4 font-poppins font-normal">Terms And Conditions</h1>
            <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
            <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div>   
                <p className="ml-3">
By submitting this form, you agree to our terms and conditions.</p>
              </div>   
              <div className="mt-4 flex  flex-wrap flex-row justify-left items-center font-poppins font-normal"> 
            <div className="inline "> 
                    <i onClick={()=>{ 
                       
                    }} className="pi rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-main-color bg-white p-[4px] text-[14px]"/>
                </div>   
                <p className="ml-3">
                i agree <span className="underline cursor-pointer">terms and conditions</span></p> 
 </div> 
          </div>

          <div></div>
        </div>
      </form>
    </div>
  );
}
