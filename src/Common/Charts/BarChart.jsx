import { Card, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BiHelpCircle } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { IoArrowDownSharp, IoOpenOutline } from "react-icons/io5";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
  type: "bar",
  height: "auto",
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: -5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function BarChart() {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-row px-4 mx-0 mt-4 rounded-none justify-between md:flex-row md:items-center"
      >
        <p className="font-bold text-base flex flex-row items-center gap-2">
          Milk Produced
          <button>
            <IoOpenOutline />
          </button>
        </p>
        <button className="p-1 px-2 border-2 rounded-lg text-xs font-semibold text-gray-600 flex-row flex items-center gap-2">
          Week
          <FaChevronDown />
        </button>
      </CardHeader>
      <div className="px-4 flex flex-row justify-between items-center w-full mt-3">
        <div className="border-2 rounded-lg flex flex-row flex-1">
          <div className="flex flex-col flex-1 text-center border-r-2">
            <p className="text-xs font-semibold text-gray-700">Total</p>
            <div className="text-xs font-normal text-gray-800 flex flex-row items-center justify-center">
              <p>5,21,111 L</p>
              <div className="flex flex-row items-center justify-center ml-2">
                <IoArrowDownSharp className="text-red-600 size-3" />
                <p className="text-[9px] text-red-600 ml-1">12.5%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 text-center border-r-2">
            <p className="text-xs font-semibold text-gray-700">Average</p>
            <div className="text-xs font-normal text-gray-800 flex flex-row items-center justify-center">
              <p>5,21,111 L</p>
              <div className="flex flex-row items-center justify-center ml-2">
                <IoArrowDownSharp className="text-red-600 size-3" />
                <p className="text-[9px] text-red-600 ml-1">12.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chart {...chartConfig} />
    </Card>
  );
}
