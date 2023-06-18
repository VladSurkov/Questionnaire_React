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

        public async Task<Account> GetUserByEmailAndRole(string email, string role)
        {
            Roles roleForDb = (Roles)Enum.Parse(typeof(Roles), role);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Role == roleForDb);

            if (user != null)
            {
                return user;
            }

            return null;
        }

        public async Task<Account> GetUserById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }
    }
}
