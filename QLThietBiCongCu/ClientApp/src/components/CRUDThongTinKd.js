import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";

export class FetchThongTinKD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thongTins: [],
            loading: true,
            checkchange: true,
            readOnly: true,
        };

        this._click = this._click.bind(this);
    }
    _click() {
        this.setState(prevState => ({ readOnly: !prevState.readOnly }))
    }

    changeStateCheck() {
        this.setState({ checkchange: !this.state.checkchange });
    }
    //do db len web va chay dung mot lan

    componentDidMount() {
        this.populateDonVisData();
    }

    async populateDonVisData() {
        const response = await fetch("api/ThongTinKds");
        const data = await response.json();
        this.setState({
            thongTins: data,
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
                this.renderDonVisTable(this.state.thongTins)
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
                                                <label for="maKd">Mã Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input name="maKd" id="maKd" type="text" readOnly={this.state.readOnly} className={txtbox_class} ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maTb">Mã Thiết Bị</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="maTb"
                                                    id="maTb"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="giaKd">Giá Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="giaKd"
                                                    id="giaKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="chuKyKd">Chu Kỳ Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="chuKyKd"
                                                    id="chuKyKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="donViGuiKd">Đơn Vị Gửi Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="donViGuiKd"
                                                    id="donViGuiKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="donViKd">Đơn Vị Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="donViKd"
                                                    id="donViKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ngayKdganNhat">Ngày Kiểm Định Gần Nhất</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="ngayKdganNhat"
                                                    id="ngayKdganNhat"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ngaytoihanKd">Ngày Tới Hạn Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="ngaytoihanKd"
                                                    id="ngaytoihanKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="soKd">Số Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="soKd"
                                                    id="soKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="tinhTrangKd">Tình Trạng</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="tinhTrangKd"
                                                    id="tinhTrangKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="viTriLuuTruKd">Vị Trí Lưu Trữ</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="viTriLuuTruKd"
                                                    id="viTriLuuTruKd"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="soSeri">Số Seri</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="soSeri"
                                                    id="soSeri"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                    </table>
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

    renderDonVisTable(thongTins) {
        return (
            <table className="table table-borderless table-hover table-centered m-0">
                <thead className="thead-light">
                    <tr>
                        <th></th>
                        <th>Mã Kiểm Định</th>
                        <th>Mã Thiết Bị</th>
                        <th>Giá Kiểm Định</th>
                        <th>Chu Kỳ Kiểm Định</th>
                        <th>Đơn Vị Gửi</th>
                        <th>Đơn Vị Kiểm</th>
                        <th>Ngày Kiểm</th>
                        <th>Đến Hạn</th>
                        <th>Số Kiểm Định</th>
                        <th>Tình Trạng</th>
                        <th>Vị Trí Lưu</th>
                        <th>Số Seri</th>
                        <th>Thao Tác</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {thongTins.map((thongTin) => (
                        <tr
                            key={thongTin.maKd}
                            onClick={(id) => this.lnk_Click(thongTin.maKd)}
                        >
                            <td></td>
                            <td>{thongTin.maKd}</td>
                            <td>{thongTin.maTb}</td>
                            <td>{thongTin.giaKd}</td>
                            <td>{thongTin.chuKyKd}</td>
                            <td>{thongTin.donViGuiKd}</td>
                            <td>{thongTin.donViKd}</td>
                            <td>{thongTin.ngayKdganNhat}</td>
                            <td>{thongTin.ngaytoihanKd}</td>
                            <td>{thongTin.soKd}</td>
                            <td>{thongTin.tinhTrangKd}</td>
                            <td>{thongTin.viTriLuuTruKd}</td>
                            <td>{thongTin.soSeri}</td>
                            <td>
                                &nbsp;
                <button
                                    className="btn btn-danger"
                                    onClick={this.handleDeleted}
                                >
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
            delete: 0
        };
        axios.post("api/ThongTinKds/", newThongTin).then((response) => {
            var result = response.data;
            if (result) {
                alert("hihi");
                this.getAll();
                window.location.href = "/thongtinkiemdinh";
            } else {
                alert(123);
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
                alert("hihi");
                this.getAll();
                window.location.href = "/thongtinkiemdinh";
            } else {

                alert("No success");
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
            delete: deleted
        };
        axios.put("api/ThongTinKds/" + id, newThongTin).then((response) => {
            console.log(response);
            var result = response.data;
            console.log(result);
            if (!result) {
                alert("hihi");
                this.getAll();
                window.location.href = "/thongtinkiemdinh";
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