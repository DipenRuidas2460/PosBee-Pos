import React from "react";
import $ from "jquery";

function Nav() {
  const handleSidebar = () => {
    $("body").toggleClass("sb-sidenav-toggled");
  };

  return (
    <nav className="navbar navbar-static-top" role="navigation">
      {/* Navbar Brand */}

      <a className="navbar-brand ps-3" href="/home">
        <span className="logo">Balaji Restaurant</span>
      </a>

      {/* Sidebar Toggle */}

      <button
        className="btn btn-link btn-sm order-1 order-lg-0  me-auto"
        id="sidebarToggle"
        href="/"
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
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="/">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
