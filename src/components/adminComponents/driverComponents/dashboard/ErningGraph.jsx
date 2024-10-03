import { useEffect, useState } from "react";

function ErningGraph() {
  const [selectedInterval, setSelectedInterval] = useState("day");

  useEffect(() => {
    const chart = new window.CanvasJS.Chart("chartContainer", {
      animationEnabled: true,

      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
        labelAngle: -30, // Rotate x-axis labels to avoid overlap
        intervalType: "day", // Set the interval type explicitly
      },
      axisY: {
        valueFormatString: "$##0.00",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return "$" + CanvasJS.formatNumber(e.value, "##0.00");
          },
        },
        gridThickness: 0.5,
      },

      data: [
        {
          type: "area",
          xValueFormatString: "DD MMM", // Default format for day
          yValueFormatString: "$##0.00",
          dataPoints: [],
        },
      ],
    });

    // Update chart data and x-axis format based on selectedInterval
    // ...

    // Update chart data and x-axis format based on selectedInterval
    const updateChartData = () => {
      let newDataPoints = [];
      let xValueFormatString = "";

      switch (selectedInterval) {
        case "day":
          xValueFormatString = "DD"; // Day format
          for (let i = 1; i <= 31; i++) {
            newDataPoints.push({
              x: new Date(2023, 8 - 1, i),
              y: Math.random() * 100,
            });
          }
          break;
        case "week":
          xValueFormatString = "DDD"; // Week format (Day and Month)
          const currentDate = new Date(2023, 8 - 1, 1);
          for (let i = 0; i < 7; i++) {
            newDataPoints.push({
              x: new Date(currentDate),
              y: Math.random() * 100,
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
          break;
        case "month":
          xValueFormatString = "MMM"; // Month format
          for (let i = 0; i < 12; i++) {
            newDataPoints.push({
              x: new Date(2023, i),
              y: Math.random() * 100,
            });
          }
          break;
        case "year":
          xValueFormatString = "YYYY"; // Year format
          for (let i = 2001; i <= 2023; i++) {
            newDataPoints.push({ x: new Date(i, 0), y: Math.random() * 100 });
          }
          break;
        default:
          newDataPoints = [];
      }

      chart.options.axisX.valueFormatString = xValueFormatString; // Update x-axis format
      chart.options.data[0].dataPoints = newDataPoints; // Update data
      chart.render();
    };

    // ...

    // Initial chart rendering
    chart.render();

    // Render the chart whenever selectedInterval changes
    updateChartData();
  }, [selectedInterval]);

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <div className=" border shadow-xl h-fit">
      <div className="flex justify-between item-center p-2 w-full">
        <div className="text-[#A0E3F2] text-[1.5rem]">Earnings</div>
        <div className="flex items-center">
          <label htmlFor="interval">Select Interval:</label>
          <select
            id="interval"
            value={selectedInterval}
            onChange={handleIntervalChange}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <div className="h-[25rem]  font-inter ">
        <div id="chartContainer" className="w-full h-full"></div>
      </div>
    </div>
  );
}

export default ErningGraph;
