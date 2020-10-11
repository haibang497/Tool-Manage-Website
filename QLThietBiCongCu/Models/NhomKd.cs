using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class NhomKd
    {
        public NhomKd()
        {
            MaTb = new HashSet<MaTb>();
        }

        public string MaNhomKd { get; set; }
        public string NhomKiemDinh { get; set; }
        public int? Delete { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}
