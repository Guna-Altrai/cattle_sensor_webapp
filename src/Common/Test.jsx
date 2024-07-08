import React from "react";
import Card from "./Card";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

const Test = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center">
      <div className="w-full grid grid-cols-1  gap-4">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Test;
