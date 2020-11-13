import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";
import Cookies from "universal-cookie";

export class FetchNhomTBs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhomTbs: [],
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
    // this.populateNhomTbsData();
    this.getData();
  }

  async populateNhomTbsData() {
    const response = await fetch("api/NhomTbs");
    const data = await response.json();
    this.setState({
      nhomTbs: data,
      loading: false,
    });
  }

  getData = () => {
    axios.get("api/NhomTbs").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        nhomTbs: slice,
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
      nhomTbs: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderNhomTbsTable(this.state.nhomTbs)
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
                  <label for="idnhomTb">Mã Nhóm Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="idnhomTb"
                    id="idnhomTb"
                    type="text"
                    className="form-control"
                    required=""
                    readOnly
                    value={this.state.nhomTbs.idnhomTb}
                  />
                </div>
                <div className="form-group mb-3">
                  <label for="nhomTb">Nhóm Thiết Bị</label> &nbsp; &nbsp;
                  <input
                    name="nhomTb"
                    id="nhomTb"
                    type="text"
                    className="form-control"
                    value={this.state.nhomTbs.nhomTb1}
                    required=""
                  />
                            </div>
                            <div>
                                <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp; &nbsp;
                  <input
                                    name="nguoiThucHien"
                                    id="nguoiThucHien"
                                    type="text"
                                    className="form-control"
                                    value={this.state.nhomTbs.userDo}
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
                      <h2 style={{ textAlign: "center" }}>Nhóm Thiết Bị</h2>
                      <p>
                        <button
                          type="button"
                          className="btn btn-bordered-primary waves-effect width-md waves-light"
                          style={{ backgroundColor: "#1abc9c" }}
                          onClick={this.openModalAdd}
                        >
                          <i class="fas fa-plus" />
                          &nbsp; Thêm Nhóm Thiết Bị Mới
                        </button>
                      </p>
                      <Modal isOpen={this.state.showAdd}>
                        <ModalHeader>Thêm Nhóm Thiết Bị Mới</ModalHeader>
                        <ModalBody>
                          <form className="needs-validation">
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
                              <label for="nhomTb">Tên Nhóm Thiết Bị</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                name="nhomTb"
                                id="nhomTb"
                                type="text"
                                className="form-control"
                                required=""
                              />
                                                    </div>
                                                    <div>
                                                        <label for="nguoiThucHien">Người Thực Hiện</label> &nbsp; &nbsp;
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

  renderNhomTbsTable(nhomTbs) {
    return (
      <table id="tech-companies-1" className="table table-striped">
        <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
          <tr>
            <th>Mã Nhóm Thiết Bị</th>
            <th>Nhóm Thiết Bị</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {nhomTbs.map((nhomTb) => (
            <tr key={nhomTb.idnhomTb}>
              <td>{nhomTb.idnhomTb}</td>
                  <td>{nhomTb.nhomTb1}</td>
                  <td>{nhomTb.userDo}</td>
              <td onClick={(id) => this.lnk_Click(nhomTb.idnhomTb)}>
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
    var newNhomTb = {
      idnhomTb: document.getElementById("idnhomTb").value,
        nhomTb1: document.getElementById("nhomTb").value,
        userDo: document.getElementById("nguoiThucHien").value
    };
    axios.post("api/NhomTbs/", newNhomTb).then((response) => {
      var result = response.data;
      if (result) {
        this.getAll();
        window.location.href = "/nhomthietbi";
      } else {
        alert("Không Thể Thêm");
      }
    });
  };

  getAll = (event) => {
    axios.get("api/NhomTbs").then((response) => {
      var nhomTbs = response.data;
      // alert(JSON.stringify(computer));
      this.renderNhomTbsTable(nhomTbs);
    });
  };

  handleEdit = (event) => {
    var id = document.getElementById("idnhomTb").value;
    var newNhomTb = {
      idnhomTb: document.getElementById("idnhomTb").value,
      nhomTb1: document.getElementById("nhomTb").value,
    };
    axios.put("api/NhomTbs/" + id, newNhomTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/nhomthietbi";
      } else {
        alert("Không Thể Chỉnh Sửa");
        // window.location.href = "/test-fetch-donvi";
      }
    });
  };
  handleDeleted = (event) => {
    var deleted = 1;
    var id = document.getElementById("idnhomTb").value;
    var newNhomTb = {
      idnhomTb: document.getElementById("idnhomTb").value,
      nhomTb1: document.getElementById("nhomTb").value,
      delete: deleted,
    };
    axios.put("api/NhomTbs/" + id, newNhomTb).then((response) => {
      console.log(response);
      var result = response.data;
      console.log(result);
      if (!result) {
        this.getAll();
        window.location.href = "/nhomthietbi";
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
    axios.get("api/NhomTbs/" + id).then((response) => {
      var NhomTb = response.data;
      document.getElementById("idnhomTb").value = NhomTb.idnhomTb;
      document.getElementById("nhomTb").value = NhomTb.nhomTb1;
    });
  }
}
