import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const username = localStorage.getItem("userName");
  const handleLogout = () => {
    localStorage.removeItem("assessToken");
    localStorage.removeItem("assessItems");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            VAN'S BOOKSTORE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <div>
                {localStorage.getItem("assessToken") ||
                localStorage.getItem("assessItems") ? (
                  <Link to="/profile" className="nav-link">
                    Hello {username} !
                  </Link>
                ) : null}
              </div>
              <div>
                {localStorage.getItem("assessToken") ? (
                  <Link to="/bookinfo" className="nav-link">
                    Books
                  </Link>
                ) : null}
              </div>

              <li className="nav-item"></li>
            </ul>
            <ul className="navbar-nav">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {localStorage.getItem("assessToken") ||
                localStorage.getItem("assessItems") ? null : (
                  <>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                    <Link to="/signup" className="nav-link">
                      SignUp
                    </Link>
                  </>
                )}
              </div>
              <div>
                {localStorage.getItem("assessToken") ||
                localStorage.getItem("assessItems") ? (
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                ) : null}
              </div>
              <div>
                {localStorage.getItem("assessToken") ||
                localStorage.getItem("assessItems") ? (
              
                    <Link className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                
                ) : null}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
