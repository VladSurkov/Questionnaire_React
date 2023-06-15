using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;
using Server.Models.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")] // https://localhost:44309/users/
    public class UsersController : ControllerBase
    {
        public static Account newUser = new Account();

        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public UsersController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(RegisterRequest request)
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), request.Role);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Role == role);

            if (user != null) 
            {
                return Ok("User already registered");
            }

            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPassword = HashPassword(request.Password, salt);

            newUser.FirstName = request.FirstName;
            newUser.SecondName = request.SecondName;
            newUser.Email = request.Email;
            newUser.HashPassword = hashedPassword;
            newUser.SaltPassword = salt;
            newUser.Role = role;

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("User successfully registered");
        }

        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(LoginRequest request)
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), request.Role);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Role == role);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            bool isPasswordValid = VerifyPassword(request.Password, user.SaltPassword, user.HashPassword);

            if (!isPasswordValid)
            {
                return Unauthorized("Wrong password");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [HttpGet("testauth")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetMe()
        {
            string accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("bearer ", "");

            if (IsAccessTokenValid(accessToken))
            {
                return Ok("Good");
            }
            else
            {
                return Forbid();
            }
        }

        private bool IsAccessTokenValid(string accessToken)
        {
            try
            {
                // Getting the secret key from the configuration
                var secretKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                // Configuring Token Validation Options
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = secretKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // Ignore time difference
                };

                // Access token validation
                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }

        private string CreateToken(Account user) 
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), (user.Role).ToString());

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                // expires: DateTime.UtcNow.AddSeconds(30),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private string HashPassword(string password, byte[] salt)
        {
            // Password hash generation using PBKDF2 and SHA256
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }

        private bool VerifyPassword(string password, byte[] salt, string hashedPassword)
        {
            // Generating a hash of the provided password using the same salt
            string hashedProvidedPassword = HashPassword(password, salt);

            // Comparing the hash of the provided password with the hash from the database
            return hashedPassword.Equals(hashedProvidedPassword);
        }
    }
}
