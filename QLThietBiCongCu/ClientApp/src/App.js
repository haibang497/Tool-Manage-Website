import React, { Component } from "react";
import { Route } from "react-router";

import "./custom.css";
import { FetchThongTinKD } from "./components/CRUDThongTinKd";
import { FetchThietBi } from "./components/CRUDThietBi";
import { FectchDonVi } from "./components/CRUDDonVi";
import { FectchDongTb } from "./components/CRUDDongTB";
import { FetchHoaDon } from "./components/CRUDHoaDon";
import { FetchLoaiTb } from "./components/CRUDLoaiThietBi";
import TopBar from "./components/TopBar";
import LeftSideBar from "./components/SideBarLeft";
import RightSideBar from "./components/SideBarRight";
import { FetchNhomKDs } from "./components/CRUDNhomKD";
import { FetchNhomTBs } from "./components/CRUDNhomTB";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <div id="wrapper">
          <TopBar />
          <LeftSideBar />
          <Route path="/donvi" component={FectchDonVi} />
          <Route path="/dongthietbi" component={FectchDongTb} />
          <Route path="/hoadon" component={FetchHoaDon} />
          <Route path="/thongtinkiemdinh" component={FetchThongTinKD} />
          <Route path="/thietbi" component={FetchThietBi} />
          <Route path="/loaithietbi" component={FetchLoaiTb} />
          <Route path="/nhomkiemdinh" component={FetchNhomKDs} />
          <Route path="/nhomthietbi" component={FetchNhomTBs}/>
        </div>
        <RightSideBar />
        <div className="rightbar-overlay" />
      </div>
    );
  }
}
