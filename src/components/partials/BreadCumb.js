import React from "react";
import { Helmet } from "react-helmet";

function BreadCrumb({ title }) {
  return (
    <>
      <Helmet>
        <title>{title} | Balaji Restaurant</title>
      </Helmet>
      <h3 className="mt-4" style={{ paddingLeft: "2%" }}>
        Dashboard
      </h3>
      <ol className="breadcrumb mb-4">
        <li
          className="breadcrumb-item text-theme-light mt-2"
          style={{ paddingLeft: "3%" }}
        >
          {title}
        </li>
      </ol>
    </>
  );
}

export default BreadCrumb;
