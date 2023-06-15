using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Models.Identity;
using Server.Services.PasswordService;
using Server.Services.TokenService;
using Server.Services.UserService;
using System.Security.Cryptography;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")] // https://localhost:44309/users/
    public class UsersController : ControllerBase
    {
        public static Account newUser = new Account();

        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;
        private readonly IPasswordService _passwordService;
        private readonly ITokenService _tokenService;

        public UsersController(IConfiguration configuration, ApplicationDbContext context, IPasswordService passwordService, ITokenService tokenService, IUserService userService)
        {
            _context = context;
            _userService = userService;
            _passwordService = passwordService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(RegisterRequest request)
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), request.Role);

            var user = await _userService.GetUserByEmailAndRole(request.Email, role);

            if (user != null) 
            {
                return Conflict("User already registered");
            }

            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPassword = _passwordService.HashPassword(request.Password, salt);

            newUser.FirstName = request.FirstName;
            newUser.SecondName = request.SecondName;
            newUser.Email = request.Email;
            newUser.HashPassword = hashedPassword;
            newUser.SaltPassword = salt;
            newUser.Role = role;

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Created("", "User successfully registered");
        }

        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(LoginRequest request)
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), request.Role);

            var user = await _userService.GetUserByEmailAndRole(request.Email, role);

            if (user == null)
            {
                return NotFound("User not found");
            }

            bool isPasswordValid = _passwordService.VerifyPassword(request.Password, user.SaltPassword, user.HashPassword);

            if (!isPasswordValid)
            {
                return Unauthorized("Wrong password");
            }

            string token = _tokenService.CreateToken(user);

            return Ok(token);
        }

        [HttpGet("testauth")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetMe()
        {
            string accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("bearer ", "");

            if (_tokenService.IsAccessTokenValid(accessToken))
            {
                return Ok("Good");
            }
            else
            {
                return Forbid();
            }
        }
    }
}
