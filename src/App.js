import "./assets/css/styles.css";
import "./assets/css/style.scss";
// import { RouterProvider } from "react-router-dom";
// import ProjectRouter from "./components/router/ProjectRouter";
// import PublicRouter from "./components/router/PublicRouter";
import { useState } from "react";
import Master from "./components/layout/Master";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/modules/auth/Login";
import Alert from "./components/layout/Alert";
import NotFound from "./components/partials/404";
import ForgotPass from "./components/modules/ForgotPass";
import SentMailMessage from "./components/modules/SentMailMessage";
import ChatPage from "./components/partials/ChatPage";
import Register from "./components/modules/auth/Register";

function App() {
  const [alert, setAlert] = useState(null);
  const token = localStorage.getItem("token");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <div className="App">
      {/* {auth ? (
        <RouterProvider router={PublicRouter} />
      ) : (
        <RouterProvider router={ProjectRouter} />
      )} */}

      <Router>
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login showAlert={showAlert} />} />
            <Route exact path="/404" element={<NotFound />} />
            <Route
              exact
              path="/forgotpass"
              element={<ForgotPass showAlert={showAlert} />}
            />
            <Route exact path="/mailsent" element={<SentMailMessage />} />
            {token !== undefined && (
              <Route
                exact
                path="/master"
                element={<Master token={token} showAlert={showAlert} />}
              />
            )}

            <Route
              exact
              path="/register"
              element={<Register showAlert={showAlert} />}
            />

            <Route
              exact
              path="/chats"
              element={<ChatPage />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
