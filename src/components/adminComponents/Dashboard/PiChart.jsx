import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button } from 'primereact/button';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {

  const [checkedChart, setCheckedChart] = useState(false)
  const [checkedValue, setCheckedValue] = useState(true)
  const dataOrder = {
    labels: ['Orders'],
    datasets: [
      {
        label: 'Dataset',
        data: [81, 19],  // Two values
        backgroundColor: [
          '#A25EDF',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [

        ],
        borderWidth: 0,

      },
    ],
  };
  const dataCustomer = {
    labels: ['Customer'],
    datasets: [
      {
        label: 'Dataset',
        data: [22, 78],  // Two values
        backgroundColor: [
          '#A25EDF',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [

        ],
        borderWidth: 0,

      },
    ],
  };
  const dataRevenue = {
    labels: ['Revenue'],
    datasets: [
      {
        label: 'Dataset',
        data: [64, 36],  // Two values
        backgroundColor: [
          '#A25EDF',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [

        ],
        borderWidth: 0,

      },
    ],
  };


  const options = {
    cutout: '50%', // Adjust the cutout percentage to make it a donut
    responsive: true,
    font: "Inter",

    plugins: {
      legend: {
        display: false, // Disable the legend
      },

      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
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
  };

  return (
    <div className='flex flex-wrap shadow-custom p-2  h-[320px] rounded-2xl flex-row justify-between items-center w-full'>
      <div className="w-[100%] mb-5 flex flex-wrap items-center flex-row justify-between">
        <h1 className="text-main-color font-medium">Your Pie Chart</h1>
        <div className="w-[100%] sm:w-[60%] md-w-[100%]  flex flex-row flex-wrap items-center justify-between">
          <div className="flex flex-wrap flex-row justify-between items-center gap-3">
            <input type="radio"
              id="chart"
              name="chart"
              className="hidden"
              value="chart"
              checked={checkedChart}
              onChange={() => {
                setCheckedValue(false)
                setCheckedChart(prev => !prev)
              }} />
            <label
              for="chart" className="flex items-center cursor-pointer"
            >
              <span className={`relative w-[20px] h-[20px] border items-center rounded ${checkedChart ? "border-main-color" : "border-gray-400"}  mr-2`}>
                {checkedChart ? <span className="absolute m-[4px] w-[10px] h-[10px]  bg-main rounded-sm"></span> : undefined}

              </span>
              Chart
            </label>
          </div>
          <div className="flex flex-wrap flex-row justify-between items-center gap-3">
            <input type="radio"
              id="show value"
              name="show value"
              className="hidden"
              value="show value"
              checked={checkedValue}
              onChange={() => {
                setCheckedChart(false)
                setCheckedValue(prev => !prev)
              }} />
            <label
              for="show value" className="flex items-center cursor-pointer"
            >
              <span className={`relative w-[20px] h-[20px] border items-center rounded ${checkedValue ? "border-main-color" : "border-gray-400"}  mr-2`}>
                {checkedValue ? <span className="absolute m-[4px] ml-[5] w-[10px] h-[10px]  bg-main rounded-sm"></span> : undefined}

              </span>
              Show Value
            </label>
          </div>
          <div>

            <Button icon="pi pi-ellipsis-v" className="w-[20px] text-[#999798cc]" />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap flex-row justify-between w-full '>
        <div className='md:mt-3 mt-1  w-[33%] p-[10px] md:p-[25px]'>
          <Doughnut data={dataOrder} options={options} />
          <h1 className='w-full text-center text-main-color'>Total Orders</h1>
        </div>
        <div className='md:mt-3 mt-1  md:p-[25px] p-[10px] w-[33%]'>
          <Doughnut data={dataCustomer} options={options} />
          <h1 className='w-full text-center   text-main-color'>Customer Growth</h1>

        </div>
        <div className='md:mt-3 mt-1 w-[33%] p-[10px] md:p-[25px]'>
          <Doughnut data={dataRevenue} options={options} />
          <h1 className='w-full text-center text-main-color'>Total Revenue</h1>
        </div>
      </div>
    </div>
  )
};

export default DonutChart;
