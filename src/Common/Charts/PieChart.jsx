import React, { useState } from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaChevronDown } from "react-icons/fa";
import { IoArrowDownSharp, IoOpenOutline } from "react-icons/io5";

const PieChart = () => {
  const [series] = useState([44, 52]);
  const [options] = useState({
    chart: {
      type: "pie",
      width: "auto",
    },
    labels: ["Idle", "Eating"],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25,
        },
      },
    },
    responsive: [
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
    legend: {
      offsetY: 30,
    },
  });

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-row px-4 mx-0 mt-4 rounded-none justify-between md:flex-row md:items-center"
      >
        <p className="font-bold text-base flex flex-row items-center gap-2">
          Activities
        </p>
      </CardHeader>
      <div id="chart">
        <Chart options={options} series={series} type="pie" />
      </div>
      <div id="html-dist"></div>
    </Card>
  );
};

export default PieChart;
