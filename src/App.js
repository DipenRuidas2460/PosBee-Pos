import "./assets/css/styles.css";
import "./assets/css/style.scss";
// import Master from "./components/layout/Master";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/partials/404";
import ForgotPass from "./components/modules/ForgotPass";
import SentMailMessage from "./components/modules/SentMailMessage";
import Register from "./components/modules/auth/Register";
import PasswordReset from "./components/modules/PasswordReset";
import ChatPage from "./pages/ChatPage";
import SuccessfulPasswordChangeMsg from "./components/modules/SuccessfulPasswordChangeMsg";
import HomePage from "./pages/HomePage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage  />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route
            exact
            path="/forgotpass"
            element={<ForgotPass  />}
          />

          <Route
            exact
            path={`/resetpass/${token}`}
            element={<PasswordReset  />}
          />

          <Route exact path="/mailsent" element={<SentMailMessage />} />
          <Route
            exact
            path="/success-pass-change"
            element={<SuccessfulPasswordChangeMsg />}
          />
          {token !== undefined && (
            // <Route
            //   exact
            //   path="/master"
            //   element={<Master token={token}  />}
            // />

            <Route
              exact
              path="/new-chats"
              element={<ChatPage token={token} />}
            />
          )}

          <Route
            exact
            path="/register"
            element={<Register  />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
