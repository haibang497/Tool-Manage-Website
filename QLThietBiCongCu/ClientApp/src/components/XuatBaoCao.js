import React, { useRef, Component } from "react";
import { useReactToPrint } from "react-to-print";
import { ChiTietDonVi } from "./ChiTietDonVi";
import { ChiTietDongThietBi } from "./ChiTietDongTB";
import { ChiTietHoaDon } from "./ChiTietHoaDon";
import { ChiTietLoaiTB } from "./ChiTietLoaiTB";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import LeftSideBar from "./SideBarLeft";
import { ChiTietNhomKD } from "./ChiTietNhomKD";
import { ChiTietNhomTBs } from "./ChiTietNhomTB";
import { ChiTietThongTinKD } from "./ChiTietThongTinKD";
import { ChiTietThietBi } from "./ChiTietThietBi";

export class XuatBaoCao extends Component {
  render() {
    return (
      <>
        <TopBar />
        <LeftSideBar />
        <div className="content-page">
          <div className="row">
            <div className="col-12">
              <div className="card-box">
                <h2 style={{ textAlign: "center" }}>Xuất Báo Cáo</h2>
                <h5 style={{ fontStyle: "italic" }}>
                  Tiêu Chí 1. Xuất Theo Dữ Liệu Có Trong Các Bảng
                </h5>
                <div>
                  <button style={{marginRight: "10px", backgroundColor:"#7266ba", borderColor:"#7266ba"}} className="btn btn-primary">
                    <Link
                      to="/xuatdonvi"
                      style={{ textDecoration: "none", color:"white" }}
                    >
                      Đơn Vị
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatdongtb"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Dòng Thiết Bị
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuathoadon"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Hóa Đơn
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatloaitb"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Loại Thiết Bị
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatnhomkd"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Nhóm Kiểm Định
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatnhomtb"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Nhóm Thiết Bị
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatthongtinkd"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Thông Tin Kiểm Định
                    </Link>
                  </button>
                  <button style={{marginRight: "10px"}}>
                    <Link
                      to="/xuatthietbi"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Thiết Bị
                    </Link>
                  </button>
                </div>
                <h5 style={{ fontStyle: "italic" }}>
                  Tiêu Chí 2. Xuất Dữ Liệu Liên Kết Giữa Các Bảng
                </h5>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const XuatDonVi = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietDonVi ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatDongTB = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietDongThietBi ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatHoaDon = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietHoaDon ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatLoaiTB = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietLoaiTB ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatNhomKD = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietNhomKD ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatNhomTB = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietNhomTBs ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatThongKD = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietThongTinKD ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};

export const XuatThietBi = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <ChiTietThietBi ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};
