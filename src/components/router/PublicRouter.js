import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../modules/auth/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../modules/Register";

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default PublicRouter;
