import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

import "./toast.css";

const withToast = (WrappedComponent) => (props) => (
  <>
    <ToastContainer
      autoClose={1500}
      position="top-center"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      transition={Slide}
    />
    <WrappedComponent {...props} />
  </>
);

export { withToast, toast };
