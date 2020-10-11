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
    public class ThongTinKdsController : ControllerBase
    {
        private readonly QuanLyThietBiContext _context;

        public ThongTinKdsController(QuanLyThietBiContext context)
        {
            _context = context;
        }

        // GET: api/ThongTinKds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThongTinKd>>> GetThongTinKd()
        {
            return await _context.ThongTinKd.ToListAsync();
        }

        // GET: api/ThongTinKds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ThongTinKd>> GetThongTinKd(string id)
        {
            var thongTinKd = await _context.ThongTinKd.FindAsync(id);

            if (thongTinKd == null)
            {
                return NotFound();
            }

            return thongTinKd;
        }

        // PUT: api/ThongTinKds/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThongTinKd(string id, ThongTinKd thongTinKd)
        {
            if (id != thongTinKd.MaKd)
            {
                return BadRequest();
            }

            _context.Entry(thongTinKd).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThongTinKdExists(id))
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

        // POST: api/ThongTinKds
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ThongTinKd>> PostThongTinKd(ThongTinKd thongTinKd)
        {
            _context.ThongTinKd.Add(thongTinKd);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ThongTinKdExists(thongTinKd.MaKd))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetThongTinKd", new { id = thongTinKd.MaKd }, thongTinKd);
        }

        // DELETE: api/ThongTinKds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ThongTinKd>> DeleteThongTinKd(string id)
        {
            var thongTinKd = await _context.ThongTinKd.FindAsync(id);
            if (thongTinKd == null)
            {
                return NotFound();
            }

            _context.ThongTinKd.Remove(thongTinKd);
            await _context.SaveChangesAsync();

            return thongTinKd;
        }

        private bool ThongTinKdExists(string id)
        {
            return _context.ThongTinKd.Any(e => e.MaKd == id);
        }
    }
}
