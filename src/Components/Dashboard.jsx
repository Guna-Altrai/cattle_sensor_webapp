import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headers } from "./data"; // Ensure headers are correctly defined
import { Carousel } from "@material-tailwind/react";
import Cow_1 from "../assets/Images/cow_1.jpg";
import Cow_2 from "../assets/Images/cow_2.jpg";
import Cow_3 from "../assets/Images/cow_3.jpg";
import Cow_4 from "../assets/Images/cow_4.webp";
import DataModal from "../Common/DataModal";
import Modal from "../Common/Modal";
import ConfigureSensor from "../Common/ConfigureSensor";
import useModal from "../Common/useModal";
import { deleteSensor, setSensors } from "../Redux/Features/sensorSlice";
import { useSensorsQuery } from "../Redux/Auth/Authentication.Api";
import { LuChevronsRight, LuHeartPulse } from "react-icons/lu";
import { FaArrowRight, FaTemperatureHigh } from "react-icons/fa";
import RadialChart from "../Common/RadialChart";
import DonutChart from "../Common/DonutChart";
import { IoArrowDownSharp } from "react-icons/io5";
import IdleCow from "../assets/Images/cow.png";
import EatingCow from "../assets/Images/farm.png";
import { FiDownload } from "react-icons/fi";
import Test from "../Common/Test";

export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="rounded-l-xl"
      autoplay={true}
      autoplayInterval={3000} // Adjust the interval as needed
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => {
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}
    >
      <img src={Cow_1} className="h-full w-full object-cover" alt="Cow 1" />
      <img src={Cow_2} className="h-full w-full object-cover" alt="Cow 2" />
      <img src={Cow_3} className="h-full w-full object-cover" alt="Cow 3" />
      <img src={Cow_4} className="h-full w-full object-cover" alt="Cow 4" />
    </Carousel>
  );
}

const Dashboard = () => {
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
    <div className="flex flex-row md:flex-row p-4 bg-gray-200 h-full items-center justify-between">
      <div className="w-[77%] h-full flex justify-center items-center">
        <div className="w-[30%] h-full flex justify-center items-center ">
          <CarouselCustomNavigation />
        </div>

        <div className="w-[70%] h-full flex justify-center items-center">
          <div className="relative overflow-x-auto shadow-md rounded-r-lg flex-1 h-full bg-white ">
            <div className="flex flex-row justify-between items-center p-5">
              <p className="text-lg font-bold tracking-wider">Sensor</p>
              <button
                onClick={handleAll}
                type="button"
                className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-8000"
              >
                All
              </button>
              <button
                onClick={() => setOpenAddModal(true)}
                type="button"
                className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-8000"
              >
                Add
              </button>
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
                      selectedRow === outerIndex ? "bg-green-200" : ""
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
      </div>

      <div className="w-[22%] h-full flex items-center flex-col justify-center">
        {selectedSensor ? (
          <div className="w-full h-full bg-gray-50 flex flex-col items-center p-4 shadow-md rounded-lg">
            <div className="w-full h-full rounded-lg ">
              <div className="self-start flex flex-row justify-between items-center mb-4">
                <p className="font-bold text-2xl tracking-wide text-gray-800 ">
                  Sensor Data
                </p>
                <button onClick={handleDownload}>
                  <FiDownload size={24} className="text-blue-600" />
                </button>
              </div>
              {selectedSensorId && (
                <div className=" h-[calc(100% - 40px)] bg-white shadow-md rounded-lg p-4">
                  <div className="flex flex-row w-full justify-between items-center mb-4">
                    <p className="text-xs font-semibold">{dateString}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedSensorId.name}
                    </p>
                    <p className="text-xs font-semibold">{formattedDate}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center mb-2 p-2 rounded-lg border-2">
                    <div className="flex flex-row justify-evenly w-1/2 items-center border-r-2">
                      <LuHeartPulse className="text-red-600 animate-pulse size-5" />
                      <h1 className="text-lg font-semibold text-gray-900">
                        {sensorData && sensorData[selectedSensorId.id].BPM}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-evenly w-1/2 items-center">
                      <FaTemperatureHigh className="text-blue-600" />
                      <h1 className="text-lg font-semibold text-gray-900">
                        {sensorData &&
                          selectedSensorId &&
                          (sensorData[selectedSensorId.id].T_IR != null
                            ? Number(
                                sensorData[selectedSensorId.id].T_IR
                              ).toFixed(2)
                            : sensorData[selectedSensorId.id].T_TH != null
                            ? Number(
                                sensorData[selectedSensorId.id].T_TH
                              ).toFixed(2)
                            : "nill")}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <div className="w-1/3 flex flex-col justify-evenly items-center">
                      <p className="font-bold text-base text-gray-900">x</p>
                      <p className="font-semibold text-sm text-gray-700">
                        {sensorData && selectedSensorId
                          ? sensorData[selectedSensorId.id].X || 0
                          : 0}
                      </p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-evenly items-center">
                      <p className="font-bold text-base text-gray-900">Y</p>
                      <p className="font-semibold text-sm text-gray-700">
                        {sensorData && selectedSensorId
                          ? sensorData[selectedSensorId.id].Y || 0
                          : 0}
                      </p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-evenly items-center">
                      <p className="font-bold text-base text-gray-900">Z</p>
                      <p className="font-semibold text-sm text-gray-700">
                        {sensorData && selectedSensorId
                          ? sensorData[selectedSensorId.id].Z || 0
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-white py-2 rounded-lg shadow-md flex flex-col mt-2">
                <div className="w-full px-4 mb-2 flex flex-row justify-between">
                  <p className="font-bold text-lg text-gray-800">
                    {isMilkView ? "Milk" : "Food"}
                  </p>
                  <button onClick={() => setIsMilkView(!isMilkView)}>
                    <LuChevronsRight size={24} />
                  </button>
                </div>
                {isMilkView ? (
                  <>
                    {/* for milk */}
                    <div className="px-4 w-full flex flex-col">
                      <p className="font-semibold text-sm text-gray-900">
                        Milk Produced Today : 5 litre
                      </p>
                      <p className="font-semibold text-sm my-2 text-gray-700">
                        Last week avg : 32 litre
                      </p>
                      <div className="w-full justify-between items-center flex flex-row">
                        <p className="font-semibold text-sm text-gray-700">
                          This week avg : 28 litre
                        </p>
                        <div className="flex flex-row items-center justify-between">
                          <IoArrowDownSharp className="text-red-600 animate-bounce size-4" />
                          <p className="text-xs">12.5%</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* for food */}
                    <DonutChart providedAmount={10} eatenAmount={7.6} />
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Test />
        )}
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
