import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePasswordToggle from "../../../hook/usePasswordToggle";

function Register({ showAlert }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  const [passwordInputType1, ToggleIcon1] = usePasswordToggle();

  const navigate = useNavigate();
  const host = `http://localhost:3010`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showAlert("Password and Confirm Password not matched!", "danger");
    } else {
      axios
        .post(`${host}/profile/register`, formData)
        .then((res) => {
          if (res.status) {
            localStorage.setItem("token", res.token);
            showAlert("Account Created Sucessfully!", "success");
            navigate("/");
          } else if (res.status === "email conflict") {
            navigate("/register");
            showAlert("Email is already present!", "danger");
          } else if (res.status === "phone conflict") {
            navigate("/register");
            showAlert("Phone Number is already present!", "danger");
          }
        })
        .catch((err) => {
          if (err.response.data.status === "email conflict") {
            showAlert("Email is already present!", "danger");
          } else if (err.response.data.status === "phone conflict") {
            showAlert("Phone Number is already present!", "danger");
          } else {
            console.log(err.message);
            showAlert(
              "Something Went Wrong (Please Select Prefix or Language)",
              "danger"
            );
          }
          navigate("/register");
        });
    }
  };

  return (
    <>
      <div className="container-fluid" id={"login"}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-theme">
                <div className="card-header">
                  <h4>Create an account</h4>
                </div>
                <div className="card-body">
                  <label className={"w-100"}>
                    <p>Full Name*</p>
                    <input
                      className={"form-control"}
                      type={"text"}
                      id={"fullName"}
                      name={"fullName"}
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className={"w-100 mt-1"}>
                    <p>Email*</p>
                    <input
                      className={"form-control"}
                      type={"email"}
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
                      name="email"
                      required
                    />
                  </label>

                  <label className={"w-100 mt-1"}>
                    <p>Enter Phone Number*</p>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      id="phoneNumber"
                      name="phoneNumber"
                      minLength={10}
                      required
                    />
                  </label>

                  <label className={"w-100 mt-1"}>
                    <p>Profile Picture*</p>
                    <input
                      className={"form-control"}
                      type={"file"}
                      value={formData.photo}
                      accept=".jpg,.gif,.png"
                      onChange={handleChange}
                      id="photo"
                      name="photo"
                      required
                    />
                  </label>

                  <label className={"w-100 mt-1"}>
                    <p>Password*</p>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      className={"form-control"}
                      type={passwordInputType}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleChange(e)}
                      minLength={8}
                      maxLength={16}
                      required
                    />
                    <span className="input-group-text">{ToggleIcon}</span>
                  </div>

                  <label className={"w-100 mt-1"}>
                    <p>Confirm Password*</p>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      className={"form-control"}
                      type={passwordInputType1}
                      placeholder="Enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      id="confirmPassword"
                      name="confirmPassword"
                      minLength={8}
                      maxLength={16}
                      required
                    />
                    <span className="input-group-text">{ToggleIcon1}</span>
                  </div>

                  <div className="d-grid mt-2">
                    <button className={"btn btn-outline-warning"}>
                      Register
                    </button>
                  </div>
                  <p className="mt-2" style={{ color: "white" }}>
                    Already have a account please click here to{" "}
                    <a href="/" style={{ color: "yellow" }}>
                      LogIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
