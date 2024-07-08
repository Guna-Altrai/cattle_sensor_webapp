import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaChevronDown } from "react-icons/fa";

const MilkChart = ({ providedAmount, eatenAmount }) => {
  const remainingAmount = (providedAmount - eatenAmount).toFixed(1);
  const eatenAmountFixed = eatenAmount.toFixed(1);

  const [series] = useState([
    Number(eatenAmountFixed),
    Number(remainingAmount),
  ]);
  const [options] = useState({
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
      position: "right",
      horizontalAlign: "center",
      offsetY: -13,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return `${value.toFixed(1)} units`;
        },
      },
    },
  });

  return (
    <div className="bg-white py-2 rounded-lg shadow-md flex flex-col">
      <div className="flex px-4 justify-between items-center flex-row mb-2 ">
        <p className="text-base font-semibold text-gray-800 ">Food Provided</p>
        <button className="p-1 px-2 border-2 rounded-lg text-xs font-semibold text-gray-600 flex-row flex items-center gap-2">
          Week
          <FaChevronDown />
        </button>
      </div>
      {/* Conditional text for XL devices */}
      <div className="hidden xl:block px-4 mb-2">
        <p className="text-xs text-gray-600">
          Amount Provided: {providedAmount.toFixed(1)} units
        </p>
      </div>
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default MilkChart;
