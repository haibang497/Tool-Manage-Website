using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLThietBiCongCu.Models
{
    public class PermissionDetailModel
    {
        public int IdPer { get; set; }
        public string NamePer { get; set; }
        public int CreateRole { get; set; }
        public int EditByName { get; set; }
        public int EditFull { get; set; }
        public int DeleteRole { get; set; }
    }
}
