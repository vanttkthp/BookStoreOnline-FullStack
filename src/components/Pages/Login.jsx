import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Login</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <div className="d-grid">
                  <button className="btn btn-outline-dark" type="submit">Login</button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>Don't have an account? <Link to="/signup" style={{color:"black"}}>Create an account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
