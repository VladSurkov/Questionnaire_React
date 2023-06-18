using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Services.UserService
{
    public interface IUserService
    {
        public Task<Account> GetUserByEmailAndRole(string email, string role);

        public Task<Account> GetUserById (Guid id);
    }
}
