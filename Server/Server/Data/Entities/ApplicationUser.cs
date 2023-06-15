using Server.Models;

namespace Server.Data.Entities
{
    public class ApplicationUser
    { 
        public string FirstName { get; set; } = string.Empty;

        public string SecondName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string HashPassword { get; set; }

        public byte[] SaltPassword { get; set; }

        public string Role { get; set; }
    }
}
