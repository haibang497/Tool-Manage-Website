import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import md5 from "md5";
import axios from "axios";

export function DangNhapAdmin(props) {
  const baseUrl = "/api/roles";
  const cookies = new Cookies();

  const [form, setForm] = useState({
    userAccount: "",
    password: "",
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
    await axios
      .get(baseUrl + `/${form.userAccount}/${md5(form.password)}`)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var request = response[0];
          console.log(request);
          cookies.set("userAccount", request.userAccount, { path: "/" });
          cookies.set("userName", request.userName, { path: "/" });
          cookies.set("namePer", request.namePer, { path: "/" });
          alert("Đăng Nhập Thành Công");
          cookies.get("userAccount");
          cookies.get("namePer");
          if (cookies.get("namePer") == "Full") {
            window.location.href = "/dangkyadmin";
          } else {
              window.location.href="/dangky";
          }
        } else {
          alert("Tên Đăng Nhập Hoặc Mật Khẩu Không Đúng");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (cookies.get("userAccount")) {
        window.location.href = "/dangky";
    }
  }, []);

  useEffect(()=>{
    if(cookies.get("namePer")=="Full"){
        window.location.href="/dangkyadmin";
    }
  }, [])

  return (
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <span>
                    <img src="assets\images\logo-dark.png" alt="" height={22} />
                  </span>
                  <p className="text-muted mb-4 mt-3">
                    Enter your email address and password to access admin panel.
                  </p>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="userAccount">Tên Tài Khoản</label>
                  <input
                    className="form-control"
                    required
                    placeholder="Điền Tên Tài Khoản"
                    name="userAccount"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Mật Khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    required
                    placeholder="Điền Mật Khẩu"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-0 text-center">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => login()}
                    disabled={!form.userAccount}
                    disabled={!form.password}
                  >
                    Đăng Nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
