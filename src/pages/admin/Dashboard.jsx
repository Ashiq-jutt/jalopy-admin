import CardDasBoard from "../../components/adminComponents/Dashboard/CardDasBoard";
import CircularProgressBar from "../../components/adminComponents/Dashboard/PiChart";
import TopProduct from "../../components/adminComponents/Dashboard/TopProduct";
import LatestConsumer from "../../components/adminComponents/Dashboard/LatestConsumer";
import ApexChart from "../../components/adminComponents/Dashboard/ApexChart";
import ProUsersChart from "../../components/adminComponents/Dashboard/RevenuChart";
import { useRef } from "react";
import { Toast } from "primereact/toast";
const Dashboard = () => { 
  let toast=useRef() 
  let token=(JSON.parse(localStorage.getItem("userData")))?.data?.jwToken
  return (
    <div className="mt-[70px] pl-4 pr-4"> 
    <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "    ref={toast}/>
      <CardDasBoard toast={toast} token={token}/>
      <div className="w-full flex flex-wrap flex-row justify-between gap-2 h-[22rem]">  
        <div className="w-full md:w-[49%]"> 
        <CircularProgressBar  token={token} toast={toast} /> 
         </div>  
          <div className="w-full md:w-[49%]"> 
            <ApexChart token={token} toast={toast} />
          </div>
        {/* <RevenuChart /> */}
      </div>
      {/* <div className="mt-24">
        <ApexChart />
      </div> */} 
       <div className="w-full ">  
         <ProUsersChart token={token} toast={toast} />
       </div>
      <div className="flex flex-wrap mt-14  pb-4 flex-row justify-between font-inter w-full  gap-2 ">
        <div className="w-[100%] mt-4 shadow-topproducts  rounded-2xl sm:w-[100%] md:w-[100%] lg:w-[60%]">
          <p className="font-poppins pl-4 pt-4 text-main-color text-[1.5rem] font-medium">
            Top products
          </p>
          <TopProduct token={token} toast={toast} />
        </div>
        <div className="w-[100%] mt-4 shadow-topproducts rounded-2xl sm:w-[100%] md:w-[100%] lg:w-[35%] font-inter overflow-hidden">
          <p className="font-inter pl-4 pt-4 text-main-color text-[1.5rem] font-medium">
            Latest Customers
          </p>

          <LatestConsumer token={token} toast={toast}/>
        </div>
      </div>  
      
    </div>
  );
};

export default Dashboard;
