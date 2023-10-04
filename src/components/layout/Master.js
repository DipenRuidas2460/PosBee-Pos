import React from "react";
// import { Outlet } from "react-router-dom";
import Nav from "../partials/Nav";
import SideBar from "../partials/SideBar";
import Footer from "../partials/Footer";
import Dashboard from "../modules/Dashboard";
import NotFound from "../partials/404";

function Master({ token, showAlert }) {
  return (
    <div>
      {token ? (
        <>
          <Nav />
          <div id="layoutSidenav">
            <SideBar />
            <div id="layoutSidenav_content">
              {/* <main>
                <div className="container-fluid px-4">
                  <Outlet />
                </div>
              </main> */}
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
