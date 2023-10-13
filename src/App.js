import "./assets/css/styles.css";
import "./assets/css/style.scss";
import { useState } from "react";
import Master from "./components/layout/Master";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/modules/auth/Login";
import Alert from "./components/layout/Alert";
import NotFound from "./components/partials/404";
import ForgotPass from "./components/modules/ForgotPass";
import SentMailMessage from "./components/modules/SentMailMessage";
import Register from "./components/modules/auth/Register";
import PasswordReset from "./components/modules/PasswordReset";
import ChatPage from "./components/partials/ChatPage";

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

            <Route
              exact
              path={`/resetpass/${token}`}
              element={<PasswordReset showAlert={showAlert} />}
            />

            <Route exact path="/mailsent" element={<SentMailMessage />} />
            {token !== undefined && (
              <>
                <Route
                  exact
                  path="/master"
                  element={<Master token={token} showAlert={showAlert} />}
                />

                <Route exact path="/chat" element={<ChatPage />} />
              </>
            )}

            <Route
              exact
              path="/register"
              element={<Register showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
