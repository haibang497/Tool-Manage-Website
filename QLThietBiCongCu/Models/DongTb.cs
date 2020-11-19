using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models {
    public partial class DongTb {
        public DongTb () {
            MaTb = new HashSet<MaTb> ();
        }

        public string IddongTb { get; set; }
        public string DongTb1 { get; set; }
        public string IdnhomTb { get; set; }
        public int? Deleted { get; set; }
        public string UserDo { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}