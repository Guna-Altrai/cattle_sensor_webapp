import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfigureSensor from "../Common/ConfigureSensor";
import { deleteSensor } from "../Redux/Features/sensorSlice";
import { useApi } from "../Context/apiContext";
import { headers } from "./data";
import DataModal from "../Common/DataModal";
import Modal from "../Common/Modal";
import useModal from "../Common/useModal";

const Dashboard = () => {
  const { sensorData } = useApi();
  const dispatch = useDispatch();
  const sensorList = useSelector((state) => state.sensor.sensors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);
  const [selectedSensorId, setSelectedSensorId] = useState(null);

  const { isOpen, openModal, closeModal, modalContent, setContent } =
    useModal();

  const handleDownload = async () => {
    try {
      setContent({ loading: true, error: null, success: false });
      openModal();

      const response = await fetch(`http://192.168.1.12:9000/api/export-csv/`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sensordata.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setContent({ loading: false, error: null, success: true });
    } catch (error) {
      setContent({ loading: false, error: error.message, success: false });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSensor(id));
  };

  const openUsage = (id) => {
    setSelectedSensorId(id);
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
    setOpenAddModal(false);
  };

  const { T_IR, T_TH } = sensorData;

  let temperatureValue = "No data";
  if (T_IR !== undefined && T_IR !== null) {
    temperatureValue = T_IR.toFixed(2);
  } else if (T_TH !== undefined && T_TH !== null) {
    temperatureValue = T_TH.toFixed(2);
  }

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-200 h-full items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
        <div className="bg-white flex flex-row justify-between items-center p-5">
          <p className="text-lg font-bold tracking-wider">Sensor</p>
          <button
            onClick={() => setOpenAddModal(true)}
            type="button"
            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-8000"
          >
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
                          onClick={() => openUsage(sensor.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Open Usage
                        </button>
                        <button
                          onClick={handleDownload}
                          className="text-red-600 hover:text-red-800"
                        >
                          Download
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
        <DataModal
          isOpen={isModalOpen}
          onClose={close}
          sensorId={selectedSensorId}
        />
      )}
      {openAddModal && (
        <ConfigureSensor
          isOpen={openAddModal}
          onClose={close}
          sensor={editingSensor}
        />
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} content={modalContent} />
      )}
    </div>
  );
};

export default Dashboard;
