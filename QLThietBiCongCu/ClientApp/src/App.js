import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import { FetchThongTinKD } from './components/CRUDThongTinKd';
import { FetchThietBi } from './components/CRUDThietBi';
import { FectchDonVi } from './components/CRUDDonVi';
import { FectchDongTb } from './components/CRUDDongTB';
import { FetchHoaDon } from './components/CRUDHoaDon';
import { FetchLoaiTb } from './components/CRUDLoaiThietBi';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/donvi' component={FectchDonVi} />
            <Route path='/dongthietbi' component={FectchDongTb} />
            <Route path='/hoadon' component={FetchHoaDon}/>
            <Route path='/thongtinkiemdinh' component={FetchThongTinKD} />
            <Route path='/thietbi' component={FetchThietBi} />
            <Route path='/loaithietbi' component={FetchLoaiTb}/>
      </Layout>
    );
  }
}
