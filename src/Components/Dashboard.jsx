import React from "react";
import CattleDetails from "../Common/Cards/CattleDetails";
import { CattleCard } from "../Common/data";
import BarChart from "../Common/Charts/BarChart";

const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap md:flex-nowrap md:space-x-4">
        <div className=" lg:w-[75%] w-full  mb-4 md:mb-0 ">
          <CattleDetails cattleData={CattleCard} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
