import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useSensorPostMutation } from "../Redux/Auth/Authentication.Api";
import { useDispatch, useSelector } from "react-redux";
import { addSensor } from "../Redux/Features/sensorSlice";

const ConfigureSensor = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const { userId } = useSelector((state) => state.common);
  const [sensorPost, { isLoading, isError, isSuccess }] =
    useSensorPostMutation();
  const dispatch = useDispatch();

  const connectToTab = async () => {
    const WS_URL = `ws://192.168.1.35:81`;
    let ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("sensor WebSocket Connected");
    };

    ws.onmessage = async (e) => {
      try {
        const message = JSON.parse(e.data);
        console.log(message);
      } catch (error) {
        console.error("Error processing sensor WebSocket message:", error);
      }
    };

    ws.onerror = (e) => {
      console.error("sensor WebSocket Error", e.message);
      setTimeout(() => {
        connectToTab();
      }, 5000);
    };

    ws.onclose = (e) => {
      console.log("sensor WebSocket Closed", e.code, e.reason);
    };
  };

  const onSubmit = async (data) => {
    const payload = { ...data, user: userId };
    console.log("payload sensor :", payload);
    try {
      const response = await sensorPost(payload).unwrap();
      console.log("Sensor posted successfully:", response);
      dispatch(addSensor(response));

      // Handle success (e.g., close modal, show success message)
    } catch (error) {
      console.error("Failed to post sensor:", error);
      // Handle error (e.g., show error message)
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 w-[320px] rounded-lg shadow-lg">
        <div className="flex justify-center flex-col items-center">
          <div className="flex flex-row justify-between w-full px-2 border-b-2 pb-4">
            <h1 className="font-bold text-lg self-start text-gray-800">
              Configure
            </h1>
            <button onClick={onClose}>
              <IoClose className="font-bold text-red-600" />
            </button>
          </div>

          {!isSearching ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="w-full flex items-center p-2 justify-center h-52">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Sensor Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "Sensor Name is required",
                        })}
                        className="block w-full rounded-md border-2 px-2 py-1.5 text-gray-900 shadow-sm"
                      />
                      {errors.name && (
                        <p className="text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <label
                      htmlFor="ip_address"
                      className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                    >
                      IP Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="ip_address"
                        {...register("ip_address", {
                          required: "IP Address is required",
                        })}
                        className="block w-full rounded-md border-2 px-2 py-1.5 text-gray-900 shadow-sm"
                      />
                      {errors.ip_address && (
                        <p className="text-red-600">
                          {errors.ip_address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center mt-2 justify-center h-10">
                  <button
                    type="submit"
                    className="w-full bg-green-600 h-full text-white font-semibold text-lg tracking-wider rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Next"}
                  </button>
                </div>
              </form>
              {isSuccess && (
                <div className="mt-4 text-green-600">
                  Sensor posted successfully!
                </div>
              )}
              {isError && (
                <div className="mt-4 text-red-600">
                  Failed to post sensor. Please try again.
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-full flex items-center p-2 justify-center h-52">
                Loading...
              </div>
              {isConnected && (
                <div className="w-full flex items-center mt-2 justify-center h-10">
                  <div className="p-2">
                    <p>Device Found:</p>
                    <pre>{JSON.stringify(deviceDetails, null, 2)}</pre>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-green-600 h-full text-white font-semibold text-lg tracking-wider rounded-lg"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfigureSensor;
