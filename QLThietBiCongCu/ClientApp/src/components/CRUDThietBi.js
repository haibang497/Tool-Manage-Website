import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";

export class FetchThietBi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thietBis: [],
            loading: true,
            checkchange: true,
            readOnly: true,
        };

        this._click = this._click.bind(this);
    }
    _click() {
        this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
    }

    changeStateCheck() {
        this.setState({ checkchange: !this.state.checkchange });
    }
    //do db len web va chay dung mot lan

    componentDidMount() {
        this.populateDonVisData();
    }

    async populateDonVisData() {
        const response = await fetch("api/MaTbs");
        const data = await response.json();
        this.setState({
            thietBis: data,
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
                this.renderDonVisTable(this.state.thietBis)
            );
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card-box">
                                    <h4 className="header-title mb-3">Thiết Bị</h4>
                                    <p>Component lấy dữ liệu từ Server.</p>
                                    <table className="table table-borderless table-hover table-centered m-0">
                                        <tr>
                                            <td>
                                                <label for="stt">Số Thứ Tự</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="stt"
                                                    id="stt"
                                                    type="text"
                                                    className={txtbox_class}
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maTb1">Mã Thiết Bị</label>
                                            </td>
                                            <td>
                                                <input name="maTb1" id="maTb1" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="idnhomTb">Mã Nhóm Thiết Bị</label>
                                            </td>
                                            <td>
                                                <input name="idnhomTb" id="idnhomTb" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maDonVi">Mã Đơn Vị</label>
                                            </td>
                                            <td>
                                                <input name="maDonVi" id="maDonVi" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maLoai">Mã Loại</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="maLoai"
                                                    id="maLoai"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maNhomKd">Mã Nhóm Kiểm Định</label>
                                            </td>
                                            <td>
                                                <input name="maNhomKd" id="maNhomKd" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="idhoaDon">
                                                    Mã Hóa Đơn
                        </label>
                                            </td>
                                            <td>
                                                <input
                                                    name="idhoaDon"
                                                    id="idhoaDon"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="iddongTb">Mã Dòng Thiết Bị</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="iddongTb"
                                                    id="iddongTb"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ngayPhieuXuat">Ngày Phiếu Xuất</label>
                                            </td>
                                            <td>
                                                <input name="ngayPhieuXuat" id="ngayPhieuXuat" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ngayPhieuNhap">Ngày Phiếu Nhập</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="ngayPhieuNhap"
                                                    id="ngayPhieuNhap"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="tenTb">Tên Thiết bị</label>
                                            </td>
                                            <td>
                                                <input
                                                    name="tenTb"
                                                    id="tenTb"
                                                    type="text"
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="tenChuan">Tên Chuẩn</label>
                                            </td>
                                            <td>
                                                <input name="tenChuan" id="tenChuan" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="giaMua">Giá Mua</label>
                                            </td>
                                            <td>
                                                <input name="giaMua" id="giaMua" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="donViBan">Đơn Vị Bán</label>
                                            </td>
                                            <td>
                                                <input name="donViBan" id="donViBan" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="donViTinh">Đơn Vị Bán</label>
                                            </td>
                                            <td>
                                                <input name="donViTinh" id="donViTinh" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="soluong">Số Lượng</label>
                                            </td>
                                            <td>
                                                <input name="soluong" id="soluong" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="tinhTrang">Tình Trạng</label>
                                            </td>
                                            <td>
                                                <input name="tinhTrang" id="tinhTrang" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ngayTinhTrang">Ngày Tình Trạng</label>
                                            </td>
                                            <td>
                                                <input name="ngayTinhTrang" id="ngayTinhTrang" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="phapLy">Pháp Lý</label>
                                            </td>
                                            <td>
                                                <input name="phapLy" id="phapLy" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="viTriLuuTruBkk">Vị Trí Lưu</label>
                                            </td>
                                            <td>
                                                <input name="viTriLuuTruBkk" id="viTriLuuTruBkk" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="maMay">Mã Máy</label>
                                            </td>
                                            <td>
                                                <input name="maMay" id="maMay" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="nuocSanXuat">Quốc Gia</label>
                                            </td>
                                            <td>
                                                <input name="nuocSanXuat" id="nuocSanXuat" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="namSx">Năm Sản Xuất</label>
                                            </td>
                                            <td>
                                                <input name="namSx" id="namSx" type="text"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="ghiChu">Ghi Chú</label>
                                            </td>
                                            <td>
                                                <input name="ghiChu" id="ghiChu" type="text"></input>
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

    renderDonVisTable(thietBis) {
        return (
            <table className="table table-borderless table-hover table-centered m-0">
                <thead className="thead-light">
                    <tr>
                        <th></th>
                        <th>Số Thứ Tự</th>
                        <th>Mã Thiết Bị</th>
                        <th>Nhóm</th>
                        <th>Đơn Vị</th>
                        <th>Loại</th>
                        <th>Nhóm KD</th>
                        <th>Hóa Đơn</th>
                        <th>Dòng TB</th>
                        <th>NPX</th>
                        <th>NPN</th>
                        <th>Tên TB</th>
                        <th>Tên Chuẩn</th>
                        <th>Giá Mua</th>
                        <th>DV Bán</th>
                        <th>ĐV Tính</th>
                        <th>Số Lượng</th>
                        <th>Tình Trạng</th>
                        <th>Ngày Tình Trạng</th>
                        <th>Pháp Lý</th>
                        <th>Vị Trí Lưu</th>
                        <th>Mã Máy</th>
                        <th>Nước Sản Xuất</th>
                        <th>Năm Sản Xuất</th>
                        <th>Ghi Chú</th>
                        <th>Thao Tác</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {thietBis.map((thietBi) => (
                        <tr
                            key={thietBi.maTb1}
                            onClick={(id) => this.lnk_Click(thietBi.maTb1)}
                        >
                            <td></td>
                            <td>{thietBi.stt}</td>
                            <td>{thietBi.maTb1}</td>
                            <td>{thietBi.idnhomTb}</td>
                            <td>{thietBi.maDonVi}</td>
                            <td>{thietBi.maLoai}</td>
                            <td>{thietBi.maNhomKd}</td>
                            <td>{thietBi.idhoaDon}</td>
                            <td>{thietBi.iddongTb}</td>
                            <td>{thietBi.ngayPhieuXuat}</td>
                            <td>{thietBi.ngayPhieuNhap}</td>
                            <td>{thietBi.tenTb}</td>
                            <td>{thietBi.tenChuan}</td>
                            <td>{thietBi.giaMua}</td>
                            <td>{thietBi.donViBan}</td>
                            <td>{thietBi.donViTinh}</td>
                            <td>{thietBi.soluong}</td>
                            <td>{thietBi.tinhTrang}</td>
                            <td>{thietBi.ngayTinhTrang}</td>
                            <td>{thietBi.phapLy}</td>
                            <td>{thietBi.viTriLuuTruBkk}</td>
                            <td>{thietBi.maMay}</td>
                            <td>{thietBi.nuocSanXuat}</td>
                            <td>{thietBi.namSx}</td>
                            <td>{thietBi.ghiChu}</td>
                            <td>
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
            deleted: 0
        };
        axios.post("api/MaTbs/", newThietBi).then((response) => {
            var result = response.data;
            if (result) {
                alert("Success");
                this.getAll();
                window.location.href = "/thietbi";
            } else {
                alert(123);
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
                alert("Success");
                this.getAll();
                window.location.href = "/thietbi";
            } else {
                alert("No success");
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
            deleted: 1
        };
        axios.put("api/MaTbs/" + id, newThietBi).then((response) => {
            console.log(response);
            var result = response.data;
            console.log(result);
            if (!result) {
                alert("hihi");
                this.getAll();
                window.location.href = "/thietbi";
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
