import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { selectDevice, deselectDevice } from "../Redux/Features/deviceSlice";

const DeviceModal = ({ isOpen, onRequestClose, activeCardId }) => {
  const dispatch = useDispatch();
  const { persons, lockedDevices } = useSelector((state) => state.device);
  const { deviceData } = useSelector((state) => state.common);
  const person = persons.find((p) => p.id === activeCardId);
  const [selectedDevices, setSelectedDevices] = useState([]);

  useEffect(() => {
    if (person) {
      setSelectedDevices(person.devices);
    }
  }, [person]);

  const handleSelectDevice = (deviceId) => {
    if (selectedDevices.some((device) => device.id === deviceId)) {
      setSelectedDevices(
        selectedDevices.filter((device) => device.id !== deviceId)
      );
    } else {
      const device = deviceData.find((device) => device.id === deviceId);
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const handleSave = () => {
    selectedDevices.forEach((device) => {
      dispatch(selectDevice({ personId: activeCardId, device }));
    });

    const deselectedDevices = person.devices.filter(
      (device) => !selectedDevices.some((d) => d.id === device.id)
    );
    deselectedDevices.forEach((device) => {
      dispatch(deselectDevice({ personId: activeCardId, deviceId: device.id }));
    });

    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Select Devices</h2>
        <ul className="list-none p-0">
          {deviceData &&
            deviceData.map((device) => (
              <li key={device.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDevices.some((d) => d.id === device.id)}
                    disabled={
                      lockedDevices.includes(device.id) &&
                      !selectedDevices.some((d) => d.id === device.id)
                    }
                    onChange={() => handleSelectDevice(device.id)}
                    className="mr-2"
                  />
                  <span>{device.name}</span>
                </label>
              </li>
            ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onRequestClose}
            className="mr-2 bg-gray-500 text-white py-1 px-3 rounded"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceModal;
