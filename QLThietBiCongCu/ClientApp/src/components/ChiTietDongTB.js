import React from "react";
import Cookies from "universal-cookie";

import "./style/DonVi.css";
import "./style/Table.css";

export class ChiTietDongThietBi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dongTbs: [],
      loading: true,
      currentDate: Date().toLocaleString(),
    };
  }

  cookies = new Cookies();
  componentDidMount() {
    this.populateLoaiTbsData();
  }

  async populateLoaiTbsData() {
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
      this.renderDonVi(this.state.dongTbs)
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
                      Dòng Thiết Bị
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

  renderDonVi(dongTbs) {
    return (
      <div>
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
                Mã Đơn Vị
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Tên Đơn Vị
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Nhóm TB
              </th>
            </tr>
          </thead>
          <tbody>
            {dongTbs.map((dongTb) => (
              <tr key={dongTb.iddongTb}>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {dongTb.iddongTb}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {dongTb.dongTb1}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {dongTb.idnhomTb}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginLeft: "200px", fontFamily: "Times New Roman" }}>
          <p>Người xuất báo cáo: {this.cookies.get("userName")}</p>
          <p>Ngày xuất báo cáo: {this.state.currentDate}</p>
        </div>
      </div>
    );
  }
}
