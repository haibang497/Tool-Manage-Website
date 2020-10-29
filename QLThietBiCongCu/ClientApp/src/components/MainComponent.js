import React, { Component } from "react";
import { Route } from "react-router";

import TopBar from './TopBar';
import LeftSideBar from './SideBarLeft';
import RightSideBar from './SideBarRight';
import {FectchDonVi} from './CRUDDonVi';
import {FetchHoaDon} from './CRUDHoaDon';
import {FetchLoaiTb} from './CRUDLoaiThietBi';
import {FetchThietBi} from './CRUDThietBi';
import {FectchDongTb} from './CRUDDongTB';
import {FetchThongTinKD} from './CRUDThongTinKd';
import {FetchNhomKDs} from './CRUDNhomKD';
import {FetchNhomTBs} from './CRUDNhomTB';

export class MainLayout extends Component {
  render() {
    return (
      <>
        <div id="wrapper">
          <TopBar/>
          <LeftSideBar/>
          <Route path="/donvi" component={FectchDonVi} />
          <Route path="/dongthietbi" component={FectchDongTb} />
          <Route path="/hoadon" component={FetchHoaDon} />
          <Route path="/thongtinkiemdinh" component={FetchThongTinKD} />
          <Route path="/thietbi" component={FetchThietBi} />
          <Route path="/loaithietbi" component={FetchLoaiTb} />
          <Route path="/nhomkiemdinh" component={FetchNhomKDs} />
          <Route path="/nhomthietbi" component={FetchNhomTBs} />
        </div>
        <RightSideBar/>
        <div className="rightbar-overlay" />
      </>
    );
  }
}
