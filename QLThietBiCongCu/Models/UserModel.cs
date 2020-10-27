using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QLThietBiCongCu.Models
{
    public class UserModel
    {
        [Required(ErrorMessage ="Yêu Cầu Nhập Username")]
        public string UserAccount { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Mật Khẩu")]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage ="Xác Nhận Mật Khẩu Không Khớp")]
        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Tên")]
        public string UserName { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Số Điện Thoại")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Ngày Sinh")]
        public string Bday { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Email")]
        [EmailAddress(ErrorMessage ="Định Dạng Email Không Đúng")]
        public string Email { get; set; }
        [Required(ErrorMessage ="Yêu Cầu Nhập Địa Chỉ")]
        public string Address { get; set; }
    }
}
