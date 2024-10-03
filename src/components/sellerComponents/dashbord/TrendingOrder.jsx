import trending from "../../../assets/Trending.png";  
import Axios from "axios" 
import React,{useEffect,useState} from "react"; 
const TrendingOrder = ({toast}) => {   

   const [loader,setLoader]=useState(false)         
   const [firstrender,setFirstRender]=useState(false)   
   const [month,setMonth]=useState("1")   
   let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;       
   const [trendingOrders,setTrendingOrders]=useState([])
  useEffect(()=>{   
  Axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/v1/SellerDashboard/TrendingProducts`,
    {params:{VendorShopId:JSON.parse(localStorage.getItem("userData"))?.data?.vendorId}, headers: { Authorization: `Bearer ${token}` } }
  ).then(res=>{  
    setLoader(false)
  setTrendingOrders(res?.data?.data) 
     if(!firstrender){      
      toast.current.show({
        severity: "success",
        summary: "Info",
        detail: 
          <p className="font-poppins">
            {res?.data?.Message
              ? res?.data?.Message
              : "Trending Orders Fetched Successfully"}
          </p>
        
      });
      setFirstRender(true)      
     }}).catch(err=>{ 
      if(!firstrender){   
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {err?.response?.data?.Message
                ? err?.response?.data?.Message
                : "Trending Orders Fetching Failed"}
            </p>
          
        });
        setFirstRender(true)         
       }
     })},[])
  return ( 
    <> 
     {  
     trendingOrders?.map((item,index)=>{return (  
      <>
      { index < 6 ?
      <div className={`w-[311.77px] mt-2 relative flex flex-wrap flex-row  justify-between  items-center  ${index === 0 < 4 ? "bg-[#F2F2F2]":index === 4 ? "bg-[#F1E9FE]" :"bg-[#F2F2F2]"} rounded-lg shadow-sm p-5 `}>
          <div className="w-[200px]">
          <p className="text-main-color text-[14px] ">Top of the week</p>
          <p className={`text-[14px] w-[100px] font-semibold mt-4 ${index === 1 || index === 2 || index === 3 || index === 5 ? "text-[#07143B]": "text-main-color" }`}>
            {item?.name}
          </p>
          <p className={`${index === 4 ? "text-main-color" :"text-[#959895]"} text-[14px] mt-4`}>Orders {item?.totalSales}</p>
          <p className={`${index === 4 ? "text-main-color" :"text-[#959895]"} text-[14px] mt-4`}>Income €{item?.totalIncome}</p>
          <p className={`${index === 4 ? "text-main-color" :"text-[#959895]"} text-[14px] mt-4`}>€{item?.price}</p>
        </div>
        <div className="absolute ml-[50%] md:ml-[200px]  w-[168px] h-[168px] rounded-full overflow-hidden bg-[#969ba0]">
  <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}  className="inset-0 w-full h-full object-cover" src={item?.imagePath} alt="Image" /> 

</div> 
     
      </div> :undefined  
      } 
      </>
      )})
}
      </>
  );
};

export default TrendingOrder;
