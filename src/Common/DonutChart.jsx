import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { FaChevronDown } from "react-icons/fa";

const DonutChart = ({ providedAmount, eatenAmount }) => {
  const remainingAmount = (providedAmount - eatenAmount).toFixed(1);
  const eatenAmountFixed = eatenAmount.toFixed(1);

  const [series] = useState([
    Number(eatenAmountFixed),
    Number(remainingAmount),
  ]);

  // State to track legend position
  const [legendPosition, setLegendPosition] = useState("bottom");

  // Function to handle screen size change
  const handleResize = () => {
    if (window.innerWidth >= 1400) {
      setLegendPosition("bottom");
    } else {
      setLegendPosition("right");
    }
  };

  // Effect to run on component mount and resize
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = {
    chart: {
      type: "donut",
      height: "auto", // Set height to auto for responsive resizing
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 1200, // XL breakpoint
        options: {
          chart: {
            width: 300, // Decrease width for XL devices
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Amount Eaten", "Remaining"],
    legend: {
      position: legendPosition,
      horizontalAlign: "center",
      offsetY: legendPosition === "right" ? -13 : 0,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return `${value.toFixed(1)} units`;
        },
      },
    },
  };

  return (
    <div>
      <div className="flex px-4 h-full justify-between items-center flex-row mb-2 ">
        <p className="text-base font-semibold text-gray-800 ">Food Provided</p>
        <button className="p-1 px-2 border-2 rounded-lg text-xs font-semibold text-gray-600 flex-row flex items-center gap-2">
          Week
          <FaChevronDown />
        </button>
      </div>
      <ReactApexChart options={options} series={series} type="donut" />
      <div className="px-1 w-full mt-2  ">
        <div className="border-2 px-1 py-1 rounded-lg flex flex-row items-center justify-center ">
          <div className=" w-1/3 flex items-center justify-center flex-col border-r-2">
            <p className="text-xs font-bold text-gray-800 ">Provided</p>
            <p className="text-xs text-gray-800 font-semibold ">
              {providedAmount.toFixed(1)} kg
            </p>
          </div>
          <div className=" w-1/3 flex items-center justify-center flex-col border-r-2">
            <p className="text-xs font-bold text-gray-800 ">Eaten</p>
            <p className="text-xs text-gray-800 font-semibold ">
              {eatenAmountFixed} kg
            </p>
          </div>
          <div className=" w-1/3 flex items-center justify-center flex-col">
            <p className="text-xs font-bold text-gray-800 ">Remaining</p>
            <p className="text-xs text-gray-800 font-semibold ">
              {remainingAmount} kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
