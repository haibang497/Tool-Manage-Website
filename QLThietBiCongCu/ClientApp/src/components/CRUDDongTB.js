import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class FectchDongTb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dongTbs: [],
      loading: true,
      readOnly: true,
      showAdd: false,
      showEdit: false,
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
    this.populateDongTbsData();
  }

  async populateDongTbsData() {
    const response = await fetch("api/DongTbs");
    const data = await response.json();
    this.setState({
      dongTbs: data,
      loading: false,
    });
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDongTbsTable(this.state.dongTbs)
    );
    return (
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
    );
  }

  renderDongTbsTable(dongTbs) {
    return (
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
    );
  }

  handleSave = (event) => {
    var newDongTb = {
      iddongTb: document.getElementById("IdDongtb").value,
      dongTb1: document.getElementById("tenDongTb").value,
      idnhomTb: document.getElementById("IdNhomTb").value,
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
  getAll = (event) => {
    axios.get("api/DongTbs").then((response) => {
      var dongTbs = response.data;
      // alert(JSON.stringify(computer));
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
