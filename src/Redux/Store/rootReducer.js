// rootReducer.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "../Features/commonSlice";
import sensorReducer from "../Features/sensorSlice";
import { backendApi } from "./dynamicBaseQuery";

const commonPersistConfig = {
  key: "common",
  version: 1,
  storage,
};

const sensorPersistConfig = {
  key: "sensor",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [backendApi.reducerPath]: backendApi.reducer,
  common: persistReducer(commonPersistConfig, commonReducer),
  sensor: persistReducer(sensorPersistConfig, sensorReducer),
});

export default rootReducer;
