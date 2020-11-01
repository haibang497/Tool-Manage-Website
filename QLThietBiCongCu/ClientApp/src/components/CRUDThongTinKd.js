import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";

export class FetchThongTinKD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thongTins: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
      showInformation: false,
      offset: 0,
      perPage: 20,
      currentPage: 0,
      orgTable: [],
    };

    this._click = this._click.bind(this);
  }
  _click() {
    this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
  }

  openModal = () => {
    this.setState({
      showEdit: true,
    });
  };

  openModalAdd = () => {
    this.setState({
      showAdd: true,
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

  openModalShowInformation = () => {
    this.setState({
      showInformation: true,
    });
  };

  closeModalShowInformation = () => {
    this.setState({
      showInformation: false,
    });
  };

  componentDidMount() {
    // this.populateDonVisData();
    this.getData();
  }

  async populateDonVisData() {
    const response = await fetch("api/ThongTinKds");
    const data = await response.json();
    this.setState({
      thongTins: data,
      loading: false,
    });
  }

  getData = () => {
    axios.get("api/ThongTinKds").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        thongTins: slice,
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
      thongTins: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDonVisTable(this.state.thongTins)
    );
    return (
      <>
        <TopBar />
        <LeftSideBar />
        <div className="content-page">
          <Modal isOpen={this.state.showInformation}>
            <ModalHeader style={{ backgroundColor: "#7266ba" }}>
              Thông Tin Kiểm Định
            </ModalHeader>
            <ModalBody>
              <form className="needs-validation">
                <div className="form-group mb-3">
                  <label for="maKd">Mã Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="maKd"
                    id="maKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.maKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maTb">Mã Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="maTb"
                    id="maTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.maTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="giaKd">Giá Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="giaKd"
                    id="giaKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.giaKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="chuKyKd">Chu Kỳ Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="chuKyKd"
                    id="chuKyKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.chuKyKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViGuiKd">Đơn Vị Gửi Kiểm Định</label> &nbsp;
                  &nbsp;
                  <input
                    name="donViGuiKd"
                    id="donViGuiKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.donViGuiKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViKd">Đơn Vị Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="donViKd"
                    id="donViKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.donViKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayKdganNhat">Ngày Kiểm Định Gần Nhất</label>
                  &nbsp; &nbsp;
                  <input
                    name="ngayKdganNhat"
                    id="ngayKdganNhat"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.ngayKdganNhat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngaytoihanKd">Ngày Tới Hạn Kiểm Định</label>
                  &nbsp; &nbsp;
                  <input
                    name="ngaytoihanKd"
                    id="ngaytoihanKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.ngaytoihanKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soKd">Số kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="soKd"
                    id="soKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.soKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tinhTrangKd">Tình Trạng</label> &nbsp; &nbsp;
                  <input
                    name="tinhTrangKd"
                    id="tinhTrangKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.tinhTrangKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="viTriLuuTruKd">Vị Trí Lưu Trữ Kiểm Định</label>{" "}
                  &nbsp; &nbsp;
                  <input
                    name="viTriLuuTruKd"
                    id="viTriLuuTruKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.viTriLuuTruKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soSeri">Số Seri</label> &nbsp; &nbsp;
                  <input
                    name="soSeri"
                    id="soSeri"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.soSeri}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-icon waves-effect waves-light btn-danger"
                style={{ backgroundColor: "#f1556c" }}
                onClick={this.closeModalShowInformation}
              >
                <i className="fas fa-times" />
              </button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.showEdit}>
            <ModalHeader>Chỉnh Sửa</ModalHeader>
            <ModalBody>
              <form className="needs-validation">
                <div className="form-group mb-3">
                  <label for="maKd">Mã Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="maKd"
                    id="maKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.maKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maTb">Mã Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="maTb"
                    id="maTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thongTins.maTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="giaKd">Giá Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="giaKd"
                    id="giaKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.giaKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="chuKyKd">Chu Kỳ Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="chuKyKd"
                    id="chuKyKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.chuKyKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViGuiKd">Đơn Vị Gửi Kiểm Định</label> &nbsp;
                  &nbsp;
                  <input
                    name="donViGuiKd"
                    id="donViGuiKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.donViGuiKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViKd">Đơn Vị Kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="donViKd"
                    id="donViKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.donViKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayKdganNhat">Ngày Kiểm Định Gần Nhất</label>
                  &nbsp; &nbsp;
                  <input
                    name="ngayKdganNhat"
                    id="ngayKdganNhat"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.ngayKdganNhat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngaytoihanKd">Ngày Tới Hạn Kiểm Định</label>
                  &nbsp; &nbsp;
                  <input
                    name="ngaytoihanKd"
                    id="ngaytoihanKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.ngaytoihanKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soKd">Số kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="soKd"
                    id="soKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.soKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tinhTrangKd">Tình Trạng</label> &nbsp; &nbsp;
                  <input
                    name="tinhTrangKd"
                    id="tinhTrangKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.tinhTrangKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="viTriLuuTruKd">Vị Trí Lưu Trữ Kiểm Định</label>{" "}
                  &nbsp; &nbsp;
                  <input
                    name="viTriLuuTruKd"
                    id="viTriLuuTruKd"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.viTriLuuTruKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soSeri">Số Seri</label> &nbsp; &nbsp;
                  <input
                    name="soSeri"
                    id="soSeri"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thongTins.soSeri}
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
                type="button"
                className="btn btn-icon waves-effect waves-light btn-danger"
                style={{ backgroundColor: "#f1556c" }}
                onClick={this.closeModal}
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
                      <h2 style={{ textAlign: "center" }}>
                        Thông Tin Kiểm Định
                      </h2>
                      <p>
                        <button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{ backgroundColor: "#1abc9c" }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Thông Tin Kiểm Định Mới
                        </button>
                      </p>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="maKd">Mã Kiểm Định</label> &nbsp;
                              &nbsp;
                              <input
                                name="maKd"
                                id="maKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="maTb">Mã Thiết Bị</label> &nbsp;
                              &nbsp;
                              <input
                                name="maTb"
                                id="maTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="giaKd">Giá Kiểm Định</label> &nbsp;
                              &nbsp;
                              <input
                                name="giaKd"
                                id="giaKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="chuKyKd">Chu Kỳ Kiểm Định</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="chuKyKd"
                                id="chuKyKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="donViGuiKd">
                                Đơn Vị Gửi Kiểm Định
                              </label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="donViGuiKd"
                                id="donViGuiKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="donViKd">Đơn Vị Kiểm Định</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="donViKd"
                                id="donViKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngayKdganNhat">
                                Ngày Kiểm Định Gần Nhất
                              </label>
                              &nbsp; &nbsp;
                              <input
                                name="ngayKdganNhat"
                                id="ngayKdganNhat"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngaytoihanKd">
                                Ngày Tới Hạn Kiểm Định
                              </label>
                              &nbsp; &nbsp;
                              <input
                                name="ngaytoihanKd"
                                id="ngaytoihanKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="soKd">Số kiểm Định</label> &nbsp;
                              &nbsp;
                              <input
                                name="soKd"
                                id="soKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tinhTrangKd">Tình Trạng</label> &nbsp;
                              &nbsp;
                              <input
                                name="tinhTrangKd"
                                id="tinhTrangKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="viTriLuuTruKd">
                                Vị Trí Lưu Trữ Kiểm Định
                              </label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="viTriLuuTruKd"
                                id="viTriLuuTruKd"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="soSeri">Số Seri</label> &nbsp; &nbsp;
                              <input
                                name="soSeri"
                                id="soSeri"
                                type="text"
                                className="form-control"
                                required=""
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

  renderDonVisTable(thongTins) {
    return (
      <table id="tech-companies-1" className="table table-striped">
        <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
          <tr>
            <th>Mã Kiểm Định</th>
            <th>Mã Thiết Bị</th>
            <th>Ngày Kiểm</th>
            <th>Đến Hạn</th>
            <th>Tình Trạng</th>
            <th style={{ textAlign: "center" }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {thongTins.map((thongTin) => (
            <tr key={thongTin.maKd}>
              <td>{thongTin.maKd}</td>
              <td>{thongTin.maTb}</td>
              <td>{thongTin.ngayKdganNhat}</td>
              <td>{thongTin.ngaytoihanKd}</td>
              <td>{thongTin.tinhTrangKd}</td>
              <td
                onClick={(id) => this.lnk_Click(thongTin.maKd)}
                style={{ textAlign: "center" }}
              >
                <button
                  className="btn btn-info waves-effect waves-light"
                  onClick={this.openModalShowInformation}
                  style={{ backgroundColor: "#37cde6" }}
                >
                  <i class="far fa-eye" style={{ color: "white" }}></i>
                </button>
                &nbsp;
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

  handleSave = () => {
    var newThongTin = {
      maKd: document.getElementById("maKd").value,
      maTb: document.getElementById("maTb").value,
      giaKd: document.getElementById("giaKd").value,
      chuKyKd: document.getElementById("chuKyKd").value,
      donViGuiKd: document.getElementById("donViGuiKd").value,
      donViKd: document.getElementById("donViKd").value,
      ngayKdganNhat: document.getElementById("ngayKdganNhat").value,
      ngaytoihanKd: document.getElementById("ngaytoihanKd").value,
      soKd: document.getElementById("soKd").value,
      tinhTrangKd: document.getElementById("tinhTrangKd").value,
      viTriLuuTruKd: document.getElementById("viTriLuuTruKd").value,
      soSeri: document.getElementById("soSeri").value,
      delete: 0,
    };
    axios.post("api/ThongTinKds/", newThongTin).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/thongtinkiemdinh";
      } else {
        alert("Không Thể Thêm");
      }
    });
  };
  getAll = () => {
    axios.get("api/ThongTinKds").then((response) => {
      var thongTins = response.data;
      this.renderDonVisTable(thongTins);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("maKd").value;
    var newThongTin = {
      maKd: document.getElementById("maKd").value,
      maTb: document.getElementById("maTb").value,
      giaKd: document.getElementById("giaKd").value,
      chuKyKd: document.getElementById("chuKyKd").value,
      donViGuiKd: document.getElementById("donViGuiKd").value,
      donViKd: document.getElementById("donViKd").value,
      ngayKdganNhat: document.getElementById("ngayKdganNhat").value,
      ngaytoihanKd: document.getElementById("ngaytoihanKd").value,
      soKd: document.getElementById("soKd").value,
      tinhTrangKd: document.getElementById("tinhTrangKd").value,
      viTriLuuTruKd: document.getElementById("viTriLuuTruKd").value,
      soSeri: document.getElementById("soSeri").value,
    };
    axios.put("api/ThongTinKds/" + id, newThongTin).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/thongtinkiemdinh";
      } else {
        alert("Không Thể Chỉnh Sửa");
        // window.location.href = "/test-fetch-donvi";
      }
    });
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("maKd").value;
    var newThongTin = {
      maKd: document.getElementById("maKd").value,
      maTb: document.getElementById("maTb").value,
      giaKd: document.getElementById("giaKd").value,
      chuKyKd: document.getElementById("chuKyKd").value,
      donViGuiKd: document.getElementById("donViGuiKd").value,
      donViKd: document.getElementById("donViKd").value,
      ngayKdganNhat: document.getElementById("ngayKdganNhat").value,
      ngaytoihanKd: document.getElementById("ngaytoihanKd").value,
      soKd: document.getElementById("soKd").value,
      tinhTrangKd: document.getElementById("tinhTrangKd").value,
      viTriLuuTruKd: document.getElementById("viTriLuuTruKd").value,
      soSeri: document.getElementById("soSeri").value,
      delete: deleted,
    };
    axios.put("api/ThongTinKds/" + id, newThongTin).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/thongtinkiemdinh";
      } else {
        alert("Không Thể Xóa");
        // window.location.href = "/test-fetch-donvi";
      }
    });
  };
  lnk_Click(id) {
    this._click();
    this.handleGetDetail(id);
  }
  handleGetDetail(id) {
    console.log(id);
    axios.get("api/ThongTinKds/" + id).then((response) => {
      var ThongTinKd = response.data;
      document.getElementById("maKd").value = ThongTinKd.maKd;
      document.getElementById("maTb").value = ThongTinKd.maTb;
      document.getElementById("giaKd").value = ThongTinKd.giaKd;
      document.getElementById("chuKyKd").value = ThongTinKd.chuKyKd;
      document.getElementById("donViGuiKd").value = ThongTinKd.donViGuiKd;
      document.getElementById("donViKd").value = ThongTinKd.donViKd;
      document.getElementById("ngayKdganNhat").value = ThongTinKd.ngayKdganNhat;
      document.getElementById("ngaytoihanKd").value = ThongTinKd.ngaytoihanKd;
      document.getElementById("soKd").value = ThongTinKd.soKd;
      document.getElementById("tinhTrangKd").value = ThongTinKd.tinhTrangKd;
      document.getElementById("viTriLuuTruKd").value = ThongTinKd.viTriLuuTruKd;
      document.getElementById("soSeri").value = ThongTinKd.soSeri;
    });
  }
}
