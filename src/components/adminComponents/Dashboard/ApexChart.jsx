import { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { Dropdown } from 'primereact/dropdown';
const ApexChart = ({ token, toast }) => {
  const [filter, setFilter] = useState("2024")
  const [data, setData] = useState([
    ['Month', 'EURO', "EURO"],
    ['Jan', 1000, 200],
    ['Feb', 1500, 900],
    ['Mar', 1200, 100],
    ['Apr', 1800, 900],
    ['May', 80, 320],
    ['Jun', 100, 140],
    ['Jul', 120, 160],
    ['Aug', 140, 160],
    ['Sep', 190, 100],
    ['Oct', 190, 900],
    ['Nov', 189, 50],
    ['Dec', 100, 60],
  ])

  const options = {
    chart: {
      title: "Hello"
    },


    vAxis: {
      minValue: 0,
      maxValue: 1800,
      gridlines: {
        color: "#ccc", // Light gray for vertical gridlines
        count: 5,      // Number of vertical gridlines
      },
      ticks: {
        font: {
          family: 'Inter',
          // Chart.js specific
        },
        maxRotation: 0, // Prevent rotation of labels
        minRotation: 0, // Prevent rotation of labels
        autoSkip: true, // Prevent skipping of labels
      },
      textStyle: {
        color: "#A3A3A3", // Change this to your desired color
        fontSize: 12,     // Optional: Change font size
        fontName: "Inter" // Optional: Change font family
      },
      viewWindow: {
        min: 0 // Specify the minimum visible value for the vertical axis
      },
    },
    hAxis: {
      gridlines: {
        color: "#ccc", // Light gray for vertical gridlines
        count: 5,      // Number of vertical gridlines
      },
      titleTextStyle: { color: "rgb(162,94,223)" },
      ticks: {
        font: {
          family: 'Inter',
          color: "rgb(162,94,223)"
          // Chart.js specific
        },
        maxRotation: 0, // Prevent rotation of labels
        minRotation: 0, // Prevent rotation of labels
        autoSkip: true, // Prevent skipping of labels
      },
      textStyle: {
        color: "#A3A3A3", // Change this to your desired color
        fontSize: 12,     // Optional: Change font size
        fontName: "Inter" // Optional: Change font family
      },
    },
    areaOpacity: 0.3,
    // Adjust the opacity of the area under the line


    curveType: 'function', // Use 'function' for a smooth line
    colors: ['#A25EDF'], // Specify the custom line color here
    fontName: "Inter",// Set the desired font-family
    curveType: 'function', // Use 'function' for a smooth line
    colors: ['#A25EDF'], // Specify the custom line color here
    fontName: 'Inter', // Set the desired font-family

    legend: "none",
    tooltip: {
      isHtml: true,
      textStyle: {
        color: "#A25EDF",

        // Text color
      },
    }
  };

  return (
    <div className='flex flex-wrap flex-row justify-center  shadow-custom rounded-2xl  md:mt-0  h-[320px]'>
      <div className='flex flex-row flex-wrap   w-full justify-between'>
        <h1 className='font-medium font-poppins text-main-color p-4  pt-0'>Total Revenu</h1>
        <div className=''>
          <Dropdown value={filter} onChange={(e) => {
            setFilter(e.value)
          }} placeholder='Year' optionLabel='label' optionValue='value' className='w-[150px] md:w-[200px] mr-4 text-main-color border border-[#EEEEEE] rounded-md bg-[#FBF8FF]' options={[...(Array.from({ length: new Date().getFullYear() - 1933 + 1 }, (_, index) => {
            const year = 1933 + index;
            return { label: year.toString(), value: year.toString() };
          }))]} />
        </div>

      </div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="auto"
        data={data}
        options={options}
      />
    </div>
  )
}

export default ApexChart
