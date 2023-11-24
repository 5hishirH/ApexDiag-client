import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import WebsiteRouter from "./Router/WebsiteRouter.jsx";
import { AuthProvider } from "./Providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={WebsiteRouter}></RouterProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
