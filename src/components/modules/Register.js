import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ showAlert }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

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
          showAlert("Something Went Wrong", "danger");
        }
        navigate("/register");
      });
  };

  return (
    <div className="container-fluid" id={"login"}>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-theme">
              <div className="card-header">
                <h4>Create an account to Use PosBee</h4>
              </div>
              <div className="card-body">
                <label className={"w-100"}>
                  <p>Name*</p>
                  <input
                    className={"form-control"}
                    type={"text"}
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    minLength={3}
                    required
                  />
                </label>

                <label className={"w-100 mt-4"}>
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

                <label className={"w-100 mt-4"}>
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

                <label className={"w-100 mt-4"}>
                  <p>Password*</p>
                  <input
                    className={"form-control"}
                    type={"password"}
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    minLength={8}
                    maxLength={16}
                    required
                  />
                </label>

                <div className="d-grid mt-4">
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
  );
}

export default Register;
