using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers ()
        {
            var users = new[]
            {
                new { Name = "Vlad"},
                new { Name = "Stas"}
            };

            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody] User user)
        {
            var newPerson = new[]
            {
                new { First_name = user.FirstName, Email = user.Email }
            };

            return Ok(newPerson);
        }
    }
}
