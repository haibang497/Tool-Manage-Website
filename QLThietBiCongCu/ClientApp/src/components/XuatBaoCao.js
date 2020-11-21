import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ChiTietDonVi } from "./ChiTietDonVi";
import { ChiTietDongThietBi } from "./ChiTietDongTB";
import { NavLink } from "react-router-dom";

export class XuatBaoCao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      com: 1,
    };
  }
  render() {
    return (
      <>
        <div className="container">
          <label>Chọn Bảng Để Xuất Báo Cáo</label> &nbsp;
          <select>
            <option value="Đơn Vị">Chọn...</option>
            <option value="Đơn Vị">Đơn Vị</option>
            <option value="Đơn Vị">Dòng Thiết Bị</option>
          </select>
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
    <div>
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
    <div>
      <ChiTietDongThietBi ref={componentRef} />
      <button className="print" onClick={handlePrint}>
        <i className="fa fa-print"></i> &nbsp; Xuất Báo Cáo
      </button>
    </div>
  );
};
