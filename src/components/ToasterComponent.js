import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterComponent = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "green",
          },
        },
        error: {
          style: {
            background: "red",
          },
        },

        className: "",
        style: {
          padding: "8px 16px",
          color: "#fff",
          fontSize: "1.6rem",
        },
      }}
    />
  );
};

export default ToasterComponent;
