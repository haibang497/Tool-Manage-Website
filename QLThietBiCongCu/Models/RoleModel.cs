using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLThietBiCongCu.Models
{
    public class RoleModel
    {
        public int IdUser { get; set; }
        public string UserAccount { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Bday { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string NamePer { get; set; }
    }
}
