import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/Store/store.js";
import { AuthProvider } from "./Context/useAuthContext.jsx";
import { ApiProvider } from "./Context/apiContext.jsx";
import Modal from "react-modal";

// Set the app element to the root of your application
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
