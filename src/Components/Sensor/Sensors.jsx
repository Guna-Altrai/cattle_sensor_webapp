import React from "react";
import { CarouselCustomNavigation } from "../../Common/Carousel/Carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaTemperatureHigh } from "react-icons/fa";
import IdleCow from "../../assets/Images/cow.png";
import EatingCow from "../../assets/Images/farm.png";
import { TiPlus } from "react-icons/ti";
import { headers } from "../data";
import { useSensorsQuery } from "../../Redux/Auth/Authentication.Api";
import { deleteSensor, setSensors } from "../../Redux/Features/sensorSlice";
import ConfigureSensor from "../../Common/ConfigureSensor";
import Modal from "../../Common/Modal";
import useModal from "../../Common/useModal";

const Sensors = () => {
  const dispatch = useDispatch();
  const sensorList = useSelector((state) => state.sensor.sensors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const { isOpen, openModal, closeModal, modalContent, setContent } =
    useModal();
  const { userId } = useSelector((state) => state.common);
  const { data, error } = useSensorsQuery(userId);

  const [isMilkView, setIsMilkView] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null); // State to keep track of the selected row

  useEffect(() => {
    if (data) {
      dispatch(setSensors(data));
    }
    if (error) {
      console.error("Failed to fetch sensor data:", error);
    }
  }, [data, error, dispatch]);

  const handlePress = (id, sensor) => {
    console.log("id :", id, "sensor :", sensor);
    setSelectedRow(id);
    setSelectedSensorId(sensor);
  };

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

  const openUsage = (data) => {
    setSelectedSensorId(data);
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
    setOpenAddModal(false);
  };

  const [sensorData, setSensorData] = useState({});

  const fetchData = async (sensorId) => {
    try {
      const response = await fetch(
        `${window.REACT_APP_BASE_URL}latest_sensordata/${userId}/${sensorId}/`
      );
      const data = await response.json();
      setSensorData((prevData) => ({
        ...prevData,
        [sensorId]: data, // Store data with sensorId as key
      }));
    } catch (error) {
      console.error(`Error fetching data for sensor ${sensorId}:`, error);
    }
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      await Promise.all(sensorList.map((sensor) => fetchData(sensor.id)));
    };

    fetchSensorData(); // Fetch initial data

    const interval = setInterval(() => {
      fetchSensorData(); // Fetch data every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [sensorList, userId]); // Depend on sensorList and userId

  const selectedSensor = sensorData[selectedSensorId?.id];

  const formattedDate = selectedSensor?.sensordata_date
    ? new Date(selectedSensor.sensordata_date).toLocaleTimeString()
    : "";

  const dateString = selectedSensor?.sensordata_date
    ? new Date(selectedSensor.sensordata_date).toLocaleDateString()
    : "";

  const handleAll = () => {
    setSelectedSensorId(null);
    setSelectedRow(null);
  };

  return (
    <div className="w-full h-full p-4 flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="relative overflow-x-auto shadow-md rounded-r-lg flex-1 h-full bg-white ">
          <div className="flex flex-row justify-between items-center p-3">
            <p className="text-lg font-bold tracking-wider">Sensor</p>
            <div className="gap-2 flex">
              <button
                onClick={() => setOpenAddModal(true)}
                type="button"
                className="px-2 gap-1 py-1 text-xs font-medium text-center inline-flex items-center text-blue-700 border-2 border-blue-700 rounded-lg hover:bg-blue-8000"
              >
                <TiPlus />
                Add
              </button>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right ">
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
              {sensorList.map((sensor, outerIndex) => (
                <tr
                  key={sensor.id}
                  className={`bg-white  border-b ${
                    selectedRow === outerIndex ? "bg-green-300" : ""
                  }`}
                >
                  {headers.map((header, innerIndex) => {
                    return (
                      <td key={innerIndex} className="pl-6 ">
                        {header.key === "action" ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              {outerIndex === 0 && (
                                <div className="flex items-center space-x-1">
                                  <img
                                    src={IdleCow}
                                    alt="Idle"
                                    className="w-5 h-5"
                                  />
                                  <span>Idle</span>
                                </div>
                              )}
                              {outerIndex === 1 && (
                                <div className="flex items-center space-x-1">
                                  <img
                                    src={EatingCow}
                                    alt="Eating"
                                    className="w-6 h-6"
                                  />
                                  <span>Eating</span>
                                </div>
                              )}
                            </div>
                            <button
                              className="h-10 w-10 flex justify-center items-center rounded-r-lg border-2 border-gray-100 border-l-0"
                              onClick={() => handlePress(outerIndex, sensor)}
                            >
                              <FaArrowRight className="text-gray-500" />
                            </button>
                          </div>
                        ) : header.key === "id" ? (
                          outerIndex + 1
                        ) : header.key === "name" ? (
                          sensor.name // Display sensor's name
                        ) : sensor[header.key] !== null &&
                          sensor[header.key] !== undefined ? (
                          "N/A"
                        ) : header.key === "T_TH" ? (
                          sensorData[sensor.id] &&
                          sensorData[sensor.id].T_TH !== null ? (
                            `${parseFloat(sensorData[sensor.id].T_TH).toFixed(
                              2
                            )} °C`
                          ) : (
                            "N/A"
                          )
                        ) : header.key === "BPM" ? (
                          sensorData[sensor.id] &&
                          sensorData[sensor.id].BPM !== null ? (
                            sensorData[sensor.id].BPM
                          ) : (
                            "N/A"
                          )
                        ) : (
                          sensor[header.key]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default Sensors;
