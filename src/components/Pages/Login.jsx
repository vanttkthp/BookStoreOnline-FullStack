import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  localStorage.removeItem("assessToken");
  localStorage.removeItem("assessItems");

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handle(e) {
    const { id, value } = e.target;
    setUser((prevState) => ({ ...prevState, [id]: value }));
    localStorage.setItem("userName", user.email);
  }

  const submit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    axios
      .post(`http://localhost:8081/login`, user)
      .then((response) => {
        console.log(response.data);
        alert("Bạn đã đăng nhập thành công!");

        if (user.role === "Admin") {
          localStorage.setItem("assessToken", true);
          window.location.href = "/bookinfo";
        } else {
          localStorage.setItem("assessItems", true);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Sai tài khoản hoặc mật khẩu!");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081`)
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Login</h5>
              <form onSubmit={(e) => submit(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user.email || ""}
                    onChange={(e) => handle(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={user.password || ""}
                    onChange={(e) => handle(e)}
                  />
                </div>
                <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                    className="form-control"
                    value={user.role || ""}
                    onChange={(e) => handle(e)}
                    id="role"
                  >
                    <option value="" disabled></option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
            </div>
    
                <div className="d-grid">
                  <button className="btn btn-outline-dark" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "black" }}>
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
