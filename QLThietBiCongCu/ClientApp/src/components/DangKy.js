import React, { Component } from "react";

export class DangKy extends Component {
  render() {
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
                      Don't have an account? Create your own account, it takes
                      less than a minute
                    </p>
                  </div>
                  <form action="#">
                    <div className="form-group">
                      <label htmlFor="fullname">Full Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id="fullname"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailaddress">Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        id="emailaddress"
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        id="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkbox-signup"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkbox-signup"
                        >
                          I accept{" "}
                          <a href="javascript: void(0);" className="text-dark">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-0 text-center">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {" "}
                        Sign Up{" "}
                      </button>
                    </div>
                  </form>
                  <div className="text-center">
                    <h5 className="mt-3 text-muted">Sign up using</h5>
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
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Already have account?{" "}
                    <a
                      href="pages-login.html"
                      className="text-muted font-weight-medium ml-1"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
