import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import Chart from 'react-google-charts';
import { Toast } from 'primereact/toast';
import CommonLoaderBlue from '../../../Common/Components/Loader/LoaderBlue';

const Earnings = ({ toast }) => {
  const [loader, setLoader] = useState(true);
  const [noData, setNoData] = useState(false);
  const [overAll, setOverall] = useState(0);
  const [firstrender, setFirstRender] = useState(false);
  const [filter, setFilter] = useState("3");
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/RidePartnerDashboard/RidesGraph`,
      { headers: { Authorization: `Bearer ${token}` }, params: { TimeUnit: filter } }
    ).then(res => {
      setLoader(false);
      if (!firstrender) {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Earnings Chart Data Successfully Fetched"}
            </p>
        });
        setFirstRender(true);
      }
      let data2 = [[{ type: 'date', label: 'Date' }, 'Dollar']];
      let total = 0;
      res?.data?.data?.map(item => {
        let arr = [new Date(item?.createdAt), item?.grandTotal];
        data2.push(arr);
        total += item?.grandTotal;
      });
      if (data2.length !== 1) {
        setData(data2);
        setOverall(total);
      } else {
        setData([]);
      }
    }).catch(err => {
      if (!firstrender) {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {"Earnings Chart Data Fetching Failed"}
            </p>
        });
        setFirstRender(true);
      }
    });
  }, [filter]);

  const [data, setData] = useState([]);

  const options = {
    chart: {
      title: "Revenue"
    },
    vAxis: {
      viewWindow: {
        min: 0 // Specify the minimum visible value for the vertical axis
      },
      gridlines: {
        color: 'lightgrey', // Adjust the color of vertical gridlines
      }, 
      textStyle: {
        color: "rgb(162, 94, 223)", // Change this to your desired color
        fontSize: 12,     // Optional: Change font size
        fontName: "Inter" // Optional: Change font family
      }, 
    },
    legend: "none",
    hAxis: {
      gridlines: { count: 3, baselineColor: 'transparent' }, // Hide horizontal gridlines
      baselineColor: 'transparent',
      format: 'dd-MM-yy', // Format for the date axis
      gridlines: {
        color: 'transparent', // Hides the horizontal gridlines
      },  
      textStyle: {
        color: "rgb(162, 94, 223)", // Change this to your desired color
        fontSize: 12,     // Optional: Change font size
        fontName: "Inter" // Optional: Change font family
      }, 
    },
    areaOpacity: 0.3, // Adjust the opacity of the area under the line
    curveType: 'function', // Use 'function' for a smooth line
    colors: ['#A25EDF'], // Specify the custom line color here
    fontName: 'Poppins, sans-serif', // Set the desired font-family
    backgroundColor: "#FBF8FF",
    fontName: 'Inter', // Change to your desired font family
  };

  return (
    <div className='pt-2 pl-2 mt-4 pr-2 text-main-color rounded-lg bg-[#FBF8FF] overflow-hidden h-[320px]'>
      <div className='flex text-main-color flex-row flex-wrap items-center justify-between'>
        <div>
          <p className='tracking-wide font-[600]'>Earnings</p>
        
        </div>
        <div>
          <Dropdown value={filter} onChange={(e) => {
            setFilter(e.value)
          }} placeholder='filter' optionLabel='label' optionValue='value' className='w-[155.55px] text-main-color  rounded-md bg-[#FBF8FF]' options={[{ label: "This Week", value: "1" }, { label: "This Month", value: "2" }, { label: "This Year", value: "3" }]} />
        </div>
      </div>
      {loader ? <div className="flex flex-wrap flex-row justify-center items-center w-full h-full"><CommonLoaderBlue /></div> :
        data?.length > 0 ?
          <div className='mt-4'>
            <Chart
              chartType="AreaChart"
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

export default Earnings;
