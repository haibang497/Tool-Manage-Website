using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class NhomTb
    {
        public NhomTb()
        {
            MaTb = new HashSet<MaTb>();
        }

        public string IdnhomTb { get; set; }
        public string NhomTb1 { get; set; }
        public int? Delete { get; set; }
        public string UserDo { get; set; }

        public virtual ICollection<MaTb> MaTb { get; set; }
    }
}
