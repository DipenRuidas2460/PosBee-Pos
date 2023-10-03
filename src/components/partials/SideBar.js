import React from "react";

function SideBar() {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion bg-theme-basic"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <a className="nav-link" href="/master">
              <div className="sb-nav-link-icon">
                <i className="fa fa-dashboard"></i>
              </div>
              <span>Home</span>
            </a>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts4"
              aria-expanded="false"
              aria-controls="collapseLayouts4"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-users"></i>
              </div>
              User Management
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts4"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  Users
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  Roles
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-handshake"></i>
                  </div>
                  Sales Commision Agents
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts5"
              aria-expanded="false"
              aria-controls="collapseLayouts5"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-address-book"></i>
              </div>
              Contacts
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts5"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  Suppliers
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  Customers
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  Customer Group
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-download"></i>
                  </div>
                  Import Contacts
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts6"
              aria-expanded="false"
              aria-controls="collapseLayouts6"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-cubes"></i>
              </div>
              Products
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts6"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List Products
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Product
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-barcode"></i>
                  </div>
                  Print Labels
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-circle"></i>
                  </div>
                  Variations
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-download"></i>
                  </div>
                  Import Products
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-download"></i>
                  </div>
                  Import Opening Stock
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-circle"></i>
                  </div>
                  Selling Price Group
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts7"
              aria-expanded="false"
              aria-controls="collapseLayouts7"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-arrow-circle-down"></i>
              </div>
              Purchases
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts7"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List Perchases
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Perchases
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                  List Perchase Return
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts8"
              aria-expanded="false"
              aria-controls="collapseLayouts8"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-arrow-circle-up"></i>
              </div>
              Sell
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts8"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  All Sales
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Sale
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List POS
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  POS
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-square-pen"></i>
                  </div>
                  List Drafts
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-square-pen"></i>
                  </div>
                  List quotations
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                  List Sell Return
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts9"
              aria-expanded="false"
              aria-controls="collapseLayouts9"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-truck"></i>
              </div>
              Stock Transfers
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts9"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List Stock Transfers
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Stock Transfer
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts10"
              aria-expanded="false"
              aria-controls="collapseLayouts10"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-database"></i>
              </div>
              Stock Adjustment
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts10"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List Stock Adjustments
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Stock Adjustment
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts1"
              aria-expanded="false"
              aria-controls="collapseLayouts1"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-minus-circle"></i>
              </div>
              Expenses
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts1"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-list"></i>
                  </div>
                  List Expenses
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  Add Expenses
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-circle"></i>
                  </div>
                  Expense Categories
                </a>
              </nav>
            </div>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-chart-column"></i>
              </div>
              Reports
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapsePages"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-money-bill-1"></i>
                  </div>
                  Profit / Loss Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-arrow-right-arrow-left"></i>
                  </div>
                  Purchase & Sale
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-brands fa-tumblr"></i>
                  </div>
                  Tax Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-address-book"></i>
                  </div>
                  Supplier & Customer Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  Customer Groups Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-hourglass-half"></i>
                  </div>
                  Stock Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-hourglass-half"></i>
                  </div>
                  Lot Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  Trending Products
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-sliders"></i>
                  </div>
                  Stock Adjustment Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-arrow-down"></i>
                  </div>
                  Product Purchase Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-circle-arrow-up"></i>
                  </div>
                  Product Sell Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-money-bill-1"></i>
                  </div>
                  Purchase Payment Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-money-bill-1"></i>
                  </div>
                  Sell Payment Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                  </div>
                  Expense Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  Register Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  Sales Representative Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-table-cells"></i>
                  </div>
                  Table Report
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-user-secret"></i>
                  </div>
                  Service Staff Report
                </a>
              </nav>
            </div>

            <a className="nav-link" href="charts.html">
              <div className="sb-nav-link-icon">
                <i className="fa-brands fa-dropbox"></i>
              </div>
              Administer Backup
            </a>

            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              Bookings
            </a>

            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-fire"></i>
              </div>
              Kitchen
            </a>

            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-rectangle-list"></i>
              </div>
              Orders
            </a>

            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              Notification Templates
            </a>

            <a
              className="nav-link collapsed"
              href="/master"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts3"
              aria-expanded="false"
              aria-controls="collapseLayouts3"
            >
              <div className="sb-nav-link-icon">
                <i className="fa fa-cog"></i>
              </div>
              Settings
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-up"></i>
              </div>
            </a>

            <div
              className="collapse"
              id="collapseLayouts3"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-gears"></i>
                  </div>
                  Business Settings
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  Business Locations
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-file"></i>
                  </div>
                  Invoice Settings
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-barcode"></i>
                  </div>
                  Barcode Settings
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                  Receipt Printers
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-regular fa-gem"></i>
                  </div>
                  Brands
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  Tax Rates
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-scale-balanced"></i>
                  </div>
                  Units
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-tags"></i>
                  </div>
                  Categories
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-table-cells"></i>
                  </div>
                  Tables
                </a>
                <a className="nav-link" href="/master">
                  <div className="sb-nav-link-icon">
                    <i className="fa-brands fa-delicious"></i>
                  </div>
                  Modifiers
                </a>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
