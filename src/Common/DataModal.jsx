import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const DataModal = ({ isOpen, onClose, sensorId }) => {
  if (!isOpen) return null;

  const { userId } = useSelector((state) => state.common);
  const [sensorData, setSensorData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${window.REACT_APP_BASE_URL}latest_sensordata/${userId}/${sensorId}/`
      );
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately when modal is opened
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval); // Clear interval when modal is closed
  }, [sensorId, userId]);

  const { sensor, UID, BPM, T_IR, T_TH, GPS, X, Y, Z } = sensorData;
  const temperatureValue = T_IR !== null && T_IR !== undefined ? T_IR : T_TH;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 w-[320px] rounded-lg shadow-lg">
        <div className="flex justify-center flex-col items-center">
          <div className="flex flex-row justify-between w-full px-2 border-b-2 pb-4">
            <h1 className="font-bold text-lg self-start text-gray-800">Data</h1>
            <button onClick={onClose}>
              <IoClose className="font-bold text-red-600" />
            </button>
          </div>
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-full bg-blue-500 text-white px-6 py-4 text-center rounded-t-lg font-semibold">
              Sensor ID
              <div className="text-base font-normal mt-2">
                {sensor || "No data"}
              </div>
            </div>
            <div className="flex flex-row w-full justify-between py-4 border-b border-gray-200">
              <div className="flex-1 text-center">
                <div className="font-semibold">UID</div>
                <div className="text-gray-600 mt-1">{UID || "No data"}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-semibold">Heart Rate</div>
                <div className="text-gray-600 mt-1">{BPM || "No data"} bpm</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-semibold">Temperature</div>
                <div className="text-gray-600 mt-1">
                  {temperatureValue !== undefined && temperatureValue !== null
                    ? temperatureValue
                    : "No data"}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full pt-4">
              <div className="w-1/3 text-center border-r border-gray-200">
                <div className="font-semibold">GPS</div>
                <div className="text-gray-600 mt-1">
                  {GPS ? GPS.join(", ") : "No data"}
                </div>
              </div>
              <div className="flex flex-col w-2/3 pl-4">
                <div className="text-center font-semibold">Accelerometer</div>
                <div className="flex flex-row w-full justify-between text-center mt-2">
                  <div className="flex-1">{X || "No data"}</div>
                  <div className="flex-1">{Y || "No data"}</div>
                  <div className="flex-1">{Z || "No data"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DataModal;
