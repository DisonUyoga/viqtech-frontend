import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import {store,persistor }from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {PersistGate} from 'redux-persist/integration/react'

// axios.defaults.baseURL = "http://18.236.77.85";
axios.defaults.baseURL = "https://electronics233.pythonanywhere.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="dark"
      ></ToastContainer>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
