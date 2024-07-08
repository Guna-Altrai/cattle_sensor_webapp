import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSensorsQuery,
  usePostSensorDataMutation,
} from "../Redux/Auth/Authentication.Api";
import { setSensors } from "../Redux/Features/sensorSlice";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { userId } = useSelector((state) => state.common);
  const sensorList = useSelector((state) => state.sensor.sensors);
  const [wsInstances, setWsInstances] = useState({}); // State to store WebSocket instances
  const [sensorData, setSensorData] = useState({}); // State to hold live sensor data
  const [postSensorData, { isLoading, isError, isSuccess }] =
    usePostSensorDataMutation(); // Correct usage here

  useEffect(() => {
    // Function to connect to a sensor
    const connectToSensor = (ipAddress, sensorId, user) => {
      const WS_URL = `ws://${ipAddress}:81`; // Assuming WebSocket is on port 81

      // Close existing WebSocket connection if it exists
      if (wsInstances[ipAddress]) {
        wsInstances[ipAddress].close();
      }

      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log(`WebSocket Connected to ${ipAddress}`);
      };

      ws.onmessage = async (e) => {
        try {
          const message = JSON.parse(e.data);
          const payload = {
            user: user,
            sensor: sensorId,
            ip_address: ipAddress,
            nfc: message.nfc || null,
            UID: message.UID || null,
            GPS: message.GPS || null,
            T_TH: message["t-th"] || null,
            T_IR: message["t-ir"] || null,
            BPM: message.BPM || null,
            X: message.X || null,
            Y: message.Y || null,
            Z: message.Z || null,
          };

          // console.log(message);
          const resp = await postSensorData(payload).unwrap();
          // console.log(resp);
        } catch (error) {
          console.error(
            `Error processing WebSocket message from ${ipAddress}:`,
            error
          );
        }
      };

      ws.onerror = (e) => {
        console.error(`WebSocket Error for ${ipAddress}:`, e.message);
      };

      ws.onclose = (e) => {
        console.log(`WebSocket Closed for ${ipAddress}`, e.code, e.reason);
      };

      // Update WebSocket instances state
      setWsInstances((prevInstances) => ({
        ...prevInstances,
        [ipAddress]: ws,
      }));
    };

    if (sensorList.length > 0) {
      sensorList.forEach((sensor) => {
        if (sensor.ip_address) {
          connectToSensor(sensor.ip_address, sensor.id, userId);
        }
      });
    } else {
      console.log("No sensors found");
    }

    // Cleanup function to close all WebSocket connections on component unmount
    return () => {
      Object.values(wsInstances).forEach((ws) => {
        ws.close();
      });
    };
  }, [sensorList, userId, postSensorData]);

  const contextValue = {
    sensorData, // Provide live sensor data through context
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
