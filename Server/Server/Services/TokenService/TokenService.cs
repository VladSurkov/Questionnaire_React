using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public bool IsAccessTokenValid(string accessToken)
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

        public string CreateToken(Account user)
        {
            Roles role = (Roles)Enum.Parse(typeof(Roles), (user.Role).ToString());

            List<Claim> claims = new List<Claim>
            {
                new Claim("Email", user.Email),
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

        public ClaimsPrincipal DecodeJwt(string token)
        {
            // Getting the secret key (if it is used to sign the token)
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            // Configuring token validation parameters
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = secretKey,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // Ignore time difference
            };

            try
            {
                // Token decryption and validation
                var tokenHandler = new JwtSecurityTokenHandler();
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
                return claimsPrincipal;
            }
            catch (Exception ex)
            {
                // Handling decryption error or invalid token
                throw new Exception("Ошибка расшифровки токена JWT.", ex);
            }
        }

        public string GetTokenFromHeaders()
        {
            string token = null;
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext.Request.Headers.TryGetValue("Authorization", out var authHeaderValues))
            {
                string authHeaderValue = authHeaderValues.FirstOrDefault();

                if (!string.IsNullOrEmpty(authHeaderValue) && authHeaderValue.StartsWith("bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    token = authHeaderValue.Substring("bearer ".Length);
                }
            }

            return token;
        }
    }
}
