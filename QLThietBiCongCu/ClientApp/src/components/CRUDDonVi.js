﻿import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import axios from "axios";

export class FectchDonVi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donVis: [],
      loading: true,
      checkchange: true,
      readOnly: false,
      show: false,
    };

    this._click = this._click.bind(this);
  }
  _click() {
    this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
  }

  openModal = () => {
    this.setState({
      show: true,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
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
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card-box">
                  <h4 className="header-title mb-3">Đơn Vị</h4>
                  <p>Component lấy dữ liệu từ Server.</p>
                  <table className="table table-borderless table-hover table-centered m-0">
                    <tr>
                      <td>
                        <label for="maDonVi">Mã Đơn Vị</label>
                      </td>
                      <td>
                        <input
                          name="maDonVi"
                          id="maDonVi"
                          type="text"
                          readOnly={this.state.readOnly}
                          className={txtbox_class}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="tenDonVi">Tên Đơn Vị</label>
                      </td>
                      <td>
                        <input
                          name="tenDonVi"
                          id="tenDonVi"
                          type="text"
                        ></input>
                      </td>
                    </tr>
                  </table>
                  <p>
                    <Button onClick={this.openModal}>Add New</Button>
                  </p>
                  <Modal isOpen={this.state.show}>
                    <ModalHeader>Thêm Đơn Vị Mới</ModalHeader>
                    <ModalBody>
                      <div>
                        <label for="maDonVi">Mã Đơn Vị</label>
                        <input
                          name="maDonVi"
                          id="maDonVi"
                          type="text"
                          readOnly={this.state.readOnly}
                          className={txtbox_class}
                        />
                      </div>
                      <div>
                        <label for="tenDonVi">Tên Đơn Vị</label>
                        <input name="tenDonVi" id="tenDonVi" type="text" />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary">Thêm Mới</Button>
                      <Button color="danger" onClick={this.closeModal}>
                        Thoát
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <p>
                    <Button
                      className="btn btn-success"
                      id="btn-add"
                      onClick={this.handleSave}
                    >
                      Add New
                    </Button>
                    <Button
                      className="btn btn-warning"
                      id="btn-edit"
                      onClick={this.handleEdit}
                    >
                      Edit
                    </Button>
                  </p>
                  <h3> COMPUTER DETAILS</h3>

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
      <table className="table table-borderless table-hover table-centered m-0">
        <thead className="thead-light">
          <tr>
            <th></th>
            <th>Mã Đơn Vị</th>
            <th>Tên Đơn Vị</th>
            <th>Thao Tác</th>
            <th></th>
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
                  <Button color="warning">
                      Chỉnh Sửa
                  </Button>
                &nbsp;
                <button className="btn btn-danger" onClick={this.handleDeleted}>
                  Xóa
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
      // alert(JSON.stringify(computer));
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
