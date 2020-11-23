import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "./style/DonVi.css";
import "./style/Table.css";

export class ChiTietNhomTBs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nhomTbs: [],
      loading: true,
      currentDate: Date().toLocaleString(),
      offset: 0,
      perPage: 20,
      currentPage: 0,
      orgTable: [],
    };
  }

  cookies = new Cookies();
  componentDidMount() {
    //this.populateLoaiTbsData();
    this.getData();
  }

  async populateLoaiTbsData() {
    const response = await fetch("api/NhomTbs");
    const data = await response.json();
    this.setState({
      donVis: data,
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
      this.renderDonVi(this.state.nhomTbs)
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
                      Nhóm Thiết Bị
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

  renderDonVi(nhomTbs) {
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
                Mã Nhóm Thiết Bị
              </th>
              <th style={{ textAlign: "center", border: "1px solid black" }}>
                Tên Nhóm Thiết Bị
              </th>
            </tr>
          </thead>
          <tbody>
            {nhomTbs.map((nhomTb) => (
              <tr key={nhomTb.idnhomTb}>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {nhomTb.idnhomTb}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  {nhomTb.nhomTb1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
