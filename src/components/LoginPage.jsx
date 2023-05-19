import React, { Component } from "react";
import "./fitsize.css";
class LoginPage extends Component {
  render() {
    return (
      <div class="container ">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="form-container shadow border">
            <h1>Đăng nhập</h1>
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Nhập email"/>
              </div>
              <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" class="form-control" id="password" placeholder="Nhập mật khẩu"/>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block">Đăng nhập</button>
              <hr/>
              <p class="text-center">Hoặc</p>
              <button type="button" class="btn btn-secondary btn-block">Đăng ký tài khoản mới</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    );
  }
}

export default LoginPage;
