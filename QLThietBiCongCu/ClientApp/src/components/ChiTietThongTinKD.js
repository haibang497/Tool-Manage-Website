import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "./style/DonVi.css";
import "./style/Table.css";

export class ChiTietThongTinKD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ThongTinKds: [],
      loading: true,
      currentDate: Date().toLocaleString(),
      offset: 0,
      perPage: 15,
      currentPage: 0,
      orgTable: [],
    };
  }

  cookies = new Cookies();
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get("api/ThongTinKds").then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        loading: false,
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgTable: res.data,
        ThongTinKds: slice,
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
      ThongTinKds: slice,
    });
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDonVi(this.state.ThongTinKds)
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
                      Thông Tin Kiểm Định
                    </h2>
                  </div>
                </div>
              </div>
              {contents}
              <ReactPaginate
                previousLabel={<i class="fas fa-chevron-left" />}
                nextLabel={<i class="fas fa-chevron-right"></i>}
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
      </>
    );
  }

  renderDonVi(ThongTinKds) {
    return (
      <div>
        <div style={{ marginLeft: "200px", fontFamily: "Times New Roman" }}>
          <p>
            <b>Người xuất báo cáo: </b>
            {this.cookies.get("userName")}
            &nbsp;/&nbsp;<b>Ngày xuất báo cáo: </b>
            {this.state.currentDate}
          </p>
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
                Mã Kiểm Định
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Mã Thiết Bị
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Giá Kiểm Định
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Đơn Vị Kiểm Định
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Ngày Kiểm Định
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Ngày Tới Hạn
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Số kiểm Định
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Tình Trạng
              </th>
            </tr>
          </thead>
          <tbody>
            {ThongTinKds.map((ThongTinKd) => (
              <tr key={ThongTinKd.maKd}>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.maKd}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.maTb}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.giaKd}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.donViKd}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.ngayKdganNhat}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.ngaytoihanKd}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.soKd}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {ThongTinKd.tinhTrangKd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
