import React from "react";
import Nav from "../partials/Nav";
import SideBar from "../partials/SideBar";
import Footer from "../partials/Footer";
import Dashboard from "../modules/Dashboard";
import NotFound from "../partials/404";

function Master({ token}) {
  return (
    <div>
      {token ? (
        <>
          <Nav />
          <div id="layoutSidenav">
            <SideBar />
            <div id="layoutSidenav_content">
              <Dashboard />
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Master;
