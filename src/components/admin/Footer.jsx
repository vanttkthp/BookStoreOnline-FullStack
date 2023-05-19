import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light " style={{ backgroundColor: '#f2f2f2'}}>
  
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="http://localhost:3000/">Trang chủ</a>
          </li>
          <li className="nav-item">
            <Link to="/booklistforadmin" className="nav-link">Danh sách sách</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Đăng nhập</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">Đăng xuất</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Footer;
