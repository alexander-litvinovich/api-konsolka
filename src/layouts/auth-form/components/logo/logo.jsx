import React from "react";

import { cssUtils } from "utils";

import "./logo.css";

const Logo = (props) => {
  return (
    <div className={cssUtils(props, "Logo")}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.6276 0.135653C18.9409 -0.0452178 19.3269 -0.0452178 19.6402 0.135653L22.5736 1.82926C22.8869 2.01013 23.0799 2.3444 23.0799 2.70614V6.09334C23.0799 6.4551 22.8869 6.78938 22.5736 6.97024L19.6402 8.66382C19.3269 8.84473 18.9409 8.84473 18.6276 8.66382L15.6942 6.97024C15.381 6.78938 15.188 6.4551 15.188 6.09334V2.70614C15.188 2.3444 15.381 2.01013 15.6942 1.82926L18.6276 0.135653Z" />
        <path d="M13.565 8.23586C13.8783 8.05501 14.2643 8.05501 14.5776 8.23586L17.511 9.92945C17.8243 10.1104 18.0172 10.4446 18.0172 10.8063V14.1936C18.0172 14.5553 17.8243 14.8896 17.511 15.0704L14.5776 16.7641C14.2643 16.9449 13.8783 16.9449 13.565 16.7641L10.6317 15.0704C10.3183 14.8896 10.1254 14.5553 10.1254 14.1936V10.8063C10.1254 10.4446 10.3183 10.1104 10.6317 9.92945L13.565 8.23586Z" />
        <path d="M8.50243 16.3361C8.81568 16.1552 9.2017 16.1552 9.51495 16.3361L12.4484 18.0297C12.7616 18.2106 12.9547 18.5449 12.9547 18.9066V22.2938C12.9547 22.6556 12.7616 22.9899 12.4484 23.1707L9.51495 24.8643C9.2017 25.0452 8.81568 25.0452 8.50243 24.8643L8.02218 24.5871L7.03569 24.0175L6.04921 23.4479L5.56901 23.1707C5.25573 22.9899 5.06274 22.6556 5.06274 22.2938V18.9066C5.06274 18.5449 5.25573 18.2106 5.56901 18.0297L8.50243 16.3361Z" />
        <path d="M3.43968 8.23586C3.75296 8.05501 4.13893 8.05501 4.45221 8.23586L7.38561 9.92945C7.69891 10.1104 7.89189 10.4446 7.89189 10.8063V14.1936C7.89189 14.5553 7.69891 14.8896 7.38561 15.0704L4.45221 16.7641C4.13893 16.9449 3.75296 16.9449 3.43968 16.7641L0.506265 15.0704C0.192987 14.8896 0 14.5553 0 14.1936V10.8063C0 10.4446 0.192987 10.1104 0.506265 9.92945L3.43968 8.23586Z" />
      </svg>
    </div>
  );
};

export default Logo;
