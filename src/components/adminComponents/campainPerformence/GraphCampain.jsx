import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function GraphCampain({ color }) {
  const options = {   
    height:200,
    data: [
      {
        type: "column",
        lineJoin: "round",

        dataPoints: [
          { label: "Campaign", y: 5000 },
          { label: "", y: 7000 },
          { label: "", y: 3000 },
          { label: "", y: 6000 },
          { label: "", y: 4000 },
        ], 
         
        color: "#A25EDF",
      },
    ], 
    axisY: {
      labelFontFamily: "Poppins",  
      minimum: 2000, // Set minimum value for X-axis
      maximum: 7000,
      interval: 2000,
      gridThickness: 0, // Remove the X-axis grid lines
      labelFontColor: "#A767E0", // Remove the Y-axis grid lines
    },
    axisX: {
      labelFontFamily: "Poppins", 
      gridThickness: 0, // Remove the X-axis grid lines
      labelFontColor: "#A767E0",// Remove the X-axis grid lines
    },
  };

  return (
    <div className="w-full overflow-x-auto  overflow-hidden"> 
      <CanvasJSChart options={options} />
    </div>
  );
}

export default GraphCampain;
