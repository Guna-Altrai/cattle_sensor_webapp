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
  const [wsInstance, setWsInstance] = useState(null); // State to store WebSocket instance

  const [sensorData, setSensorData] = useState({}); // State to hold live sensor data
  const [postSensorData, { isLoading, isError, isSuccess }] =
    usePostSensorDataMutation(); // Correct usage here
  const dispatch = useDispatch();
  const { data, error } = useSensorsQuery(userId);

  useEffect(() => {
    if (data) {
      dispatch(setSensors(data));
    }
    if (error) {
      console.error("Failed to fetch sensor data:", error);
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    // WebSocket connection logic
    const connectToSensor = (ipAddress, sensorId, user) => {
      const WS_URL = `ws://${ipAddress}:81`; // Assuming WebSocket is on port 81

      if (wsInstance) {
        wsInstance.close();
      }
      let ws = new WebSocket(WS_URL);
      setWsInstance(ws);

      ws.onopen = () => {
        console.log(`WebSocket Connected to ${ipAddress}`);
      };

      ws.onmessage = async (e) => {
        try {
          const message = JSON.parse(e.data);
          // console.log(message);
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

          const resp = await postSensorData(payload).unwrap();
          setSensorData(payload);
          console.log(resp);
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

      // Clean up WebSocket on component unmount or when sensorList changes
      return () => {
        ws.close();
      };
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
  }, [sensorList, userId, postSensorData]);

  const contextValue = {
    sensorData, // Provide live sensor data through context
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
