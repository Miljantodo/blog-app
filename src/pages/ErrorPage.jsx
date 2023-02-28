import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Error 404</h1>
        <h4>Page not found.</h4>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
