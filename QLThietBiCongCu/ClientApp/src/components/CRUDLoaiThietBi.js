import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";
import Cookies from "universal-cookie";

export class FetchLoaiTb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaiTbs: [],
      loading: true,
      showAdd: false,
      showEdit: false,
      readOnly: true,
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
    this.populateLoaiTbsData();
  }

  async populateLoaiTbsData() {
    const response = await fetch("api/LoaiTbs");
    const data = await response.json();
    this.setState({
      loaiTbs: data,
      loading: false,
    });
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderLoaiTbsTable(this.state.loaiTbs)
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
                  <label for="maLoai">Mã Loại</label> &nbsp; &nbsp;
                  <input
                    name="maLoai"
                    id="maLoai"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.loaiTbs.maLoai}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="loaiTb">Loại Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="loaiTb"
                    id="loaiTb"
                    type="text"
                    className="form-control"
                    value={this.state.loaiTbs.loaiTb}
                    required=""
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
                      <h2 style={{ textAlign: "center" }}>Loại Thiết Bị</h2>
                      <p>
                        <Button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{
                            backgroundColor: "#1abc9c",
                            border: "none",
                          }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Loại Thiết Bị Mới
                        </Button>
                      </p>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="maLoai">Mã Loại</label> &nbsp; &nbsp;
                              <input
                                name="maLoai"
                                id="maLoai"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="loaiTb">Loại Thiết Bị</label> &nbsp;
                              &nbsp;
                              <input
                                name="loaiTb"
                                id="loaiTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="nguoiThucHien">Người Thực Hiện</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="nguoiThucHien"
                                id="nguoiThucHien"
                                type="text"
                                className="form-control"
                                required=""
                                value={this.cookies.get("userAccount")}
                                readOnly
                              />
                            </div>
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="button"
                            className="btn btn-icon waves-effect waves-light btn-success"
                            style={{
                              backgroundColor: "#1abc9c",
                              border: "none",
                            }}
                            onClick={this.handleSave}
                          >
                            <i class="fas fa-check"></i>
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-icon waves-effect waves-light btn-danger"
                            style={{
                              backgroundColor: "#f1556c",
                              border: "none",
                            }}
                            onClick={this.closeModalAdd}
                          >
                            <i className="fas fa-times" />
                          </Button>
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

  renderLoaiTbsTable(loaiTbs) {
    return (
      <table id="tech-companies-1" className="table table-striped">
        <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
          <tr>
            <th data-priority="1">Mã Loại</th>
            <th data-priority="3">Loại Thiết Bị</th>
            <th>Người Thực Hiện</th>
            <th data-priority="1">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {loaiTbs.map((loaiTb) => (
            <tr
              key={loaiTb.maLoai}
              onClick={(id) => this.lnk_Click(loaiTb.maLoai)}
            >
              <td>{loaiTb.maLoai}</td>
              <td>{loaiTb.loaiThietBi}</td>
              <td>{loaiTb.userDo}</td>
              <td>
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

  handleSave = (event) => {
    var newLoaiTb = {
      maLoai: document.getElementById("maLoai").value,
      loaiThietBi: document.getElementById("loaiTb").value,
      userDo: document.getElementById("nguoiThucHien").value,
    };
    axios.post("api/LoaiTbs/", newLoaiTb).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/loaithietbi";
      } else {
        alert("Thêm Không Thành Công");
      }
    });
  };
  getAll = (event) => {
    axios.get("api/LoaiTbs").then((response) => {
      var loaiTbs = response.data;
      this.renderLoaiTbsTable(loaiTbs);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("maLoai").value;
    var newLoaiTb = {
      maLoai: document.getElementById("maLoai").value,
      loaiThietBi: document.getElementById("loaiTb").value,
    };
    axios.put("api/LoaiTbs/" + id, newLoaiTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/loaithietbi";
      } else {
        alert("Không Thể Chỉnh Sửa");
      }
    });
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("maLoai").value;
    var newLoaiTb = {
      maLoai: document.getElementById("maLoai").value,
      loaiThietBi: document.getElementById("loaiTb").value,
      delete: deleted,
    };
    axios.put("api/LoaiTbs/" + id, newLoaiTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/loaithietbi";
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
    axios.get("api/LoaiTbs/" + id).then((response) => {
      var LoaiTb = response.data;
      document.getElementById("maLoai").value = LoaiTb.maLoai;
      document.getElementById("loaiTb").value = LoaiTb.loaiThietBi;
    });
  }
}
