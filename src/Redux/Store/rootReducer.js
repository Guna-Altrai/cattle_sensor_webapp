import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "../Features/commonSlice";
import deviceReducer from "../Features/deviceSlice";
import devConReducer from "../Features/devConSlice";
import storeDataReducer from "../Features/storeDataSlice";
import { backendApi } from "./dynamicBaseQuery";

const commonPersistConfig = {
  key: "common",
  version: 1,
  storage,
};

const devicePersistConfig = {
  key: "device",
  version: 1,
  storage,
};
const devConPersistConfig = {
  key: "consumption",
  version: 1,
  storage,
};

const storeDataPersistConfig = {
  key: "storedata",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [backendApi.reducerPath]: backendApi.reducer,
  common: persistReducer(commonPersistConfig, commonReducer),
  device: persistReducer(devicePersistConfig, deviceReducer),
  consumption: persistReducer(devConPersistConfig, devConReducer),
  storedata: persistReducer(storeDataPersistConfig, storeDataReducer),
});

export default rootReducer;
