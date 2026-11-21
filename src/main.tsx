import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setupMockServer } from "./services";
import "./index.css";

setupMockServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
