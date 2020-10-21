import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";

export class FectchDonVi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donVis: [],
      loading: true,
      readOnly: false,
      showAdd: false,
      showEdit: false,
      offset: 0,
      perPage: 10,
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
    // this.populateDonVisData();
    this.getData();
  }

  async populateDonVisData() {
    const response = await fetch("api/DonVis");
    const data = await response.json();
    this.setState({
      donVis: data,
      loading: false,
    });
  }

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
      donVis: slice,
    });
  };

  getData = () => {
    axios.get("api/DonVis").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        donVis: slice,
      });
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDonVisTable(this.state.donVis)
    );
    return (
      <div className="content-page">
        <Modal isOpen={this.state.showEdit}>
          <ModalHeader>Chỉnh Sửa</ModalHeader>
          <ModalBody>
            <form className="needs-validation">
              <div className="form-group mb-3">
                <label for="maDonVi">Mã Đơn Vị</label> &nbsp; &nbsp;
                <input
                  name="maDonVi"
                  id="maDonVi"
                  type="text"
                  className="form-control"
                  required=""
                  readOnly
                  value={this.state.donVis.maDonVi}
                />
              </div>
              <div className="form-group mb-3">
                <label for="tenDonVi">Tên Đơn Vị</label> &nbsp; &nbsp;
                <input
                  name="tenDonVi"
                  id="tenDonVi"
                  type="text"
                  className="form-control"
                  value={this.state.donVis.tenDonVi}
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
                    <h2 style={{ textAlign: "center" }}>Đơn Vị</h2>
                    <p>
                      <button
                        type="button"
                        className="btn btn-bordered-primary waves-effect width-md waves-light"
                        style={{ backgroundColor: "#1abc9c" }}
                        onClick={this.openModalAdd}
                      >
                        <i class="fas fa-plus" />
                        &nbsp; Thêm Đơn Vị Mới
                      </button>
                    </p>
                    <Modal isOpen={this.state.showAdd}>
                      <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                      <ModalBody>
                        <form className="needs-validation">
                          <div className="form-group mb-3">
                            <label for="maDonVi">Mã Đơn Vị</label> &nbsp; &nbsp;
                            <input
                              name="maDonVi"
                              id="maDonVi"
                              type="text"
                              className="form-control"
                              required=""
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label for="tenDonVi">Tên Đơn Vị</label> &nbsp;
                            &nbsp;
                            <input
                              name="tenDonVi"
                              id="tenDonVi"
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
                  </div>
                </div>
              </div>
              {contents}
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

  renderDonVisTable(donVis) {
    return (
      <div className="infor">
        <table id="tech-companies-1" className="table table-striped">
          <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
            <tr>
              <th data-priority="1" style={{ textAlign: "center" }}>
                Mã Đơn Vị
              </th>
              <th data-priority="3" style={{ textAlign: "center" }}>
                Tên Đơn Vị
              </th>
              <th data-priority="1" style={{ textAlign: "center" }}>
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {donVis.map((donVi) => (
              <tr key={donVi.maDonVi}>
                <td style={{ textAlign: "center" }}>{donVi.maDonVi}</td>
                <td style={{ textAlign: "center" }}>{donVi.tenDonVi}</td>
                <td
                  style={{ textAlign: "center" }}
                  onClick={() => this.lnk_Click(donVi.maDonVi)}
                >
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
    var newDonVi = {
      maDonVi: document.getElementById("maDonVi").value,
      tenDonVi: document.getElementById("tenDonVi").value,
    };
    axios.post("api/DonVis/", newDonVi).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert("Lỗi thêm dữ liệu");
      }
    });
  };
  getAll = (event) => {
    axios.get("api/DonVis").then((response) => {
      var donVis = response.data;
      this.renderDonVisTable(donVis);
    });
  };
  handleEdit = (event) => {
    var id = document.getElementById("maDonVi").value;
    var newDonVi = {
      maDonVi: document.getElementById("maDonVi").value,
      tenDonVi: document.getElementById("tenDonVi").value,
    };
    axios.put("api/DonVis/" + id, newDonVi).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert("Lỗi chỉnh sửa");
      }
    });
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("maDonVi").value;
    var newDonVi = {
      maDonVi: document.getElementById("maDonVi").value,
      tenDonVi: document.getElementById("tenDonVi").value,
      delete: deleted,
    };
    axios.put("api/DonVis/" + id, newDonVi).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert("Không thể xóa dữ liệu");
      }
    });
  };
  lnk_Click(id) {
    this._click();
    this.handleGetDetail(id);
  }
  handleGetDetail(id) {
    axios.get("api/DonVis/" + id).then((response) => {
      var DonVi = response.data;
      document.getElementById("maDonVi").value = DonVi.maDonVi;
      document.getElementById("tenDonVi").value = DonVi.tenDonVi;
    });
  }
}
