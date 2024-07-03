import React from "react";

const SensorDataModal = ({ sensor, onClose }) => {
  // Determine temperature value to display
  let temperatureValue = "No data";
  if (sensor.T_IR !== undefined && sensor.T_IR !== null) {
    temperatureValue = sensor.T_IR.toFixed(2);
  } else if (sensor.T_TH !== undefined && sensor.T_TH !== null) {
    temperatureValue = sensor.T_TH.toFixed(2);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-2/3 max-w-lg m-auto rounded-lg shadow-lg">
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            X
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Sensor Details</h2>
          <div className="mt-4">
            <div className="font-semibold">Sensor ID:</div>
            <div className="text-gray-600">{sensor.sensor || "No data"}</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">UID:</div>
            <div className="text-gray-600">{sensor.UID || "No data"}</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Heart Rate:</div>
            <div className="text-gray-600">{sensor.BPM || "No data"} bpm</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Temperature:</div>
            <div className="text-gray-600">{temperatureValue}</div>
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default SensorDataModal;
