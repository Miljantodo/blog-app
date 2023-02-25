import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

const Root = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
