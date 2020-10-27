import React, { useState } from "react";
import Cookies from "universal-cookie";
import md5 from "md5";
import axios from "axios";

export function DangNhap(props) {
  const baseUrl = "/api/users";
  const cookies = new Cookies();

  const [form, setForm] = useState({
    userAccount: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const login = async () => {
    await axios.get(baseUrl+`/${form.userAccount}/${md5(form.password)}`)
    .then(response=>{
        return response.data;
        console.log(response);
    }).then(response=>{
        if (response.length > 0) {
            var request = response[0];
            console.log(request);
        }
        else {
            alert("Tên Đăng Nhập Hoặc Mật Khẩu Không Đúng");
        }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <a href="index.html">
                    <span>
                      <img
                        src="assets\images\logo-dark.png"
                        alt=""
                        height={22}
                      />
                    </span>
                  </a>
                  <p className="text-muted mb-4 mt-3">
                    Enter your email address and password to access admin panel.
                  </p>
                </div>
                <form action="#">
                  <div className="form-group mb-3">
                    <label htmlFor="userAccount">Tên Tài Khoản</label>
                    <input
                      className="form-control"
                      type="userAccount"
                      id="userAccount"
                      name="userAccount"
                      required
                      placeholder="Tên Tài Khoản"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Mật Khẩu</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      required
                      id="password"
                      placeholder="Mật Khẩu"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox-signin"
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => login()}
                    >
                      {" "}
                      Đăng Nhập{" "}
                    </button>
                  </div>
                </form>
                <div className="text-center">
                  <h5 className="mt-3 text-muted">Sign in with</h5>
                  <ul className="social-list list-inline mt-3 mb-0">
                    <li className="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        className="social-list-item border-primary text-primary"
                      >
                        <i className="mdi mdi-facebook" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        className="social-list-item border-danger text-danger"
                      >
                        <i className="mdi mdi-google" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        className="social-list-item border-info text-info"
                      >
                        <i className="mdi mdi-twitter" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        className="social-list-item border-secondary text-secondary"
                      >
                        <i className="mdi mdi-github-circle" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>{" "}
              {/* end card-body */}
            </div>
            {/* end card */}
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p>
                  {" "}
                  <a href="pages-recoverpw.html" className="text-muted ml-1">
                    Forgot your password?
                  </a>
                </p>
                <p className="text-muted">
                  Don't have an account?{" "}
                  <a
                    href="pages-register.html"
                    className="text-primary font-weight-medium ml-1"
                  >
                    Sign Up
                  </a>
                </p>
              </div>{" "}
              {/* end col */}
            </div>
            {/* end row */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
      </div>{" "}
    </div>
  );
}
