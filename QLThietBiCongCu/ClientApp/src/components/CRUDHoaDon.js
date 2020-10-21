import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";

export class FetchHoaDon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoaDons: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
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
    // this.populateHoaDonsData();
    this.getData();
  }

  async populateHoaDonsData() {
    const response = await fetch("api/HoaDons");
    const data = await response.json();
    this.setState({
      hoaDons: data,
      loading: false,
    });
  }

  getData = () => {
    axios.get("api/HoaDons").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        hoaDons: slice,
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
      hoaDons: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em> Loading... </em>
      </p>
    ) : (
      this.renderHoaDonsTable(this.state.hoaDons)
    );
    return (
      <div className="content-page">
        <Modal isOpen={this.state.showEdit}>
          <ModalHeader>Chỉnh Sửa</ModalHeader>
          <ModalBody>
            <form className="needs-validation">
              <div className="form-group mb-3">
                <label for="idHoaDon">Mã Hóa Đơn</label> &nbsp; &nbsp;
                <input
                  name="idHoaDon"
                  id="idHoaDon"
                  type="text"
                  className="form-control"
                  required=""
                  readOnly
                  value={this.state.hoaDons.idhoaDon}
                />
              </div>
              <div className="form-group mb-3">
                <label for="soHoaDon">Số Hóa Đơn</label> &nbsp; &nbsp;
                <input
                  name="soHoaDon"
                  id="soHoaDon"
                  type="text"
                  className="form-control"
                  value={this.state.hoaDons.soHoaDon}
                  required=""
                />
              </div>
              <div className="form-group mb-3">
                <label for="ngayHoaDon">Ngày Hóa Đơn</label> &nbsp; &nbsp;
                <input
                  name="ngayHoaDon"
                  id="ngayHoaDon"
                  type="text"
                  className="form-control"
                  value={this.state.hoaDons.ngayHoaDon}
                  required=""
                />
              </div>
              <div className="form-group mb-3">
                <label for="loaiHoaDon">Loại Hóa Đơn</label> &nbsp; &nbsp;
                <input
                  name="loaiHoaDon"
                  id="loaiHoaDon"
                  type="text"
                  className="form-control"
                  value={this.state.hoaDons.loaiHoaDon}
                  required=""
                />
              </div>
              <div className="form-group mb-3">
                <label for="tinhTrangHoaDon">Tình Trạng Hóa Đơn</label> &nbsp;
                &nbsp;
                <input
                  name="tinhTrangHoaDon"
                  id="tinhTrangHoaDon"
                  type="text"
                  className="form-control"
                  value={this.state.hoaDons.tinhTrangHoaDon}
                  required=""
                />
              </div>
              <div className="form-group mb-3">
                <label for="viTriLuuTruHoaDon">Vị Trí Lưu Trữ Hóa Đơn</label>{" "}
                &nbsp; &nbsp;
                <input
                  name="viTriLuuTruHoaDon"
                  id="viTriLuuTruHoaDon"
                  type="text"
                  className="form-control"
                  value={this.state.hoaDons.viTriLuuTruHd}
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
                    <h2 style={{ textAlign: "center" }}> Hóa Đơn </h2>
                    <p>
                      <button
                        type="button"
                        className="btn btn-bordered-primary waves-effect width-md waves-light"
                        style={{ backgroundColor: "#1abc9c" }}
                        onClick={this.openModalAdd}
                      >
                        <i class="fas fa-plus" />
                        &nbsp; Thêm Hóa Đơn Mới
                      </button>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
                            <div className="form-group mb-3">
                              <label for="idHoaDon">Mã Hóa Đơn</label> &nbsp;
                              &nbsp;
                              <input
                                name="idHoaDon"
                                id="idHoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="soHoaDon">Số Hóa Đơn</label> &nbsp;
                              &nbsp;
                              <input
                                name="soHoaDon"
                                id="soHoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="ngayHoaDon">Ngày Hóa Đơn</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="ngayHoaDon"
                                id="ngayHoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="loaiHoaDon">Loại Hóa Đơn</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="loaiHoaDon"
                                id="loaiHoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="tinhTrangHoaDon">
                                Tình Trạng Hóa Đơn
                              </label>
                              &nbsp; &nbsp;
                              <input
                                name="tinhTrangHoaDon"
                                id="tinhTrangHoaDon"
                                type="text"
                                className="form-control"
                                required=""
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label for="viTriLuuTruHoaDon">
                                Vị Trí Lưu Trữ Hóa Đơn
                              </label>
                              &nbsp; &nbsp;
                              <input
                                name="viTriLuuTruHoaDon"
                                id="viTriLuuTruHoaDon"
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
                    </p>
                    {contents}
                  </div>
                </div>
              </div>
              <ReactPaginate
                previousLabel={
                  <i style={{ color: "#7266ba" }} class="fas fa-chevron-left" />
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
    );
  }

  renderHoaDonsTable(hoaDons) {
    return (
      <table id="tech-companies-1" className="table table-striped">
        <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
          <tr>
            <th> Mã Hóa Đơn </th>
            <th> Số Hóa Đơn </th>
            <th> Ngày Hóa Đơn </th>
            <th> Loại Hóa Đơn </th>
            <th> Tình Trạng Hóa Đơn </th>
            <th> Vị Trí Lưu Trữ </th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {hoaDons.map((hoaDon) => (
            <tr key={hoaDon.idhoaDon}>
              <td> {hoaDon.idhoaDon} </td> <td> {hoaDon.soHoaDon} </td>
              <td> {hoaDon.ngayHoaDon} </td> <td> {hoaDon.loaiHoaDon} </td>
              <td> {hoaDon.tinhTrangHoaDon} </td>
              <td> {hoaDon.viTriLuuTruHd} </td>
              <td onClick={() => this.lnk_Click(hoaDon.idhoaDon)}>
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
    );
  }

  handleSave = (event) => {
    var newHoaDon = {
      idhoaDon: document.getElementById("idHoaDon").value,
      soHoaDon: document.getElementById("soHoaDon").value,
      ngayHoaDon: document.getElementById("ngayHoaDon").value,
      loaiHoaDon: document.getElementById("loaiHoaDon").value,
      tinhTrangHoaDon: document.getElementById("tinhTrangHoaDon").value,
      viTriLuuTruHd: document.getElementById("viTriLuuTruHoaDon").value,
      delete: 0,
    };
    axios.post("api/HoaDons/", newHoaDon).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/hoadon";
      } else {
        alert("Không Thể Thêm Hóa Đơn");
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
    var id = document.getElementById("idHoaDon").value;
    var newHoaDon = {
      idhoaDon: document.getElementById("idHoaDon").value,
      soHoaDon: document.getElementById("soHoaDon").value,
      ngayHoaDon: document.getElementById("ngayHoaDon").value,
      loaiHoaDon: document.getElementById("loaiHoaDon").value,
      tinhTrangHoaDon: document.getElementById("tinhTrangHoaDon").value,
      viTriLuuTruHd: document.getElementById("viTriLuuTruHoaDon").value,
    };
    axios.put("api/HoaDons/" + id, newHoaDon).then((response) => {
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
    var id = document.getElementById("idHoaDon").value;
    var newHoaDon = {
      idhoaDon: document.getElementById("idhoaDon").value,
      soHoaDon: document.getElementById("soHoaDon").value,
      ngayHoaDon: document.getElementById("ngayHoaDon").value,
      loaiHoaDon: document.getElementById("loaiHoaDon").value,
      tinhTrangHoaDon: document.getElementById("tinhTrangHoaDon").value,
      viTriLuuTruHd: document.getElementById("viTriLuuTruHoaDon").value,
      delete: 1,
    };
    axios.put("api/HoaDons/" + id, newHoaDon).then((response) => {
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
    axios.get("api/HoaDons/" + id).then((response) => {
      var HoaDon = response.data;
      document.getElementById("idHoaDon").value = HoaDon.idhoaDon;
      document.getElementById("soHoaDon").value = HoaDon.soHoaDon;
      document.getElementById("ngayHoaDon").value = HoaDon.ngayHoaDon;
      document.getElementById("loaiHoaDon").value = HoaDon.loaiHoaDon;
      document.getElementById("tinhTrangHoaDon").value = HoaDon.tinhTrangHoaDon;
      document.getElementById("viTriLuuTruHoaDon").value = HoaDon.viTriLuuTruHd;
    });
  }
}
