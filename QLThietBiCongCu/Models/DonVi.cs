using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QLThietBiCongCu.Models
{
    public partial class DonVi
    {
        public DonVi()
        {
            MaTb = new HashSet<MaTb>();
        }

        public string MaDonVi { get; set; }
        public string TenDonVi { get; set; }
        public int? Delete { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}
