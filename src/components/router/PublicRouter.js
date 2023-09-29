import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../modules/auth/Login";
import AuthLayout from "../layout/AuthLayout";

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {
        path: "/",
        element: <Login/>,
      },
    ],
  },
]);

export default PublicRouter;
