import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import md5 from "md5";

import ReactPaginate from "react-paginate";
import "./style/DonVi.css";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import RightSideBar from "./SideBarRight";

export class DangKy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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

    

    getData = () => {
        axios.get("api/users").then((res) => {
            var data = res.data;
            var slice = data.slice(
                this.state.offset,
                this.state.offset + this.state.perPage
            );

            this.setState({
                loading: false,
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgTable: res.data,
                users: slice,
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
            users: slice,
        });
    };

    render() {
        let contents = this.state.loading ? (
            <p>
                <em> Loading... </em>
            </p>
        ) : (
                this.renderUsersTable(this.state.users)
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
                                    <label for="idHoaDon">ID User</label> &nbsp; &nbsp;
                <input
                                        name="idUser"
                                        id="idUser"
                                        type="text"
                                        className="form-control"
                                        required=""
                                        readOnly
                                        value={this.state.users.IdUser}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="userAccount">UserAccount</label> &nbsp; &nbsp;
                <input
                                        name="userAccount"
                                        id="userAccount"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.UserAccoount}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="password">Password</label> &nbsp; &nbsp;
                <input
                                        name="password"
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        value={this.state.users.Password}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="userName">UserName</label> &nbsp; &nbsp;
                <input
                                        name="userName"
                                        id="userName"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.UserName}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="phoneNumber">Số Điện Thoại</label> &nbsp;
                &nbsp;
                <input
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.PhoneNumber}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="bDay">Ngày Sinh</label>{" "}
                &nbsp; &nbsp;
                <input
                                        name="bDay"
                                        id="bDay"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.BDay}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="email">Email</label>{" "}
                &nbsp; &nbsp;
                <input
                                        name="email"
                                        id="email"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.BDay}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="email">Email</label>{" "}
                &nbsp; &nbsp;
                <input
                                        name="email"
                                        id="email"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.Email}
                                        required=""
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label for="address">Địa Chỉ</label>{" "}
                &nbsp; &nbsp;
                <input
                                        name="address"
                                        id="address"
                                        type="text"
                                        className="form-control"
                                        value={this.state.users.Address}
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
                                            <h2 style={{ textAlign: "center" }}> Thành Viên </h2>
                                            <p>
                                                <button
                                                    type="button"
                                                    className="btn btn-bordered-primary waves-effect width-md waves-light"
                                                    style={{ backgroundColor: "#1abc9c" }}
                                                    onClick={this.openModalAdd}
                                                >
                                                    <i class="fas fa-plus" />
                        &nbsp; Thêm Thành Viên Mới
                      </button>
                                                <Modal isOpen={this.state.showAdd}>
                                                    <ModalHeader>Thêm Thành Viên Mới</ModalHeader>
                                                    <ModalBody>
                                                        <form className="needs-validation">
                                                            <div className="form-group mb-3">
                                                                <label for="idUser">ID User</label> &nbsp;
                              &nbsp;
                              <input
                                                                    name="idUser"
                                                                    id="idUser"
                                                                    type="text"
                                                                    className="form-control"

                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="userAccount">UserAccount</label> &nbsp;
                              &nbsp;
                              <input
                                                                    name="userAccount"
                                                                    id="userAccount"
                                                                    type="text"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="password">Password</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                                                    name="password"
                                                                    id="password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="cfpassword">Confirm Password</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                                                    name="cfpassword"
                                                                    id="cfpassword"
                                                                    type="password"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="userName">UserName</label>{" "}
                              &nbsp; &nbsp;
                              <input
                                                                    name="userName"
                                                                    id="userName"
                                                                    type="text"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="phoneNumber">
                                                                    Số Điện Thoại
                              </label>
                              &nbsp; &nbsp;
                              <input
                                                                    name="phoneNumber"
                                                                    id="phoneNumber"
                                                                    type="text"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="bDay">
                                                                    Ngày Sinh
                              </label>
                              &nbsp; &nbsp;
                              <input
                                                                    name="bDay"
                                                                    id="bDay"
                                                                    type="text"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="email">
                                                                    Email
                              </label>
                              &nbsp; &nbsp;
                              <input
                                                                    name="email"
                                                                    id="email"
                                                                    type="text"
                                                                    className="form-control"
                                                                    required=""
                                                                />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label for="address">
                                                                    Địa Chỉ
                              </label>
                              &nbsp; &nbsp;
                              <input
                                                                    name="address"
                                                                    id="address"
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
                <RightSideBar />
                <div className="rightbar-overlay" />
            </>
        );
    }

    renderUsersTable(users) {
        return (
            <table id="tech-companies-1" className="table table-striped">
                <thead style={{ backgroundColor: "#7266ba", color: "#fff" }}>
                    <tr>
                        <th> ID </th>
                        <th> Tên Tài Khoản </th>
                        <th> Tên Người Dùng </th>
                        <th> Số Điện Thoại </th>
                        <th> Ngày Sinh </th>
                        <th> Email </th>
                        <th> Địa Chỉ </th>
                        <th>Quyền</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((User) => (
                        <tr key={User.idUser}>
                            <td> {User.idUser}</td>
                            <td> {User.userAccount} </td>
                            <td> {User.userName} </td>
                            <td> {User.phoneNumber} </td>
                            <td> {User.bday} </td>
                            <td> {User.email} </td>
                            <td> {User.address}</td>
                            <td>{User.userPer}</td>
                            <td onClick={() => this.lnk_Click(User.idUser)}>
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
        var newUser = {
            //IdUser: 0,
            UserAccount: document.getElementById("userAccount").value,
            Password: md5(document.getElementById("password").value),
            UserName: document.getElementById("userName").value,
            PhoneNumber: document.getElementById("phoneNumber").value,
            BDay: document.getElementById("bDay").value,
            Email: document.getElementById("email").value,
            Address: document.getElementById("address").value

        };
        axios.post("api/Users/", newUser).then((response) => {
            var result = response.data;
            if (result) {
                alert("Đăng Ký Thành Công");
                this.getAll();
                window.location.href = "/dangky";
            } else {
                alert("Không Thể Thêm Thành Viên");
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