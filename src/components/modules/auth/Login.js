import React, { useState } from "react";

function Login() {
  const [input, setInput] = useState({});

  const handleinput = (e) => {
    setInput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  // console.log(input);

  return (
    <div className="container-fluid" id={"login"}>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-theme">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <label className={"w-100"}>
                <p>Email</p>
                <input
                  className={"form-control"}
                  type={"text"}
                  name={"email"}
                  value={input.email}
                  onChange={(e) => handleinput(e)}
                />
              </label>
              <label className={"w-100 mt-4"}>
                <p>Password</p>
                <input
                  className={"form-control"}
                  type={"password"}
                  name={"password"}
                  value={input.password}
                  onChange={(e) => handleinput(e)}
                />
              </label>

              <div className="d-grid mt-4">
                <button
                  className={"btn btn-outline-warning"}
                  // onClick={callback(input)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
