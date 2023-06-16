using Server.Models;
using System.Security.Claims;

namespace Server.Services.TokenService
{
    public interface ITokenService
    {
        public bool IsAccessTokenValid(string accessToken);

        public string CreateToken(Account user);

        public ClaimsPrincipal DecodeJwt(string token);

        public string GetTokenFromHeaders();
    }
}
