import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";

import axios from 'axios';

function Signup(props) {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  
  function handle(e) {
    const { id, value } = e.target;
    setUser(prevState => ({ ...prevState, [id]: value }));
 }

  const submit =async (e)=>{
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (window.confirm("Bạn chắc chắn muốn tạo tài khoản không?")) {
      axios.post(`http://localhost:8081/signup`, user)
        .then((response) => {
            console.log(response.data);
            window.location.href = '/';
            alert("Tạo tài khoản thành công!");
        })
        .catch((error) => {
            console.error(error);
            alert("Email này đã được sử dụng!");
        });
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8081`)
    .then((response) => setUser(response.data))
    .catch((err) => console.log(err))
  }, []);


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign Up</h5>
              <form onSubmit={(e)=> submit(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" >Email address</label>
                  <input type="email" className="form-control" id="email" value={user.email ||""} onChange={(e) => handle(e)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" >Password</label>
                  <input type="password" className="form-control" id="password"  value={user.password ||""} onChange={(e) => handle(e)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" >Name</label>
                  <input type="text" className="form-control" id="name" value={user.name ||""} onChange={(e) => handle(e)} />
                </div>
                <div className="d-grid">
                  <button className="btn btn-outline-dark" type="submit">Sign Up</button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>Already have an account? <Link to="/login" style={{color:"black"}}>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
