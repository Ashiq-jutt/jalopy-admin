import React, { useEffect, useRef, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Axios from "axios";
import { Toast } from "primereact/toast";
import 'chart.js/auto';
import { Dropdown } from "primereact/dropdown";
import CommonLoaderBlue from "../../../Common/Components/Loader/LoaderBlue";

export function OrderTimingChart({toast}) { 
  const [chartData, setChartData] = useState(null); // Initialize as null
  let token = (JSON.parse(localStorage.getItem("userData")))?.data?.jwToken;
  const [loader, setLoader] = useState(true);
  const [firstrender,setFirstRender]=useState(false) 
  const [filter,setFilter]=useState("3")  
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/SellerDashboard/OrdersGraph`, {
      params: { TimeUnit: filter },
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => { 
      if(!firstrender){  
      toast.current.show({ severity: "success", summary: "Info", detail: <p className="font-poppins">{res?.data?.message ? res?.data?.message : "Successfully Fetched Time Chart Data"}</p> });
    setFirstRender(true)
    } 
      setLoader(false); 

      // Prepare data for Chart.js
      let labels = [];
      let data = [];  
       if(res?.data?.data?.length > 0){
      res?.data?.data?.forEach(item => {
        if (item?.grandTotal > 0) { // Only include days with non-zero data
          labels.push(new Date(item?.createdAt).toLocaleDateString());
          data.push(item?.grandTotal);
        }
      });

      setChartData({
        labels: labels,
        datasets: [{
          label: 'EURO',
          data: data,
          backgroundColor: '#CB95FB',
          borderColor: '#A767E0',
          borderWidth: 1
        }]
      }); 
    } 
    else{ 
      setChartData({})
    }
    }).catch((error) => { 
      if(!firstrender){
      toast.current.show({ severity: "error", summary: "Info", detail: <p className="font-poppins ">{error?.response?.data?.message ? error?.response?.data?.message : "Fetching Time Chart Data Failed"}</p> }); 
      setFirstRender(true)  
    }
    });
  }, [filter]);

  const options = {
    scales: {
      x: { 

        grid: {
          display: false // Hides the horizontal gridlines
        },
        ticks: {
          font: {
            family: 'Inter',
          // Chart.js specific
          },
          maxRotation: 0, // Prevent rotation of labels
          minRotation: 0, // Prevent rotation of labels
          autoSkip: true, // Prevent skipping of labels
        }
      },
      y: { 
        border: {
          display: false, // Hide y-axis border line
        },
        grid: {
          display: false // Hides the vertical gridlines
        },
        ticks: {
          display: false // Hides the vertical axis values
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
        labels: {
          font: {
            family: 'Inter' // Change to your desired font family
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Euro: ${context.raw}`;
          }
        },
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: 500,
          color: 'rgb(162, 94, 223)'
        },
        bodyFont: {
          family: 'Inter',
          size: 14,
          weight: 500,
          color: 'rgb(162, 94, 223)'
        },
        displayColors: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20
      }
    },
    backgroundColor: "#FBF8FF"
  };

  return (
    <div className='bg-[#FBF8FF] pt-2 pl-2 pr-2 rounded-lg overflow-hidden h-[320px]'> 
     <div className='flex flex-row flex-wrap justify-between'>
    
      <p className="font-medium font-Inter text-[18px] text-main-color mb-2">Order Timing Chart</p>  
      <div>   
        <Dropdown value={filter} onChange={(e)=>{ 
          setFilter(e.value)
        }} placeholder='filter'  optionLabel='label' optionValue='value' className='w-[150px] md:w-[200px] text-main-color border border-[#EEEEEE] rounded-md bg-[#FBF8FF]' options={[{label:"Week",value:"1"},{label:"Month",value:"2"},{label:"Year",value:"3"}]}/>
        </div>  
     </div>        
      {loader ? <div className="flex flex-wrap flex-row justify-center items-center w-full h-full"><CommonLoaderBlue/></div>:Object.keys(chartData)?.length  > 0 ? (
        <div style={{ height: "calc( 100% - 50px)" }}>
          <Bar data={chartData} options={options} />
        </div>
      ) : 
    
      <div className='w-full h-[calc(100%-50px)] flex flex-wrap flex-row justify-center items-center '> 
     <p>Data Not Found</p> 
      </div>  
       
       }
     
    </div>
  );
}
