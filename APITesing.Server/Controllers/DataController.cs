using APITesing.Server.Data;
using APITesing.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading.Tasks;

namespace APITesing.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public DataController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/data
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataItems>>> GetDataItems()
        {
            return await _context.DataItems.ToListAsync();
        }
    }
   
}




