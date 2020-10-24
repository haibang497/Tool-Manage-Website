using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class PerDetail
    {
        public int IdDetail { get; set; }
        public int? IdPer { get; set; }
        public string ActionName { get; set; }
        public string ActionCode { get; set; }
        public string CheckAction { get; set; }

        public virtual Permission IdPerNavigation { get; set; }
    }
}
