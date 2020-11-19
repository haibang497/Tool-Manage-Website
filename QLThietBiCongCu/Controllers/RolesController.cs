using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLThietBiCongCu.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLThietBiCongCu.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase {
        private readonly QuanLyThietBiContext _context;

        public RolesController (QuanLyThietBiContext context) {
            _context = context;
        }
        // GET: api/<RolesController>
        [HttpGet]
        public List<RoleModel> GetRole () {
            var query = (from u in _context.User 
            join up in _context.UserPer on u.IdUser equals up.IdUser 
            join p in _context.Permission on up.IdPer equals p.IdPer 
            select new RoleModel {
                IdUser = u.IdUser,
                    UserAccount = u.UserAccount,
                    UserName = u.UserName,
                    Password = u.Password,
                    NamePer = p.NamePer,
                    PhoneNumber = u.PhoneNumber,
                    Bday = u.Bday,
                    Email = u.Email,
                    Address = u.Address
            }).ToList ();
            return query;
        }

        [HttpGet ("{id}")]
        public RoleModel GetRole (int id) {
            var query = (from u in _context.User 
            join up in _context.UserPer on u.IdUser equals up.IdUser 
            join p in _context.Permission on up.IdPer equals p.IdPer 
            where u.IdUser == up.IdUser &&  up.IdPer == p.IdPer && u.IdUser== id
            select new RoleModel {
                IdUser = u.IdUser,
                    UserAccount = u.UserAccount,
                    UserName = u.UserName,
                    Password = u.Password,
                    NamePer = p.NamePer,
                    PhoneNumber = u.PhoneNumber,
                    Bday = u.Bday,
                    Email = u.Email,
                    Address = u.Address
            }).SingleOrDefault();
            return query;
        }
        [HttpGet("{userAccount}/{password}")]
        public List<RoleModel> Login(string userAccount, string password)
        {
            var query=(from u in _context.User 
            join up in _context.UserPer on u.IdUser equals up.IdUser 
            join p in _context.Permission on up.IdPer equals p.IdPer 
            where u.UserAccount.Equals(userAccount)&&u.Password.Equals(password)
            select new RoleModel {
                IdUser = u.IdUser,
                    UserAccount = u.UserAccount,
                    UserName = u.UserName,
                    Password = u.Password,
                    NamePer = p.NamePer,
                    PhoneNumber = u.PhoneNumber,
                    Bday = u.Bday,
                    Email = u.Email,
                    Address = u.Address
            }).ToList();
            return query;
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUser([FromBody]UserModel user)
        {
            User user1 = new User();
            user1.IdUser = user.IdUser;
            user1.UserAccount = user.UserAccount; ;
            user1.Password = user.Password;
            user1.UserName = user.UserName;
            user1.PhoneNumber = user.PhoneNumber;
            user1.Bday = user.Bday;
            user1.Email = user.Email;
            user1.Address = user.Address;
            _context.User.Add(user1);
            await _context.SaveChangesAsync();
            //var u = _context.User;
            //var up = _context.UserPer;
            //var p = _context.Permission;
            UserPer up = new UserPer();
            up.IdUser = user1.IdUser;
            up.IdPer = user.IdPer;
            up.Licensed = 1;
            _context.UserPer.Add(up);
           
           

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.IdUser }, user);
        }

    }
}