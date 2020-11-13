import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";
import Cookies from "universal-cookie";

export class FetchThietBi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thietBis: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
      showInformation: false,
      offset: 0,
      perPage: 30,
      currentPage: 0,
      orgTable: [],
    };

    this._click = this._click.bind(this);
    }
    cookies = new Cookies();
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
    const response = await fetch("api/MaTbs");
    const data = await response.json();
    this.setState({
      thietBis: data,
      loading: false,
    });
  }

  getData = () => {
    axios.get("api/MaTbs").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        thietBis: slice,
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
      thietBis: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDonVisTable(this.state.thietBis)
    );
    return (
      <>
        <TopBar />
        <LeftSideBar />
        <div className="content-page">
          <Modal isOpen={this.state.showInformation}>
            <ModalHeader>Thông Tin Thiết Bị</ModalHeader>
            <ModalBody>
              <form className="needs-validation">
                <div className="form-group mb-3">
                  <label for="stt">Số Thứ Tự</label> &nbsp; &nbsp;
                  <input
                    name="stt"
                    id="stt"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.stt}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maTb1">Mã Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="maTb1"
                    id="maTb1"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maTb1}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="idnhomTb">Mã Nhóm Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="idnhomTb"
                    id="idnhomTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.idnhomTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maDonVi">Mã Đơn Vị</label> &nbsp; &nbsp;
                  <input
                    name="maDonVi"
                    id="maDonVi"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maDonVi}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maLoai">Mã Loại</label> &nbsp; &nbsp;
                  <input
                    name="maLoai"
                    id="maLoai"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maLoai}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maNhomKd">Mã Nhóm kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="maNhomKd"
                    id="maNhomKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maNhomKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="idhoaDon">Mã Hóa Đơn</label>
                  &nbsp; &nbsp;
                  <input
                    name="idhoaDon"
                    id="idhoaDon"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.idhoaDon}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="iddongTb">Mã Dòng Thiết Bị</label>
                  &nbsp; &nbsp;
                  <input
                    name="iddongTb"
                    id="iddongTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.iddongTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayPhieuXuat">Ngày Phiếu Xuất</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayPhieuXuat"
                    id="ngayPhieuXuat"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.ngayPhieuXuat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayPhieuNhap">Ngày Phiếu Nhập</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayPhieuNhap"
                    id="ngayPhieuNhap"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.ngayPhieuNhap}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tenTb">Tên Thiết Bị</label>
                  &nbsp; &nbsp;
                  <input
                    name="tenTb"
                    id="tenTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.tenTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tenChuan">Tên Chuẩn</label> &nbsp; &nbsp;
                  <input
                    name="tenChuan"
                    id="tenChuan"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.tenChuan}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="giaMua">Giá Mua</label> &nbsp; &nbsp;
                  <input
                    name="giaMua"
                    id="giaMua"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.giaMua}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViBan">Đơn Vị Bán</label> &nbsp; &nbsp;
                  <input
                    name="donViBan"
                    id="donViBan"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.donViBan}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViTinh">Đơn Vị Tính</label>
                  <input
                    name="donViTinh"
                    id="donViTinh"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.donViTinh}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soluong">Số Lượng</label> &nbsp; &nbsp;
                  <input
                    name="soluong"
                    id="soluong"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.soluong}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tinhTrang">Tình Trạng</label> &nbsp; &nbsp;
                  <input
                    name="tinhTrang"
                    id="tinhTrang"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.tinhTrang}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayTinhTrang">Ngày Tình Trạng</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayTinhTrang"
                    id="ngayTinhTrang"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.ngayTinhTrang}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="phapLy">Pháp Lý</label> &nbsp; &nbsp;
                  <input
                    name="phapLy"
                    id="phapLy"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.phapLy}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="viTriLuuTruBkk">Vị Trí Lưu</label> &nbsp; &nbsp;
                  <input
                    name="viTriLuuTruBkk"
                    id="viTriLuuTruBkk"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.viTriLuuTruBkk}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maMay">Mã Máy</label> &nbsp; &nbsp;
                  <input
                    name="maMay"
                    id="maMay"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maMay}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="nuocSanXuat">Nước Sản Xuất</label> &nbsp; &nbsp;
                  <input
                    name="nuocSanXuat"
                    id="nuocSanXuat"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.nuocSanXuat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="namSx">Năm Sản Xuất</label> &nbsp; &nbsp;
                  <input
                    name="namSx"
                    id="namSx"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.namSx}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ghiChu">Ghi Chú</label> &nbsp; &nbsp;
                  <input
                    name="ghiChu"
                    id="ghiChu"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.ghiChu}
                  />
                            </div>
                            <div className="form-group mb-3">
                                <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp; &nbsp;
                  <input
                                    name="nguoiThucHien"
                                    id="nguoiThucHien"
                                    type="text"
                                    className="form-control"
                                    value={this.state.thietBis.userDo}
                                    required=""
                                    readOnly
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
                  <label for="stt">Số Thứ Tự</label> &nbsp; &nbsp;
                  <input
                    name="stt"
                    id="stt"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.stt}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maTb1">Mã Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="maTb1"
                    id="maTb1"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maTb1}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="idnhomTb">Mã Nhóm Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="idnhomTb"
                    id="idnhomTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.idnhomTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maDonVi">Mã Đơn Vị</label> &nbsp; &nbsp;
                  <input
                    name="maDonVi"
                    id="maDonVi"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maDonVi}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maLoai">Mã Loại</label> &nbsp; &nbsp;
                  <input
                    name="maLoai"
                    id="maLoai"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maLoai}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maNhomKd">Mã Nhóm kiểm Định</label> &nbsp; &nbsp;
                  <input
                    name="maNhomKd"
                    id="maNhomKd"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maNhomKd}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="idhoaDon">Mã Hóa Đơn</label>
                  &nbsp; &nbsp;
                  <input
                    name="idhoaDon"
                    id="idhoaDon"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.idhoaDon}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="iddongTb">Mã Dòng Thiết Bị</label>
                  &nbsp; &nbsp;
                  <input
                    name="iddongTb"
                    id="iddongTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.iddongTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayPhieuXuat">Ngày Phiếu Xuất</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayPhieuXuat"
                    id="ngayPhieuXuat"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.ngayPhieuXuat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayPhieuNhap">Ngày Phiếu Nhập</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayPhieuNhap"
                    id="ngayPhieuNhap"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.ngayPhieuNhap}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tenTb">Tên Thiết Bị</label>
                  &nbsp; &nbsp;
                  <input
                    name="tenTb"
                    id="tenTb"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.tenTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tenChuan">Tên Chuẩn</label> &nbsp; &nbsp;
                  <input
                    name="tenChuan"
                    id="tenChuan"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.tenChuan}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="giaMua">Giá Mua</label> &nbsp; &nbsp;
                  <input
                    name="giaMua"
                    id="giaMua"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.giaMua}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViBan">Đơn Vị Bán</label> &nbsp; &nbsp;
                  <input
                    name="donViBan"
                    id="donViBan"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.donViBan}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="donViTinh">Đơn Vị Tính</label>
                  <input
                    name="donViTinh"
                    id="donViTinh"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.donViTinh}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="soluong">Số Lượng</label> &nbsp; &nbsp;
                  <input
                    name="soluong"
                    id="soluong"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.soluong}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="tinhTrang">Tình Trạng</label> &nbsp; &nbsp;
                  <input
                    name="tinhTrang"
                    id="tinhTrang"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.tinhTrang}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ngayTinhTrang">Ngày Tình Trạng</label> &nbsp;
                  &nbsp;
                  <input
                    name="ngayTinhTrang"
                    id="ngayTinhTrang"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.ngayTinhTrang}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="phapLy">Pháp Lý</label> &nbsp; &nbsp;
                  <input
                    name="phapLy"
                    id="phapLy"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.phapLy}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="viTriLuuTruBkk">Vị Trí Lưu</label> &nbsp; &nbsp;
                  <input
                    name="viTriLuuTruBkk"
                    id="viTriLuuTruBkk"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.viTriLuuTruBkk}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="maMay">Mã Máy</label> &nbsp; &nbsp;
                  <input
                    name="maMay"
                    id="maMay"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.thietBis.maMay}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="nuocSanXuat">Nước Sản Xuất</label> &nbsp; &nbsp;
                  <input
                    name="nuocSanXuat"
                    id="nuocSanXuat"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.nuocSanXuat}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="namSx">Năm Sản Xuất</label> &nbsp; &nbsp;
                  <input
                    name="namSx"
                    id="namSx"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.namSx}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="ghiChu">Ghi Chú</label> &nbsp; &nbsp;
                  <input
                    name="ghiChu"
                    id="ghiChu"
                    type="text"
                    className="form-control"
                    required=""
                    value={this.state.thietBis.ghiChu}
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
                                    value={this.state.thietBis.userDo}
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
                      <h2 style={{ textAlign: "center" }}>Thiết Bị</h2>
                      <p>
                        <button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{ backgroundColor: "#1abc9c" }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Thiết Bị Mới
                        </button>
                      </p>

                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Thiết Bị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="stt">Số Thứ Tự</label> &nbsp; &nbsp;
                              <input
                                name="stt"
                                id="stt"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="maTb1">Mã Thiết Bị</label> &nbsp;
                              &nbsp;
                              <input
                                name="maTb1"
                                id="maTb1"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="idnhomTb">Mã Nhóm Thiết Bị</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="idnhomTb"
                                id="idnhomTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="maDonVi">Mã Đơn Vị</label> &nbsp;
                              &nbsp;
                              <input
                                name="maDonVi"
                                id="maDonVi"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
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
                              <label for="maNhomKd">Mã Nhóm kiểm Định</label>{" "}
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
                              <label for="idhoaDon">Mã Hóa Đơn</label>
                              &nbsp; &nbsp;
                              <input
                                name="idhoaDon"
                                id="idhoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="iddongTb">Mã Dòng Thiết Bị</label>
                              &nbsp; &nbsp;
                              <input
                                name="iddongTb"
                                id="iddongTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngayPhieuXuat">Ngày Phiếu Xuất</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="ngayPhieuXuat"
                                id="ngayPhieuXuat"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngayPhieuNhap">Ngày Phiếu Nhập</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="ngayPhieuNhap"
                                id="ngayPhieuNhap"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tenTb">Tên Thiết Bị</label>
                              &nbsp; &nbsp;
                              <input
                                name="tenTb"
                                id="tenTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tenChuan">Tên Chuẩn</label> &nbsp;
                              &nbsp;
                              <input
                                name="tenChuan"
                                id="tenChuan"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="giaMua">Giá Mua</label> &nbsp; &nbsp;
                              <input
                                name="giaMua"
                                id="giaMua"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="donViBan">Đơn Vị Bán</label> &nbsp;
                              &nbsp;
                              <input
                                name="donViBan"
                                id="donViBan"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="donViTinh">Đơn Vị Tính</label>
                              <input
                                name="donViTinh"
                                id="donViTinh"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="soluong">Số Lượng</label> &nbsp;
                              &nbsp;
                              <input
                                name="soluong"
                                id="soluong"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tinhTrang">Tình Trạng</label> &nbsp;
                              &nbsp;
                              <input
                                name="tinhTrang"
                                id="tinhTrang"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngayTinhTrang">Ngày Tình Trạng</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="ngayTinhTrang"
                                id="ngayTinhTrang"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="phapLy">Pháp Lý</label> &nbsp; &nbsp;
                              <input
                                name="phapLy"
                                id="phapLy"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="viTriLuuTruBkk">Vị Trí Lưu</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="viTriLuuTruBkk"
                                id="viTriLuuTruBkk"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="maMay">Mã Máy</label> &nbsp; &nbsp;
                              <input
                                name="maMay"
                                id="maMay"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="nuocSanXuat">Nước Sản Xuất</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="nuocSanXuat"
                                id="nuocSanXuat"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="namSx">Năm Sản Xuất</label> &nbsp;
                              &nbsp;
                              <input
                                name="namSx"
                                id="namSx"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ghiChu">Ghi Chú</label> &nbsp; &nbsp;
                              <input
                                name="ghiChu"
                                id="ghiChu"
                                type="text"
                                className="form-control"
                                required=""
                              />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp; &nbsp;
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

  renderDonVisTable(thietBis) {
    return (
      <table id="tech-companies-1" className="table table-striped">
        <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
          <tr>
            <th>Mã Thiết Bị</th>
            <th>Tên TB</th>
            <th>Số Lượng</th>
            <th>Tình Trạng</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {thietBis.map((thietBi) => (
            <tr key={thietBi.maTb1}>
              <td>{thietBi.maTb1}</td>
              <td>{thietBi.tenTb}</td>
                  <td>{thietBi.soluong}</td>
                  <td>{thietBi.tinhTrang}</td>
              <td onClick={(id) => this.lnk_Click(thietBi.maTb1)}>
                <button
                  className="btn btn-info waves-effect waves-light"
                  onClick={this.openModalShowInformation}
                  style={{ backgroundColor: "#37cde6" }}
                >
                  <i class="far fa-eye" style={{ color: "white" }}></i>
                </button>
                <button
                  className="btn btn-icon waves-effect waves-light btn-warning"
                  onClick={this.openModal}
                  style={{ backgroundColor: "#f7b84b" }}
                >
                  <i class="far fa-edit" style={{ color: "white" }}></i>
                </button>
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
    );
  }

  handleSave = () => {
    var newThietBi = {
      stt: document.getElementById("stt").value,
      maTb1: document.getElementById("maTb1").value,
      idnhomTb: document.getElementById("idnhomTb").value,
      maDonVi: document.getElementById("maDonVi").value,
      maLoai: document.getElementById("maLoai").value,
      maNhomKd: document.getElementById("maNhomKd").value,
      idhoaDon: document.getElementById("idhoaDon").value,
      iddongTb: document.getElementById("iddongTb").value,
      ngayPhieuXuat: document.getElementById("ngayPhieuXuat").value,
      ngayPhieuNhap: document.getElementById("ngayPhieuNhap").value,
      tenTb: document.getElementById("tenTb").value,
      tenChuan: document.getElementById("tenChuan").value,
      giaMua: document.getElementById("giaMua").value,
      donViBan: document.getElementById("donViBan").value,
      donViTinh: document.getElementById("donViTinh").value,
      soluong: document.getElementById("soluong").value,
      tinhTrang: document.getElementById("tinhTrang").value,
      ngayTinhTrang: document.getElementById("ngayTinhTrang").value,
      phapLy: document.getElementById("phapLy").value,
      viTriLuuTruBkk: document.getElementById("viTriLuuTruBkk").value,
      maMay: document.getElementById("maMay").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
        ghiChu: document.getElementById("ghiChu").value,
        userDo: document.getElementById("nguoiThucHien").value,
      deleted: 0,
    };
    axios.post("api/MaTbs/", newThietBi).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/thietbi";
      } else {
        alert("Không Thành Công");
      }
    });
  };
  getAll = () => {
    axios.get("api/MaTbs").then((response) => {
      var thongTins = response.data;
      this.renderDonVisTable(thongTins);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("maTb1").value;
    var newThietBi = {
      stt: document.getElementById("stt").value,
      maTb1: document.getElementById("maTb1").value,
      idnhomTb: document.getElementById("idnhomTb").value,
      maDonVi: document.getElementById("maDonVi").value,
      maLoai: document.getElementById("maLoai").value,
      maNhomKd: document.getElementById("maNhomKd").value,
      idhoaDon: document.getElementById("idhoaDon").value,
      iddongTb: document.getElementById("iddongTb").value,
      ngayPhieuXuat: document.getElementById("ngayPhieuXuat").value,
      ngayPhieuNhap: document.getElementById("ngayPhieuNhap").value,
      tenTb: document.getElementById("tenTb").value,
      tenChuan: document.getElementById("tenChuan").value,
      giaMua: document.getElementById("giaMua").value,
      donViBan: document.getElementById("donViBan").value,
      donViTinh: document.getElementById("donViTinh").value,
      soluong: document.getElementById("soluong").value,
      tinhTrang: document.getElementById("tinhTrang").value,
      ngayTinhTrang: document.getElementById("ngayTinhTrang").value,
      phapLy: document.getElementById("phapLy").value,
      viTriLuuTruBkk: document.getElementById("viTriLuuTruBkk").value,
      maMay: document.getElementById("maMay").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
      ghiChu: document.getElementById("ghiChu").value,
    };
    axios.put("api/MaTbs/" + id, newThietBi).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/thietbi";
      } else {
        alert("Không Thể Chỉnh Sửa");
        // window.location.href = "/test-fetch-donvi";
      }
    });
  };
  handleDeleted = (event) => {
    var id = document.getElementById("maTb1").value;
    var newThietBi = {
      stt: document.getElementById("stt").value,
      maTb1: document.getElementById("maTb1").value,
      idnhomTb: document.getElementById("idnhomTb").value,
      maDonVi: document.getElementById("maDonVi").value,
      maLoai: document.getElementById("maLoai").value,
      maNhomKd: document.getElementById("maNhomKd").value,
      idhoaDon: document.getElementById("idhoaDon").value,
      iddongTb: document.getElementById("iddongTb").value,
      ngayPhieuXuat: document.getElementById("ngayPhieuXuat").value,
      ngayPhieuNhap: document.getElementById("ngayPhieuNhap").value,
      tenTb: document.getElementById("tenTb").value,
      tenChuan: document.getElementById("tenChuan").value,
      giaMua: document.getElementById("giaMua").value,
      donViBan: document.getElementById("donViBan").value,
      donViTinh: document.getElementById("donViTinh").value,
      soluong: document.getElementById("soluong").value,
      tinhTrang: document.getElementById("tinhTrang").value,
      ngayTinhTrang: document.getElementById("ngayTinhTrang").value,
      phapLy: document.getElementById("phapLy").value,
      viTriLuuTruBkk: document.getElementById("viTriLuuTruBkk").value,
      maMay: document.getElementById("maMay").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
      nuocSanXuat: document.getElementById("nuocSanXuat").value,
      ghiChu: document.getElementById("ghiChu").value,
      deleted: 1,
    };
    axios.put("api/MaTbs/" + id, newThietBi).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/thietbi";
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
    axios.get("api/MaTbs/" + id).then((response) => {
      var ThietBi = response.data;
      document.getElementById("stt").value = ThietBi.stt;
      document.getElementById("maTb1").value = ThietBi.maTb1;
      document.getElementById("idnhomTb").value = ThietBi.idnhomTb;
      document.getElementById("maDonVi").value = ThietBi.maDonVi;
      document.getElementById("maLoai").value = ThietBi.maLoai;
      document.getElementById("maNhomKd").value = ThietBi.maNhomKd;
      document.getElementById("idhoaDon").value = ThietBi.idhoaDon;
      document.getElementById("iddongTb").value = ThietBi.iddongTb;
      document.getElementById("ngayPhieuXuat").value = ThietBi.ngayPhieuXuat;
      document.getElementById("ngayPhieuNhap").value = ThietBi.ngayPhieuNhap;
      document.getElementById("tenTb").value = ThietBi.tenTb;
      document.getElementById("tenChuan").value = ThietBi.tenChuan;
      document.getElementById("giaMua").value = ThietBi.giaMua;
      document.getElementById("donViBan").value = ThietBi.donViBan;
      document.getElementById("donViTinh").value = ThietBi.donViTinh;
      document.getElementById("soluong").value = ThietBi.soluong;
      document.getElementById("tinhTrang").value = ThietBi.tinhTrang;
      document.getElementById("ngayTinhTrang").value = ThietBi.ngayTinhTrang;
      document.getElementById("phapLy").value = ThietBi.phapLy;
      document.getElementById("viTriLuuTruBkk").value = ThietBi.viTriLuuTruBkk;
      document.getElementById("maMay").value = ThietBi.maMay;
      document.getElementById("nuocSanXuat").value = ThietBi.nuocSanXuat;
      document.getElementById("namSx").value = ThietBi.namSx;
      document.getElementById("ghiChu").value = ThietBi.ghiChu;
    });
  }
}
