import React from "react";
import { Helmet } from "react-helmet";

function BreadCrumb({ title }) {
  return (
    <>
      <Helmet>
        <title>{title} | Balaji Restaurant</title>
      </Helmet>
      <h3 className="mt-4">Dashboard</h3>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item text-theme-light">{title}</li>
      </ol>
    </>
  );
}

export default BreadCrumb;
