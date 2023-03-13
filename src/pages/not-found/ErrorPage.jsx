import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
        <h1>Error 404</h1>
        <h4>Page not found.</h4>
        <button
          className={classes.button}
          onClick={() => {
            navigate("/");
          }}
        >
          Go to homepage
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
