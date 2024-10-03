import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartAquation() {
  const options = {
    theme: "",
    animationEnabled: true,
    exportEnabled: true,
    height:200,
    data: [
      {  
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        indexLabelPlacement: "inside", 
        colorSet: ["#CD9DF8", "#6A0AC0", "#BC99DB", "#A25EDF", "#401567"], // Define an array of colors

        dataPoints: [
          { y: 32, label: "Camp 1", color: "#CD9DF8", indexLabelFontColor: "white", indexLabelFontFamily: "Poppins" },
          { y: 22, label: "Camp 2", color: "#6A0AC0", indexLabelFontColor: "white", indexLabelFontFamily: "Poppins" },
          { y: 15, label: "Camp 3", color: "#BC99DB", indexLabelFontColor: "white", indexLabelFontFamily: "Poppins" },
          { y: 19, label: "Camp 4", color: "#A25EDF", indexLabelFontColor: "white", indexLabelFontFamily: "Poppins" },
          { y: 5, label: "Camp 5", color: "#401567", indexLabelFontColor: "white", indexLabelFontFamily: "Poppins" },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default ChartAquation;
