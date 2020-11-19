import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";
import Cookies from "universal-cookie";
export class FetchNhomKDs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhomKds: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
    };

    this._click = this._click.bind(this);
  }
  cookies = new Cookies();
  _click() {
    this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
  }

  openModalAdd = () => {
    this.setState({
      showAdd: true,
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

  closeModal = () => {
    this.setState({
      showEdit: false,
    });
  };

  componentDidMount() {
    this.populateNhomKdsData();
  }

  async populateNhomKdsData() {
    const response = await fetch("api/NhomKds");
    const data = await response.json();
    this.setState({
      nhomKds: data,
      loading: false,
    });
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderNhomKdsTable(this.state.nhomKds)
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
                  <label for="maNhomKd">Mã Nhóm Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="maNhomKd"
                    id="maNhomKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.nhomKds.maNhomKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="nhomKd">Nhóm Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="nhomKd"
                    id="nhomKd"
                    type="text"
                    className="form-control"
                    value={this.state.nhomKds.nhomKd}
                    required=""
                  />
                </div>
                <div>
                  <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp;
                  &nbsp;
                  <input
                    name="nguoiThucHien"
                    id="nguoiThucHien"
                    type="text"
                    className="form-control"
                    value={this.state.nhomKds.userDo}
                    required=""
                    readOnly
                  />
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
                      <h2 style={{ textAlign: "center" }}>Nhóm Kiểm Định</h2>
                      <p>
                        <button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{ backgroundColor: "#1abc9c" }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Nhóm Kiểm Định Mới
                        </button>
                      </p>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="maNhomKd">Mã Nhóm Kiểm Định</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="maNhomKd"
                                id="maNhomKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="nhomKd">Nhóm Kiểm Định</label> &nbsp;
                              &nbsp;
                              <input
                                name="nhomKd"
                                id="nhomKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div>
                              <label for="nguoiThucHien">Người Thực Hiện</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="nguoiThucHien"
                                id="nguoiThucHien"
                                type="text"
                                className="form-control"
                                value={this.cookies.get("userAccount")}
                                required=""
                                readOnly
                              />
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

  renderNhomKdsTable(nhomKds) {
    if (
      this.cookies.get("namePer") == "Full" ||
      this.cookies.get("namePer") == "Manager"
    ) {
      return (
        <table id="tech-companies-1" className="table table-striped">
          <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
            <tr>
              <th>Mã Nhóm Kiểm Định</th>
              <th>Nhóm Kiểm Định</th>
              <th>Người Thực Hiện</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {nhomKds.map((nhomKd) => (
              <tr key={nhomKd.maNhomKd}>
                <td>{nhomKd.maNhomKd}</td>
                <td>{nhomKd.nhomKiemDinh}</td>
                <td>{nhomKd.userDo}</td>
                <td onClick={(id) => this.lnk_Click(nhomKd.maNhomKd)}>
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
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table id="tech-companies-1" className="table table-striped">
          <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
            <tr>
              <th>Mã Nhóm Kiểm Định</th>
              <th>Nhóm Kiểm Định</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {nhomKds.map((nhomKd) => (
              <tr key={nhomKd.maNhomKd}>
                <td>{nhomKd.maNhomKd}</td>
                <td>{nhomKd.nhomKiemDinh}</td>
                <td onClick={(id) => this.lnk_Click(nhomKd.maNhomKd)}>
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
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  handleSave = (event) => {
    var newNhomKd = {
      maNhomKd: document.getElementById("maNhomKd").value,
      nhomKiemDinh: document.getElementById("nhomKd").value,
      userDo: document.getElementById("nguoiThucHien").value,
    };
    axios.post("api/NhomKds/", newNhomKd).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/nhomkiemdinh";
      } else {
        alert("Không Thể Thêm Dữ Liệu");
      }
    });
  };
  getAll = (event) => {
    axios.get("api/NhomKds").then((response) => {
      var nhomKds = response.data;
      // alert(JSON.stringify(computer));
      this.renderNhomKdsTable(nhomKds);
    });
  };
  handleEdit = (event) => {
    if (
      this.cookies.get("namePer") == "Full" ||
      this.cookies.get("namePer") == "Manager"
    ) {
      var id = document.getElementById("maNhomKd").value;
      var newNhomKd = {
        maNhomKd: document.getElementById("maNhomKd").value,
        nhomKiemDinh: document.getElementById("nhomKd").value,
      };
      axios.put("api/NhomKds/" + id, newNhomKd).then((response) => {
        console.log(response);
        var result = response.data;
        console.log(result);
        if (!result) {
          this.getAll();
          window.location.href = "/nhomkiemdinh";
        } else {
          alert("Không Thể Chỉnh Sửa");
        }
      });
    } else if (
      this.cookies.get("namePer") == "Staff" &&
      this.cookies.get("userAccount") ===
        document.getElementById("nguoiThucHien").value
    ) {
      var id = document.getElementById("maNhomKd").value;
      var newNhomKd = {
        maNhomKd: document.getElementById("maNhomKd").value,
        nhomKiemDinh: document.getElementById("nhomKd").value,
      };
      axios.put("api/NhomKds/" + id, newNhomKd).then((response) => {
        console.log(response);
        var result = response.data;
        console.log(result);
        if (!result) {
          this.getAll();
          window.location.href = "/nhomkiemdinh";
        } else {
          alert("Không Thể Chỉnh Sửa");
        }
      });
    } else {
      alert("Bạn Không Được Phép Thực Hiện Thao Tác Này");
    }
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("maNhomKd").value;
    var newNhomKd = {
      maNhomKd: document.getElementById("maNhomKd").value,
      nhomKiemDinh: document.getElementById("nhomKd").value,
      delete: deleted,
    };
    axios.put("api/NhomKds/" + id, newNhomKd).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/nhomkiemdinh";
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
    axios.get("api/NhomKds/" + id).then((response) => {
      var NhomKd = response.data;
      document.getElementById("maNhomKd").value = NhomKd.maNhomKd;
      document.getElementById("nhomKd").value = NhomKd.nhomKiemDinh;
      document.getElementById("nguoiThucHien").value = NhomKd.userDo;
    });
  }
}
