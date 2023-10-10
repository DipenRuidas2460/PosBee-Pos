import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

function Register({ showAlert }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    photo: "",
    password: "",
  });

  const navigate = useNavigate();
  const host = `http://localhost:3010`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
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
          showAlert(
            "Something Went Wrong (Please Select Prefix or Language)",
            "danger"
          );
        }
        navigate("/register");
      });
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
                    <p>Name*</p>
                    <input
                      className={"form-control"}
                      type={"text"}
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      id={"name"}
                      name={"name"}
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

      {/* <VStack spacing='5px'>
         <FormControl id="first-name" isRequired>
          <FormLabel>
          Name
          </FormLabel>
          <Input placeholder="Enter your name" id="name" name="name"  onChange={handleChange}/>
         </FormControl>
       </VStack> */}
    </>
  );
}

export default Register;
