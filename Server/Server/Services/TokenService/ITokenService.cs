using Server.Models;

namespace Server.Services.TokenService
{
    public interface ITokenService
    {
        public bool IsAccessTokenValid(string accessToken);

        public string CreateToken(Account user);
    }
}
