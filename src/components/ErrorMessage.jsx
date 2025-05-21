import React from "react";

const ErrorMessage = ({ message = "Something went wrong" }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <span className="text-red-500 text-lg font-semibold">{message}</span>
  </div>
);

export default ErrorMessage;
