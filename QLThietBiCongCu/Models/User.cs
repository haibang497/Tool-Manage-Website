using System;
using System.Collections.Generic;

namespace QLThietBiCongCu.Models
{
    public partial class User
    {
        public User()
        {
            UserPer = new HashSet<UserPer>();
        }

        public int IdUser { get; set; }
        public string UserAccount { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Bday { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public virtual ICollection<UserPer> UserPer { get; set; }
    }
}
