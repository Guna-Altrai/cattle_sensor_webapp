import React, { useState } from "react";
import { LightningBoltIcon, DeviceMobileIcon } from "@heroicons/react/outline";
import { MdOutlineElectricMeter } from "react-icons/md";
import { TbCircuitAmmeter, TbCircuitVoltmeter } from "react-icons/tb";

const DetailsCard = ({ mergedData, historicalData }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedIndex(index);
  };

  const handleClose = () => {
    setExpandedIndex(null);
  };

  const calculateAveragePower = (device) => {
    let totalPower = 0;
    let count = 0;
    historicalData.forEach((dataArray) => {
      dataArray.forEach((dataItem) => {
        if (dataItem.device === device) {
          totalPower += dataItem.power;
          count++;
        }
      });
    });

    if (count === 0) return 0;

    return (totalPower / count).toFixed(2);
  };

  return (
    <div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${
          expandedIndex !== null ? "blur-sm" : ""
        }`}
      >
        {mergedData.map((data, index) => (
          <div
            key={index}
            className="card p-4 rounded-xl shadow-lg bg-white flex items-center cursor-pointer"
            style={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => handleCardClick(index)}
          >
            <div
              className="icon w-12 h-12 flex items-center justify-center rounded-full text-white mr-4"
              style={{ backgroundColor: data.color }}
            >
              {data && data.name.charAt(0)}
            </div>
            <div className="details flex-1">
              <div className="name text-lg font-bold">{data.name}</div>
              <div className="info mt-1 text-sm">
                <div className="flex items-center text-gray-600">
                  <LightningBoltIcon className="h-5 w-5 mr-2" />
                  <p>{data.power}</p>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <DeviceMobileIcon className="h-5 w-5 mr-2" />
                  <p>{data.device_name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {expandedIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-[30%] rounded-xl shadow-lg transform transition-all duration-300 ease-in-out scale-105">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {mergedData[expandedIndex].name}
              </h2>
              <button
                className="text-red-500 font-bold text-xl"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div
                className="icon w-12 h-12 flex items-center justify-center rounded-full text-white mr-4"
                style={{ backgroundColor: mergedData[expandedIndex].color }}
              >
                {mergedData[expandedIndex].name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center text-gray-600 gap-4">
                  <div className="flex flex-row items-center justify-center">
                    <LightningBoltIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    <p>{mergedData[expandedIndex].power}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <TbCircuitAmmeter className="h-5 w-5 mr-1 text-yellow-500" />
                    <p>{mergedData[expandedIndex].current}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <TbCircuitVoltmeter className="h-5 w-5 mr-1 text-yellow-500" />
                    <p>{mergedData[expandedIndex].voltage}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 mt-1">
                  <p className="text-sm font-bold opacity-80 text-black">
                    Total consumption :
                  </p>
                  <p>
                    {calculateAveragePower(mergedData[expandedIndex].device)}{" "}
                    kWh
                  </p>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <DeviceMobileIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <p>{mergedData[expandedIndex].device_name}</p>
                </div>
              </div>
            </div>
            <div>
              {/* Additional details or actions for the expanded card can be added here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
