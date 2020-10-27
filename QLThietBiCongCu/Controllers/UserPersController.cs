using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLThietBiCongCu.Models;

namespace QLThietBiCongCu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPersController : ControllerBase
    {
        private readonly QuanLyThietBiContext _context;

        public UserPersController(QuanLyThietBiContext context)
        {
            _context = context;
        }

        // GET: api/UserPers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPer>>> GetUserPer()
        {
            return await _context.UserPer.ToListAsync();
        }

        // GET: api/UserPers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserPer>> GetUserPer(int id)
        {
            var userPer = await _context.UserPer.FindAsync(id);

            if (userPer == null)
            {
                return NotFound();
            }

            return userPer;
        }

        // PUT: api/UserPers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserPer(int id, UserPer userPer)
        {
            if (id != userPer.IdUserPer)
            {
                return BadRequest();
            }

            _context.Entry(userPer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserPers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserPer>> PostUserPer(UserPer userPer)
        {
            _context.UserPer.Add(userPer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserPer", new { id = userPer.IdUserPer }, userPer);
        }

        // DELETE: api/UserPers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserPer>> DeleteUserPer(int id)
        {
            var userPer = await _context.UserPer.FindAsync(id);
            if (userPer == null)
            {
                return NotFound();
            }

            _context.UserPer.Remove(userPer);
            await _context.SaveChangesAsync();

            return userPer;
        }

        private bool UserPerExists(int id)
        {
            return _context.UserPer.Any(e => e.IdUserPer == id);
        }
    }
}
