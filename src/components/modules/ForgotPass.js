import React, { useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPass({ showAlert }) {
  const emailForgotPass = useRef();
  const navigate = useNavigate();

  const handleForgotPass = () => {
    const mailInfo = { email: emailForgotPass.current.value };
    const host = `http://localhost:3010`;
    axios
      .post(`${host}/profile/forgotpass`, mailInfo)
      .then((result) => {
        if (result.data.status === "success") {
          localStorage.setItem("token", result.data.token);
          showAlert(
            "Link will be sent to your email for update password!",
            "success"
          );
          navigate("/mailsent");
        }
      })
      .catch((err) => {
        showAlert("You don't any account please register first!", "danger");
      });
  };

  return (
    <div className="container-fluid" id={"login"}>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-theme">
            <div className="card-header">
              <h4>Update Password?</h4>
            </div>
            <div className="card-body">
              <label className={"w-100"}>
                <p>Email*</p>
                <input
                  className={"form-control"}
                  type={"text"}
                  name={"email"}
                  ref={emailForgotPass}
                  required
                />
              </label>

              <div className="d-grid mt-3 pb-2">
                <button
                  className={"btn btn-outline-warning"}
                  onClick={handleForgotPass}
                >
                  Sent Reset Link
                </button>

                <p className="mt-2" style={{ color: "white" }}>
                  Don't have any account please{" "}
                  <a href="/register" style={{ color: "yellow" }}>
                    Register
                  </a>
                  <br></br>
                  If Continue to{" "}
                  <a href="/" style={{ color: "yellow" }}>
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
