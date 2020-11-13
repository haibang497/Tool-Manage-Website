import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";
import Cookies from "universal-cookie";

export class FectchDongTb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dongTbs: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
      offset: 0,
      perPage: 25,
      currentPage: 0,
      orgTable: [],
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
    // this.populateDongTbsData();
    this.getData();
  }

  async populateDongTbsData() {
    const response = await fetch("api/DongTbs");
    const data = await response.json();
    this.setState({
      dongTbs: data,
      loading: false,
    });
  }

  getData = () => {
    axios.get("api/DongTbs").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        dongTbs: slice,
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
      dongTbs: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDongTbsTable(this.state.dongTbs)
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
                  <label for="IdDongtb">Mã Dòng Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="IdDongtb"
                    id="IdDongtb"
                    type="text"
                    className="form-control"
                    readOnly
                    value={this.state.dongTbs.iddongTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tenDongTb">Tên Dòng Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="tenDongTb"
                    id="tenDongTb"
                    type="text"
                    className="form-control"
                    value={this.state.dongTbs.dongTb1}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="IdNhomTb">Mã Nhóm Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="IdNhomTb"
                    id="IdNhomTb"
                    type="text"
                    className="form-control"
                    value={this.state.dongTbs.idnhomTb}
                  />
                            </div>
                            <div className="form-group mb-3">
                                <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp; &nbsp;
                  <input
                                    name="nguoiThucHien"
                                    id="nguoiThucHien"
                                    type="text"
                                    className="form-control"
                                    value={this.state.dongTbs.userDo}
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
                      <h2 style={{ textAlign: "center" }}>Dòng Thiết Bị</h2>
                      <p>
                        <button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{ backgroundColor: "#1abc9c" }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Dòng Thiết Bị Mới
                        </button>
                      </p>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="IdDongtb">Mã Dòng Thiết Bị</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="IdDongtb"
                                id="IdDongtb"
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tenDongTb">Tên Dòng Thiết Bị</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="tenDongTb"
                                id="tenDongTb"
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="IdNhomTb">Mã Nhóm Thiết Bị</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="IdNhomTb"
                                id="IdNhomTb"
                                type="text"
                                className="form-control"
                              />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp;
                              &nbsp;
                              <input
                                                            name="nguoiThucHien"
                                                            id="nguoiThucHien"
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                            value={this.cookies.get("userAccount")}
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
                <ReactPaginate
                  previousLabel={
                    <i
                      style={{ color: "#7266ba" }}
                      class="fas fa-chevron-left"
                    />
                  }
                  nextLabel={
                    <i
                      style={{ color: "#7266ba" }}
                      class="fas fa-chevron-right"
                    ></i>
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
              </div>
            </div>
          </div>
        </div>
        <RightSideBar />
        <div className="rightbar-overlay" />
      </>
    );
  }

  renderDongTbsTable(dongTbs) {
    return (
      <div className="infor">
        <table id="tech-companies-1" class="table table-striped">
          <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
            <tr>
              <th data-priority="3" style={{ textAlign: "center" }}>
                Mã Dòng Thiết Bị
              </th>
              <th data-priority="1" style={{ textAlign: "center" }}>
                Tên Dòng Thiết Bị
              </th>
              <th data-priority="3" style={{ textAlign: "center" }}>
                            Mã Nhóm Thiết Bị
              </th>
                        <th data-priority="3" style={{ textAlign: "center" }}>
                           Người Thực Hiện
              </th>
              <th data-priority="3" style={{ textAlign: "center" }}>
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {dongTbs.map((dongTb) => (
              <tr key={dongTb.iddongTb}>
                <td style={{ textAlign: "center" }}>{dongTb.iddongTb}</td>
                <td style={{ textAlign: "center" }}>{dongTb.dongTb1}</td>
                    <td style={{ textAlign: "center" }}>{dongTb.idnhomTb}</td>
                    <td style={{ textAlign: "center" }}>{dongTb.userDo}</td>
                <td onClick={() => this.lnk_Click(dongTb.iddongTb)}>
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
      </div>
    );
  }

  handleSave = (event) => {
    var newDongTb = {
      iddongTb: document.getElementById("IdDongtb").value,
      dongTb1: document.getElementById("tenDongTb").value,
        idnhomTb: document.getElementById("IdNhomTb").value,
        userDo: document.getElementById("nguoiThucHien").value,
    };
    axios.post("api/DongTbs/", newDongTb).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/dongthietbi";
      } else {
        alert("Lỗi không thể thêm dữ liệu");
      }
    });
  };
  getAll = () => {
    axios.get("api/DongTbs").then((response) => {
      var dongTbs = response.data;
      this.renderDongTbsTable(dongTbs);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("IdDongtb").value;
    var newDongTb = {
      iddongTb: document.getElementById("IdDongtb").value,
      dongTb1: document.getElementById("tenDongTb").value,
      idnhomTb: document.getElementById("IdNhomTb").value,
    };
    axios.put("api/DongTbs/" + id, newDongTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/dongthietbi";
      } else {
        alert("Lỗi không thể chỉnh sửa");
      }
    });
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("IdDongtb").value;
    var newDongTb = {
      iddongTb: document.getElementById("IdDongtb").value,
      dongTb1: document.getElementById("tenDongTb").value,
      idnhomTb: document.getElementById("IdNhomTb").value,
      delete: deleted,
    };
    axios.put("api/DongTbs/" + id, newDongTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/dongthietbi";
      } else {
        alert("Xóa không thành công");
      }
    });
  };
  lnk_Click(id) {
    this._click();
    this.handleGetDetail(id);
  }
  handleGetDetail(id) {
    console.log(id);
    axios.get("api/DongTbs/" + id).then((response) => {
      var dongTb = response.data;
      document.getElementById("IdDongtb").value = dongTb.iddongTb;
      document.getElementById("tenDongTb").value = dongTb.dongTb1;
      document.getElementById("IdNhomTb").value = dongTb.idnhomTb;
    });
  }
}
