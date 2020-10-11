using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class HoaDon
    {
        public HoaDon()
        {
            MaTb = new HashSet<MaTb>();
        }

        public string IdhoaDon { get; set; }
        public string SoHoaDon { get; set; }
        public string NgayHoaDon { get; set; }
        public string LoaiHoaDon { get; set; }
        public string TinhTrangHoaDon { get; set; }
        public string ViTriLuuTruHd { get; set; }
        public int? Delete { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}
