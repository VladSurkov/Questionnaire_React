using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Server.Services.TokenService;
using System.Security.Claims;
using Server.Services.UserService;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")] // https://localhost:44309/CreateForm/creareForm

    public class CreateFormController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        
        public CreateFormController(ITokenService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpGet("creareForm")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> CreateForm()
        {
            var jwt = _tokenService.GetTokenFromHeaders();
            var userDataFromJwt = _tokenService.DecodeJwt(jwt);
            var userEmail = userDataFromJwt.FindFirstValue("Email");
            var userRole = userDataFromJwt.FindFirstValue("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");

            var user = await _userService.GetUserByEmailAndRole(userEmail, userRole);
            return Ok(user);
        }
    }
}
