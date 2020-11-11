import React, { Component } from "react";
import { Route } from "react-router";

import { FectchDonVi } from "./CRUDDonVi";
import { FetchHoaDon } from "./CRUDHoaDon";
import { FetchLoaiTb } from "./CRUDLoaiThietBi";
import { FetchThietBi } from "./CRUDThietBi";
import { FectchDongTb } from "./CRUDDongTB";
import { FetchThongTinKD } from "./CRUDThongTinKd";
import { FetchNhomKDs } from "./CRUDNhomKD";
import { FetchNhomTBs } from "./CRUDNhomTB";
import { DangNhap } from "./DangNhap";
import { DangKy } from "./DangKy";
import { DangKyAdmin } from "./DangKyAdmin";
import {DangNhapAdmin} from "./DangNhapAdmin";
import Cookies from "universal-cookie";

export class MainLayout extends Component {
  render() {
    return (
      <>
        <div id="wrapper">
          <Route exact path="/" component={DangNhapAdmin} />
          <Route path="/donvi" component={FectchDonVi} />
          <Route path="/dongthietbi" component={FectchDongTb} />
          <Route path="/hoadon" component={FetchHoaDon} />
          <Route path="/thongtinkiemdinh" component={FetchThongTinKD} />
          <Route path="/thietbi" component={FetchThietBi} />
          <Route path="/loaithietbi" component={FetchLoaiTb} />
          <Route path="/nhomkiemdinh" component={FetchNhomKDs} />
          <Route path="/nhomthietbi" component={FetchNhomTBs} />
          <Route path="/dangky" component={DangKy} />
          <Route path="/dangkyadmin" component={DangKyAdmin} />
        </div>
      </>
    );
  }
}
