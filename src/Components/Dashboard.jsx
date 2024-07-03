import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100 max-h-screen">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="w-full bg-blue-500 text-white px-6 py-4 text-center rounded-t-lg font-semibold">
          Sensor ID
          <div className="text-base font-normal mt-2">12345</div>
        </div>
        <div className="flex flex-row w-full justify-between py-4 border-b border-gray-200">
          <div className="flex-1 text-center">
            <div className="font-semibold">UID</div>
            <div className="text-gray-600 mt-1">A1B2C3</div>
          </div>
          <div className="flex-1 text-center">
            <div className="font-semibold">Heart Rate</div>
            <div className="text-gray-600 mt-1">72 bpm</div>
          </div>
          <div className="flex-1 text-center">
            <div className="font-semibold">Temperature</div>
            <div className="text-gray-600 mt-1">98.6°F</div>
          </div>
        </div>
        <div className="flex flex-row w-full pt-4">
          <div className="w-1/3 text-center border-r border-gray-200">
            <div className="font-semibold">GPS</div>
            <div className="text-gray-600 mt-1">37.7749° N, 122.4194° W</div>
          </div>
          <div className="flex flex-col w-2/3 pl-4">
            <div className="text-center font-semibold">Accelerometer</div>
            <div className="flex flex-row w-full justify-between text-center mt-2">
              <div className="flex-1">x</div>
              <div className="flex-1">y</div>
              <div className="flex-1">z</div>
            </div>
            <div className="flex flex-row w-full justify-between text-center mt-1 text-gray-600">
              <div className="flex-1">0.98</div>
              <div className="flex-1">0.45</div>
              <div className="flex-1">0.12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
