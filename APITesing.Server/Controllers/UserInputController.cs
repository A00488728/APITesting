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
    public class UserInputController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UserInputController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostUserInput([FromBody] UserInputs userInputs)
        {
            if (userInputs == null)
            {
                return BadRequest();
            }
            _context.UserInputs.Add(userInputs);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserInput), new { id = userInputs.Id }, userInputs);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserInput(int id)
        {
            var userInput = await _context.UserInputs.FindAsync(id);

            if (userInput == null)
            {
                return NotFound();
            }

            return Ok(userInput);
        }
    }
}