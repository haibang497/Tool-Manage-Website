import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";

export class DangKyAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
      showRole: false,
      offset: 0,
      perPage: 20,
      currentPage: 0,
      orgTable: [],
      pers: [],
      createval: 0,
      deleteval: 0,
      editfullval: 0,
      editbyname: 0,
      delete: 0,
      rolevalue: "1",
    };

    this._click = this._click.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  _click() {
    this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
  }

  cookies = new Cookies();
  openModalAdd = () => {
    this.setState({
      showAdd: true,
    });
  };
  openModalRole = () => {
    this.setState({
      showRole: true,
    });
  };
  openModal = () => {
    this.setState({
      showEdit: true,
    });
  };

  closeModalAdd = () => {
    this.setState({
      showAdd: false,
    });
  };
  closeModalRole = () => {
    this.setState({
      showRole: false,
    });
  };
  closeModal = () => {
    this.setState({
      showEdit: false,
    });
  };

  componentDidMount() {
    // this.populateHoaDonsData();
    this.getData();
    this.getPer();
  }

  getData = () => {
    axios.get("api/roles").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        users: slice,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData = () => {
    const data = this.state.orgTable;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      users: slice,
    });
  };
  handleChange(event) {
    this.setState({ rolevalue: event.target.value });
  }

  getPer = (event) => {
    axios.get("api/Permissions").then((response) => {
      var pernames = response.data;
      // alert(JSON.stringify(computer));

      this.setState({
        pers: pernames,
      });
    });
  };
  render() {
    let contents = this.state.loading ? (
      <p>
        <em> Loading... </em>
      </p>
    ) : (
      this.renderUsersTable(this.state.users)
    );
    return (
      <>
        <TopBar />
        <LeftSideBar />
        <div className="content-page">
          <Modal isOpen={this.state.showEdit}>
            <ModalHeader>Chỉnh Sửa</ModalHeader>
            <ModalBody>
              <form className="needs-validation">
                <div className="form-group mb-3">
                  <label for="idUser">Mã Tài Khoản</label> &nbsp; &nbsp;
                  <input
                    name="idUser"
                    id="idUser"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.users.IdUser}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="userAccount">Tên Tài Khoản</label> &nbsp; &nbsp;
                  <input
                    name="userAccount"
                    id="userAccount"
                    type="text"
                    className="form-control"
                    value={this.state.users.UserAccoount}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="password">Mật Khẩu</label> &nbsp; &nbsp;
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="form-control"
                    value={this.state.users.Password}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="userName">Tên Người Dùng</label> &nbsp; &nbsp;
                  <input
                    name="userName"
                    id="userName"
                    type="text"
                    className="form-control"
                    value={this.state.users.UserName}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="phoneNumber">Số Điện Thoại</label> &nbsp; &nbsp;
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    className="form-control"
                    value={this.state.users.PhoneNumber}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="bDay">Ngày Sinh</label> &nbsp; &nbsp;
                  <input
                    name="bDay"
                    id="bDay"
                    type="text"
                    className="form-control"
                    value={this.state.users.BDay}
                    required=""
                  />
                </div>

                <div className="form-group mb-3">
                  <label for="email">Email</label> &nbsp; &nbsp;
                  <input
                    name="email"
                    id="email"
                    type="text"
                    className="form-control"
                    value={this.state.users.Email}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="address">Địa Chỉ</label> &nbsp; &nbsp;
                  <input
                    name="address"
                    id="address"
                    type="text"
                    className="form-control"
                    value={this.state.users.Address}
                    required=""
                  />
                </div>
                <div className="form-group mb-3">
                  <label>
                    Pick your role:
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                    ></select>
                  </label>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-icon waves-effect waves-light btn-success"
                onClick={this.handleEdit}
                style={{ backgroundColor: "#1abc9c" }}
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                className="btn btn-icon waves-effect waves-light btn-danger"
                onClick={this.closeModal}
                style={{ backgroundColor: "#f1556c" }}
              >
                <i className="fas fa-times" />
              </button>
            </ModalFooter>
          </Modal>
          <div className="row">
            <div className="col-12">
              <div className="card-box">
                <div className="responsive-table-plugin">
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive"
                      data-pattern="priority-columns"
                    >
                      <p>
                        <Modal isOpen={this.state.showAdd}>
                          <ModalHeader>Thêm Thành Viên Mới</ModalHeader>
                          <ModalBody>
                            <form className="needs-validation">
                              <div className="form-group mb-3">
                                <label for="idUser">Mã Tài Khoản</label> &nbsp;
                                &nbsp;
                                <input
                                  name="idUser"
                                  id="idUser"
                                  type="text"
                                  className="form-control"
                                  required=""
                                  readOnly
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="userAccount">Tên Tài Khoản</label>{" "}
                                &nbsp; &nbsp;
                                <input
                                  name="userAccount"
                                  id="userAccount"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="password">Mật Khẩu</label> &nbsp;
                                &nbsp;
                                <input
                                  name="password"
                                  id="password"
                                  type="password"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="cfpassword">
                                  Xác Nhận Mật Khẩu
                                </label>{" "}
                                &nbsp; &nbsp;
                                <input
                                  name="cfpassword"
                                  id="cfpassword"
                                  type="password"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="userName">Tên Người Dùng</label>{" "}
                                &nbsp; &nbsp;
                                <input
                                  name="userName"
                                  id="userName"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="phoneNumber">Số Điện Thoại</label>
                                &nbsp; &nbsp;
                                <input
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="bDay">Ngày Sinh</label>
                                &nbsp; &nbsp;
                                <input
                                  name="bDay"
                                  id="bDay"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="email">Email</label>
                                &nbsp; &nbsp;
                                <input
                                  name="email"
                                  id="email"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="address">Địa Chỉ</label>
                                &nbsp; &nbsp;
                                <input
                                  name="address"
                                  id="address"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label name="per">Phân Quyền</label>
                                <select
                                  name="per"
                                  id="per"
                                  onChange={this.handleChange}
                                >
                                  {this.state.pers.map((Per) => (
                                    <option id="perval" value={Per.idPer}>
                                      {Per.namePer}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group mb-3">
                                <p> Bạn chọn {this.state.rolevalue} </p>
                              </div>
                            </form>
                          </ModalBody>
                          <ModalFooter>
                            <button
                              type="button"
                              className="btn btn-icon waves-effect waves-light btn-success"
                              style={{ backgroundColor: "#1abc9c" }}
                              onClick={this.handleSave}
                            >
                              <i class="fas fa-check"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-icon waves-effect waves-light btn-danger"
                              style={{ backgroundColor: "#f1556c" }}
                              onClick={this.closeModalAdd}
                            >
                              <i className="fas fa-times" />
                            </button>
                          </ModalFooter>
                        </Modal>
                      </p>
                      <p>
                        <Modal isOpen={this.state.showRole}>
                          <ModalHeader>Thêm Quyền Mới</ModalHeader>
                          <ModalBody>
                            <form className="needs-validation">
                              <div className="form-group mb-3">
                                <label for="nameper">Tên Quyền: </label> &nbsp;
                                &nbsp;
                                <input
                                  name="nameper"
                                  id="nameper"
                                  type="text"
                                  className="form-control"
                                  required=""
                                />
                              </div>

                              <h6>Phân quyền cho quyền mới </h6>
                              <h5 style={{ marginLeft: "10px" }}> EDIT </h5>
                              <div className="form-group mb-3">
                                <label for="edit">Edit Full</label>
                                &nbsp; &nbsp;
                                <input
                                  name="edit"
                                  id="editfull"
                                  type="radio"
                                  className="form-control"
                                  onClick={this.mycheckbox}
                                  value="1"
                                  required=""
                                  style={{ float: "left", width: "350px" }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="edit">Edit By Name</label>
                                <input
                                  name="edit"
                                  id="editbyname"
                                  type="radio"
                                  onClick={this.mycheckbox}
                                  value="2"
                                  className="form-control"
                                  required=""
                                  style={{ float: "left", width: "350px" }}
                                />
                              </div>
                              <hr />
                              <div className="form-group mb-3">
                                <label for="create">CREATE</label>

                                <input
                                  name="create"
                                  id="create"
                                  type="checkbox"
                                  onClick={this.mycheckbox}
                                  className="form-control"
                                  required=""
                                  style={{ float: "left", width: "250px" }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label for="delete">DELETE</label> &nbsp; &nbsp;
                                <input
                                  name="delete"
                                  id="delete"
                                  type="checkbox"
                                  onClick={this.mycheckbox}
                                  className="form-control"
                                  required=""
                                  style={{ float: "left", width: "250px" }}
                                />
                              </div>
                            </form>
                          </ModalBody>
                          <ModalFooter>
                            <button
                              type="button"
                              className="btn btn-icon waves-effect waves-light btn-success"
                              style={{ backgroundColor: "#1abc9c" }}
                              onClick={this.handleSaveRole}
                            >
                              <i class="fas fa-check"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-icon waves-effect waves-light btn-danger"
                              style={{ backgroundColor: "#f1556c" }}
                              onClick={this.closeModalRole}
                            >
                              <i className="fas fa-times" />
                            </button>
                          </ModalFooter>
                        </Modal>
                      </p>
                      {contents}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSideBar />
        <div className="rightbar-overlay" />
      </>
    );
  }

  mycheckbox = (event) => {
    var checkBoxCreate = document.getElementById("create");
    var checkBoxDelete = document.getElementById("delete");
    var checkBoxEditFull = document.getElementById("editfull");
    var checkBoxEditByName = document.getElementById("editbyname");
    if (checkBoxEditFull.checked) {
      this.editfullval = 1;
      this.editbyname = 0;
    } else if (checkBoxEditByName.checked) {
      this.editfullval = 0;
      this.editbyname = 1;
    }
    console.log(this.editfullval);
    console.log(this.editbyname);
    if (checkBoxCreate.checked == true) {
      this.createval = 1;
    } else {
      this.createval = 0;
      console.log(this.createval);
    }

    if (checkBoxDelete.checked == true) {
      this.deleteval = 1;
      console.log(this.deleteval);
    } else {
      this.deleteval = 0;
      console.log(this.deleteval);
    }
    console.log("create:" + this.createval + "delete" + this.deleteval);
  };

  handleSaveRole = (event) => {
    var newRole = {
      NamePer: document.getElementById("nameper").value,
      CreateRole: this.createval,
      EditByName: this.editbyname,
      EditFull: this.editfullval,
      DeleteRole: this.deleteval,
    };
    console.log(newRole);
    axios.post("api/permissions/", newRole).then((response) => {
      var result = response.data;
      if (result) {
        alert("Thêm quyền mới thành công");
        this.getAll();
        window.location.href = "/dangkyadmin";
      } else {
        alert("Không Thể Thêm Quyền Mới");
      }
    });
  };
  renderUsersTable(users) {
    if (this.cookies.get("namePer") == "Full") {
      return (
        <>
          <h2 style={{ textAlign: "center" }}> Thành Viên </h2>
          <div>
            <button
              type="button"
              className="btn btn-bordered-primary waves-effect width-md waves-light"
              style={{ backgroundColor: "#1abc9c" }}
              onClick={this.openModalAdd}
            >
              <i class="fas fa-plus" />
              &nbsp; Thêm Thành Viên Mới
            </button> &nbsp; &nbsp;
            <button
              type="button"
              className="btn btn-bordered-primary waves-effect width-md waves-light"
              style={{ backgroundColor: "#A9A9F5" }}
              onClick={this.openModalRole}
            >
              <i class="fas fa-plus" />
              &nbsp; Thêm Quyền Mới
            </button>
          </div>
          <table id="tech-companies-1" className="table table-striped">
            <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
              <tr>
                <th>Mã Tài Khoản</th>
                <th> Tên Tài Khoản </th>
                <th> Tên Người Dùng </th>
                <th> Số Điện Thoại </th>
                <th> Ngày Sinh </th>
                <th> Email </th>
                <th> Địa Chỉ </th>
                <th>Quyền</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((User) => (
                <tr key={User.idUser}>
                  <td>{User.idUser}</td>
                  <td> {User.userAccount} </td>
                  <td> {User.userName} </td>
                  <td> {User.phoneNumber} </td>
                  <td> {User.bday} </td>
                  <td> {User.email} </td>
                  <td> {User.address}</td>
                  <td>{User.namePer}</td>
                  <td onClick={() => this.lnk_Click(User.idUser)}>
                    <button
                      className="btn btn-icon waves-effect waves-light btn-warning"
                      onClick={this.openModal}
                      style={{ backgroundColor: "#f7b84b" }}
                    >
                      <i class="far fa-edit" style={{ color: "white" }}></i>
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-icon waves-effect waves-light btn-danger"
                      onClick={this.handleDeleted}
                      style={{ backgroundColor: "#f1556c" }}
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={
              <i style={{ color: "#7266ba" }} class="fas fa-chevron-left" />
            }
            nextLabel={
              <i style={{ color: "#7266ba" }} class="fas fa-chevron-right"></i>
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      );
    } else {
      return (
        <>
          <h1 style={{ textAlign: "center" }}>
            Bạn Không Có Quyền Vào Trang Này
          </h1>
        </>
      );
    }
  }

  handleSave = (event) => {
    var newUser = {
      //IdUser: 0,
      UserAccount: document.getElementById("userAccount").value,
      Password: md5(document.getElementById("password").value),
      UserName: document.getElementById("userName").value,
      PhoneNumber: document.getElementById("phoneNumber").value,
      BDay: document.getElementById("bDay").value,
      Email: document.getElementById("email").value,
      Address: document.getElementById("address").value,
      IdPer: parseInt(this.state.rolevalue),
    };

    axios.post("api/roles/", newUser).then((response) => {
      var result = response.data;
      if (result) {
        alert("Đăng Ký Thành Công");
        this.getAll();
        window.location.href = "/dangkyadmin";
      } else {
        alert("Không Thể Thêm Thành Viên");
      }
    });
  };
  getAll = (event) => {
    axios.get("api/HoaDons").then((response) => {
      var hoaDons = response.data;
      // alert(JSON.stringify(computer));
      this.renderHoaDonsTable(hoaDons);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("idUser").value;
    var newHoaDon = {
      UserAccount: document.getElementById("userAccount").value,
      Password: md5(document.getElementById("password").value),
      UserName: document.getElementById("userName").value,
      PhoneNumber: document.getElementById("phoneNumber").value,
      BDay: document.getElementById("bDay").value,
      Email: document.getElementById("email").value,
      Address: document.getElementById("address").value,
      namePer: document.getElementById("role").value,
    };
    axios.put("api/roles/" + id, newHoaDon).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/hoadon";
      } else {
        alert("Không Thể Chỉnh Sửa");
      }
    });
  };
  handleDeleted = (event) => {
    var id = document.getElementById("idUser").value;
    var newHoaDon = {
      UserAccount: document.getElementById("userAccount").value,
      Password: md5(document.getElementById("password").value),
      UserName: document.getElementById("userName").value,
      PhoneNumber: document.getElementById("phoneNumber").value,
      BDay: document.getElementById("bDay").value,
      Email: document.getElementById("email").value,
      Address: document.getElementById("address").value,
      namePer: document.getElementById("role").value,
      delete: 1,
    };
    axios.put("api/roles/" + id, newHoaDon).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/hoadon";
      } else {
        alert("Không Thể Xóa");
      }
    });
  };
  lnk_Click(id) {
    this._click();
    this.handleGetDetail(id);
  }
  handleGetDetail(id) {
    console.log(id);
    axios.get("api/roles/" + id).then((response) => {
      var HoaDon = response.data;
      document.getElementById("userAccount").value = HoaDon.userAccount;
      document.getElementById("password").value = HoaDon.password;
      document.getElementById("userName").value = HoaDon.userName;
      document.getElementById("phoneNumber").value = HoaDon.phoneNumber;
      document.getElementById("bDay").value = HoaDon.bDay;
      document.getElementById("address").value = HoaDon.address;
      document.getElementById("role").value = HoaDon.namePer;
    });
  }
}
