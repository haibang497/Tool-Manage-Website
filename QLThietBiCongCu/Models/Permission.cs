using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class Permission
    {
        public Permission()
        {
            PerDetail = new HashSet<PerDetail>();
            UserPer = new HashSet<UserPer>();
        }

        public int IdPer { get; set; }
        public string NamePer { get; set; }

        public virtual ICollection<PerDetail> PerDetail { get; set; }
        public virtual ICollection<UserPer> UserPer { get; set; }
    }
}
