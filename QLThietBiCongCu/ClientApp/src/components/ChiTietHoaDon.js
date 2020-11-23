import React from "react";
import Cookies from "universal-cookie";

import "./style/DonVi.css";
import "./style/Table.css";

export class ChiTietHoaDon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoaDons: [],
      loading: true,
      currentDate: Date().toLocaleString(),
    };
  }

  cookies = new Cookies();
  componentDidMount() {
    this.populateLoaiTbsData();
  }

  async populateLoaiTbsData() {
    const response = await fetch("api/HoaDons");
    const data = await response.json();
    this.setState({
      hoaDons: data,
      loading: false,
    });
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDonVi(this.state.hoaDons)
    );
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="card-box">
              <div className="responsive-table-plugin">
                <div className="table-rep-plugin">
                  <div
                    className="table-responsive"
                    data-pattern="priority-columns"
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      Hóa Đơn
                    </h2>
                  </div>
                </div>
              </div>
              {contents}
            </div>
          </div>
        </div>
      </>
    );
  }

  renderDonVi(hoaDons) {
    return (
      <div>
        <div style={{ marginLeft: "200px", fontFamily: "Times New Roman" }}>
          <ul>
            <li>Người xuất báo cáo: {this.cookies.get("userName")}</li>
            <li>Ngày xuất báo cáo: {this.state.currentDate}</li>
          </ul>
        </div>
        <table className="center" style={{ border: "2px solid black" }}>
          <thead
            style={{
              color: "green",
              border: "2px solid black",
              backgroundColor: "grey",
            }}
          >
            <tr>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Mã Hóa Đơn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Số Hóa Đơn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Ngày Hóa Đơn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Loại Hóa Đơn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Tình Trạng Hóa Đơn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Vị Trí Lưu Trữ
              </th>
            </tr>
          </thead>
          <tbody>
            {hoaDons.map((hoaDon) => (
              <tr key={hoaDon.idhoaDon}>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {hoaDon.idhoaDon}{" "}
                </td>{" "}
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {hoaDon.soHoaDon}{" "}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {" "}
                  {hoaDon.ngayHoaDon}{" "}
                </td>{" "}
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {" "}
                  {hoaDon.loaiHoaDon}{" "}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {" "}
                  {hoaDon.tinhTrangHoaDon}{" "}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {" "}
                  {hoaDon.viTriLuuTruHd}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
