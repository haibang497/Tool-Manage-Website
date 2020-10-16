import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

export class FectchDonVi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donVis: [],
      loading: true,
      checkchange: true,
      readOnly: false,
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

  changeStateCheck() {
    this.setState({ checkchange: !this.state.checkchange });
  }

  componentDidMount() {
    this.populateDonVisData();
  }

  async populateDonVisData() {
    const response = await fetch("api/DonVis");
    const data = await response.json();
    this.setState({
      donVis: data,
      loading: false,
    });
  }

  render() {
    let txtbox_class = this.state.checkchange ? "tbx_Add" : "tbx_Edit";
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
            <div>
              <label for="maDonVi">Mã Đơn Vị</label> &nbsp; &nbsp;
              <input
                name="maDonVi"
                id="maDonVi"
                type="text"
                readOnly
                value={this.state.donVis.maDonVi}
              />
            </div>
            <div>
              <label for="tenDonVi">Tên Đơn Vị</label> &nbsp; &nbsp;
              <input
                name="tenDonVi"
                id="tenDonVi"
                type="text"
                value={this.state.donVis.tenDonVi}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-icon waves-effect waves-light btn-success"
              onClick={this.handleEdit}
            >
              <i class="fas fa-check"></i>
            </button>
            <Button color="primary" onClick={this.closeModal}>
              <i className="fas fa-times" />
            </Button>
          </ModalFooter>
        </Modal>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card-box">
                  <div class="responsive-table-plugin">
                    <div class="table-rep-plugin">
                      <div
                        class="table-responsive"
                        data-pattern="priority-columns"
                      >
                        <h4 className="header-title mb-3">Đơn Vị</h4>
                        <p>
                          <button
                            type="button"
                            className="btn btn-bordered-primary waves-effect width-md waves-light"
                            style={{ backgroundColor: "#1abc9c" }}
                            onClick={this.openModalAdd}
                          >
                            <i class="fas fa-plus" />
                            Thêm Đơn Vị Mới
                          </button>
                        </p>
                        <Modal isOpen={this.state.showAdd}>
                          <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                          <ModalBody>
                            <div>
                              <label for="maDonVi">Mã Đơn Vị</label> &nbsp;
                              &nbsp;
                              <input
                                name="maDonVi"
                                id="maDonVi"
                                type="text"
                                className={txtbox_class}
                              />
                            </div>
                            <div>
                              <label for="tenDonVi">Tên Đơn Vị</label> &nbsp;
                              &nbsp;
                              <input
                                name="tenDonVi"
                                id="tenDonVi"
                                type="text"
                              />
                            </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDonVisTable(donVis) {
    return (
      <table id="tech-companies-1" class="table table-striped">
        <thead>
          <tr>
            <th data-priority="1"></th>
            <th data-priority="3">Mã Đơn Vị</th>
            <th data-priority="1">Tên Đơn Vị</th>
            <th data-priority="3">Thao Tác</th>
            <th data-priority="3"></th>
          </tr>
        </thead>
        <tbody>
          {donVis.map((donVi) => (
            <tr
              key={donVi.maDonVi}
              onClick={(id) => this.lnk_Click(donVi.maDonVi)}
            >
              <td></td>
              <td>{donVi.maDonVi}</td>
              <td>{donVi.tenDonVi}</td>
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
    var newDonVi = {
      maDonVi: document.getElementById("maDonVi").value,
      tenDonVi: document.getElementById("tenDonVi").value,
    };
    axios.post("api/DonVis/", newDonVi).then((response) => {
      var result = response.data;
      if (result) {
        alert("hihi");
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert(123);
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
        alert("hihi");
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert("No success");
        // window.location.href = "/test-fetch-donvi";
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
        alert("hihi");
        this.getAll();
        window.location.href = "/donvi";
      } else {
        alert("No success");
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
    axios.get("api/DonVis/" + id).then((response) => {
      var DonVi = response.data;
      document.getElementById("maDonVi").value = DonVi.maDonVi;
      document.getElementById("tenDonVi").value = DonVi.tenDonVi;
    });
  }
}
