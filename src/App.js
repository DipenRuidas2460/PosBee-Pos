import "./assets/css/styles.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./assets/css/style.scss";
import { RouterProvider } from "react-router-dom";
import ProjectRouter from "./components/router/ProjectRouter";
import { useState } from "react";
import PublicRouter from "./components/router/PublicRouter";
// import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
 

  return (
    <>
      {auth ? (
        <RouterProvider router={ProjectRouter} />
      ) : ( 
        <RouterProvider router={PublicRouter} />
      )}
    </>
  );
}

export default App;
