using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class LoaiTb
    {
        public LoaiTb()
        {
            MaTb = new HashSet<MaTb>();
        }

        public string MaLoai { get; set; }
        public string LoaiThietBi { get; set; }
        public int? Delete { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}
