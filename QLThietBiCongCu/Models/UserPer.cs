using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class UserPer
    {
        public int IdUserPer { get; set; }
        public int? IdPer { get; set; }
        public int? IdUser { get; set; }
        public int? Licensed { get; set; }

        public virtual Permission IdPerNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
