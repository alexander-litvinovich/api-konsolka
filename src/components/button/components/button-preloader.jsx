import React from "react";

export default function ButtonPreloader() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="ButtonPreloader"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
      />
      <path d="M17.0711 17.0711C15.2614 18.8807 12.7614 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C12.7614 0 15.2614 1.11929 17.0711 2.92893L15.6569 4.34315C14.2091 2.89543 12.2091 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.2091 18 14.2091 17.1046 15.6569 15.6569L17.0711 17.0711Z" />
    </svg>
  );
}
