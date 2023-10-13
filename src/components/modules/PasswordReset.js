import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hook/usePasswordToggle";

function PasswordReset({ showAlert }) {
  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  const [passwordInputType1, ToggleIcon1] = usePasswordToggle();
  const emailForgotPass = useRef();
  const emailForgotPass1 = useRef();
  const navigate = useNavigate();

  const handleForgotPass = () => {
    if (emailForgotPass.current.value !== emailForgotPass1.current.value) {
      showAlert("Password and Confirm Password not matched!", "danger");
    } else {
      const mailInfo = {
        password: emailForgotPass.current.value,
        token: localStorage.getItem("token"),
      };
      const host = `http://localhost:3010`;
      axios
        .post(`${host}/profile/resetpass`, mailInfo)
        .then((result) => {
          if (result.data.status === 200) {
            showAlert("Password Successfully Updated!", "success");
            navigate("/mailsent");
            localStorage.removeItem("token");
          } else {
            showAlert("Something went wrong!", "danger");
          }
        })
        .catch((err) => {
          showAlert("Password reset link is wrong or expired!", "danger");
        });
    }
  };

  return (
    <div className="container-fluid" id={"login"}>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-theme">
            <div className="card-header">
              <h4>Reset Password?</h4>
            </div>
            <div className="card-body">
              <label className={"w-100"}>
                <p>New Password*</p>
              </label>
              <div className="input-group mb-3">
                <input
                  className={"form-control"}
                  type={passwordInputType}
                  name={"password"}
                  id="password"
                  placeholder="Enter your password"
                  ref={emailForgotPass}
                  minLength={8}
                  maxLength={16}
                  required
                />
                <span className="input-group-text">{ToggleIcon}</span>
              </div>

              <label className={"w-100 mt-2"}>
                <p>Confirm Password*</p>
              </label>
              <div className="input-group mb-3">
                <input
                  className={"form-control"}
                  type={passwordInputType1}
                  name={"password1"}
                  id="password1"
                  placeholder="Enter your password"
                  ref={emailForgotPass1}
                  minLength={8}
                  maxLength={16}
                  required
                />
                <span className="input-group-text">{ToggleIcon1}</span>
              </div>

              <div className="d-grid mt-3 pb-2">
                <button
                  className={"btn btn-outline-warning"}
                  onClick={handleForgotPass}
                >
                  Submit
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

export default PasswordReset;
