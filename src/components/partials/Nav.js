import React, { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const navigate = useNavigate();

  const handleSidebar = () => {
    $("body").toggleClass("sb-sidenav-toggled");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-static-top" role="navigation">
      {/* Navbar Brand */}

      <a className="navbar-brand ps-3" href="/master">
        <span className="logo">Balaji Restaurant</span>
      </a>

      {/* Sidebar Toggle */}

      <button
        className="btn btn-link btn-sm order-1 order-lg-0  me-auto"
        id="sidebarToggle"
        href="/master"
        onClick={handleSidebar}
        style={{ color: "#fff" }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Navbar */}

      <ul className="navbar-nav align-items-center ms-auto  me-3 me-lg-4">
        <li className="nav-item dropdown">
          <p className="text-white">Admin</p>
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="/master"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={toggleContent}
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="/master">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/master">
                Activity Log
              </a>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
