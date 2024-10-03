function BookingActivityGraph() {
  const seriesData = [
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2],
    },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  return (
    <div className="font-inter">
      <div className="flex justify-between">
        <p className="text-[#A0E3F2] text-[1rem] font-normal">
          Booking Activity
        </p>
        <p>This Weak</p>
      </div>
      <div id="chart">
       
      </div>
    </div>
  );
}

export default BookingActivityGraph;
