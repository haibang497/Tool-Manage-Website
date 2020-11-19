using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class MaTb
    {
        public MaTb()
        {
            ThongTinKd = new HashSet<ThongTinKd>();
        }

        public string Stt { get; set; }
        public string MaTb1 { get; set; }
        public string IdnhomTb { get; set; }
        public string MaDonVi { get; set; }
        public string MaLoai { get; set; }
        public string MaNhomKd { get; set; }
        public string IdhoaDon { get; set; }
        public string IddongTb { get; set; }
        public string NgayPhieuXuat { get; set; }
        public string NgayPhieuNhap { get; set; }
        public string TenTb { get; set; }
        public string TenChuan { get; set; }
        public string GiaMua { get; set; }
        public string DonViBan { get; set; }
        public string DonViTinh { get; set; }
        public string Soluong { get; set; }
        public string TinhTrang { get; set; }
        public string NgayTinhTrang { get; set; }
        public string PhapLy { get; set; }
        public string ViTriLuuTruBkk { get; set; }
        public string MaMay { get; set; }
        public string NuocSanXuat { get; set; }
        public string NamSx { get; set; }
        public string GhiChu { get; set; }
        public int? Deleted { get; set; }
        public string UserDo { get; set; }

        public virtual DongTb IddongTbNavigation { get; set; }
        public virtual HoaDon IdhoaDonNavigation { get; set; }
        public virtual NhomTb IdnhomTbNavigation { get; set; }
        public virtual DonVi MaDonViNavigation { get; set; }
        public virtual LoaiTb MaLoaiNavigation { get; set; }
        public virtual NhomKd MaNhomKdNavigation { get; set; }
        public virtual ICollection<ThongTinKd> ThongTinKd { get; set; }
    }
}
