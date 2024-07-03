import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSensorsQuery } from "../Redux/Auth/Authentication.Api";
import { setSensors } from "../Redux/Features/sensorSlice";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { userId } = useSelector((state) => state.common);
  const sensorList = useSelector((state) => state.sensor.sensors);

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
    const connectToSensor = (ipAddress) => {
      const WS_URL = `ws://${ipAddress}:81`; // Assuming WebSocket is on port 81
      let ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log(`WebSocket Connected to ${ipAddress}`);
      };

      ws.onmessage = (e) => {
        try {
          const message = JSON.parse(e.data);
          console.log(`Message from ${ipAddress}:`, message);
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
    };

    if (sensorList.length > 0) {
      sensorList.forEach((sensor) => {
        if (sensor.ip_address) {
          connectToSensor(sensor.ip_address);
        }
      });
    } else {
      console.log("No sensor found");
    }
  }, [sensorList]);

  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
