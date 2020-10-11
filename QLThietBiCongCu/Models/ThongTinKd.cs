using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class ThongTinKd
    {
        public string MaKd { get; set; }
        public string MaTb { get; set; }
        public string GiaKd { get; set; }
        public string ChuKyKd { get; set; }
        public string DonViGuiKd { get; set; }
        public string DonViKd { get; set; }
        public string NgayKdganNhat { get; set; }
        public string NgaytoihanKd { get; set; }
        public string SoKd { get; set; }
        public string TinhTrangKd { get; set; }
        public string ViTriLuuTruKd { get; set; }
        public string SoSeri { get; set; }
        public int? Delete { get; set; }

        public virtual MaTb MaTbNavigation { get; set; }
    }
}
