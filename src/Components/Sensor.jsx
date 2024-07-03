import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfigureSensor from "../Common/ConfigureSensor";
import { deleteSensor } from "../Redux/Features/sensorSlice";

export const headers = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "IP Address", key: "ip_address" },
  { label: "Action", key: "action" },
];

const Sensor = () => {
  const dispatch = useDispatch();
  const sensorList = useSelector((state) => state.sensor.sensors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteSensor(id));
  };

  const handleEdit = (sensor) => {
    setEditingSensor(sensor);
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
    setEditingSensor(null);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-200 h-full items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
        <div className="bg-white flex flex-row justify-between items-center p-5">
          <p className="text-lg font-bold tracking-wider">Sensor</p>
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-8000"
          >
            <svg
              className="w-4 h-4 text-white me-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g id="Edit / Add_Plus">
                  <path
                    id="Vector"
                    d="M6 12H12M12 12H18M12 12V18M12 12V6"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
            Add
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              <tr key={sensor.id} className="bg-white border-b">
                {headers.map((header, index) => (
                  <td key={index} className="px-6 py-4">
                    {header.key === "action" ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(sensor)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(sensor.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : header.key === "id" ? (
                      index + 1
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
      {isModalOpen && (
        <ConfigureSensor
          isOpen={isModalOpen}
          onClose={close}
          sensor={editingSensor}
        />
      )}
    </div>
  );
};

export default Sensor;
