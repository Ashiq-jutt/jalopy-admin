import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BudgeVsSpend() {
  const options = {
    axisX: {
      valueFormatString: "####", // Display labels from 1 to 12
    }, 
    height:200, 
    data: [
      {
        type: "column",
        name: "Budget",
        showInLegend: true,
        color: "#A25EDF",

        dataPoints: [
          { label: 1, y: 5000 },
          { label: 2, y: 7000 },
          { label: 3, y: 3000 },
        
          { label: 9, y: 6000 },
          { label: 10, y: 4000 },
          { label: 11, y: 4000 },
          { label: 12, y: 4000 },
        ],
      },
      {
        type: "column", 
       
        name: "Spend", 
        
        showInLegend: true,
        color: "#CD9DF8",

        dataPoints: [
          { label: 1, y: 6000 },
          { label: 2, y: 1000 },
       
          { label: 7, y: 7000 },
          { label: 8, y: 4000 },
          { label: 9, y: 6000 },
          { label: 10, y: 4000 },
          { label: 11, y: 4000 },
          { label: 12, y: 4000 },
        ],
      },
    ], 
    axisY: { 
      minimum: 1000, // Set minimum value for X-axis
      maximum: 7000,
      interval: 1000,
      labelFontFamily: "Poppins", 
      gridThickness: 0, // Remove the Y-axis grid lines
      labelFontColor: "#A767E0", // Change Y-axis label text color to red
    },
    axisX: {      

      labelFontFamily: "Poppins", 
      gridThickness: 0, // Remove the X-axis grid lines
      labelFontColor: "#A767E0", // Change X-axis label text color to blue
    },
    // Change title text color
    title: {
      fontColor: "green", // Change title text color to green
    },
    dataPointWidth: 20, 
    // Adjust the font size to make columns BudgeVsSpendear thinner
  };

  return (
    <div className="w-full overflow-x-auto"> 
       <div className="min-w-[500px] overflow-hidden h-[200px]">
      <CanvasJSChart options={options} /> 
      </div>
    </div>
  );
}

export default BudgeVsSpend;
