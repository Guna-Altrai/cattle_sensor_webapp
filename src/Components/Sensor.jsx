import React, { useState } from "react";
import { headers, sensors } from "./data";
import { FaTrashAlt } from "react-icons/fa";
import ConfigureSensor from "../Common/ConfigureSensor";

const Sensor = () => {
  const [sensorList, setSensorList] = useState(sensors);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setSensorList(sensorList.filter((sensor) => sensor.id !== id));
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-200 h-full items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
        <div className="bg-white flex flex-row justify-between items-center p-5">
          <caption className="text-lg font-bold tracking-wider">sensor</caption>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            type="button"
            class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-8000 "
          >
            <svg
              class="w-4 h-4 text-white me-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g id="Edit / Add_Plus">
                  <path
                    id="Vector"
                    d="M6 12H12M12 12H18M12 12V18M12 12V6"
                    stroke="#ffffff"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
            Add
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensorList.map((sensor, index) => (
              <tr key={index} className="bg-white border-b  ">
                {headers.map((header, index) => (
                  <td key={index} className="px-6 py-4">
                    {header.key === "action" ? (
                      <button
                        onClick={() => handleDelete(sensor.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    ) : (
                      sensor[header.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <ConfigureSensor isOpen={isModalOpen} onClose={close} />}
    </div>
  );
};

export default Sensor;
