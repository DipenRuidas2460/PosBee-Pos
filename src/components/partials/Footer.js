import React from "react";

function Footer() {
  return (
    <footer className="py-1 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-silver">Copyright &copy; Posbee {new Date().getFullYear()} | Version: 0.1.0 Beta</div>
          <div>
            <a href="/">Privacy Policy</a>
            &middot;
            <a href="/">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
