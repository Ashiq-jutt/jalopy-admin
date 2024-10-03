import React, { useEffect, useRef, useState } from 'react'
import {Dropdown} from "primereact/dropdown"  
import Axios from "axios" 
import Chart from 'react-google-charts';    
import { Toast } from 'primereact/toast';
import CommonLoaderBlue from '../../../Common/Components/Loader/LoaderBlue';
const RevenueChart = ({toast}) => {   
   const [loader,setLoader]=useState(true)          
    const [noData,setNoData]=useState(false) 
    const [overAll,setOverall]=useState(0)
   const [firstrender,setFirstRender]=useState(false)   
   const [filter,setFilter]=useState("3")   
   let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;       
   const [chartData,setChartData]=useState([])
  useEffect(()=>{   
  Axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/v1/SellerDashboard/OrdersGraph`,
    { headers: { Authorization: `Bearer ${token}` },params:{TimeUnit:filter} }
  ).then(res=>{  
    setLoader(false)
  //setChartData(res?.data?.data) 
     if(!firstrender){      
      toast.current.show({
        severity: "success",
        summary: "Info",
        detail: 
          <p className="font-poppins">
            {res?.data?.Message
              ? res?.data?.Message
              : "Revenue Chart Data  Successfully Fetched"}
          </p>
        
      });  
     
      setFirstRender(true)      
     } 
     let data2=[[{ type: 'date', label: 'Date' }, 'Dollar']] 
     let total=0
     res?.data?.data?.map(item=>{ 
         let arr=[new Date(item?.created),item?.grandTotal] 
         data2.push(arr) 
         total+=item?.grandTotal
     })  
  

     if(data2.length !== 1){
     setData(data2)  
      setOverall(total)
     } 
     else{ 
      setData([])
     }
     }).catch(err=>{ 
      if(!firstrender){   
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Revenue Chart Data Fetching Failed"}
            </p>
          
        });
        setFirstRender(true)         
       }
     })},[filter])
  const [data,setData] =useState([
 
  
  ])
   const options = {
    chart:{ 
       title:"Hello"
    },
   
         
    vAxis: {
     
      viewWindow: {
        min: 0 // Specify the minimum visible value for the vertical axis
      },
      gridlines: { // Show vertical gridlines
        color: 'lightgrey', // Adjust the color of vertical gridlines
      },
    },   
    legend:"none",
    hAxis: { 
      gridlines: { count: 3,baselineColor: 'transparent',  }, // Hide horizontal gridlines
      baselineColor: 'transparent', 
      format: 'dd-MM-yy', // Format for the date axis
      baselineColor: 'transparent',
      gridlines: {
        color: 'transparent', // Hides the horizontal gridlines
      },
 
    },  
      areaOpacity: 0.3, 
      // Adjust the opacity of the area under the line
     
     
      curveType: 'function', // Use 'function' for a smooth line
      colors: ['#A25EDF'], // Specify the custom line color here
      fontName: 'Poppins, sans-serif', // Set the desired font-family
      backgroundColor:"#FBF8FF",    
      fontName: 'Inter', // Change to your desired font family
        
      
    
  };
  return (
    <div className=' pt-2 pl-2 pr-2 rounded-lg  bg-[#FBF8FF] overflow-hidden  h-[320px]'>  
     <div className='flex flex-row flex-wrap justify-between'>
    <div >
    <p>Overall Sales</p>  
    <h1 className='font-bold text-[21px]'>€{overAll}      <p className="mt-2 inline text-[14px]"> </p>
                        </h1>
     </div> 
      <div>   
        <Dropdown value={filter} onChange={(e)=>{ 
          setFilter(e.value)
        }} placeholder='filter'  optionLabel='label' optionValue='value' className='w-[150px] md:w-[200px] text-main-color border border-[#EEEEEE] rounded-md bg-[#FBF8FF]' options={[{label:"Week",value:"1"},{label:"Month",value:"2"},{label:"Year",value:"3"}]}/>
        </div>  
     </div>          
     { loader ? <div className="flex flex-wrap flex-row justify-center items-center w-full h-full"><CommonLoaderBlue/></div>:  
       data?.length > 0 ? 
     <div className='mt-4'>
      <Chart
      chartType="LineChart"
      width="100%"
      height="auto"
      data={data}
      options={options}
    />
    </div>      
    : 
     <div className='w-full h-[calc(100%-100px)] flex flex-wrap flex-row justify-center items-center '> 
    <p>Data Not Found</p> 
     </div>  
  }  

    
    </div>
  )
}

export default RevenueChart
