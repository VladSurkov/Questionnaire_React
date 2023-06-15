using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Account> GetUserByEmailAndRole(string email, Roles role)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Role == role);

            if (user != null)
            {
                return user;
            }

            return null;
        }
    }
}
