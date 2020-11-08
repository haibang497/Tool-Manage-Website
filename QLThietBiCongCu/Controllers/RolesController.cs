using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public List<RoleModel> AddNew () {
            return null;
        }
    }
}