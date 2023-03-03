import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

const Root = () => {
  return (
    <>
      <Navigation />
      <div id="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
